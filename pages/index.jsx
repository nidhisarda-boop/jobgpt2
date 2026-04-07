// pages/index.jsx
// JobGPTv3 — Next.js main page
// All Nova intelligence features: parallel fetch, NLP, confidence scoring,
// A/B testing, typed response templates, postProcess quick replies

import Head from "next/head";
import { useState, useEffect, useRef, useCallback } from "react";
import {
  parseJobQuery, filterJobs, rankJobs, rankJobsWithScores, estimateSalary, getSalaryRange,
  scoreSearch, getQueryComplexity, computeFollowUps,
  RESPONSE_TEMPLATES, ROLE_TYPES, isSpam,
  getSimilarRoles, getProactiveTip, getHeadhunterQuestion, getMarketIntel,
} from "../lib/nlp";

//  A/B variant (per session) 
const AB_VARIANT = typeof window !== "undefined" && Math.random() < 0.5 ? "A" : "B";

//  Fallback demo jobs (used when API is unavailable) 
const DEMO_JOBS = [
  { id:"d1",  title:"Senior Software Engineer",   company:"TechCorp",        location:"San Francisco, CA",  category:"Technology",         employmentType:"Remote",  experienceLevel:"Senior level",  description:"Full-stack React + Node.js",       applyUrl:"#" },
  { id:"d2",  title:"Product Manager",            company:"StartupXYZ",      location:"New York, NY",       category:"Technology",         employmentType:"Hybrid",  experienceLevel:"Mid level",     description:"Lead product strategy for B2B SaaS", applyUrl:"#" },
  { id:"d3",  title:"Data Scientist",             company:"DataCo",          location:"Remote",             category:"AI",                  employmentType:"Remote",  experienceLevel:"Senior level",  description:"ML models for predictive analytics", applyUrl:"#" },
  { id:"d4",  title:"Registered Nurse – ICU",     company:"City Hospital",   location:"Chicago, IL",        category:"Healthcare",          employmentType:"On-site", experienceLevel:"Mid level",     description:"Critical care, rotating shifts",   applyUrl:"#" },
  { id:"d5",  title:"Financial Analyst",          company:"FinGroup",        location:"Boston, MA",         category:"Financial Services",employmentType:"Hybrid",  experienceLevel:"Entry level",   description:"Financial modelling and reporting", applyUrl:"#" },
  { id:"d6",  title:"UX Designer",               company:"DesignStudio",    location:"Austin, TX",         category:"Technology",         employmentType:"Hybrid",  experienceLevel:"Mid level",     description:"User research and interface design", applyUrl:"#" },
  { id:"d7",  title:"Marketing Manager",          company:"BrandCo",         location:"Los Angeles, CA",    category:"Marketing & Advertising",   employmentType:"Hybrid",  experienceLevel:"Senior level",  description:"Digital campaigns and brand strategy", applyUrl:"#" },
  { id:"d8",  title:"DevOps Engineer",            company:"CloudSys",        location:"Seattle, WA",        category:"Technology",         employmentType:"Remote",  experienceLevel:"Senior level",  description:"AWS infra and CI/CD pipelines",    applyUrl:"#" },
  { id:"d9",  title:"Sales Development Rep",      company:"Salesforce",      location:"Chicago, IL",        category:"Marketing & Advertising",   employmentType:"Hybrid",  experienceLevel:"Entry level",   description:"Generate pipeline for enterprise accounts", applyUrl:"#" },
  { id:"d10", title:"Machine Learning Engineer",  company:"AI Labs",         location:"Remote",             category:"AI",                  employmentType:"Remote",  experienceLevel:"Senior level",  description:"LLM fine-tuning and deployment",   applyUrl:"#" },
  { id:"d11", title:"HR Manager",                company:"PeopleFirst",     location:"Washington, DC",     category:"Consulting",          employmentType:"Hybrid",  experienceLevel:"Mid level",     description:"Full-cycle HR for 200-person company", applyUrl:"#" },
  { id:"d12", title:"Truck Driver CDL",           company:"FreightCo",       location:"Dallas, TX",         category:"Transportation & Logistics",employmentType:"On-site",experienceLevel:"Mid level",     description:"Long-haul freight, Class A CDL",   applyUrl:"#" },
  { id:"d13", title:"Electrician",               company:"PowerUp Services",location:"Houston, TX",        category:"Construction & Infrastructure",      employmentType:"On-site", experienceLevel:"Mid level",     description:"Commercial and residential work",  applyUrl:"#" },
  { id:"d14", title:"Customer Success Manager",   company:"SaaSCo",          location:"Remote",             category:"Marketing & Advertising",   employmentType:"Remote",  experienceLevel:"Mid level",     description:"Enterprise onboarding and retention", applyUrl:"#" },
  { id:"d15", title:"Data Analyst",              company:"InsightsCo",      location:"Atlanta, GA",        category:"AI",                  employmentType:"Hybrid",  experienceLevel:"Entry level",   description:"SQL, Tableau, BI reporting",       applyUrl:"#" },
  { id:"d16", title:"Cloud Architect",            company:"AWS",             location:"Seattle, WA",        category:"Technology",         employmentType:"Remote",  experienceLevel:"Senior level",  description:"Design cloud solutions for enterprise", applyUrl:"#" },
];

//  Shared helpers 
const typeColor = {
  Remote:   "bg-green-100 text-green-700",
  Hybrid:   "bg-blue-100 text-blue-700",
  "On-site":"bg-orange-100 text-orange-700",
};

