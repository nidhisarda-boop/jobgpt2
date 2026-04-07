// pages/api/jobs.js
// Server-side proxy for joblet.ai — fetches 3 pages in parallel,
// deduplicates, and strips spam. No CORS issues.

import { isSpam } from "../../lib/nlp";

const API_BASE = "https://joblet.ai/api/jobs";
const PAGES    = 3;
const LIMIT    = 50;

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const seed = Date.now();

    // Fetch 3 pages in parallel (server-side — no CORS)
    const pagePromises = Array.from({ length: PAGES }, (_, i) => {
      const url = new URL(API_BASE);
      url.searchParams.set("page",  i + 1);
      url.searchParams.set("limit", LIMIT);
      url.searchParams.set("sort",  "newest");
      url.searchParams.set("seed",  `${seed}-p${i + 1}`);

      return fetch(url.toString(), {
        signal: AbortSignal.timeout(8000),
        headers: { "User-Agent": "JobGPTv3/1.0" },
      })
        .then(r => r.ok ? r.json() : null)
        .then(json => json?.data?.jobs || [])
        .catch(() => []);
    });

    const pages = await Promise.all(pagePromises);

    // Deduplicate by job ID or title+company
    const seen   = new Set();
    const merged = [];
    for (const page of pages) {
      for (const job of page) {
        const key = job.id || `${job.title}|${job.company?.name || ""}`;
        if (!seen.has(key)) {
          seen.add(key);
          // Normalise shape
          merged.push({
            id:              job.id || key,
            title:           job.title || "Unknown Role",
            company:         job.company?.name || job.companyName || "Unknown Company",
            location:        job.location?.display || job.location?.city || job.location || "Remote",
            category:        job.category || "",
            employmentType:  Array.isArray(job.employmentType) ? job.employmentType[0] : (job.employmentType || job.type || ""),
            workSchedule:    Array.isArray(job.workSchedule) ? job.workSchedule[0] : (job.workSchedule || ""),
            experienceLevel: job.experienceLevel || job.experience || "",
            description:     job.description || "",
            applyUrl:        job.applyUrl || job.url || "#",
            postedHoursAgo:  job.posted_hours_ago || job.postedHoursAgo || 0,
            isSponsored:     job.is_sponsored || false,
          });
        }
      }
    }

    // Filter spam on server side too
    const clean = merged.filter(j => !isSpam(j.title.toLowerCase()));

    if (clean.length === 0) {
      return res.status(200).json({ jobs: [], source: "empty" });
    }

    // Cache for 5 minutes
    res.setHeader("Cache-Control", "public, s-maxage=300, stale-while-revalidate=60");
    return res.status(200).json({ jobs: clean, source: "live", count: clean.length });

  } catch (err) {
    console.error("[/api/jobs]", err.message);
    return res.status(500).json({ error: "Failed to fetch jobs", jobs: [] });
  }
}