function timeAgo(hours) {
  if (!hours || hours === 0) return "Just posted";
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

// 
// COMPONENTS
// 

// Company logo placeholder with initials
function CompanyInitials({ name }) {
  const initials = (name || "?").split(/\s+/).slice(0, 2).map(w => w[0]?.toUpperCase() || "").join("");
  const colors = ["bg-blue-600","bg-violet-600","bg-emerald-600","bg-orange-500","bg-rose-600","bg-cyan-600","bg-indigo-600"];
  const color = colors[(name || "").length % colors.length];
  return (
    <div className={`${color} text-white text-xs font-bold rounded-lg w-8 h-8 flex items-center justify-center flex-shrink-0`}>
      {initials || "?"}
    </div>
  );
}

function JobCard({ job, onHighlight, highlighted, matchScore }) {
  const sal = estimateSalary(job.title, job.experienceLevel);
  const empType = Array.isArray(job.employmentType) ? job.employmentType[0] : job.employmentType;
  const companyName = typeof job.company === "object" ? (job.company?.name || "Company") : (job.company || "Company");
  return (
    <div
      className={`job-card bg-white rounded-xl border p-4 cursor-pointer transition-all hover:shadow-md ${highlighted ? "border-[#D42B2B] ring-1 ring-[#D42B2B]/20" : "border-gray-200 hover:border-gray-300"}`}
      onClick={() => job.applyUrl && job.applyUrl !== "#" && window.open(job.applyUrl, "_blank")}
    >
      <div className="flex items-start gap-3">
        <CompanyInitials name={companyName} />
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start gap-2">
            <h3 className="font-semibold text-gray-900 text-sm leading-tight">{job.title}</h3>
            {empType && (
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium whitespace-nowrap flex-shrink-0 ${typeColor[empType] || "bg-gray-100 text-gray-600"}`}>
                {empType}
              </span>
            )}
          </div>
          <p className="text-[#D42B2B] font-medium text-sm mt-0.5">{companyName}</p>
        </div>
      </div>
      <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
        <span>{job.location}</span>
        {job.experienceLevel && <span>{job.experienceLevel}</span>}
        <span className="ml-auto">{timeAgo(job.postedHoursAgo)}</span>
      </div>
      <div className="flex items-center gap-2 mt-2 flex-wrap">
        {sal && (
          <span className="text-xs font-semibold text-green-700 bg-green-50 px-2 py-0.5 rounded-lg">
            {sal}
          </span>
        )}
        {matchScore >= 8 && (
          <span className="text-xs font-semibold text-[#D42B2B] bg-[#F0EBEB] px-2 py-0.5 rounded-lg">
            {matchScore >= 12 ? "Exact match" : matchScore >= 10 ? "Strong match" : "Good match"}
          </span>
        )}
        {job.isSponsored && (
          <span className="text-xs text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">Sponsored</span>
        )}
      </div>
      {job.description && (
        <p className="text-xs text-gray-400 mt-2 line-clamp-2"
          dangerouslySetInnerHTML={{ __html: job.description.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim() }}
        />
      )}
    </div>
  );
}

function MsgBubble({ msg }) {
  const isBot = msg.role === "bot";
  const html = msg.text
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(/\n/g, "<br/>");
  return (
    <div className={`flex ${isBot ? "justify-start" : "justify-end"} mb-2`}>
      {isBot && (
        <div className="w-7 h-7 rounded-full bg-[#F0EBEB] border border-[#D42B2B]/20 flex items-center justify-center mr-2 flex-shrink-0 mt-0.5 select-none overflow-hidden">
          <img src="/logos/joblet-mark-transparent.png" alt="J" className="w-5 h-5 object-contain" />
        </div>
      )}
      <div
        className={`max-w-[85%] px-3 py-2 rounded-2xl text-sm leading-relaxed ${
          isBot ? "bg-white text-[#1A1A1A] rounded-tl-sm shadow-sm" : "bg-[#D42B2B] text-white rounded-tr-sm"
        }`}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}

const THINKING_MSGS = [
  "Scanning 10,000+ jobs…",
  "Matching your profile…",
  "Checking experience level…",
  "Applying filters…",
  "Crunching salary data…",
  "Finding remote roles…",
  "Looking at top companies…",
  "Sorting by relevance…",
  "Checking recent postings…",
  "Almost there…",
];

function TypingIndicator({ hint }) {
  const [msgIdx, setMsgIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setMsgIdx(i => (i + 1) % THINKING_MSGS.length), 1800);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="flex justify-start mb-2">
      <div className="w-7 h-7 rounded-full bg-[#F0EBEB] border border-[#D42B2B]/20 flex items-center justify-center mr-2 flex-shrink-0 mt-0.5 overflow-hidden">
        <img src="/logos/joblet-mark-transparent.png" alt="J" className="w-5 h-5 object-contain" />
      </div>
      <div className="bg-white px-4 py-3 rounded-2xl rounded-tl-sm flex items-center gap-2 min-w-[180px] shadow-sm">
        <span className="typing-dot" /><span className="typing-dot" /><span className="typing-dot" />
        <span className="text-xs text-gray-500 ml-1 italic">{hint || THINKING_MSGS[msgIdx]}</span>
      </div>
    </div>
  );
}

//  Category normalisation map (API → standard names) 
const CAT_NORM = {
  // old names → new standard names
  "Sales & Marketing":       "Marketing & Advertising",
  "IT services":             "Technology",
  "Finance & accounting":    "Financial Services",
  "Manufacturing & prod":    "Manufacturing",
  "Transport & Logistics":   "Transportation & Logistics",
  "Infrastructure":          "Construction & Infrastructure",
  // extra API names observed in the wild
  "Supply chain":            "Transportation & Logistics",
  "Supply Chain":            "Transportation & Logistics",
  "Real Estate":             "Financial Services",
  "Legal":                   "Financial Services",
  "Non-profit":              "Government & Public Sector",
  "Nonprofit":               "Government & Public Sector",
  "Government":              "Government & Public Sector",
  "Public Sector":           "Government & Public Sector",
  "Energy":                  "Energy & Utilities",
  "Utilities":               "Energy & Utilities",
  "Media":                   "Media & Entertainment",
  "Entertainment":           "Media & Entertainment",
  "Insurance":               "Financial Services",
  "Telecom":                 "Technology",
  "Telecommunications":      "Technology",
  "Retail":                  "Marketing & Advertising",
  "E-commerce":              "Marketing & Advertising",
  "Others":                  null,   // drop "Others" — don't show in filter
};
// Map any experience value → joblet.ai dropdown value
function normaliseExperienceValue(v) {
  if (!v) return "";
  const l = v.toLowerCase().replace(/[-_\s]/g, " ");
  if (/senior|lead|principal|staff|7.?10|10\+/.test(l)) return "7-10 Years";
  if (/mid|intermediate|associate|5.?7/.test(l))         return "5-7 Years";
  if (/mid|intermediate|associate|2.?5|3.?5/.test(l))    return "2-5 Years";
  if (/entry|junior|intern|0.?1|1.?2/.test(l))           return "0-1 Years";
  return v; // pass through if unrecognised
}

// Map any employment-type value → sidebar checkbox label
function normaliseEmploymentTypeValue(v) {
  if (!v) return v;
  const l = v.toLowerCase().replace(/[-\s]/g, "");
  if (l === "onsite" || l === "office" || l === "inoffice") return "In office";
  if (l === "remote")  return "Remote";
  if (l === "hybrid")  return "Hybrid";
  return v;
}

function normaliseJobs(jobs) {
  return jobs.map(j => {
    const norm = j.category in CAT_NORM ? CAT_NORM[j.category] : j.category;
    return {
      ...j,
      category:        norm || null,
      experienceLevel: normaliseExperienceValue(j.experienceLevel),
      employmentType:  normaliseEmploymentTypeValue(j.employmentType),
    };
  });
}

//  v3: fixed category list matching joblet.ai 
const V3_CATEGORIES = [
  "Technology & IT",
  "Finance & Banking",
  "Healthcare & Life Sciences",
  "Retail & E-commerce",
  "Manufacturing & Industrial",
  "Logistics & Transportation",
  "Construction & Real Estate",
  "Energy & Utilities",
  "Marketing & Media",
  "Creative & Design",
  "Legal & Government",
  "Education & Research",
  "Agriculture & Primary",
  "Business Services & Consulting",
  "Hospitality & Travel",
];

// 
// MAIN PAGE
// 
export default function Home() {
  //  State 
  const [allJobs,      setAllJobs]      = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [isLoading,    setIsLoading]    = useState(true);
  const [apiStatus,    setApiStatus]    = useState("loading"); // loading | live | demo

  const [messages,     setMessages]     = useState([{
    role: "bot",
    text: "Hi, I'm Joblet AI. Tell me what kind of job you're looking for and I'll find the best matches for you.\n\nTry: *\"Remote product manager\"* or *\"full time nurse in Chicago\"*",
  }]);
  const [quickReplies, setQuickReplies] = useState([
    "Remote software engineer", "Full time healthcare jobs", "Part-time marketing", "Data analyst hybrid",
  ]);
  const [isTyping,     setIsTyping]     = useState(false);
  const [typingHint,   setTypingHint]   = useState(null);
  const [profileSnap,  setProfileSnap]  = useState(null); // triggers re-render of profile widget
  const [chatOpen,     setChatOpen]     = useState(true);
  const [sidebarOpen,  setSidebarOpen]  = useState(false); // mobile sidebar drawer
  const [input,        setInput]        = useState("");
  const [highlightId,  setHighlightId]  = useState(null);

  // Sidebar filters (v3: keyword, work location, working schedule, category)
  const [filters, setFilters] = useState({
    keyword: "", category: "", employmentType: "", schedule: "", experience: "",
  });
  const [sortBy,         setSortBy]         = useState("newest");
  const [activeRoleType, setActiveRoleType] = useState(null); // used internally by NLP
  const [currentPage,    setCurrentPage]    = useState(1);
  const PAGE_SIZE = 20;

  // User profile memory (multi-turn)
  const profileRef = useRef({
    role: null, location: null, type: null, schedule: null,
    experience: null, category: null, roleType: null,
    searchCount: 0, pendingQuestion: null, salaryAsked: false,
    previousRole: null,  // for career pivot detection
  });

  const messagesEndRef = useRef(null);

  //  Auto-scroll chat 
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  //  Load jobs via Next.js API route 
  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      try {
        const res = await fetch("/api/jobs");
        if (res.ok) {
          const data = await res.json();
          if (data.jobs && data.jobs.length > 0) {
            const normJobs = normaliseJobs(data.jobs);
            setAllJobs(normJobs);
            setFilteredJobs(normJobs);
            setApiStatus("live");
          } else {
            setAllJobs(DEMO_JOBS); setFilteredJobs(DEMO_JOBS); setApiStatus("demo");
          }
        } else throw new Error("API error");
      } catch {
        setAllJobs(DEMO_JOBS); setFilteredJobs(DEMO_JOBS); setApiStatus("demo");
      }
      setIsLoading(false);
    };
    load();
  }, []);

  //  Apply sidebar filters reactively 
  useEffect(() => {
    let result = filterJobs(allJobs, filters);
    if (activeRoleType) {
      const rt = ROLE_TYPES.find(r => r.id === activeRoleType);
      if (rt) result = result.filter(j => rt.rx.test(j.title));
    }
    if (sortBy === "salary_desc") {
      result = [...result].sort((a, b) => {
        const getNum = j => { const e = estimateSalary(j.title, j.experienceLevel); return e ? parseInt(e.match(/\d+/g)[1]) : 0; };
        return getNum(b) - getNum(a);
      });
    } else if (sortBy === "newest") {
      result = [...result].sort((a, b) => (a.postedHoursAgo || 0) - (b.postedHoursAgo || 0));
    }
    setFilteredJobs(result);
    setCurrentPage(1);
  }, [allJobs, filters, sortBy, activeRoleType]);

  //  Chat helpers 
  const addBotMsg = useCallback((text) => {
    setMessages(prev => [...prev, { role: "bot", text }]);
  }, []);


  const applyFiltersFromProfile = useCallback((parsed) => {
    const p = profileRef.current;
    setFilters(prev => ({
      ...prev,
      keyword:        parsed.keyword || (parsed.categoryExplicit ? "" : (p.role || prev.keyword)),
      category:       parsed.categoryExplicit ? (parsed.category || prev.category) : prev.category,
      employmentType: normaliseEmploymentTypeValue(parsed.employmentType || p.type || prev.employmentType),
      schedule:       parsed.workSchedule   || prev.schedule,
      experience:     normaliseExperienceValue(parsed.experience || p.experience || prev.experience),
    }));
    if (parsed.roleType && parsed.keyword) {
      const rt = ROLE_TYPES.find(r => r.label === parsed.roleType);
      if (rt) setActiveRoleType(rt.id);
    } else if (parsed.categoryExplicit && !parsed.keyword) {
      setActiveRoleType(null);
    }
  }, []);

  //  SEND CHAT 
  const sendChat = useCallback(async (rawText) => {
    const text = (rawText !== undefined ? rawText : input).trim();
    if (!text) return;
    setInput("");
    setMessages(prev => [...prev, { role: "user", text }]);
    setQuickReplies([]);

    const tl = text.toLowerCase().trim();
    const profile = profileRef.current;

    //  Adversarial / nonsense guard 
    const isNonsense = (
      /^[^a-zA-Z0-9]+$/.test(text) ||                         // only punctuation/emoji
      /^[a-z]{1,3}$/i.test(text) ||                           // 1-3 random chars
      /^\d+$/.test(text) ||                                    // only numbers
      /^(lol|lmao|omg|bruh|hmm|ok|okay|test|hi|hey|yo|sup|yep|nope|idk|asdf|qwerty|xoxo|wtf|meh|ugh|cool|nice|wow|great|thanks|nah|yah|sure|bye|cya)[\s!?.]*$/i.test(text) ||
      (/^[a-z\s]{1,8}$/i.test(text) && !/\b(job|role|work|engineer|manager|nurse|developer|analyst|designer|teacher|driver|chef|doctor|sales|marketing|finance|tech|remote|hybrid|senior|junior|data|cloud|product)\b/i.test(text))
    );
    if (isNonsense) {
      addBotMsg("I couldn't quite catch that! Tell me what kind of job you're looking for.\n\nTry: **\"Software Engineer\"**, **\"Remote nurse\"**, **\"Junior marketing role in NYC\"**");
      setQuickReplies(["Software Engineer", "Product Manager", "Healthcare jobs", "Remote data analyst"]);
      return;
    }

    //  Greeting 
    if (/^(hi|hello|hey|howdy|yo|sup|greetings|good\s*(morning|evening|afternoon|night))[\s!?.,]*$/i.test(text)) {
      const hour = new Date().getHours();
      const timeGreet = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
      addBotMsg(`${timeGreet}! I'm **Joblet AI** — your AI headhunter. Tell me what kind of role you're looking for and I'll get searching!\n\nExamples: *"Remote senior data scientist"*, *"Entry level nurse Chicago"*, or *"Healthcare jobs"*`);
      setQuickReplies(["Remote software engineer", "Entry level marketing", "Part-time nursing NYC", "Senior PM at fintech"]);
      return;
    }
    //  "How does this work / help" 
    if (/\b(how\s+does\s+this\s+work|what\s+can\s+you\s+do|what\s+do\s+you\s+do|how\s+do\s+i\s+use\s+(this|you)|help\s+me\s+find|can\s+you\s+help)\b/i.test(tl)) {
      addBotMsg(`**How Joblet works:**\n\nJust describe your ideal job in plain English — I'll parse it and filter from thousands of live listings.\n\n**Examples:**\n• *"Senior software engineer, remote, 100k+"*\n• *"ICU nurse jobs Chicago"*\n• *"Tech industry jobs"* — browse a whole sector\n• *"What does a PM earn?"* — get salary insights\n\nI also remember your preferences as we chat, so you can refine naturally. Ask me anything!`);
      setQuickReplies(["Remote software engineer", "Healthcare jobs", "Entry level marketing", "Senior product manager"]);
      return;
    }

    //  Spam 
    if (isSpam(tl) || /\b(make\s+money\s+fast|get\s+rich\s+quick|pyramid\s+scheme|mlm|adult\s+job|onlyfans|easy\s+money|no\s+experience\s+needed\s+\$)\b/i.test(tl)) {
      addBotMsg(RESPONSE_TEMPLATES.spam());
      setQuickReplies(["Software Engineer", "Marketing Manager", "Data Analyst", "Registered Nurse"]);
      return;
    }

    //  Salary query 
    if (/\b(what\s+(salary|pay|wage|does\s+\w+\s+make|can\s+i\s+earn)|how\s+much\s+(does|do|can|will|does\s+a)|salary\s+(for|of|range|estimate)|pay\s+(scale|range)|average\s+salary|what\s+do\s+they\s+pay|good\s+pay|salary\s+expectation)\b/i.test(tl) ||
        (/\b(salary|pay|earn|income|wage|compensation)\b/i.test(tl) && /\b(what|how|much|range|estimate|average|expect|good)\b/i.test(tl))) {
      setIsTyping(true);
      await new Promise(r => setTimeout(r, 600));
      setIsTyping(false);
      const parsedSal = parseJobQuery(text);
      // Use remembered role if current query doesn't specify one
      const role = parsedSal.keyword || profile.role || "this role";
      const isSenior = /\b(senior|lead|sr\b|principal|staff|vp|director|head\s+of)\b/i.test(text + " " + (profile.experience || ""));
      const range = getSalaryRange(role);
      const est = range
        ? (isSenior ? `$${Math.round(range.senior / 1000)}k` : `$${Math.round(range.base / 1000)}k`)
        : estimateSalary(role, isSenior ? "Senior level" : "");
      const rangeDisplay = range
        ? `\n\n**Full range:** Entry ${range.baseFmt} → Senior ${range.seniorFmt}`
        : "";
      const context = (range || est)
        ? `These figures reflect typical US market rates. Location, company size, and your background affect actual offers.${rangeDisplay}`
        : `I don't have salary data for that specific role yet — try **Software Engineer**, **Registered Nurse**, or **Product Manager**.`;
      profileRef.current = { ...profileRef.current, salaryAsked: true };
      addBotMsg(RESPONSE_TEMPLATES.salary({ role, estimate: est || "Not available", isSenior, context }));
      setQuickReplies([`Find ${role} jobs`, "Senior level", "Remote only", "Show similar roles"]);
      return;
    }

    //  Career pivot / transition — headhunter response 
    if (/\b(switch\s+career|change\s+(career|field|industry)|move\s+into|transition\s+(to|into)|pivot\s+to|want\s+to\s+become|from\s+\w+\s+to\s+\w+)\b/i.test(tl)) {
      const parsed = parseJobQuery(text);
      // If we already extracted a target role from the pivot phrase, search for it directly
      if (parsed.keyword) {
        const fromRole = profile.role || "your current role";
        const toRole = parsed.keyword;
        profileRef.current = { ...profile, previousRole: profile.role, pendingQuestion: null };
        addBotMsg(RESPONSE_TEMPLATES.career_pivot({ from: fromRole, to: toRole }));
        setQuickReplies([toRole.charAt(0).toUpperCase()+toRole.slice(1), `Remote ${toRole}`, "Entry level", "Full time only"]);
        applyFiltersFromProfile(parsed);
        return;
      }
      addBotMsg("Career changes are exciting! What field are you looking to move into?\n\nExamples: **Tech**, **Healthcare**, **Finance**, **Sales**, or a specific role like **Product Manager** or **Data Analyst**");
      profileRef.current = { ...profileRef.current, pendingQuestion: "role" };
      setQuickReplies(["Software Engineer", "Product Manager", "Data Analyst", "Marketing Manager"]);
      return;
    }

    //  Action commands 
    if (/\b(clear|reset)\s+(all\s+)?(filters?|search|everything|preferences?|memory|history)\b/i.test(tl) || /^start\s+over$/i.test(tl) || /\b(forget\s+(what\s+you\s+know|everything)|clear\s+my\s+preferences?)\b/i.test(tl)) {
      setFilters({ keyword:"", category:"", employmentType:"", schedule:"", experience:"" });
      setActiveRoleType(null);
      profileRef.current = { role:null, location:null, type:null, schedule:null, experience:null, category:null, roleType:null, searchCount:0, pendingQuestion:null, salaryAsked:false, previousRole:null };
      setProfileSnap(null);
      addBotMsg("All filters cleared. What kind of job are you looking for?");
      setQuickReplies(["Remote software engineer", "Healthcare jobs", "Full time marketing", "Data analyst"]);
      return;
    }
    if (/\b(ignore|remove|drop|clear|forget|without)\s+(the\s+)?(work\s+(type|location)|remote|hybrid|in\s+office)\s+filter\b/i.test(tl)) {
      setFilters(prev => ({ ...prev, employmentType:"" }));
      profileRef.current = { ...profileRef.current, type: null };
      addBotMsg("Work location filter removed — showing all work arrangements.");
      setQuickReplies(["Remote only", "Hybrid", "Clear all filters"]);
      return;
    }
    if (/\b(ignore|remove|drop|clear|forget|without)\s+(the\s+)?(schedule|full.time|part.time|internship)\s+filter\b/i.test(tl)) {
      setFilters(prev => ({ ...prev, schedule:"" }));
      addBotMsg("Schedule filter removed — showing all working schedules.");
      setQuickReplies(["Full time only", "Part time", "Clear all filters"]);
      return;
    }
    //  "Next page / show more results" — paginate 
    if (/\b(next\s+page|show\s+more\s+(results?|jobs?)|more\s+results?|page\s+(\d+|next)|load\s+more)\b/i.test(tl) || /^next\s+page\s*→?$/i.test(tl)) {
      const numMatch = tl.match(/page\s+(\d+)/i);
      if (numMatch) {
        setCurrentPage(parseInt(numMatch[1]));
        addBotMsg(`Jumped to page **${numMatch[1]}** — scroll through the results!`);
      } else {
        setCurrentPage(p => p + 1);
        addBotMsg(`Loading next page of results!`);
      }
      setQuickReplies(["Remote only", "Senior level", "Clear all filters", "Start over"]);
      return;
    }
    if (/^(broaden\s+search|broaden\s+results?|widen\s+search)$/i.test(tl) || /^show\s+more$/i.test(tl)) {
      setFilters(prev => ({ ...prev, employmentType:"", schedule:"", category:"", experience:"" }));
      profileRef.current = { ...profileRef.current, type:null, schedule:null, category:null };
      addBotMsg(`Broadened the search — showing all **${profile.role || "matching"}** jobs across all work arrangements and categories.`);
      setQuickReplies(["Remote only", "Full time", "Clear all filters"]);
      return;
    }
    if (/^(remote\s+only|only\s+remote(\s+jobs?)?)$/i.test(tl)) {
      setFilters(prev => ({ ...prev, employmentType:"Remote" }));
      profileRef.current = { ...profileRef.current, type:"Remote" };
      addBotMsg("Showing remote jobs only.");
      setQuickReplies(["Full time", "Clear all filters", "Start over"]);
      return;
    }
    //  "Show all N results/jobs" quick reply 
    if (/^show\s+all(\s+\d+)?\s+(results?|jobs?|matches?)$/i.test(tl)) {
      addBotMsg(`Showing all available results in the grid — scroll through and click any card to apply!`);
      setQuickReplies(["Remote only", "Senior level", "Full time only", "Clear all filters"]);
      return;
    }

    //  Resume tips 
    if (/\b(resume\s+(tips?|help|advice|review|feedback|improve|optimize|write)|how\s+to\s+(write|improve|fix|optimize)\s+(my\s+)?resume|cv\s+tips?|make\s+my\s+resume\s+better)\b/i.test(tl)) {
      const role = profile.role || "your target role";
      const isTech = /\b(engineer|developer|data|ml|devops|cloud|product|software)\b/i.test(role);
      const tips = isTech
        ? `• **Lead with impact**: Quantify everything — "Reduced API latency by 40%" beats "Improved performance"\n• **Tech stack upfront**: Put languages/frameworks in the summary and each role\n• **GitHub link**: Add a link to real projects — recruiters check\n• **Keep it 1 page** (2 pages max for 10+ years)\n• **ATS keywords**: Mirror exact wording from job descriptions`
        : `• **Tailor for each job**: Match your bullet points to the job description's language\n• **Quantify results**: "Grew revenue 30%" beats "increased sales"\n• **Summary statement**: 2–3 lines explaining who you are and what you bring\n• **Skills section**: List hard skills prominently so ATS systems scan them\n• **No photos or graphics**: They confuse applicant tracking systems`;
      addBotMsg(`**Resume tips for ${role}:**\n\n${tips}\n\nWant me to find ${role} jobs to apply to?`);
      setQuickReplies([`Find ${role} jobs`, "Interview prep", "Salary negotiation tips", "Remote only"]);
      return;
    }

    //  Interview prep 
    if (/\b(interview\s+(prep|preparation|tips?|questions?|help|advice)|prepare\s+for\s+(the\s+)?interview|how\s+to\s+(ace|pass|nail)\s+(the\s+)?interview)\b/i.test(tl)) {
      const role = profile.role || "this role";
      const isTech = /\b(engineer|developer|data|ml|devops|cloud|product|software)\b/i.test(role);
      const tipBlock = isTech
        ? `• **Coding round**: Revise arrays, trees, DP, and system design basics\n• **Behavioural**: Use the STAR method (Situation → Task → Action → Result)\n• **System design**: Practice designing scalable APIs, databases, and caching\n• **Culture fit**: Research the company's tech stack and recent product launches`
        : `• **Research the company**: Know their mission, competitors, and recent news\n• **STAR stories**: Prepare 3–5 specific examples from your experience\n• **Questions for them**: Prepare thoughtful questions about the role and team\n• **Salary**: Know your target range — practice saying it out loud`;
      addBotMsg(`**Interview prep for ${role}:**\n\n${tipBlock}\n\n*Would you like me to find more ${role} jobs while you prepare?*`);
      setQuickReplies([`Find ${role} jobs`, "Salary for " + role, "Remote only", "Show similar roles"]);
      return;
    }

    //  Salary negotiation tips 
    if (/\b(how\s+(do\s+i|to)\s+negotiate|salary\s+negotiat|negotiat\s+salary|negotiate\s+my\s+(pay|comp|offer)|counter\s+offer)\b/i.test(tl)) {
      const role = profile.role || "your role";
      const est = estimateSalary(role, profile.experience || "");
      addBotMsg(`**Salary negotiation tips for ${role}:**\n\n• **Anchor high**: Start 10–20% above your target${est ? ` — market range is around **${est}**` : ""}\n• **Never go first**: If asked, say *"I'm flexible — what is the budgeted range?"*\n• **Get it in writing**: Always confirm the final offer via email before resigning\n• **Negotiate beyond base**: Consider equity, bonus, remote flexibility, and PTO\n• **Silence is power**: After stating your number, stop talking and let them respond\n\n*Want me to find ${role} jobs with higher compensation?*`);
      profileRef.current = { ...profileRef.current, salaryAsked: true };
      setQuickReplies([`Find ${role} jobs`, "Senior level", "Remote only", "Clear all filters"]);
      return;
    }

    //  Cover letter tips 
    if (/\b(cover\s+letter\s+(tips?|help|advice|write|template|example|format)|write\s+(a\s+)?cover\s+letter|how\s+to\s+(write|draft|start)\s+(a\s+)?cover\s+letter)\b/i.test(tl)) {
      const role = profile.role || "your target role";
      addBotMsg(`**Cover letter tips for ${role}:**\n\n• **Hook in line 1**: Start with why you're excited about *this specific company*, not just the role\n• **3-paragraph structure**: Why them → What you bring → Call to action\n• **Mirror the job description**: Use their exact language (ATS loves it)\n• **Quantify one achievement**: *"I grew pipeline by 40%..."* is gold\n• **Keep it under 300 words**: Hiring managers don't read long letters\n• **End with confidence**: *"I'd love to chat about how I can help [Company] achieve X"*\n\n*Want me to find more ${role} roles to apply to?*`);
      setQuickReplies([`Find ${role} jobs`, "Interview prep", "Resume tips", "Salary negotiation tips"]);
      return;
    }

    //  "What's trending / in demand / hot roles" 
    if (/\b(what\s+(roles?|jobs?)\s+(are\s+)?(trending|in\s+demand|hot|popular)|trending\s+(roles?|jobs?)|most\s+(in\s+demand|wanted|sought)\s+(roles?|jobs?)|what\s+(should\s+i|to)\s+(target|look\s+for)|hot\s+(jobs?|roles?|skills?))\b/i.test(tl)) {
      const highDemand = [
        ["Machine Learning Engineer", " Explosive growth"],
        ["DevOps Engineer", " Very high demand"],
        ["Cloud Architect", " Very high demand"],
        ["Security Engineer", " Critical need"],
        ["Registered Nurse", " Critical shortage"],
        ["Software Engineer", " Very high demand"],
        ["Product Manager", " Very high demand"],
        ["Truck Driver", " Driver shortage"],
        ["Electrician", " Skilled trade shortage"],
      ];
      const roleList = highDemand.map(([r, d]) => `• **${r}** — ${d}`).join("\n");
      addBotMsg(`**Hottest roles right now:**\n\n${roleList}\n\nWant me to search any of these? Just ask!`);
      setQuickReplies(["Machine Learning Engineer", "DevOps Engineer", "Cloud Architect", "Software Engineer"]);
      return;
    }

    //  "Hiring near me" 
    if (/\b(near\s+me|close\s+to\s+me|my\s+(area|city|location)|local\s+(jobs?|work|roles?))\b/i.test(tl)) {
      addBotMsg(`Location-based filtering isn't available yet, but you can use the **Work Location** filter in the sidebar to find Remote, Hybrid, or In office roles.\n\nWant me to search for remote jobs?`);
      setQuickReplies(["Remote jobs", "Hybrid jobs", "In office jobs", "Clear all filters"]);
      return;
    }

    //  "I applied" / "I got the job" 
    if (/\b(i\s+(applied|submitted|sent\s+my\s+application)|i\s+got\s+(the\s+)?job|i\s+got\s+an?\s+(offer|interview|callback))\b/i.test(tl)) {
      if (/got\s+(the\s+)?job|got\s+an?\s+offer/i.test(tl)) {
        addBotMsg(`**Congratulations!** That's fantastic news — well done!\n\nWhen you're ready to negotiate your offer, I can share some tips. And if you ever need to search again in the future, I'll be here!`);
        setQuickReplies(["Salary negotiation tips", "Clear all filters", "Start over"]);
      } else {
        addBotMsg(`Great move! Applications sent are the name of the game.\n\nWhile you wait to hear back, shall I find a few more ${profile.role || "similar"} roles to keep your pipeline warm?`);
        setQuickReplies([`More ${profile.role || "jobs"} like this`, "Remote only", "Senior level", "Clear all filters"]);
      }
      return;
    }

    //  "What companies are hiring X" 
    if (/\b(what\s+companies?\s+(are\s+)?(hiring|looking\s+for)|which\s+companies?\s+(are\s+)?(hiring|recruiting)|who\s+is\s+hiring)\b/i.test(tl)) {
      const role = profile.role || parseJobQuery(text).keyword || "that role";
      const companyNames = [...new Set(
        filteredJobs.slice(0, 50)
          .map(j => typeof j.company === "object" ? j.company?.name : j.company)
          .filter(Boolean)
      )].slice(0, 8);
      if (companyNames.length > 0) {
        addBotMsg(`Companies hiring **${role}** right now:\n\n${companyNames.map(c => `• **${c}**`).join("\n")}\n\n…and more in the results grid. Click any card to apply!`);
      } else {
        addBotMsg(`I can search for **${role}** roles across all companies in the grid!\n\nThe results panel on the right shows live job listings — each card includes the company name.`);
      }
      setQuickReplies([`Find ${role} jobs`, "Remote only", "Senior level", "Full time only"]);
      return;
    }

    //  "Tell me more" / "more details" 
    if (/^(tell\s+me\s+more|more\s+details?|expand\s+on\s+(that|this)|what\s+else|show\s+me\s+more)$/i.test(tl)) {
      const role = profile.role || "this role";
      const intel = getMarketIntel(role);
      const similar = getSimilarRoles(role).slice(0, 3).join(", ");
      const sal = estimateSalary(role, profile.experience || "");
      addBotMsg(
        `**More about ${role}:**\n\n` +
        (intel ? `**Market:** ${intel.demand} — ${intel.tip}\n\n` : "") +
        (sal ? `**Typical salary:** ${sal}\n\n` : "") +
        (similar ? `**Similar roles you might consider:** ${similar}\n\n` : "") +
        `Want me to narrow down the current results or search something different?`
      );
      setQuickReplies(["Interview prep", "Salary negotiation tips", "Show similar roles", "Remote only"]);
      return;
    }
    //  "More like [role]" quick reply 
    if (/^more\s+like\s+/i.test(tl)) {
      const roleHint = tl.replace(/^more\s+like\s+/i, "").trim();
      const similar = getSimilarRoles(roleHint || profile.role || "");
      if (similar.length > 0) {
        addBotMsg(RESPONSE_TEMPLATES.similar_roles({ role: roleHint || profile.role || "that role", suggestions: similar.slice(0,4).map(r=>r.charAt(0).toUpperCase()+r.slice(1)).join(", ") }));
        setQuickReplies(similar.slice(0,3).map(r => r.charAt(0).toUpperCase() + r.slice(1)).concat("Clear all filters"));
      } else {
        addBotMsg(`I don't have similar role suggestions for that yet. Try typing a specific role like **Software Engineer** or **Product Manager**.`);
        setQuickReplies(["Software Engineer", "Product Manager", "Data Analyst", "Clear all filters"]);
      }
      return;
    }
    if (/^show\s+similar\s+roles$/i.test(tl)) {
      const similar = {
        "software engineer":["developer","engineer","architect"],
        "product manager":["product owner","program manager","product lead"],
        "data scientist":["data analyst","ml engineer","data engineer"],
        "registered nurse":["nurse practitioner","clinical specialist","medical assistant"],
        "marketing manager":["growth manager","content strategist","brand manager"],
        "financial analyst":["investment analyst","business analyst","portfolio manager"],
      };
      const key = profile.role?.toLowerCase() || "";
      let hint = "Data analyst, Business analyst, Program manager";
      for (const [k,v] of Object.entries(similar)) { if (key.includes(k.split(" ")[0])) { hint = v.join(", "); break; } }
      addBotMsg(RESPONSE_TEMPLATES.similar_roles({ role: profile.role || "your last search", suggestions: hint }));
      setQuickReplies(hint.split(", ").slice(0,3).concat("Clear all filters"));
      return;
    }

    //  Pending follow-up answers 
    if (profile.pendingQuestion === "role") {
      const parsed = parseJobQuery(text);
      profileRef.current = { ...profile, role: parsed.keyword || text, pendingQuestion: null };
      applyFiltersFromProfile({ ...parsed, keyword: parsed.keyword || text });
    }

    //  NLP: LLM first (Nova routing pattern), parseJobQuery as fallback 
    let parsed;
    try {
      const llmRes = await fetch("/api/nlp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: text }),
      });
      if (llmRes.ok) {
        const llmData = await llmRes.json();
        // Merge LLM result with parseJobQuery for any fields LLM missed
        const local = parseJobQuery(text);
        parsed = {
          keyword:        llmData.keyword        ?? local.keyword,
          category:       llmData.category       ?? local.category,
          employmentType: llmData.employmentType ?? local.employmentType,
          workSchedule:   llmData.workSchedule   ?? local.workSchedule,
          experience:     llmData.experience     ?? local.experience,
          salaryMin:      llmData.salaryMin      ?? local.salaryMin,
          salaryMax:      llmData.salaryMax      ?? local.salaryMax,
          categoryExplicit: llmData.categoryExplicit ?? local.categoryExplicit ?? false,
          _source: "llm:" + (llmData._provider || "unknown"),
        };
      } else {
        parsed = parseJobQuery(text);
        parsed._source = "local";
      }
    } catch {
      parsed = parseJobQuery(text);
      parsed._source = "local:fallback";
    }

    const complexity = getQueryComplexity(text, parsed);
    const thinkMs = complexity === "complex"  ? 900 + Math.random()*500
                  : complexity === "standard" ? 650 + Math.random()*350
                  :                             380 + Math.random()*250;
    // Context-aware typing hint
    const hint = parsed.employmentType === "Remote" ? "Finding remote roles…"
               : parsed.keyword ? `Matching ${parsed.keyword} roles…`
               : parsed.category ? `Browsing ${parsed.category}…`
               : null;
    setTypingHint(hint);
    setIsTyping(true);
    await new Promise(r => setTimeout(r, thinkMs));
    setIsTyping(false);
    setTypingHint(null);

    //  Vague query — no actionable signal extracted 
    const hasSignal = parsed.keyword || parsed.category || parsed.employmentType || parsed.workSchedule;
    if (!hasSignal) {
      profileRef.current = { ...profileRef.current, pendingQuestion: "role" };
      addBotMsg(RESPONSE_TEMPLATES.vague());
      setQuickReplies(["Software Engineer", "Product Manager", "Registered Nurse", "Data Scientist"]);
      return;
    }

    //  Merge profile 
    const prev = profileRef.current;
    profileRef.current = {
      ...prev,
      role:        parsed.keyword || (parsed.categoryExplicit ? null : prev.role),
      type:        normaliseEmploymentTypeValue(parsed.employmentType || prev.type),
      schedule:    parsed.workSchedule                        || prev.schedule,
      experience:  normaliseExperienceValue(parsed.experience       || prev.experience),
      category:    (parsed.categoryExplicit ? parsed.category : null) || prev.category,
      searchCount: (prev.searchCount || 0) + 1,
      pendingQuestion: null,
    };
    applyFiltersFromProfile(parsed);
    setProfileSnap({ ...profileRef.current }); // sync widget

    const newProfile = profileRef.current;
    const confidence = scoreSearch(parsed, newProfile);

    //  Hybrid scoring — rank by relevance (items 3 & 4 of todo) 
    const searchFilters = {
      keyword:        parsed.keyword || (parsed.categoryExplicit ? null : newProfile.role),
      category:       parsed.categoryExplicit ? (parsed.category || newProfile.category) : null,
      employmentType: parsed.employmentType || newProfile.type,
      schedule:       parsed.workSchedule   || newProfile.schedule,
    };
    const matchedJobs = rankJobsWithScores(allJobs, searchFilters);
    const matchCount  = matchedJobs.length;

    // Build confirm header — natural conversational style (only mention what user asked for)
    const parts = [];
    if (parsed.keyword)                             parts.push(`**${parsed.keyword}**`);
    if (parsed.category && parsed.categoryExplicit) parts.push(`**${parsed.category}** roles`);
    if (parsed.employmentType)                      parts.push(`**${parsed.employmentType.toLowerCase()}**`);
    if (parsed.workSchedule)                        parts.push(`**${parsed.workSchedule.toLowerCase()}**`);
    const confirmMsg = parts.length
      ? `Got it — searching for ${parts.join(", ")}!`
      : "On it!";

    //  0-results: progressive recovery (item 2) 
    if (matchCount === 0) {
      // Step 1: try keyword-only (drop location/experience/type filters)
      const kwOnly = rankJobs(allJobs, { keyword: searchFilters.keyword });
      // Step 2: try similar roles if even keyword-only yields nothing
      const similar = getSimilarRoles(searchFilters.keyword || "");

      if (kwOnly.length > 0) {
        const broaderCount = kwOnly.length;
        const topPick = kwOnly[0];
        addBotMsg(
          `${confirmMsg}\n\nNo exact match with all your filters, but I found **${broaderCount} ${searchFilters.keyword || "related"} jobs** with slightly relaxed criteria.\n\n` +
          `Top result: **${topPick.title}** at ${topPick.company}\n\n` +
          `Would you like to see all of them?`
        );
        setQuickReplies([
          `Show all ${broaderCount} results`,
          searchFilters.experience ? "Remove experience filter" : "Senior level",
          "Clear all filters",
        ]);
        // Widen the actual displayed jobs
        setFilters(prev => ({ ...prev, experience: "" }));
      } else if (similar.length > 0) {
        addBotMsg(
          `${confirmMsg}\n\nSorry, no openings found for **${searchFilters.keyword || "that role"}** right now. Here are some related roles that may interest you:\n\n${similar.slice(0, 4).map(r => `• **${r}**`).join("\n")}`
        );
        setQuickReplies(similar.slice(0, 3).map(r => r.charAt(0).toUpperCase() + r.slice(1)).concat("Clear all filters"));
      } else {
        addBotMsg(
          `${confirmMsg}\n\nSorry, no matching roles found. Please try a different title or location, or clear all filters to browse everything available.`
        );
        setQuickReplies(["Clear all filters", "Remote jobs", "Software Engineer", "Healthcare jobs"]);
      }

    //  Results found: show + proactive steering (items 1 & 3) 
    } else {
      const preview = matchedJobs.slice(0, 3).map(j => {
        const sal = estimateSalary(j.title, j.experienceLevel);
        return `• **${j.title}** at ${j.company} — ${j.location}${sal ? ` (${sal})` : ""}`;
      }).join("\n");

      const headerMsg = RESPONSE_TEMPLATES.search_results({
        confirmMsg, count: matchCount,
        complexity, confidence,
        role: newProfile.role,
        abVariant: AB_VARIANT,
      });

      // Proactive tip based on result set
      const proactiveTip = getProactiveTip(matchCount, newProfile, parsed);

      // Headhunter-style needs discovery question (smarter than simple entityQ)
      const headhunterQ = getHeadhunterQuestion(parsed, newProfile, matchCount);

      addBotMsg(
        `${headerMsg}\n\n${preview}` +
        (matchCount > 3 ? `\n\n...and **${matchCount - 3} more** in the grid.` : "") +
        (proactiveTip ? `\n\n${proactiveTip}` : "") +
        (headhunterQ || "")
      );

      // Context-aware quick replies — add "Next page" if many results
      const followUps = computeFollowUps(parsed, matchCount, newProfile);
      if (matchCount > 20) {
        const nextPageChip = "Next page →";
        if (!followUps.includes(nextPageChip)) followUps.splice(1, 0, nextPageChip);
      }
      setQuickReplies(followUps.slice(0, 4));
    }

  }, [input, allJobs, addBotMsg, applyFiltersFromProfile]);

  //  Pagination 
  const totalPages  = Math.ceil(filteredJobs.length / PAGE_SIZE);
  const pagedJobs   = filteredJobs.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  //  Categories for sidebar 
  // v3: use fixed category list instead of dynamic derivation from API data

  //  Render 
  return (
    <>
      <Head>
        <title>JobGPTv3 — AI Job Search by Joblet</title>
        <meta name="description" content="JobGPTv3 — AI-powered conversational job search with multi-turn memory and 10-provider intelligence" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="flex h-screen bg-[#F5F0EC] font-sans overflow-hidden">

        {/*  MOBILE SIDEBAR OVERLAY  */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/40 z-40 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/*  SIDEBAR  */}
        <aside className={`
          fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-gray-100 flex flex-col overflow-y-auto
          transform transition-transform duration-200
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:relative md:translate-x-0 md:w-56 md:flex-shrink-0 md:z-auto
        `}>
          <div className="p-3 border-b border-gray-100 flex items-center justify-between">
            <div>
              <img
                src="/logos/joblet-wordmark-primary.png"
                alt="Joblet"
                className="h-6 w-auto object-contain"
              />
              <div className="text-[11px] text-gray-400 mt-1.5">
                {apiStatus === "live" ? "Live" : apiStatus === "demo" ? "Demo mode" : "Loading..."}
              </div>
            </div>
            {/* Close button — mobile only */}
            <button
              className="md:hidden text-gray-400 hover:text-gray-600 text-xl leading-none p-1"
              onClick={() => setSidebarOpen(false)}
            >×</button>
          </div>

          {/*  Profile Memory Widget  */}
          {profileSnap && (profileSnap.role || profileSnap.location || profileSnap.type || profileSnap.experience) && (
            <div className="mx-3 mt-2 mb-1 bg-[#F0EBEB] border border-[#D42B2B]/20 rounded-xl p-2.5 text-xs">
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-semibold text-[#D42B2B] text-[11px]">Your preferences</span>
                <button
                  onClick={() => {
                    setFilters({ keyword:"", location:"", category:"", employmentType:"", experience:"", salaryMin:"", salaryMax:"" });
                    setActiveRoleType(null);
                    profileRef.current = { role:null, location:null, type:null, schedule:null, experience:null, category:null, roleType:null, searchCount:0, pendingQuestion:null, salaryAsked:false, previousRole:null };
                    setProfileSnap(null);
                  }}
                  className="text-[10px] text-[#D42B2B]/50 hover:text-[#D42B2B] transition"
                  title="Clear memory"
                >&#x2715; Clear</button>
              </div>
              <div className="space-y-0.5 text-gray-600">
                {profileSnap.role     && <div><span className="text-[#D42B2B]/70">Role:</span> {profileSnap.role}</div>}
                {profileSnap.location && <div><span className="text-[#D42B2B]/70">Location:</span> {profileSnap.location}</div>}
                {profileSnap.type     && <div><span className="text-[#D42B2B]/70">Type:</span> {profileSnap.type}</div>}
                {profileSnap.experience && <div><span className="text-[#D42B2B]/70">Level:</span> {profileSnap.experience}</div>}
              </div>
            </div>
          )}

          <div className="p-3 space-y-4 text-xs flex-1">

            {/* Search */}
            <div>
              <label className="block font-semibold text-gray-500 uppercase tracking-wide text-[10px] mb-1">Search</label>
              <input
                value={filters.keyword}
                onChange={e => setFilters(p => ({ ...p, keyword: e.target.value }))}
                placeholder="Job title or keyword"
                className="w-full border border-gray-200 rounded-lg px-2 py-1.5 text-xs focus:outline-none focus:border-[#D42B2B]"
              />
            </div>

            {/* Work Location */}
            <div>
              <label className="block font-semibold text-gray-500 uppercase tracking-wide text-[10px] mb-1">Work Location</label>
              {["Remote", "Hybrid", "In office"].map(t => (
                <label key={t} className="flex items-center gap-2 py-0.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.employmentType === t}
                    onChange={() => setFilters(p => ({ ...p, employmentType: p.employmentType === t ? "" : t }))}
                    className="accent-[#D42B2B]"
                  />
                  {t}
                </label>
              ))}
            </div>

            {/* Working Schedule */}
            <div>
              <label className="block font-semibold text-gray-500 uppercase tracking-wide text-[10px] mb-1">Working Schedule</label>
              {["Full time", "Part time", "Internship"].map(s => (
                <label key={s} className="flex items-center gap-2 py-0.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.schedule === s}
                    onChange={() => setFilters(p => ({ ...p, schedule: p.schedule === s ? "" : s }))}
                    className="accent-[#D42B2B]"
                  />
                  {s}
                </label>
              ))}
            </div>

            {/* Category */}
            <div>
              <label className="block font-semibold text-gray-500 uppercase tracking-wide text-[10px] mb-1">Category</label>
              {V3_CATEGORIES.map(cat => (
                <label key={cat} className="flex items-center gap-2 py-0.5 cursor-pointer truncate">
                  <input
                    type="checkbox"
                    checked={filters.category === cat}
                    onChange={() => setFilters(p => ({ ...p, category: p.category === cat ? "" : cat }))}
                    className="accent-[#D42B2B] flex-shrink-0"
                  />
                  <span className="truncate">{cat}</span>
                </label>
              ))}
            </div>

            {/* Clear */}
            <button
              onClick={() => {
                setFilters({ keyword:"", category:"", employmentType:"", schedule:"", experience:"" });
                setActiveRoleType(null);
              }}
              className="w-full text-xs text-red-500 border border-red-200 rounded-lg py-1.5 hover:bg-red-50 transition"
            >
              Clear all filters
            </button>
          </div>
        </aside>

        {/*  MAIN CONTENT  */}
        <main className="flex-1 flex flex-col overflow-hidden bg-[#F5F0EC]">

          {/* Top bar */}
          <div className="bg-white border-b border-gray-100 px-3 md:px-5 py-3 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-2">
              {/* Hamburger — mobile only */}
              <button
                className="md:hidden flex flex-col gap-1 p-1.5 rounded-lg hover:bg-gray-100 transition flex-shrink-0"
                onClick={() => setSidebarOpen(true)}
                aria-label="Open filters"
              >
                <span className="block w-5 h-0.5 bg-[#1A1A1A] rounded" />
                <span className="block w-5 h-0.5 bg-[#1A1A1A] rounded" />
                <span className="block w-5 h-0.5 bg-[#1A1A1A] rounded" />
              </button>
              <div>
              <div className="flex items-center gap-2 md:gap-3">
                <h1 className="text-sm md:text-base font-bold text-[#1A1A1A]">Job Results</h1>
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                  {isLoading ? "Loading…" : `${filteredJobs.length} jobs`}
                </span>
                {apiStatus === "demo" && (
                  <span className="text-xs text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                    Demo data
                  </span>
                )}
              </div>
            </div>
            </div>
            <div className="flex items-center gap-2">
              <select
                value={filters.experience}
                onChange={e => setFilters(p => ({ ...p, experience: e.target.value }))}
                className="hidden sm:block border border-gray-200 rounded-lg px-2 py-1.5 text-xs focus:outline-none focus:border-[#D42B2B]"
              >
                <option value="">Experience</option>
                <option value="0-1 Years">0-1 Years</option>
                <option value="2-5 Years">2-5 Years</option>
                <option value="5-7 Years">5-7 Years</option>
                <option value="7-10 Years">7-10 Years</option>
                <option value="10+ Years">10+ Years</option>
              </select>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="hidden sm:block border border-gray-200 rounded-lg px-2 py-1.5 text-xs focus:outline-none focus:border-[#D42B2B]"
              >
                <option value="newest">Newest first</option>
                <option value="salary_desc">Highest salary</option>
              </select>
              <button
                onClick={() => setChatOpen(o => !o)}
                className="bg-[#D42B2B] text-white text-xs px-3 py-1.5 rounded-lg font-medium hover:bg-[#B82424] transition flex items-center gap-1.5"
              >
                <span className="hidden sm:inline">{chatOpen ? "Hide chat" : "Chat"}</span>
                <span className="sm:hidden">{chatOpen ? "&#x2715;" : "Chat"}</span>
              </button>
            </div>
          </div>

          {/* Job grid + chat */}
          <div className="flex flex-1 overflow-hidden">

            {/* Job grid */}
            <div className="flex-1 overflow-y-auto p-4">
              {isLoading ? (
                <div className="flex items-center justify-center h-64 text-gray-400 text-sm">
                  <div className="text-center">
                    <div className="text-sm mb-3 text-gray-400">Loading</div>
                    <p>Loading jobs…</p>
                  </div>
                </div>
              ) : filteredJobs.length === 0 ? (
                <div className="flex items-center justify-center h-64 text-gray-400 text-sm">
                  <div className="text-center">
                    <div className="text-3xl mb-3"></div>
                    <p className="font-medium">No jobs match your filters</p>
                    <p className="text-xs mt-1">Try broadening your search or clearing filters</p>
                  </div>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {pagedJobs.map(job => (
                      <JobCard
                        key={job.id}
                        job={job}
                        highlighted={highlightId === job.id}
                        onHighlight={() => setHighlightId(job.id)}
                        matchScore={job._score || 0}
                      />
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex items-center justify-center gap-2 mt-6">
                      <button
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(p => p - 1)}
                        className="px-3 py-1.5 text-xs border rounded-lg disabled:opacity-40 hover:bg-gray-50 transition"
                      >
                        ← Prev
                      </button>
                      <span className="text-xs text-gray-500">
                        Page {currentPage} of {totalPages}
                      </span>
                      <button
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(p => p + 1)}
                        className="px-3 py-1.5 text-xs border rounded-lg disabled:opacity-40 hover:bg-gray-50 transition"
                      >
                        Next →
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>

            {/*  CHAT PANEL  */}
            {chatOpen && (
              <div className="fixed inset-0 z-30 bg-[#FDFBF9] flex flex-col md:relative md:inset-auto md:z-auto md:w-80 md:flex-shrink-0 md:border-l md:border-gray-100">

                {/* Chat header */}
                <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between flex-shrink-0">
                  <div className="flex items-center gap-2">
                    {/* Back arrow — mobile only */}
                    <button
                      className="md:hidden text-gray-400 hover:text-gray-700 text-lg leading-none mr-1"
                      onClick={() => setChatOpen(false)}
                      aria-label="Close chat"
                    >←</button>
                    <div>
                    <div className="font-semibold text-sm text-[#1A1A1A]">
                      <span>job</span><span className="text-[#D42B2B]">let</span><span>.ai</span>
                    </div>
                    <div className="text-[11px] text-green-600"> Online</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      title="Restart chat"
                      onClick={() => {
                        setMessages([{ role: "bot", text: "Hi, I'm Joblet AI. Tell me what kind of job you're looking for and I'll find the best matches for you.\n\nTry: *\"Remote product manager\"* or *\"full time nurse in Chicago\"*" }]);
                        setQuickReplies(["Remote software engineer", "Full time healthcare jobs", "Part-time marketing", "Data analyst hybrid"]);
                        setFilters({ keyword:"", category:"", employmentType:"", schedule:"", experience:"" });
                        setActiveRoleType(null);
                        profileRef.current = { role:null, location:null, type:null, schedule:null, experience:null, category:null, roleType:null, searchCount:0, pendingQuestion:null, salaryAsked:false, previousRole:null };
                        setProfileSnap(null);
                      }}
                      className="text-gray-400 hover:text-gray-600 text-sm leading-none"
                    >↺</button>
                    <button
                      onClick={() => setChatOpen(false)}
                      className="text-gray-400 hover:text-gray-600 text-lg leading-none"
                    >×</button>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto chat-scroll p-3 space-y-1">
                  {messages.map((m, i) => <MsgBubble key={i} msg={m} />)}
                  {isTyping && <TypingIndicator hint={typingHint} />}
                  <div ref={messagesEndRef} />
                </div>

                {/* Quick replies */}
                {quickReplies.length > 0 && (
                  <div className="px-3 py-2 flex flex-wrap gap-1.5 border-t border-gray-100">
                    {quickReplies.map((qr, i) => (
                      <button
                        key={i}
                        onClick={() => sendChat(qr)}
                        className="text-xs bg-[#F0EBEB] text-[#D42B2B] border border-[#D42B2B]/25 rounded-full px-2.5 py-1 hover:bg-[#F5F0EC] transition"
                      >
                        {qr}
                      </button>
                    ))}
                  </div>
                )}

                {/* Input */}
                <div className="px-3 py-3 border-t border-gray-100 flex gap-2">
                  <input
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && !e.shiftKey && sendChat()}
                    placeholder="Describe the job you want…"
                    className="flex-1 border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#D42B2B] bg-white"
                  />
                  <button
                    onClick={() => sendChat()}
                    disabled={isTyping}
                    className="bg-[#D42B2B] text-white rounded-xl px-3 py-2 text-sm font-bold hover:bg-[#B82424] disabled:opacity-50 transition"
                  >
                    
                  </button>
                </div>
              </div>
            )}

          </div>
        </main>
      </div>
    </>
  );
}
