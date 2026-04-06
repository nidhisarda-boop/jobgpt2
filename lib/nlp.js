// ═══════════════════════════════════════════════════════════
// JobGPT 2.0 — NLP + Intelligence Library
// Shared between client and server (pure JS, no DOM deps)
// ═══════════════════════════════════════════════════════════

// ── Typo corrections ─────────────────────────────────────────
export const TYPO_MAP = {
  softwre:"software",softwar:"software",enginjer:"engineer",engineeer:"engineer",enginear:"engineer",
  enginer:"engineer",enigneer:"engineer",enginere:"engineer",
  devloper:"developer",develpor:"developer",develper:"developer",developr:"developer",
  managr:"manager",manger:"manager",managment:"management",
  markting:"marketing",
  analest:"analyst",analysit:"analyst",analist:"analyst",analyist:"analyst",
  salse:"sales",slaes:"sales",
  nures:"nurse",nurseing:"nursing",nurese:"nurse",doctr:"doctor",docter:"doctor",
  finace:"finance",financ:"finance",finanse:"finance",acounting:"accounting",accunting:"accounting",
  prodcut:"product",poduct:"product",desgner:"designer",disigner:"designer",
  recuiter:"recruiter",recruter:"recruiter",logisitcs:"logistics",logitics:"logistics",logistcs:"logistics",
  warhouse:"warehouse",warehose:"warehouse",technicain:"technician",technican:"technician",
  elctrician:"electrician",plumer:"plumber",carpeter:"carpenter",carpentar:"carpenter",
  drver:"driver",delievry:"delivery",delivry:"delivery",restaurent:"restaurant",
  hosspital:"hospital",hospitol:"hospital",custmer:"customer",cusomer:"customer",
  expereince:"experience",experiance:"experience",exprience:"experience",
  snior:"senior",seniior:"senior",juior:"junior",juniior:"junior",
  remte:"remote",reomte:"remote",remot:"remote",
  hybrd:"hybrid",
  fulltime:"full-time",parttime:"part-time",partime:"part-time",
  contarct:"contract",
  intrenship:"internship",internhip:"internship",intrship:"internship",
  bluecolar:"blue-collar",bluecollar:"blue-collar",
  // Additional sheet-identified typos
  pyhton:"python",javscript:"javascript",machne:"machine",lerning:"learning",
  cybr:"cyber",busines:"business",heathcare:"healthcare",educaton:"education",
  govrnment:"government",datbase:"database",postion:"position",benifits:"benefits",
  sallary:"salary",appliction:"application",intervew:"interview",reusme:"resume",
  locaton:"location",hybr:"hybrid",
  // More common typos from R27
  sofware:"software",produt:"product",datta:"data",frontent:"frontend",
  fronend:"frontend",frond:"frontend",backned:"backend",bacend:"backend",
  devops:"devops",devop:"devops",fullsatck:"fullstack",fullstck:"fullstack",
  maching:"machine",machinge:"machine",learinng:"learning",leraning:"learning",
  engneer:"engineer",enginering:"engineering",developement:"development",
  // Common scientist/analyst typos
  scientits:"scientist",scintist:"scientist",sceintist:"scientist",sientist:"scientist",
  analyt:"analyst",anayst:"analyst",anlyst:"analyst",
  dat:"data",
  machin:"machine",maniger:"manager",maneger:"manager",
  coordnator:"coordinator",cordinator:"coordinator",
  programer:"programmer",programmr:"programmer",
  analysit:"analyst",analyzt:"analyst",
  marketting:"marketing",markting:"marketing",marketng:"marketing",
  accountent:"accountant",accountant:"accountant",accountnt:"accountant",
  phyical:"physical",physial:"physical",physicl:"physical",
  nuse:"nurse",nurs:"nurse",
  engineeer:"engineer",engneer:"engineer",
  develooper:"developer",devloper:"developer",
  therapits:"therapist",terapist:"therapist",
  markerting:"marketing",marketting:"marketing",
  scinentist:"scientist",scintiest:"scientist",
  acount:"account",accoount:"account",acccount:"account",
  manger:"manager",mnager:"manager",
  // Round 125 additions
  finence:"finance",financa:"finance",finnance:"finance",
  programing:"programming",
};

export function normaliseTypos(text) {
  return text.split(/\s+/).map(w => TYPO_MAP[w.toLowerCase()] || w).join(" ");
}

// ── Spam keywords ─────────────────────────────────────────────
export const SPAM_KEYWORDS = [
  "focus group","survey panelist","online entry level","mystery shop",
  "work at home online entry","panelist",
];
export function isSpam(titleLower) {
  return SPAM_KEYWORDS.some(s => titleLower.includes(s));
}

// ── Salary map ────────────────────────────────────────────────
export const SALARY_MAP = {
  // Tech — Engineering
  "software engineer":      { base:90000,  senior:160000 },
  "data scientist":         { base:95000,  senior:165000 },
  "data engineer":          { base:90000,  senior:155000 },
  "machine learning":       { base:100000, senior:175000 },
  "ml engineer":            { base:100000, senior:175000 },
  "devops engineer":        { base:95000,  senior:155000 },
  "site reliability":       { base:100000, senior:165000 },
  "sre":                    { base:100000, senior:165000 },
  "cloud architect":        { base:120000, senior:185000 },
  "solutions architect":    { base:115000, senior:180000 },
  "security engineer":      { base:95000,  senior:160000 },
  "cybersecurity":          { base:90000,  senior:155000 },
  "network engineer":       { base:75000,  senior:125000 },
  "database administrator": { base:80000,  senior:130000 },
  "it manager":             { base:85000,  senior:140000 },
  "frontend developer":     { base:80000,  senior:140000 },
  "backend developer":      { base:85000,  senior:145000 },
  "full stack":             { base:90000,  senior:155000 },
  "mobile developer":       { base:85000,  senior:145000 },
  "android developer":      { base:85000,  senior:145000 },
  "ios developer":          { base:85000,  senior:150000 },
  "qa engineer":            { base:70000,  senior:120000 },
  "scrum master":           { base:85000,  senior:130000 },
  "technical writer":       { base:65000,  senior:110000 },
  "engineering manager":    { base:140000, senior:200000 },
  "product manager":        { base:105000, senior:170000 },
  // Healthcare
  "registered nurse":       { base:72000,  senior:105000 },
  "nurse practitioner":     { base:105000, senior:140000 },
  "physician":              { base:200000, senior:280000 },
  "physician assistant":    { base:110000, senior:145000 },
  "pharmacist":             { base:110000, senior:135000 },
  "dentist":                { base:150000, senior:200000 },
  "physical therapist":     { base:75000,  senior:105000 },
  "occupational therapist": { base:72000,  senior:100000 },
  "medical assistant":      { base:38000,  senior:52000  },
  "lab technician":         { base:42000,  senior:65000  },
  // Finance & Legal
  "financial analyst":      { base:70000,  senior:120000 },
  "investment banker":      { base:100000, senior:200000 },
  "accountant":             { base:62000,  senior:95000  },
  "bookkeeper":             { base:48000,  senior:68000  },
  "insurance agent":        { base:55000,  senior:95000  },
  "loan officer":           { base:60000,  senior:100000 },
  "paralegal":              { base:50000,  senior:80000  },
  "attorney":               { base:95000,  senior:180000 },
  "lawyer":                 { base:95000,  senior:180000 },
  // Marketing & Creative
  "marketing manager":      { base:80000,  senior:140000 },
  "content writer":         { base:50000,  senior:85000  },
  "copywriter":             { base:55000,  senior:90000  },
  "social media manager":   { base:52000,  senior:88000  },
  "seo specialist":         { base:55000,  senior:90000  },
  "ux designer":            { base:80000,  senior:135000 },
  "graphic designer":       { base:55000,  senior:90000  },
  "video editor":           { base:50000,  senior:85000  },
  // Business & Operations
  "product manager":        { base:105000, senior:170000 },
  "project manager":        { base:80000,  senior:135000 },
  "business analyst":       { base:72000,  senior:115000 },
  "operations manager":     { base:75000,  senior:130000 },
  "supply chain":           { base:68000,  senior:115000 },
  "logistics manager":      { base:65000,  senior:110000 },
  "sales manager":          { base:75000,  senior:140000 },
  "account executive":      { base:70000,  senior:130000 },
  "hr manager":             { base:70000,  senior:115000 },
  "recruiter":              { base:55000,  senior:95000  },
  // Engineering & Trades
  "civil engineer":         { base:70000,  senior:115000 },
  "mechanical engineer":    { base:75000,  senior:120000 },
  "electrical engineer":    { base:78000,  senior:125000 },
  "research scientist":     { base:85000,  senior:145000 },
  "electrician":            { base:55000,  senior:85000  },
  "plumber":                { base:52000,  senior:80000  },
  "hvac technician":        { base:50000,  senior:78000  },
  "carpenter":              { base:48000,  senior:75000  },
  "welder":                 { base:45000,  senior:72000  },
  "truck driver":           { base:52000,  senior:72000  },
  "warehouse":              { base:38000,  senior:55000  },
  // Hospitality & Service
  "chef":                   { base:45000,  senior:75000  },
  "restaurant manager":     { base:48000,  senior:75000  },
  "hotel manager":          { base:55000,  senior:90000  },
  // Education
  "teacher":                { base:48000,  senior:72000  },
  "professor":              { base:80000,  senior:140000 },
  "school counselor":       { base:52000,  senior:78000  },
};

export function estimateSalary(title = "", experienceLevel = "") {
  const t = (title || "").toLowerCase();
  const isSenior = /senior|lead|manager|director|principal|head|staff|vp/i.test(
    (experienceLevel || "") + " " + t
  );
  for (const [role, { base, senior }] of Object.entries(SALARY_MAP)) {
    if (t.includes(role)) {
      const b = isSenior ? senior : base;
      const lo = Math.round(b * 0.88 / 1000) * 1000;
      const hi = Math.round(b * 1.12 / 1000) * 1000;
      return `$${Math.round(lo / 1000)}k–$${Math.round(hi / 1000)}k`;
    }
  }
  return null;
}

/** Return full salary range (entry-level to senior) for chat display */
export function getSalaryRange(keyword = "") {
  const kl = keyword.toLowerCase();
  for (const [role, { base, senior }] of Object.entries(SALARY_MAP)) {
    if (kl.includes(role) || role.includes(kl.split(" ")[0])) {
      return {
        base,
        senior,
        label: `$${Math.round(base / 1000)}k–$${Math.round(senior / 1000)}k`,
        baseFmt: `$${Math.round(base / 1000)}k`,
        seniorFmt: `$${Math.round(senior / 1000)}k`,
        matched: role,
      };
    }
  }
  return null;
}

// ── Location blocklist ────────────────────────────────────────
export const LOC_BLOCKLIST = new Set([
  "home","remote","office","hybrid","onsite","company","startup","firm","agency",
  "enterprise","corp","inc","llc","ltd","co","industry","sector","field","domain",
  "space","market","world","region","healthcare","financial","services","technology",
  "tech","consulting","group","fintech","edtech","biotech","ecommerce","retail",
  "gaming","media","advertising","team","department","engineering","management",
  "operations","marketing","accounting","finance","product","design","brand","growth",
  "content","analytics","intelligence","research","development","innovation","strategy",
  "school","hospital","clinic","bank","labs","studio","lab","center","centre",
  "role","position","job","career","opportunity","level","senior","junior","staff",
  "lead","principal","associate","director","saas","software","hardware","cloud",
  "digital","mobile","social","platform","the","and","or","for","with","from",
  "about","some","any","all","this","that","my","our","data","communications",
  "creative","transformation","solutions","pr",
  // Work-style / location terms that should never be extracted as city/keyword
  "anywhere","everywhere","office","based","onsite","commute","flexible",
  // Industry/sector words that look like proper nouns but aren't cities
  "government","nonprofit","non","profit","manufacturing","education","retail",
  "pharmaceutical","automotive","hospitality","agriculture","infrastructure",
  "defense","military","federal","municipal","ngo","charity",
  // Job-level words that start with capital letters
  "graduate","freshers","expat","expats","professionals","candidates",
]);

// ── Known cities ──────────────────────────────────────────────
export const knownCities = [
  "new york","los angeles","chicago","houston","phoenix","philadelphia","san antonio",
  "san diego","dallas","san jose","austin","jacksonville","fort worth","columbus",
  "charlotte","san francisco","indianapolis","seattle","denver","washington dc",
  "nashville","oklahoma city","el paso","boston","portland","las vegas","memphis",
  "louisville","baltimore","milwaukee","albuquerque","tucson","fresno","sacramento",
  "mesa","kansas city","atlanta","omaha","colorado springs","raleigh","long beach",
  "virginia beach","minneapolis","miami","new orleans","cleveland","tampa","orlando",
  "pittsburgh","cincinnati","anchorage","honolulu","toronto","vancouver","montreal",
  "calgary","edmonton","ottawa","london","manchester","birmingham","glasgow","sydney",
  "melbourne","brisbane","perth","auckland","dublin","amsterdam","berlin","paris",
  "madrid","barcelona","rome","milan","singapore","dubai","mumbai","bangalore",
  "hyderabad","delhi","pune","chennai","kolkata",
  // Global cities
  "bangkok","jakarta","manila","kuala lumpur","seoul","tokyo","osaka","taipei","hong kong",
  "beijing","shanghai","lagos","nairobi","johannesburg","cairo","istanbul","karachi",
  "dhaka","colombo","kathmandu","lahore","sao paulo","buenos aires","bogota","lima",
  "mexico city","riyadh","muscat","kuwait city","doha","abu dhabi","tel aviv","athens",
  "lisbon","stockholm","oslo","copenhagen","helsinki","zurich","vienna","warsaw",
  "prague","budapest","bucharest","sofia","belgrade","zagreb","bratislava",
  "remote",
];

// ── Blue-collar patterns ──────────────────────────────────────
export const BLUE_COLLAR_MAP = [
  { rx:/\bblue[- ]?collar\b/i,                      kw:"blue collar",    cat:"Construction & Infrastructure" },
  { rx:/\btrades?\b(?!\s*(mark|name|show|compliance|finance|secret))/i, kw:"trades", cat:"Construction & Infrastructure" },
  { rx:/\bskilled\s*(labor|labour|worker|work)\b/i,  kw:"skilled labour", cat:"Construction & Infrastructure" },
  { rx:/\bmanual\s*(work|labor|labour|job)\b/i,      kw:"manual labour",  cat:"Manufacturing" },
  { rx:/\bconstruction\s*(work|job|worker)\b/i,      kw:"construction",   cat:"Construction & Infrastructure" },
  { rx:/\bfactory\s*(work|job|worker)?\b(?!\s*(automation|engineer|automated|system))/i, kw:"factory worker", cat:"Manufacturing" },
  { rx:/\bwarehouse\s*(work|job|worker|associate|picker|packer|operative)\b/i, kw:"warehouse associate", cat:"Manufacturing" },
  { rx:/\bdriving\s*(job)?|truck\s*driver|cdl\b/i,   kw:"truck driver",   cat:"Transportation & Logistics" },
];

// ── Role types ────────────────────────────────────────────────
export const ROLE_TYPES = [
  { id:"rt-eng",     label:"Engineering & Dev",    rx:/\b(engineer|developer|devops|architect|sre|qa\s+engineer|programmer|it\s+specialist|systems\s+admin)\b/i },
  { id:"rt-product", label:"Product & Design",     rx:/\b(product\s+(manager|owner|lead|analyst)|ux|ui\s+designer|graphic\s+designer|product\s+designer|scrum\s+master)\b/i },
  { id:"rt-data",    label:"Data & Analytics",     rx:/\b(data\s+(scientist|analyst|engineer|architect)|machine\s+learning|ml\s+engineer|business\s+(analyst|intelligence)|analytics|bi\s+analyst)\b/i },
  { id:"rt-sales",   label:"Sales",                rx:/\b(sales|sdr|bdr|account\s+executive|business\s+development\s+(rep|manager)|revenue\s+(manager|ops))\b/i },
  { id:"rt-mktg",    label:"Marketing",            rx:/\b(marketing\s+(manager|director|specialist|coordinator|analyst)|content\s+(manager|strategist|writer)|brand\s+manager|seo|growth\s+(manager|hacker)|social\s+media)\b/i },
  { id:"rt-health",  label:"Healthcare Roles",     rx:/\b(nurse|nursing|physician|doctor|therapist|pharmacist|medical\s+assistant|clinical\s+(specialist|coordinator)|surgeon|dentist|paramedic)\b/i },
  { id:"rt-fin",     label:"Finance & Accounting", rx:/\b(accountant|cpa|cfo|financial\s+analyst|investment\s+(banker|analyst)|auditor|controller|tax\s+specialist|wealth\s+manager)\b/i },
  { id:"rt-ops",     label:"Operations & PM",      rx:/\b(operations\s+(manager|director|analyst)|project\s+manager|program\s+manager|supply\s+chain|logistics\s+manager|process\s+improvement)\b/i },
  { id:"rt-hr",      label:"HR & People Ops",      rx:/\b(hr\s*(manager|director|business\s+partner|generalist)|recruiter|talent\s+(acquisition|partner)|people\s+ops|human\s+resources)\b/i },
  { id:"rt-cs",      label:"Customer Success",     rx:/\b(customer\s+(success|support|service)\s+(manager|rep|specialist)|account\s+manager|client\s+(success|relations)|support\s+engineer)\b/i },
  { id:"rt-trade",   label:"Trades & Labour",      rx:/\b(electrician|plumber|carpenter|welder|mechanic|hvac|mason|painter|roofer|glazier|pipe\s*fitter|millwright|boilermaker)\b/i },
  { id:"rt-drive",   label:"Driving & Delivery",   rx:/\b(truck\s*driver|cdl|delivery\s*(driver|associate)|courier|chauffeur|bus\s*driver|forklift\s*(operator|driver))\b/i },
  { id:"rt-food",    label:"Food & Service",       rx:/\b(chef|cook|baker|barista|bartender|server|waiter|waitress|sous\s*chef|kitchen\s*(staff|hand)|food\s*(prep|service))\b/i },
  { id:"rt-retail",  label:"Retail & Sales Floor", rx:/\b(retail\s*(associate|manager|worker)|cashier|store\s*(manager|associate|clerk)|sales\s*(associate|clerk|floor)|shop\s*(assistant|keeper))\b/i },
];

// ── Keyword aliases — map informal/abbreviated terms to clean job titles ─────
export const KEYWORD_ALIASES = {
  "coding":        "software developer",
  "programmer":    "software developer",
  "coder":         "software developer",
  "programming":   "software developer",
  "software engineering": "software engineer",
  "software development": "software developer",
  "software developer": "software developer",
  "software engineer":  "software engineer",
  "software":          "software developer",
  "web development": "web developer",
  "dev":           "developer",
  "swe":           "software engineer",
  "sde":           "software engineer",
  "em":            "engineering manager",
  "tpm":           "technical project manager",
  "pm":            "product manager",
  "po":            "product owner",
  "ux researcher": "ux researcher",
  "ux writer":     "ux writer",
  "ux product designer": "product designer",
  "product designer": "product designer",
  "ux designer":   "ux designer",
  "ui designer":   "ui designer",
  "interaction designer": "ux designer",
  "visual designer": "graphic designer",
  "experience designer": "ux designer",
  "ux":            "ux designer",
  "ui":            "ui designer",
  "ds":            "data scientist",
  "ml":            "machine learning engineer",
  "ai":            "ai engineer",
  "de":            "data engineer",
  "fe":            "frontend developer",
  "fe dev":        "frontend developer",
  "fe developer":  "frontend developer",
  "fe engineer":   "frontend developer",
  "frontend dev":  "frontend developer",
  "frontend engineer":"frontend developer",
  "backend dev":   "backend developer",
  "backend engineer":"backend developer",
  "be dev":        "backend developer",
  "be engineer":   "backend developer",
  "be":            "backend developer",   // Safe: short-alias check only matches at query start/end
  "fs":            "full stack developer",
  "bd":            "business development",
  "cs":            "customer success manager",
  "devops":        "devops engineer",
  "sre":           "site reliability engineer",
  "qa":            "qa engineer",
  "ba":            "business analyst",
  "biz dev":       "business development",
  "bizdev":        "business development",
  "faang":         "software engineer",
  "witch":         "software engineer",
  "saas":          "software engineer",
  // "unicorn" removed — "unicorn startup jobs" should produce kw:null + cat:Technology
  // Note: "startup" intentionally NOT here — "Junior PM at a startup" should → PM, not SE
  // "I want to work at a startup" handled by informalPatterns / FAANG-context detection
  "preipo":        "software engineer",
  "scaleup":       "software engineer",
  "seriesa":       "software engineer",
  "bootstrapped":  "software engineer",
  "greenfield":    "software developer",
  "brownfield":    "software developer",
  // "fortune500" intentionally not mapped — "Fortune 500 product manager" should yield "product manager" not SE
  "big 4":         "management consultant",
  "mbb":           "management consultant",
  "big four":      "management consultant",
  // Specific consultant roles — longer aliases must sort before "consultant" (generic)
  "management consultant": "management consultant",
  "strategy consultant":   "strategy consultant",
  "strategic consultant":  "strategy consultant",
  "business consultant":   "business consultant",
  "it consultant":         "it consultant",
  "tech consultant":       "tech consultant",
  "technology consultant": "technology consultant",
  "financial consultant":  "financial consultant",
  "hr consultant":         "hr consultant",
  "marketing consultant":  "marketing consultant",
  "legal consultant":      "attorney",
  "lactation consultant": "lactation consultant",
  "breastfeeding consultant": "lactation consultant",
  "consultant":            "management consultant",
  "consulting":            "management consultant",
  // Note: individual consulting firm names (deloitte, mckinsey, etc.) are handled
  // by the company-name extraction block — NOT aliases — so company-specific searches
  // like "Jobs at Deloitte" extract the company name as keyword rather than a generic role.
  "doc":           "doctor",
  "md":            "physician",
  "rn":            "registered nurse",
  "np":            "nurse practitioner",
  "cpa":           "accountant",
  "chief financial officer": "chief financial officer",
  "chief information officer": "chief information officer",
  "chief executive officer": "chief executive officer",
  "chief operating officer": "chief operating officer",
  "chief marketing officer": "chief marketing officer",
  "chief people officer": "chief people officer",
  "chief product officer": "chief product officer",
  "chief technology officer": "chief technology officer",
  "chief revenue officer": "chief revenue officer",
  "chief growth officer": "chief growth officer",
  "chief human resources officer": "chief human resources officer",
  "chief data officer": "chief data officer",
  "chief analytics officer": "chief analytics officer",
  "cfo":           "chief financial officer",
  "cio":           "chief information officer",
  "ceo":           "chief executive officer",
  "coo":           "chief operating officer",
  "cmo":           "chief marketing officer",
  "cto":           "chief technology officer",
  "cpo":           "chief product officer",
  "cro":           "chief revenue officer",
  "chro":          "chief human resources officer",
  "cdo":           "chief data officer",
  "cao":           "chief analytics officer",
  "hr business partner": "hr business partner",
  "human resources business partner": "hr business partner",
  "hrbp":          "hr business partner",
  "people operations manager": "hr manager",
  "people operations director": "hr manager",
  "people operations": "hr manager",
  "people ops manager": "hr manager",
  "people ops":    "hr manager",
  "solutions architect": "solutions architect",
  "solutions arch":  "solutions architect",
  "solutions engineer": "solutions engineer",
  "presales engineer": "sales engineer",
  "pre sales engineer": "sales engineer",
  "presales consultant": "sales engineer",
  "cloud architect": "cloud architect",
  "hr business partner": "hr business partner",
  "hr generalist": "hr generalist",
  "hr coordinator": "hr coordinator",
  "hr specialist": "hr specialist",
  "hr analyst":    "hr analyst",
  "hr director":   "hr director",
  "hr manager":    "hr manager",
  "hr":            "hr manager",
  "hris analyst":  "hr analyst",
  "hris manager":  "hr manager",
  "hris specialist": "hr specialist",
  "benefits specialist": "benefits specialist",
  "benefits administrator": "benefits specialist",
  "benefits manager": "benefits manager",
  "compensation analyst": "compensation analyst",
  "compensation manager": "compensation manager",
  "compensation specialist": "compensation analyst",
  "payroll specialist": "payroll specialist",
  "payroll manager": "payroll manager",
  "payroll analyst": "payroll specialist",
  "office manager": "office manager",
  "office administrator": "office administrator",
  "bookkeeper":    "accountant",
  "air traffic controller": "air traffic controller",
  "financial controller": "financial controller",
  "controller":    "financial controller",
  "treasurer":     "treasurer",
  "accounts payable specialist": "accounts payable specialist",
  "accounts payable manager": "accounts payable specialist",
  "accounts payable coordinator": "accounts payable specialist",
  "accounts receivable specialist": "accounts receivable specialist",
  "accounts receivable manager": "accounts receivable specialist",
  "accounts receivable coordinator": "accounts receivable specialist",
  "accounts payable": "accountant",
  "accounts receivable": "accountant",
  "ap specialist":  "accounts payable specialist",
  "ar specialist":  "accounts receivable specialist",
  "policy analyst": "policy analyst",
  "policy advisor": "policy analyst",
  "city planner":  "city planner",
  "urban planner": "city planner",
  "land use planner": "city planner",
  "community manager": "community manager",
  "community developer": "community manager",
  "developer relations": "developer advocate",
  "developer advocate": "developer advocate",
  "developer evangelist": "developer advocate",
  "technical evangelist": "developer advocate",
  "devrel":        "developer advocate",
  "dev advocate":  "developer advocate",
  "embedded systems engineer": "embedded engineer",
  "embedded software engineer": "embedded engineer",
  "embedded engineer": "embedded engineer",
  "firmware engineer": "embedded engineer",
  "hardware engineer": "hardware engineer",
  "fpga engineer": "fpga engineer",
  "fpga developer": "fpga engineer",
  "asic engineer": "asic engineer",
  "asic designer": "asic engineer",
  "rf engineer":   "hardware engineer",
  "talentops":     "talent acquisition specialist",
  "talent acquisition manager": "recruiter",
  "talent acquisition director": "recruiter",
  "talent acquisition specialist": "recruiter",
  "talent acquisition": "recruiter",
  "talent partner":  "recruiter",
  "talent manager":  "recruiter",
  "relationship manager": "relationship manager",
  "client relationship manager": "relationship manager",
  "customer relationship manager": "relationship manager",
  "customer success manager": "customer success manager",
  "customer experience manager": "customer experience manager",
  "customer experience": "customer experience manager",
  "customer success":"customer success manager",
  "csm":           "customer success manager",
  "customer service representative": "customer service representative",
  "customer service": "customer service representative",
  "call center":   "customer service representative",
  "call centre":   "customer service representative",
  "real estate broker": "real estate broker",
  "real estate agent": "real estate agent",
  "real estate manager": "real estate agent",
  "real estate":   "real estate agent",
  "realtor":       "real estate agent",
  "leasing consultant": "leasing manager",
  "leasing manager":  "leasing manager",
  "leasing director": "leasing manager",
  "leasing agent":   "real estate agent",
  "title officer": "real estate agent",
  "title examiner": "real estate agent",
  "mortgage loan officer": "loan officer",
  "mortgage broker": "mortgage broker",
  "loan originator": "loan officer",
  "insurance underwriter": "insurance underwriter",
  "mortgage underwriter": "insurance underwriter",
  "loan underwriter": "insurance underwriter",
  "underwriter":     "insurance underwriter",
  "insurance broker": "insurance broker",
  "insurance agent": "insurance agent",
  "claims adjuster": "claims adjuster",
  "claims analyst": "claims adjuster",
  "property manager": "property manager",
  "property management": "property manager",
  "front desk agent": "front desk agent",
  "front desk":    "front desk agent",
  "ux writer":     "ux writer",
  "ui writer":     "ux writer",
  "ae":            "account executive",
  "business development representative": "sales representative",
  "sales development representative": "sales development representative",
  "sales development rep": "sales development representative",
  "sdr":           "sales development representative",
  "bdr":           "sales development representative",
  "inside sales representative": "inside sales representative",
  "outside sales representative": "outside sales representative",
  "inside sales rep": "inside sales representative",
  "outside sales rep": "outside sales representative",
  "inside sales":  "inside sales representative",
  "outside sales": "outside sales representative",
  "enterprise sales": "enterprise account executive",
  "enterprise account executive": "enterprise account executive",
  "major accounts": "account executive",
  "named accounts": "account executive",
  // Tech skills → canonical roles
  "excel":         "data analyst",
  "python":        "python developer",
  "javascript":    "javascript developer",
  "typescript":    "typescript developer",
  "react":         "react developer",
  "angular":       "angular developer",
  "vue":           "vue developer",
  "java":          "java developer",
  "golang":        "golang developer",
  "rust":          "rust developer",
  "ruby on rails developer": "ruby on rails developer",
  "ruby on rails engineer": "ruby on rails developer",
  "ruby on rails":  "ruby on rails developer",
  "ror":           "ruby on rails developer",
  "ruby":          "ruby developer",
  "ios app developer": "ios developer",
  "swift developer": "swift developer",
  "swift engineer":  "swift developer",
  "swift":         "ios developer",
  "mobile app developer": "mobile developer",
  "app developer": "mobile developer",
  "kotlin developer": "android developer",
  "kotlin engineer":  "android developer",
  "kotlin":        "android developer",
  "flutter developer": "flutter developer",
  "flutter engineer": "flutter developer",
  "flutter":       "flutter developer",
  "nodejs":        "node developer",
  "node.js":       "node developer",
  "node":          "node developer",
  "machine learning":"machine learning engineer",
  // Normalized language aliases (after pre-processing)
  "cplusplus":     "c++ developer",
  "csharp":        "c# developer",
  "dotnet":        ".net developer",
  "reactjs":       "react developer",
  "vuejs":         "vue developer",
  "nextjs":        "next.js developer",
  "django":        "python developer",
  "flask":         "python developer",
  "rails":         "ruby developer",
  "spring":        "java developer",
  // QA / Testing
  "qe":            "qa engineer",
  "sdet":          "qa engineer",
  "test engineer": "qa engineer",
  "automation tester": "qa engineer",
  "automation engineer": "automation engineer",
  "test automation engineer": "qa engineer",
  "quality assurance engineer": "qa engineer",
  "quality assurance": "qa engineer",
  "quality engineer": "qa engineer",
  "tester":        "qa engineer",
  // Data / Analytics
  "analytics engineer": "analytics engineer",
  "dbt developer":  "analytics engineer",
  "dbt engineer":   "analytics engineer",
  "data platform engineer": "data engineer",
  "databricks engineer": "data engineer",
  "snowflake engineer": "data engineer",
  // Data architecture — specific beats "data" → "data analyst"
  "master data management analyst": "data governance analyst",
  "data steward manager": "data governance analyst",
  "data governance manager": "data governance manager",
  "data governance analyst": "data governance analyst",
  "data steward":   "data governance analyst",
  "data quality manager": "data governance manager",
  "data quality analyst": "data analyst",
  "data architect":  "data architect",
  "master data management": "data architect",
  // BI tools as developer roles beat bare tool name → "data analyst"
  "power bi developer": "business intelligence analyst",
  "power bi analyst": "business intelligence analyst",
  "tableau developer": "bi developer",
  "tableau analyst": "bi developer",
  "looker developer": "business intelligence analyst",
  "looker analyst":  "business intelligence analyst",
  "business intelligence analyst": "business intelligence analyst",
  "business intelligence engineer": "business intelligence analyst",
  "business intelligence": "business intelligence analyst",
  "bi analyst":    "business intelligence analyst",
  "bi engineer":   "business intelligence analyst",
  "business intelligence developer": "bi developer",
  "power bi developer": "bi developer",
  "power bi analyst": "bi developer",
  "looker developer": "bi developer",
  "looker analyst":  "bi developer",
  "bi developer":   "bi developer",
  "bi analyst":     "bi developer",
  // IT support / security variants
  "it support specialist": "it support specialist",
  "it support":    "it support specialist",
  "help desk":     "it support specialist",
  "helpdesk":      "it support specialist",
  "service desk":  "it support specialist",
  "desktop support": "it support specialist",
  "technical support specialist": "it support specialist",
  "linux administrator": "systems administrator",
  "windows administrator": "systems administrator",
  "unix administrator": "systems administrator",
  "pen tester":    "security engineer",
  "penetration tester": "security engineer",
  "pentester":     "security engineer",
  "pen test":      "security engineer",
  "ethical hacker":"security engineer",
  "growth hacker":           "growth marketer",
  "growth marketing":        "growth marketer",
  "marketing ops":           "marketing operations manager",
  "marketing operations":    "marketing operations manager",
  "marketing technology":    "marketing technology manager",
  "oil and gas engineer":    "petroleum engineer",
  "oil and gas":             "petroleum engineer",
  "hacker":        "security engineer",
  "soc analyst":   "security analyst",
  "soc engineer":  "security analyst",
  "chief information security officer": "chief information security officer",
  "ciso":          "chief information security officer",
  "chief information security officer": "chief information security officer",
  "information security analyst": "security analyst",
  "information security manager": "security engineer",
  "cybersecurity analyst": "security analyst",
  "cybersecurity": "security engineer",
  // Advanced security roles
  "malware analyst": "security analyst",
  "malware reverse engineer": "security analyst",
  "threat intelligence analyst": "security analyst",
  "threat analyst": "security analyst",
  "incident response engineer": "security engineer",
  "incident responder": "security engineer",
  "vulnerability analyst": "security analyst",
  "security operations engineer": "security engineer",
  "security architect": "security architect",
  "cloud security architect": "security architect",
  "cloud security engineer": "cloud security engineer",
  "application security engineer": "application security engineer",
  "appsec engineer": "application security engineer",
  "appsec engineer": "security engineer",
  "devsecops engineer": "devsecops engineer",
  "devsecops":     "devsecops engineer",
  // LLM / Generative AI roles
  "llm engineer":  "machine learning engineer",
  "llm":           "machine learning engineer",
  "prompt engineer": "prompt engineer",
  "prompt engineering": "prompt engineer",
  "generative ai": "machine learning engineer",
  "gen ai":        "machine learning engineer",
  "genai":         "machine learning engineer",
  "ai engineer":   "machine learning engineer",
  "ai ml engineer": "machine learning engineer",
  "ai safety":     "machine learning engineer",
  "ai safety researcher": "research scientist",
  "ai researcher": "research scientist",
  "ai scientist":  "research scientist",
  // Medical specialist → specific title (better for job search)
  "cardiologist":  "cardiologist",
  "psychiatrist":  "psychiatrist",
  "dermatologist": "dermatologist",
  "neurologist":   "neurologist",
  "oncologist":    "oncologist",
  "pediatrician":  "pediatrician",
  "gynecologist":  "gynecologist",
  "urologist":     "urologist",
  "anesthesiologist":"anesthesiologist",
  "ophthalmologist":"ophthalmologist",
  "orthodontist":  "orthodontist",
  "rheumatologist":"rheumatologist",
  "endocrinologist":"endocrinologist",
  "gastroenterologist":"doctor",
  "nephrologist":  "doctor",
  "hematologist":  "doctor",
  "respiratory therapist": "respiratory therapist",
  "occupational health":   "occupational therapist",
  "licensed clinical social worker": "clinical social worker",
  "clinical social worker": "clinical social worker",
  "licensed professional counselor": "therapist",
  "licensed mental health counselor": "therapist",
  "mental health counselor": "mental health counselor",
  "mental health therapist": "mental health counselor",
  "marriage and family therapist": "therapist",
  "behavioral therapist": "therapist",
  "play therapist":  "therapist",
  "art therapist":   "therapist",
  "substance abuse counselor": "substance abuse counselor",
  "addiction counselor": "substance abuse counselor",
  "drug and alcohol counselor": "substance abuse counselor",
  "behavioral health counselor": "mental health counselor",
  "mental health therapist": "mental health counselor",
  "grief counselor": "therapist",
  "social worker": "social worker",
  "lcsw":          "clinical social worker",
  "lpc":           "mental health counselor",
  "mft":           "therapist",
  "case manager":  "case manager",
  "case worker":   "social worker",
  "child welfare specialist": "social worker",
  "child welfare coordinator": "social worker",
  "family services coordinator": "social worker",
  "family services worker": "social worker",
  // Medical billing / coding / records
  "prior authorization specialist": "medical billing specialist",
  "prior auth specialist": "medical billing specialist",
  "medical billing specialist": "medical billing specialist",
  "medical billing coordinator": "medical billing specialist",
  "medical coder":  "medical coder",
  "medical coding specialist": "medical billing specialist",
  "health information manager": "health information manager",
  "health information director": "health information manager",
  "health information specialist": "medical billing specialist",
  "medical records specialist": "medical billing specialist",
  "medical records coordinator": "medical billing specialist",
  "medical records": "medical billing specialist",
  "patient care coordinator": "patient care coordinator",
  "patient care manager": "patient care coordinator",
  "patient coordinator": "patient care coordinator",
  "patient navigator": "patient care coordinator",
  // Nursing - additional abbreviations
  "bsn":           "registered nurse",
  "msn":           "registered nurse",
  "charge nurse":  "registered nurse",
  "staff nurse":   "registered nurse",
  "pediatric nurse": "registered nurse",
  "oncology nurse": "registered nurse",
  "medical device engineer": "medical device engineer",
  "medical sales representative": "medical sales representative",
  "medical sales rep": "medical sales representative",
  "pharmaceutical sales representative": "pharmaceutical sales representative",
  "pharmaceutical sales rep": "pharmaceutical sales representative",
  "healthcare administrator": "healthcare administrator",
  "hospital administrator": "healthcare administrator",
  "biomedical engineer": "biomedical engineer",
  "clinical engineer": "clinical engineer",
  "orthopedic surgeon": "surgeon",
  "orthopedic":    "surgeon",
  // Medical imaging / radiology
  "radiology technician": "radiology technician",
  "radiologic technologist": "radiology technician",
  "x-ray technician": "radiology technician",
  "x ray technician": "radiology technician",
  "mri technician": "mri technician",
  "mri technologist": "mri technician",
  "mri tech":      "mri technician",
  "ct technician": "ct technician",
  "ct technologist": "ct technician",
  "ultrasound technician": "ultrasound technician",
  "ultrasound technologist": "ultrasound technician",
  "sonographer":   "ultrasound technician",
  "nuclear medicine technologist": "nuclear medicine technologist",
  "nuclear medicine tech": "nuclear medicine technologist",
  "sleep technologist": "sleep technologist",
  "polysomnographic technologist": "sleep technologist",
  "sleep tech":       "sleep technologist",
  "radiation therapist": "radiation therapist",
  // Data engineering — specific beats generic "warehouse" alias
  "data warehouse engineer": "data engineer",
  "data warehouse analyst": "data engineer",
  "data warehouse developer": "data engineer",
  "etl engineer":  "data engineer",
  "etl developer": "data engineer",
  "etl analyst":   "data engineer",
  // Database engineering — specific beats "sql":"data analyst"
  "sql developer": "database administrator",
  "sql server developer": "database administrator",
  "database engineer": "database administrator",
  "database developer": "database developer",
  "nosql developer": "database administrator",
  // Product roles
  "product owner": "product owner",
  "product lead":  "product manager",
  // Design systems
  "design systems engineer": "ux designer",
  "design technologist": "ux designer",
  "design engineer": "ux designer",
  // 3D / creative tech
  "3d modeler":    "3d artist",
  "3d animator":   "3d artist",
  "3d artist":     "3d artist",
  "3d designer":   "3d artist",
  "cad designer":  "cad designer",
  "cad engineer":  "cad designer",
  "autocad designer": "cad designer",
  "autocad engineer": "cad designer",
  "solidworks designer": "cad designer",
  "solidworks engineer": "cad designer",
  // ML specialties
  "deep learning researcher": "machine learning engineer",
  "deep learning engineer": "machine learning engineer",
  "reinforcement learning engineer": "machine learning engineer",
  "nlp scientist": "research scientist",
  "nlp researcher": "research scientist",
  "nlp engineer":  "nlp engineer",
  "nlp scientist": "nlp engineer",
  "computer vision researcher": "computer vision engineer",
  "computer vision engineer": "computer vision engineer",
  "computer vision scientist": "computer vision engineer",
  "cv engineer":   "machine learning engineer",
  // Analytics management
  "analytics manager": "analytics manager",
  "head of analytics": "data analyst",
  // Renewable energy
  "wind turbine technician": "wind turbine technician",
  "wind energy technician": "wind turbine technician",
  "solar panel installer": "solar installer",
  "solar technician": "solar installer",
  "energy analyst": "energy analyst",
  "energy engineer": "energy analyst",
  // Back-end / API skills → role
  "graphql":       "backend developer",
  "mongodb":       "backend developer",
  "postgresql":    "backend developer",
  "redis":         "backend developer",
  "kafka":         "data engineer",
  "elasticsearch": "backend developer",
  // API / Integration engineering
  "api engineer":   "software engineer",
  "integration engineer": "integration engineer",
  "integration developer": "integration engineer",
  "platform engineer": "platform engineer",
  "platform developer": "platform engineer",
  "backend api engineer": "software engineer",
  "api developer":  "software developer",
  "integration developer": "software developer",
  // Game development
  "game engineer":  "game developer",
  "unity developer": "game developer",
  "unreal engine developer": "game developer",
  "unreal developer": "game developer",
  "game designer":  "game designer",
  "level designer": "game designer",
  "game artist":    "game artist",
  // Bioinformatics / computational biology
  "computational biologist": "bioinformatics scientist",
  "genomics researcher": "bioinformatics scientist",
  "bioinformatics engineer": "bioinformatics scientist",
  "bioinformatics analyst": "bioinformatics scientist",
  "computational scientist": "bioinformatics scientist",
  "genomics scientist": "bioinformatics scientist",
  "bioinformatician": "bioinformatics scientist",
  "bioinformatics": "bioinformatics scientist",
  "genomics":       "bioinformatics scientist",
  // Seniority-qualified "engineer" → software engineer (lone "engineer" handled by stopword in fallback)
  "senior engineer":    "software engineer",
  "lead engineer":      "software engineer",
  "principal engineer": "principal engineer",
  "staff engineer":     "staff engineer",
  "senior developer":   "software developer",
  "senior software engineer": "software engineer",
  // Level-based engineer aliases (Amazon L4/L5, Google L3/L4/L5, Meta E4/E5, etc.)
  "l3 engineer": "software engineer",
  "l4 engineer": "software engineer",
  "l5 engineer": "software engineer",
  "l6 engineer": "software engineer",
  "e3 engineer": "software engineer",
  "e4 engineer": "software engineer",
  "e5 engineer": "software engineer",
  "e6 engineer": "software engineer",
  "ic3 engineer": "software engineer",
  "ic4 engineer": "software engineer",
  "ic5 engineer": "software engineer",
  // Cloud / DevOps skills — specific architecture roles beat generic "cloud engineer"
  "aws solutions architect": "aws solutions architect",
  "aws cloud architect":     "aws solutions architect",
  "aws architect":           "aws solutions architect",
  "azure solutions architect": "solutions architect",
  "azure cloud architect":   "cloud architect",
  "azure architect":         "cloud architect",
  "gcp solutions architect": "solutions architect",
  "gcp architect":           "cloud architect",
  "gcp cloud architect":     "cloud architect",
  "aws":           "cloud engineer",
  "azure":         "cloud engineer",
  "gcp":           "cloud engineer",
  "kubernetes":    "devops engineer",
  "k8s":           "devops engineer",
  "docker":        "devops engineer",
  "terraform":     "devops engineer",
  "jenkins":       "devops engineer",
  "ansible":       "devops engineer",
  "ci cd engineer": "devops engineer",
  "cicd engineer": "devops engineer",
  "ci/cd engineer": "devops engineer",
  "build engineer": "devops engineer",
  "release engineer": "devops engineer",
  // Data / ML skills
  "sql":           "data analyst",
  "tableau":       "data analyst",
  "power bi":      "data analyst",
  "tensorflow":    "machine learning engineer",
  "pytorch":       "machine learning engineer",
  "spark":         "data engineer",
  "hadoop":        "data engineer",
  // Domains
  "smart contract developer": "blockchain developer",
  "smart contract engineer": "blockchain developer",
  "solidity developer": "blockchain developer",
  "solidity engineer": "blockchain developer",
  "web3 developer": "blockchain developer",
  "web3 engineer": "blockchain developer",
  "ar vr developer": "ar vr developer",
  "vr developer":  "ar vr developer",
  "ar developer":  "ar vr developer",
  "xr developer":  "ar vr developer",
  "xr engineer":   "ar vr developer",
  "metaverse developer": "ar vr developer",
  "metaverse engineer": "ar vr developer",
  "crypto":        "blockchain developer",
  "blockchain":    "blockchain developer",
  "web3":          "blockchain developer",
  "nft":           "blockchain developer",
  "defi":          "blockchain developer",
  "environmental scientist": "environmental scientist",
  "environmental consultant": "environmental scientist",
  "environmental specialist": "environmental scientist",
  "climate scientist": "environmental scientist",
  "climate analyst": "environmental scientist",
  "environmental engineer": "environmental engineer",
  "environmental": "environmental engineer",
  "civil engineer": "civil engineer",
  "mechanical engineer": "mechanical engineer",
  "electrical engineer": "electrical engineer",
  "chemical engineer": "chemical engineer",
  "structural engineer": "structural engineer",
  "geotechnical engineer": "civil engineer",
  "geotechnical specialist": "civil engineer",
  "land surveyor": "land surveyor",
  "surveying technician": "land surveyor",
  "aerospace engineer": "aerospace engineer",
  "biomedical engineer": "biomedical engineer",
  "manufacturing engineer": "manufacturing engineer",
  "process engineer": "process engineer",
  "industrial engineer": "industrial engineer",
  "systems engineer": "systems engineer",
  "reliability engineer": "reliability engineer",
  "vlsi engineer":  "vlsi engineer",
  "vlsi designer":  "vlsi engineer",
  "chip designer":  "vlsi engineer",
  "semiconductor engineer": "vlsi engineer",
  "embedded engineer": "embedded engineer",
  "firmware engineer": "embedded engineer",
  "embedded systems engineer": "embedded engineer",
  "network engineer": "network engineer",
  "wireless engineer": "network engineer",
  "telecom engineer": "network engineer",
  "sustainability":"sustainability manager",
  "greentech":     "sustainability manager",
  "green energy":  "sustainability manager",
  "clean energy":  "sustainability manager",
  "renewable energy engineer": "renewable energy engineer",
  "solar engineer":  "renewable energy engineer",
  "wind engineer":   "renewable energy engineer",
  "wind energy engineer": "renewable energy engineer",
  "solar developer":  "renewable energy engineer",
  "energy engineer":  "renewable energy engineer",
  "renewable energy": "sustainability manager",
  "green tech":    "sustainability manager",
  // Action-form → canonical role
  "coaching":      "coach",
  // Word form aliases — EXACT-MATCH only (or very specific phrases, not prefixes of longer role names)
  "nursing":       "registered nurse",
  "accounting":    "accountant",
  "teaching":      "teacher",
  "driving":       "driver",
  "coding":        "software developer",
  "project management":"project manager",
  "product management":"product manager",
  "cybersecurity": "security engineer",
  "information security":"security engineer",
  "content writing":"content writer",
  "working with data":"data scientist",
  "love data":     "data scientist",
  "data engineering": "data engineer",
  "data entry specialist": "data entry specialist",
  "data entry clerk": "data entry specialist",
  "data entry analyst": "data entry specialist",
  "data entry clerk":  "data entry",
  "data entry":    "data entry",
  "data":          "data analyst",
  "data analysis": "data analyst",
  "data scientist":"data scientist",
  "data engineer": "data engineer",
  "data science":  "data scientist",
  "data analytics":"data analyst",
  "data analyst":  "data analyst",
  // Specific analyst types — must come before bare "analyst" in any future handling
  "business analyst": "business analyst",
  "business systems analyst": "business analyst",
  "financial analyst": "financial analyst",
  "investment analyst": "financial analyst",
  "operations analyst": "operations analyst",
  "systems analyst": "systems analyst",
  "marketing analyst": "marketing analyst",
  "hr analyst":    "hr analyst",
  "procurement analyst": "procurement analyst",
  "supply chain analyst": "supply chain analyst",
  "reporting analyst": "data analyst",
  "web development":"web developer",
  // Tech-stack compound roles — specific tech wins over generic backend/frontend
  "python backend developer": "python developer",
  "python backend engineer": "python developer",
  "python full stack developer": "python developer",
  "react frontend developer": "react developer",
  "react frontend engineer": "react developer",
  "react backend developer": "react developer",
  "react native developer": "mobile developer",
  "vue frontend developer": "vue developer",
  "angular frontend developer": "angular developer",
  "node backend developer": "node developer",
  "golang backend developer": "golang developer",
  "java backend developer": "java developer",
  "java backend engineer": "java developer",
  "typescript backend developer": "typescript developer",
  "typescript frontend developer": "typescript developer",
  "director of product management": "director of product",
  "director of product": "director of product",
  "vp of product management": "vp of product",
  "head of product management": "head of product",
  // Marketing specialties — specific beats generic "marketing manager"
  "digital marketing specialist": "digital marketing specialist",
  "digital marketing manager": "digital marketing manager",
  "performance marketing manager": "performance marketing manager",
  "performance marketing specialist": "performance marketing specialist",
  "affiliate marketing manager": "affiliate marketing manager",
  "affiliate marketer": "affiliate marketing manager",
  "influencer marketing manager": "influencer marketing manager",
  "email marketing specialist": "email marketing specialist",
  "email marketing manager": "email marketing manager",
  "content marketing manager": "content marketing manager",
  "content marketing specialist": "content marketing specialist",
  "growth marketing manager": "growth marketer",
  "demand generation manager": "demand generation manager",
  "demand generation specialist": "demand generation manager",
  "demand gen manager": "demand generation manager",
  "demand gen":     "demand generation manager",
  "marketing coordinator": "marketing coordinator",
  "marketing specialist": "marketing specialist",
  "marketing analyst": "marketing analyst",
  "mktg":          "marketing manager",
  "marketing":     "marketing manager",
  "mktg manager":  "marketing manager",
  "eng manager":   "engineering manager",
  "finance analyst":"financial analyst",
  "finance manager":"financial manager",
  "finance technology engineer": "software engineer",
  "finance technology developer": "software developer",
  "financial technology engineer": "software engineer",
  "financial technology developer": "software developer",
  "fintech engineer": "software engineer",
  "fintech developer": "software developer",
  "edtech engineer": "software engineer",
  "edtech developer": "software developer",
  "healthtech engineer": "software engineer",
  "health tech engineer": "software engineer",
  "insurtech engineer": "software engineer",
  "it engineer":   "software engineer",
  "it director":   "it director",
  "it manager":    "it manager",
  "it administrator": "systems administrator",
  "systems administrator": "systems administrator",
  "system administrator": "systems administrator",
  "systems admin": "systems administrator",
  "system admin":  "systems administrator",
  "sysadmin":      "systems administrator",
  "sys admin":     "systems administrator",
  "network administrator": "network administrator",
  "network admin": "network administrator",
  "database administrator": "database administrator",
  "database admin": "database administrator",
  "dba":           "database administrator",
  "director of sales": "director of sales",
  "director of marketing": "director of marketing",
  "director of finance": "director of finance",
  "director of engineering": "director of engineering",
  "director of product": "director of product",
  "director of data": "head of data",
  "director of hr":  "hr director",
  "director of customer success": "director of customer success",
  "director of operations": "director of operations",
  "head of engineering": "head of engineering",
  "head of product": "head of product",
  "head of sales": "head of sales",
  "head of marketing": "head of marketing",
  "head of finance": "chief financial officer",
  "head of legal": "attorney",
  "head of hr":    "hr director",
  "head of people": "hr director",
  "head of growth": "growth marketer",
  "head of data":  "data scientist",
  "head of design": "head of design",
  "vp of engineering": "vp of engineering",
  "vp of product": "vp of product",
  "vp of sales":   "vp of sales",
  "vp of marketing": "vp of marketing",
  "vp of finance": "chief financial officer",
  "vp of hr":      "chief human resources officer",
  "vp of people":  "chief human resources officer",
  "vp of data":    "vp of data",
  "vp of customer success": "vp of customer success",
  "vp of operations": "vp of operations",
  "vp of clinical operations": "clinical operations manager",
  "growth manager":"growth marketer",
  // Tech-language developers — use normalized forms (preprocessing converts c++ → cplusplus etc.)
  "cplusplus developer": "software developer",
  "cplusplus engineer": "software engineer",
  "csharp developer": "software developer",
  "csharp engineer": "software engineer",
  "dotnet developer": "software developer",
  "dotnet engineer": "software engineer",
  "aspnet developer": "software developer",
  "cobol developer": "software developer",
  "fortran developer": "software developer",
  "perl developer": "software developer",
  "r developer":   "data scientist",
  "matlab developer": "software developer",
  // Sales specialties
  "tech sales":    "sales representative",
  "technology sales": "sales representative",
  "software sales": "sales representative",
  "saas sales":    "sales representative",
  "med sales":     "medical sales representative",
  "medical sales": "medical sales representative",
  "pharma sales":  "pharmaceutical sales representative",
  "pharmaceutical sales": "pharmaceutical sales representative",
  "drug rep":      "pharmaceutical sales representative",
  "drug sales":    "pharmaceutical sales representative",
  "sales person":  "sales representative",
  "salesperson":   "sales representative",
  "sales rep":     "sales representative",
  // Standalone role words (after titlePattern fails to match a qualified form)
  // Note: "developer" NOT here — it's too common in role names and fires incorrectly in "python developer".
  // Instead "developer" → "software developer" is handled by informalPatterns + fallback alias check.
  "backend":        "backend developer",
  "frontend":       "frontend developer",
  "fullstack":      "full stack developer",
  "mobile":         "mobile developer",
  // Front-end / back-end informal
  "front end developer": "frontend developer",
  "front end engineer": "frontend developer",
  "front end dev":  "frontend developer",
  "back end developer": "backend developer",
  "back end engineer": "backend developer",
  "backend dev":    "backend developer",
  "back end dev":   "backend developer",
  "full stack dev": "full stack developer",
  "fullstack dev":  "full stack developer",
  "react dev":      "react developer",
  "react developer":"react developer",
  "node dev":       "node developer",
  "python dev":     "python developer",
  "ios dev":        "ios developer",
  "android dev":    "android developer",
  // Healthcare — clinical research / lab roles
  "clinical data manager": "clinical data manager",
  "clinical data analyst": "clinical data manager",
  "clinical research coordinator": "clinical research coordinator",
  "clinical research associate": "clinical research associate",
  "clinical research manager": "clinical research manager",
  "clinical research scientist": "clinical research scientist",
  "clinical trial coordinator": "clinical research coordinator",
  "clinical trial manager": "clinical research coordinator",
  "lab researcher": "lab researcher",
  "lab technician": "lab technician",
  "laboratory technician": "lab technician",
  "medical laboratory scientist": "medical laboratory scientist",
  "clinical laboratory scientist": "medical laboratory scientist",
  "lab scientist":  "medical laboratory scientist",
  "laboratory scientist": "medical laboratory scientist",
  "principal researcher": "research scientist",
  "staff researcher": "research scientist",
  "applied scientist": "research scientist",
  "applied researcher": "research scientist",
  "research engineer": "research scientist",
  "research director": "research scientist",
  "postdoctoral researcher": "research scientist",
  "postdoctoral associate": "research scientist",
  "postdoctoral fellow": "research scientist",
  "research fellow":  "research scientist",
  "postdoc":          "research scientist",
  "research associate": "research associate",
  "research coordinator": "research coordinator",
  "research scientist": "research scientist",
  "research analyst": "research analyst",
  // Healthcare — specific roles before generic "nurse" alias
  "nurse practitioner": "nurse practitioner",
  "family nurse practitioner": "nurse practitioner",
  "pediatric nurse practitioner": "nurse practitioner",
  "acute care nurse practitioner": "nurse practitioner",
  "psychiatric nurse practitioner": "nurse practitioner",
  "veterinary technician": "veterinary technician",
  "veterinary assistant": "veterinary technician",
  "vet technician": "veterinary technician",
  "vet tech":       "veterinary technician",
  "vet assistant":  "veterinary technician",
  // Pest control / specialty trades
  "pest control technician": "pest control technician",
  "pest control":   "pest control technician",
  "exterminator":   "pest control technician",
  // Construction — specific beats bare "construction"
  "construction manager": "construction manager",
  "construction superintendent": "construction superintendent",
  "construction project manager": "construction manager",
  "general contractor": "general contractor",
  "sub contractor": "general contractor",
  "subcontractor":  "general contractor",
  // Healthcare — nurse variants
  "nurse":          "registered nurse",
  "crna":           "nurse anesthetist",
  "lpn":            "licensed practical nurse",
  "licensed practical nurse": "licensed practical nurse",
  "cna":            "certified nursing assistant",
  "certified nursing assistant": "certified nursing assistant",
  "ot":             "occupational therapist",
  "pta":            "physical therapist",
  "pa":             "physician assistant",
  "md":             "physician",
  "do":             "physician",
  "np":             "nurse practitioner",
  "emt":            "paramedic",
  "paramedic":      "paramedic",
  "physical therapy assistant": "physical therapist",
  "occupational therapy assistant": "occupational therapist",
  "physical therapy":"physical therapist",
  "occupational therapy":"occupational therapist",
  "speech language pathologist": "speech therapist",
  "speech therapist": "speech therapist",
  "speech therapy": "speech therapist",
  "pharmacy manager": "pharmacy manager",
  "pharmacy director": "pharmacy manager",
  "pharmacy":       "pharmacist",
  "pharmacy technician": "pharmacy technician",
  "pharm tech":     "pharmacy technician",
  "icu nurse":      "icu nurse",
  "intensive care nurse": "icu nurse",
  "er nurse":       "emergency room nurse",
  "emergency room nurse": "emergency room nurse",
  "emergency nurse": "emergency room nurse",
  "pediatric nurse": "pediatric nurse",
  "nicu nurse":     "nicu nurse",
  "labor and delivery nurse": "labor and delivery nurse",
  "travel nurse":   "registered nurse",
  "surgical nurse": "registered nurse",
  "nurse anesthetist": "nurse anesthetist",
  // Finance — domain → role
  "investment banking": "investment banker",
  "hedge fund analyst": "hedge fund analyst",
  "hedge fund manager": "portfolio manager",
  "hedge fund":     "financial analyst",
  "portfolio manager": "portfolio manager",
  "fund manager":   "portfolio manager",
  "asset manager":  "portfolio manager",
  "investment manager": "portfolio manager",
  "private equity analyst": "private equity analyst",
  "private equity": "financial analyst",
  "venture capital analyst": "venture capital analyst",
  "venture capital":"financial analyst",
  "vc":             "financial analyst",
  "investment banker": "investment banker",
  "m&a analyst":    "investment banker",
  "quantitative researcher": "quantitative analyst",
  "quantitative analyst": "quantitative analyst",
  "quantitative developer": "quantitative analyst",
  "quant analyst":  "quantitative analyst",
  "quant researcher": "quantitative analyst",
  "quant developer": "quantitative analyst",
  "quant":          "quantitative analyst",
  "actuary":        "actuary",
  "tax accountant": "accountant",
  "auditor":        "auditor",
  // Finance — trading / advisory
  "financial advisor": "financial advisor",
  "financial planner": "financial advisor",
  "financial consultant": "financial advisor",
  "investment advisor": "financial advisor",
  "wealth advisor":  "financial advisor",
  "personal financial advisor": "financial advisor",
  "certified financial planner": "financial advisor",
  "cfp":            "financial advisor",
  "wealth management": "financial advisor",
  "private wealth management": "financial advisor",
  "private wealth": "financial advisor",
  "estate planning": "financial advisor",
  "fixed income analyst": "financial analyst",
  "portfolio analyst": "financial analyst",
  "credit analyst": "financial analyst",
  "credit manager": "credit manager",
  "credit officer": "credit manager",
  "treasury analyst": "treasury analyst",
  "treasury manager": "treasury manager",
  "treasury director": "treasury manager",
  "collections manager": "collections manager",
  "collections specialist": "collections specialist",
  "collections coordinator": "collections specialist",
  "budget analyst": "budget analyst",
  "budget manager": "budget analyst",
  "risk analyst":   "risk analyst",
  "equity research analyst": "financial analyst",
  "equity analyst": "financial analyst",
  "securities analyst": "financial analyst",
  "algo trader":    "trader",
  "algorithmic trader": "trader",
  "hft developer":  "trader",
  "hft engineer":   "trader",
  "high frequency trader": "trader",
  "market maker":   "trader",
  "prop trader":    "trader",
  "proprietary trader": "trader",
  "strat":          "quantitative analyst",
  "equity trader":  "trader",
  "stock trader":   "trader",
  "options trader": "trader",
  "forex trader":   "trader",
  "currency trader": "trader",
  "futures trader": "trader",
  "crypto trader":  "trader",
  "trader":         "trader",
  // Legal
  "law":            "attorney",
  // Note: "legal" alone is handled as an industry browse (Finance & accounting category)
  // — not mapped to "attorney" to avoid keyword overriding the industry filter
  "general counsel": "general counsel",
  "deputy general counsel": "general counsel",
  "legal counsel":   "attorney",
  "corporate counsel": "attorney",
  "in-house counsel": "attorney",
  "in house counsel": "attorney",
  "public defender": "attorney",
  "public interest attorney": "attorney",
  "criminal defense attorney": "attorney",
  "employment attorney": "attorney",
  "ip attorney":    "ip attorney",
  "intellectual property attorney": "ip attorney",
  "immigration attorney": "immigration attorney",
  "immigration lawyer": "immigration attorney",
  "patent attorney": "ip attorney",
  "trademark attorney": "ip attorney",
  "tax attorney":   "attorney",
  "trial lawyer":   "attorney",
  "litigation attorney": "attorney",
  "civil attorney": "attorney",
  "corporate attorney": "attorney",
  "litigator":       "attorney",
  "attorney":       "attorney",
  "lawyer":         "attorney",
  "aml compliance analyst": "compliance analyst",
  "kyc compliance analyst": "compliance analyst",
  "compliance manager": "compliance manager",
  "compliance analyst": "compliance analyst",
  "compliance officer":"compliance officer",
  "aml analyst":    "compliance analyst",
  "kyc analyst":    "compliance analyst",
  "bsa analyst":    "compliance analyst",
  "compliance":     "compliance officer",
  // Retail / consumer
  "retail sales associate": "retail associate",
  "retail sales rep": "retail associate",
  "retail associate": "retail associate",
  "retail manager": "retail manager",
  "retail":         "retail manager",
  "store manager":  "store manager",
  "cashier":        "cashier",
  "barista":        "barista",
  "server":         "waiter",
  "hostess":        "host",
  "host":           "host",
  "busser":         "busser",
  "dishwasher":     "dishwasher",
  "food runner":    "busser",
  // Food service / culinary
  "food and beverage manager": "food and beverage manager",
  "executive chef": "executive chef",
  "head chef":      "executive chef",
  "head cook":      "executive chef",
  "sous chef":      "sous chef",
  "pastry chef":    "pastry chef",
  "pastry cook":    "pastry chef",
  "line cook":      "line cook",
  "prep cook":      "cook",
  "cook":           "cook",
  "kitchen manager":"kitchen manager",
  // Operations / Supply chain
  "inventory control analyst": "supply chain analyst",
  "inventory analyst": "inventory analyst",
  "inventory manager": "inventory analyst",
  "supply chain director": "supply chain director",
  "supply chain analyst": "supply chain analyst",
  "supply chain coordinator": "supply chain coordinator",
  "supply chain specialist": "supply chain analyst",
  "supply chain manager": "supply chain manager",
  "supply chain":   "supply chain manager",
  "logistics coordinator": "logistics coordinator",
  "shipping coordinator": "logistics coordinator",
  "freight coordinator": "logistics coordinator",
  "logistics analyst": "logistics analyst",
  "logistics manager": "logistics manager",
  "logistics":      "logistics manager",
  "warehouse supervisor": "warehouse manager",
  "warehouse coordinator": "warehouse coordinator",
  "warehouse associate": "warehouse associate",
  "warehouse":      "warehouse manager",
  // Procurement / purchasing
  "procurement manager": "procurement manager",
  "procurement specialist": "procurement specialist",
  "purchasing manager": "purchasing manager",
  "purchasing director": "purchasing manager",
  "purchasing agent": "procurement specialist",
  "sourcing manager": "sourcing manager",
  "sourcing director": "sourcing manager",
  "sourcing specialist": "procurement specialist",
  "category manager": "category manager",
  "vendor manager":  "vendor manager",
  "vendor management": "vendor manager",
  // Safety / EHS
  "health and safety manager": "safety manager",
  "health and safety officer": "safety manager",
  "environmental health and safety manager": "ehs manager",
  "environmental health safety manager": "ehs manager",
  "ehs manager":    "ehs manager",
  "ehs specialist": "ehs manager",
  "ehs director":   "ehs manager",
  "hse manager":    "safety manager",
  "safety manager": "safety manager",
  "safety officer": "safety manager",
  "safety coordinator": "safety manager",
  // Security (physical/management) — different from cybersecurity
  "security manager": "security manager",
  "security director": "security manager",
  "security supervisor": "security manager",
  // Construction engineering
  "site engineer":   "civil engineer",
  "project engineer": "project engineer",
  "civil project engineer": "civil engineer",
  "construction engineer": "civil engineer",
  // Admin / office support
  "executive assistant": "executive assistant",
  "administrative assistant": "administrative assistant",
  "administrative coordinator": "administrative coordinator",
  "office administrator": "administrative assistant",
  "virtual assistant": "virtual assistant",
  "personal assistant": "personal assistant",
  "receptionist":   "receptionist",
  "front desk receptionist": "receptionist",
  "secretary":      "administrative assistant",
  "admin assistant": "administrative assistant",
  "office clerk":   "administrative assistant",
  // Customer service specialties — specific beats "customer service"
  "technical support engineer": "technical support specialist",
  "technical support specialist": "technical support specialist",
  "technical support analyst": "technical support specialist",
  "technical support": "technical support",
  "tech support":   "technical support",
  "support engineer": "it support specialist",
  "customer support specialist": "customer support specialist",
  "customer care specialist": "customer service representative",
  "customer care representative": "customer service representative",
  "live chat agent": "customer service representative",
  "live chat specialist": "customer service representative",
  // Banking
  "teller":         "bank teller",
  // Manufacturing / production roles
  "production manager": "production manager",
  "production supervisor": "production supervisor",
  "production coordinator": "production coordinator",
  "plant manager":  "plant manager",
  "operations supervisor": "operations supervisor",
  "quality control inspector": "quality control inspector",
  "quality control specialist": "quality control specialist",
  "quality control manager": "quality control manager",
  "quality control engineer": "quality control engineer",
  "quality control": "quality control specialist",
  "quality assurance manager": "quality assurance manager",
  "lean engineer":  "lean engineer",
  "six sigma":      "quality control specialist",
  // Facilities
  "facilities manager": "facilities manager",
  "facilities engineer": "facilities manager",
  "facilities director": "facilities manager",
  "facility manager": "facilities manager",
  "building manager": "facilities manager",
  // Safety
  "safety engineer": "safety manager",
  "safety director": "safety manager",
  // Building inspection
  "building inspector": "building inspector",
  "code inspector":   "building inspector",
  "construction inspector": "building inspector",
  // Recruiting specialties
  "talent management specialist": "recruiter",
  "talent management manager": "recruiter",
  "headhunter":     "recruiter",
  "technical recruiter": "technical recruiter",
  "executive recruiter": "recruiter",
  "corporate recruiter": "recruiter",
  "staffing coordinator": "recruiter",
  // Fleet / Transportation
  "fleet manager":  "fleet manager",
  "fleet coordinator": "fleet coordinator",
  "dispatch coordinator": "dispatch coordinator",
  "dispatch manager": "dispatch manager",
  "dispatcher":     "dispatcher",
  // Hospitality
  "hotel manager":  "hotel manager",
  "hotel general manager": "hotel manager",
  "concierge":      "concierge",
  "event coordinator": "event planner",
  "event planner":  "event planner",
  "event manager":  "event planner",
  "catering manager": "catering manager",
  "banquet coordinator": "event planner",
  "banquet manager": "banquet manager",
  // Non-profit / social impact — "grants manager" beats bare "grants"
  "grants manager": "grant manager",
  "grant writer":   "grant writer",
  "grant proposal writer": "grant writer",
  "grant proposal manager": "grant manager",
  "speechwriter":   "speechwriter",
  "speech writer":  "speechwriter",
  "grant manager":  "grant manager",
  "community outreach coordinator": "community outreach coordinator",
  "community outreach manager": "community outreach manager",
  "outreach coordinator": "outreach coordinator",
  "fundraiser":     "fundraiser",
  "development director": "development director",  // non-profit fundraising
  "program director": "program director",
  "program coordinator": "program coordinator",
  // Finance / Legal
  "banker":         "investment banker",
  "contract specialist": "contract manager",
  "contract administrator": "paralegal",
  "legal assistant": "legal assistant",
  "legal secretary": "legal secretary",
  "law clerk":       "law clerk",
  "paralegal":      "paralegal",
  // Creative / Media
  "creative director": "creative director",
  "art director":   "art director",
  "creative director of marketing": "creative director",
  "brand strategist": "brand manager",
  "brand manager":  "brand manager",
  // PR / Communications — specific beats bare "communications" (in STOP_TITLE_WORDS)
  "public relations manager": "public relations manager",
  "public relations specialist": "public relations manager",
  "public relations director": "public relations manager",
  "media relations manager": "public relations manager",
  "media relations specialist": "public relations manager",
  "media relations":  "public relations manager",
  "communications director": "communications director",
  "communications manager": "communications manager",
  "communications specialist": "communications specialist",
  "corporate communications manager": "communications manager",
  "corporate communications": "communications manager",
  "internal communications manager": "communications manager",
  "pr director":    "public relations manager",
  "pr specialist":  "public relations manager",
  "pr manager":     "public relations manager",
  "software architect": "software architect",
  "systems architect": "solutions architect",
  "application architect": "solutions architect",
  "enterprise architect": "enterprise architect",
  "ai product manager": "product manager",
  "ai pm":          "product manager",
  "ml product manager": "product manager",
  "copywriter":     "copywriter",
  "film editor":    "film editor",
  "video editor":   "video editor",
  "content editor": "editor",
  "managing editor": "editor",
  "associate editor": "editor",
  "copy editor":    "editor",
  "news editor":    "editor",
  "editor":         "editor",
  "photographer":   "photographer",
  "photojournalist": "journalist",
  "graphic artist": "graphic designer",
  "graphic illustrator": "graphic designer",
  "illustrator":    "graphic designer",
  "motion graphics designer": "motion designer",
  "motion graphics artist": "motion designer",
  "animator":       "animator",
  "videographer":   "videographer",
  "podcast":        "podcast producer",
  // Journalism / media
  "journalist":     "journalist",
  "reporter":       "journalist",
  "court reporter": "court reporter",
  "news reporter":  "journalist",
  "investigative reporter": "journalist",
  "broadcast journalist": "journalist",
  "news anchor":    "journalist",
  "anchor":         "journalist",
  "tv anchor":      "journalist",
  "sports journalist": "journalist",
  "staff writer":   "journalist",
  "feature writer": "journalist",
  "correspondent":  "journalist",
  // Education
  "professor":      "professor",
  "guest lecturer": "professor",
  "adjunct professor": "professor",
  "visiting professor": "professor",
  "adjunct instructor": "professor",
  // E-learning / instructional design
  "elearning developer": "instructional designer",
  "e-learning developer": "instructional designer",
  "elearning designer": "instructional designer",
  "e-learning designer": "instructional designer",
  "learning experience designer": "instructional designer",
  "learning developer": "instructional designer",
  // L&D / corporate training
  "learning and development manager": "learning and development manager",
  "learning and development specialist": "learning and development manager",
  "learning and development": "learning and development manager",
  "corporate trainer": "corporate trainer",
  "training and development manager": "learning and development manager",
  "training manager": "training manager",
  "training specialist": "training specialist",
  "training coordinator": "training coordinator",
  // GIS / geospatial
  "gis analyst":    "gis analyst",
  "gis specialist": "gis analyst",
  "gis engineer":   "gis analyst",
  "gis developer":  "gis analyst",
  "geospatial analyst": "gis analyst",
  "geospatial scientist": "gis analyst",
  "geospatial engineer": "gis analyst",
  // Public health
  "public health analyst": "public health analyst",
  "public health specialist": "public health analyst",
  "public health advisor": "public health analyst",
  "biostatistician": "statistician",
  "biostatistics":   "statistician",
  // Agriculture
  "farm manager":   "farm manager",
  "farm supervisor": "farm manager",
  "agricultural engineer": "agricultural engineer",
  "agricultural scientist": "agricultural engineer",
  "agronomy":       "agronomist",
  "school principal": "school principal",
  "principal":      "school principal",
  "vice principal": "school principal",
  "school counselor": "school counselor",
  "tutoring":       "tutor",
  "curriculum designer": "instructional designer",
  "curriculum specialist": "instructional designer",
  "curriculum developer": "instructional designer",
  "curriculum":     "curriculum developer",
  "special education teacher": "special education teacher",
  "special ed teacher": "special education teacher",
  "sped teacher":   "special education teacher",
  // Operations
  "operations analyst":"operations analyst",
  // Creative / Marketing — specific beats "social media" generic
  "social media specialist": "social media specialist",
  "social media coordinator": "social media specialist",
  "social media":   "social media manager",
  "content creator": "content creator",
  "tiktok creator": "content creator",
  "youtube creator": "content creator",
  "social media creator": "content creator",
  "instagram creator": "content creator",
  "digital creator": "content creator",
  "copywriting":    "copywriter",
  "paid media":     "paid media manager",
  "ppc specialist": "ppc specialist",
  "ppc manager":    "ppc specialist",
  "ppc":            "ppc specialist",
  "seo":            "seo specialist",
  "sem":            "sem specialist",
  // Engineering / Trades
  "electrical work":"electrician",
  "plumbing":       "plumber",
  "pipe fitter":    "plumber",
  "pipefitter":     "pipefitter",
  "bricklayer":     "mason",
  "mason":          "mason",
  "welding":        "welder",
  "carpentry":      "carpenter",
  "hvac":           "hvac technician",
  "cdl":            "truck driver",
  "cdl driver":     "truck driver",
  "bus driver":     "bus driver",
  "transit driver": "bus driver",
  "delivery driver": "delivery driver",
  "delivery person": "delivery driver",
  "courier":        "delivery driver",
  "rideshare driver": "delivery driver",
  "forklift":       "forklift operator",
  // Ops / Management
  "ops manager":    "operations manager",
  "chief of staff": "chief of staff",
  "biz analyst":    "business analyst",
  "data viz":       "data analyst",
  "tableau":        "data analyst",
  "power bi":       "data analyst",
  "scrum":          "scrum master",
  "agile coach":    "agile coach",
  // Technical writing variants
  "api documentation writer": "technical writer",
  "documentation engineer": "technical writer",
  "documentation writer": "technical writer",
  "api writer":     "technical writer",
  // Project management
  "pmp":            "project manager",
  "project management professional": "project manager",
  "agile project manager": "project manager",
  "waterfall project manager": "project manager",
  "technical project manager": "technical project manager",
  "project coordinator": "project manager",
  "program coordinator": "project manager",
  "delivery manager": "project manager",
  "pmo analyst":    "project manager",
  "pmo manager":    "project manager",
  "pmo":            "project manager",
  // Analytics tools → data analyst
  "google analytics": "data analyst",
  "mixpanel analyst": "data analyst",
  "amplitude analyst": "data analyst",
  "looker analyst":   "data analyst",
  "domo analyst":     "data analyst",
  // Music / performing arts
  "music teacher":  "music teacher",
  "piano teacher":  "music teacher",
  "voice teacher":  "music teacher",
  "guitar teacher": "music teacher",
  "violin teacher": "music teacher",
  "music instructor": "music teacher",
  "piano instructor": "music teacher",
  "dance instructor": "dance instructor",
  "dance teacher":  "dance instructor",
  "ballet instructor": "dance instructor",
  "yoga instructor": "yoga instructor",
  "fitness instructor": "fitness instructor",
  "personal trainer": "personal trainer",
  "fitness trainer": "personal trainer",
  "gym trainer":    "personal trainer",
  // Interior design / architecture
  "interior architect": "interior designer",
  "interior decorator": "interior designer",
  "home stager":    "interior designer",
  "interior design consultant": "interior designer",
  // Sports
  "sports coach":   "coach",
  "head coach":     "coach",
  "assistant coach": "coach",
  "sports analyst": "sports analyst",
  "sports broadcaster": "journalist",
  "sports commentator": "journalist",
  "sports reporter": "journalist",
  // Skilled trades
  "sheet metal worker": "sheet metal worker",
  "sheet metal fabricator": "sheet metal worker",
  "maritime engineer": "maritime engineer",
  "marine engineer": "maritime engineer",
  "naval architect": "naval architect",
  // Pilot / aviation
  "commercial pilot": "pilot",
  "airline pilot":   "pilot",
  "helicopter pilot": "pilot",
  "first officer":   "pilot",
  // Localization / translation
  "localization manager": "localization manager",
  "localization engineer": "localization engineer",
  "localization specialist": "localization engineer",
  "translation manager": "localization manager",
  "localization":    "localization engineer",
  // Management hierarchy — specific beats generic "manager" (which is a stopword)
  "general manager": "general manager",
  "gm":             "general manager",
  "regional manager": "regional manager",
  "regional director": "regional director",
  "district manager": "district manager",
  "area manager":   "area manager",
  "branch manager": "branch manager",
  "territory manager": "territory manager",
  "country manager": "country manager",
  "zone manager":   "zone manager",
  // Executive / leadership titles
  "executive director": "executive director",
  "managing director": "managing director",
  "chief of staff":  "chief of staff",
  // Nonprofit / Community
  "development manager": "development manager",
  "volunteer coordinator": "volunteer coordinator",
  "volunteer manager": "volunteer manager",
  // ERP / CRM / platform consultants — specific beats "consultant"
  "salesforce consultant": "salesforce consultant",
  "salesforce developer": "salesforce developer",
  "salesforce administrator": "salesforce administrator",
  "salesforce architect": "salesforce consultant",
  "salesforce admin": "salesforce administrator",
  "servicenow developer": "servicenow developer",
  "servicenow administrator": "servicenow administrator",
  "servicenow admin": "servicenow administrator",
  "servicenow consultant": "servicenow developer",
  "erp consultant":  "erp consultant",
  "sap consultant":  "sap consultant",
  "sap basis consultant": "sap consultant",
  "sap fico consultant": "sap consultant",
  "sap mm consultant": "sap consultant",
  "sap hana consultant": "sap consultant",
  "sap s4hana consultant": "sap consultant",
  "sap developer":   "sap developer",
  "sap analyst":     "sap consultant",
  "oracle consultant": "oracle consultant",
  "dynamics consultant": "dynamics consultant",
  // Accounting / Tax / Audit
  "tax manager":    "tax manager",
  "tax director":   "tax director",
  "tax specialist": "tax specialist",
  "tax associate":  "tax associate",
  "tax analyst":    "tax analyst",
  // Finance abbreviations resolved by preprocessing
  "fp&a analyst":   "financial analyst",
  "fp&a manager":   "financial analyst",
  "fp&a director":  "financial analyst",
  "fpa analyst":    "financial analyst",
  "fpa manager":    "financial analyst",
  "fpa director":   "financial analyst",
  "financial planning analyst": "financial analyst",
  "financial planning manager": "financial analyst",
  "cash flow analyst": "financial analyst",
  "cash flow manager": "financial analyst",
  "audit manager":  "audit manager",
  "audit director": "audit manager",
  "internal audit manager": "audit manager",
  // Content leadership
  "content director": "content director",
  "content operations manager": "content manager",
  // QA / Testing
  "qa manager":    "qa manager",
  "qa director":   "qa manager",
  "test lead":     "qa engineer",
  "testing lead":  "qa engineer",
  // Robotics / industrial
  "robotics engineer": "robotics engineer",
  "robotics developer": "robotics engineer",
  "robotics scientist": "robotics engineer",
  "controls engineer": "controls engineer",
  "control systems engineer": "controls engineer",
  // Industrial automation / OT
  "scada engineer": "scada engineer",
  "scada developer": "scada engineer",
  "plc programmer": "plc programmer",
  "plc engineer":  "plc programmer",
  "automation controls engineer": "scada engineer",
  // Operations variants — specific beats generic
  "marketing operations manager": "marketing operations manager",
  "marketing operations specialist": "marketing operations manager",
  "financial operations manager": "financial operations manager",
  "sales operations manager": "sales operations manager",
  "sales ops manager": "sales operations manager",
  "customer operations manager": "customer operations manager",
  "people operations director": "hr manager",
  "revops":        "revenue operations manager",
  "mops":          "marketing operations manager",
  "salesops":      "sales operations manager",
  "finops engineer": "cloud engineer",
  "finops":        "financial operations manager",
  // Brand / social media
  "brand consultant": "brand strategist",
  "influencer":    "content writer",
  "youtube creator": "content writer",
  "content influencer": "content writer",
  // Telecom / wireless
  "telecoms engineer": "network engineer",
  "telecom engineer": "network engineer",
  "telecommunications engineer": "network engineer",
  "5g engineer":   "network engineer",
  "wireless engineer": "network engineer",
  "rf network engineer": "network engineer",
  // Pharma / Biotech
  "clinical trial specialist": "clinical research coordinator",
  "clinical trial associate": "clinical research coordinator",
  "clinical trial manager": "clinical research coordinator",
  "regulatory affairs manager": "regulatory affairs manager",
  "regulatory affairs specialist": "regulatory affairs specialist",
  "regulatory affairs director": "regulatory affairs manager",
  "regulatory affairs": "regulatory affairs manager",
  "drug safety specialist": "drug safety specialist",
  "drug safety manager": "drug safety specialist",
  "pharmacovigilance specialist": "pharmacovigilance specialist",
  "pharmacovigilance manager": "pharmacovigilance specialist",
  "pharmacovigilance":  "pharmacovigilance specialist",
  "medical affairs manager": "medical affairs manager",
  "medical science liaison": "medical affairs manager",
  "msl":           "medical affairs manager",
  // Research / insights
  "market research analyst": "market research analyst",
  "market research manager": "market research analyst",
  "market researcher": "market research analyst",
  "consumer insights analyst": "market research analyst",
  "consumer insights manager": "market research analyst",
  "user researcher": "ux researcher",
  // Compliance / risk / fraud
  "fraud analyst":    "fraud analyst",
  "fraud investigator": "fraud analyst",
  "fraud manager":    "fraud analyst",
  "grc analyst":      "compliance analyst",
  "grc manager":      "compliance manager",
  "financial crimes analyst": "fraud analyst",
  "financial crimes manager": "compliance manager",
  "bsa analyst":      "compliance analyst",
  // IT specialties
  "it auditor":       "it auditor",
  "it project manager": "it project manager",
  "network analyst":  "network analyst",
  // Content
  "content strategist": "content strategist",
  "content strategy manager": "content strategist",
  // Construction
  "site superintendent": "superintendent",
  "project superintendent": "superintendent",
  "construction estimator": "construction estimator",
  // Accounting
  "cost accountant":  "cost accountant",
  "forensic accountant": "forensic accountant",
  // Management
  "site manager":     "site manager",
  "platform architect": "solutions architect",
  // Startup engineering
  "founding engineer": "software engineer",
  "growth engineer":  "software engineer",
  "early stage engineer": "software engineer",
  // Nursing specialties
  "psychiatric nurse": "psychiatric nurse",
  "psych nurse":      "psychiatric nurse",
  "oncology nurse":   "oncology nurse",
  "dialysis nurse":   "dialysis nurse",
  "home health nurse": "home health nurse",
  "home health aide": "home health aide",
  // Marketing — paid/digital
  "paid search specialist": "ppc specialist",
  "paid search analyst": "ppc specialist",
  "paid search manager": "ppc specialist",
  "google ads specialist": "ppc specialist",
  "google ads manager": "ppc specialist",
  "facebook ads specialist": "paid social media manager",
  "facebook ads manager": "paid social media manager",
  "paid social media manager": "paid social media manager",
  "paid social specialist": "paid social media manager",
  // Revenue operations
  "rev ops":          "revenue operations manager",
  "revenue operations manager": "revenue operations manager",
  "revenue operations specialist": "revenue operations manager",
  "revenue operations": "revenue operations manager",
  // Finance — trading
  "ib analyst":       "investment banker",
  "investment banking analyst": "investment banker",
  // Operations / manufacturing
  "quality manager":  "quality assurance manager",
  "quality director": "quality assurance manager",
  "maintenance manager": "maintenance manager",
  "maintenance supervisor": "maintenance manager",
  "maintenance technician": "maintenance technician",
  "environmental health safety": "ehs manager",
  // Legal operations
  "legal operations manager": "legal operations manager",
  "legal operations director": "legal operations manager",
  "legal ops":        "legal operations manager",
  // Change management / transformation
  "change management manager": "change management manager",
  "change management consultant": "change management manager",
  "organizational change manager": "change management manager",
  "business transformation manager": "change management manager",
  "change manager":   "change management manager",
  // Release management
  "release manager":  "release manager",
  "release train engineer": "release manager",
  // Data science leadership
  "data science manager": "data science manager",
  "director of data science": "data science manager",
  "data science director": "data science manager",
  "vp of data science": "data science manager",
  // Product specialties
  "product marketing manager": "product marketing manager",
  "product operations manager": "product manager",
  "product growth manager": "product manager",
  // Infrastructure / DevOps
  "infrastructure engineer": "devops engineer",
  "cloud infrastructure engineer": "devops engineer",
  "site reliability engineer": "site reliability engineer",
  "site reliability":  "site reliability engineer",
  "sre engineer":     "site reliability engineer",
  // Marketing
  "performance marketer": "performance marketing manager",
  "b2b marketer":     "marketing manager",
  "b2c marketer":     "marketing manager",
  // Compliance
  "cco":              "compliance officer",
  "chief compliance officer": "compliance officer",
  "compliance director": "compliance manager",
  // HR / People analytics
  "workforce planning analyst": "hr analyst",
  "people analytics manager": "hr analyst",
  "people analytics analyst": "hr analyst",
  // L&D
  "learning and development manager": "learning and development manager",
  "learning and development specialist": "learning and development manager",
  "learning and development director": "learning and development manager",
  "learning and development analyst": "learning and development manager",
  "talent development manager": "learning and development manager",
  "organizational development manager": "learning and development manager",
  // Healthcare
  "naturopathic doctor": "naturopath",
  "naturopath":       "naturopath",
  // Education
  "university lecturer": "professor",
  "adjunct lecturer": "professor",
  "college counselor": "school counselor",
  // Funeral / mortuary
  "funeral director": "funeral director",
  "mortician":        "funeral director",
  "embalmer":         "funeral director",
  "mortuary director": "funeral director",
  // Veterinary
  "veterinarian":   "veterinarian",
  "vet":            "veterinarian",
  // Energy / resources engineering
  "petroleum engineer": "petroleum engineer",
  "reservoir engineer": "petroleum engineer",
  "drilling engineer": "drilling engineer",
  "completions engineer": "drilling engineer",
  "refinery engineer": "petroleum engineer",
  "nuclear engineer": "nuclear engineer",
  "mining engineer": "mining engineer",
  "mining geologist": "mining engineer",
  "power systems engineer": "electrical engineer",
  "transmission engineer": "electrical engineer",
  "distribution engineer": "electrical engineer",
  // CAD / drafting
  "cad technician": "cad technician",
  "cad designer":   "cad technician",
  "drafter":        "drafter",
  "structural drafter": "drafter",
  "mechanical drafter": "drafter",
  "estimator":      "cost estimator",
  // Diving
  "commercial diver": "commercial diver",
  "deep sea diver":   "commercial diver",
  "underwater welder": "commercial diver",
  // Nursing leadership
  "director of nursing": "director of nursing",
  "nursing director": "director of nursing",
  "chief nursing officer": "chief nursing officer",
  "cno":            "chief nursing officer",
  "nurse manager":  "nurse manager",
  "nursing manager": "nurse manager",
  // HR leadership
  "chief people officer": "chief human resources officer",
  "chief hr officer": "chief human resources officer",
  // Product specialties
  "technical product manager": "technical product manager",
  // Security specialties
  "red team engineer": "security engineer",
  "blue team analyst": "security analyst",
  "red teamer":     "security engineer",
  // Engineering edge cases
  "ui engineer":    "frontend developer",
  "open source developer": "software developer",
  "open source engineer": "software engineer",
  // VP / director combos
  "vice president engineering": "vp of engineering",
  "vice president product": "vp of product",
  "vice president sales": "vp of sales",
  "vice president marketing": "vp of marketing",
  "vice president finance": "chief financial officer",
  // Engineering specialties
  "firmware developer": "embedded engineer",
  "embedded software engineer": "embedded engineer",
  "graphics programmer": "graphics engineer",
  "graphics engineer": "graphics engineer",
  "game developer":   "game developer",
  "game designer":    "game designer",
  "simulation engineer": "simulation engineer",
  // Healthcare leadership
  "medical director": "medical director",
  "chief medical officer": "chief medical officer",
  "clinical operations manager": "clinical operations manager",
  "pharmacy benefit manager": "pharmacy manager",
  // Real estate
  "real estate analyst": "real estate analyst",
  "real estate developer": "real estate developer",
  "real estate investment": "real estate analyst",
  // Government / defense / security
  "government contractor": "government contractor",
  "federal contractor": "government contractor",
  "defense contractor": "defense contractor",
  "intelligence analyst": "intelligence analyst",
  "geospatial analyst": "intelligence analyst",
  "signals analyst":  "intelligence analyst",
  // Media / entertainment
  "film director":  "film director",
  "film producer":  "film producer",
  "video director": "film director",
  "sound engineer": "sound engineer",
  "audio engineer": "sound engineer",
  "sound designer": "sound engineer",
  "podcast producer": "podcast producer",
  "video producer": "video producer",
  "cinematographer": "cinematographer",
  // Non-profit / social impact
  "development director": "development director",
  "volunteer coordinator": "volunteer coordinator",
  // Seniority-specific engineering
  "principal software engineer": "principal engineer",
  "staff software engineer": "staff engineer",
  // DEI / diversity
  "diversity equity inclusion manager": "dei manager",
  "diversity and inclusion manager": "dei manager",
  "dei manager":    "dei manager",
  "dei director":   "dei manager",
  "dei specialist": "dei manager",
  // Employer branding
  "employer branding manager": "employer branding manager",
  "employer brand manager": "employer branding manager",
  "employer branding specialist": "employer branding manager",
  // Web / CMS developers
  "web designer":   "web designer",
  "wordpress developer": "web developer",
  "wordpress designer": "web developer",
  "drupal developer": "web developer",
  "drupal designer": "web developer",
  "sharepoint developer": "web developer",
  "sharepoint administrator": "web developer",
  // Customer journey
  "customer journey manager": "customer experience manager",
  "customer journey analyst": "customer experience manager",
  // Regional sales
  "regional sales manager": "regional sales manager",
  "regional account manager": "regional sales manager",
  "regional sales director": "regional sales manager",
  // Healthcare — imaging / diagnostics
  "cardiac sonographer": "cardiac sonographer",
  "cardiac echo technician": "cardiac sonographer",
  "echocardiographer": "cardiac sonographer",
  "echo tech":       "cardiac sonographer",
  "surgical technologist": "surgical technologist",
  "surgical tech":   "surgical technologist",
  "sterile processing technician": "sterile processing technician",
  "sterile processing tech": "sterile processing technician",
  "central sterile tech": "sterile processing technician",
  "central sterile technician": "sterile processing technician",
  "eeg technician":  "eeg technician",
  "eeg tech":        "eeg technician",
  "eeg technologist": "eeg technician",
  "respiratory tech": "respiratory therapist",
  // Finance — banking relationship roles
  "relationship banker": "relationship manager",
  "private banker":  "private banker",
  "wealth banker":   "private banker",
  // Legal — specialties
  "estate attorney": "estate attorney",
  "estate planning attorney": "estate attorney",
  "probate attorney": "estate attorney",
  // HR — people partner
  "people partner":  "hr business partner",
  "hr partner":      "hr business partner",
  "senior people partner": "hr business partner",
  // Marketing — field / event / social
  "field marketing manager": "field marketing manager",
  "event marketing manager": "event marketer",
  "event marketing specialist": "event marketer",
  "social media influencer": "content creator",
  "influencer marketing manager": "influencer marketing manager",
  // Tech — robotics specialization
  "robotics software engineer": "robotics engineer",
  "robotics systems engineer": "robotics engineer",
  // Trades
  "pipefitter apprentice": "pipefitter",
  // Healthcare — additional diagnostics / patient care
  "patient care technician": "patient care technician",
  "patient care tech": "patient care technician",
  "dialysis technician": "dialysis technician",
  "dialysis tech": "dialysis technician",
  "phlebotomist": "phlebotomist",
  "phlebotomy technician": "phlebotomist",
  "phlebotomy tech": "phlebotomist",
  "cma":           "medical assistant",
  "ophthalmic technician": "ophthalmic technician",
  "ophthalmic technologist": "ophthalmic technician",
  "ophthalmic tech": "ophthalmic technician",
  "optometric technician": "ophthalmic technician",
  // Tech — mobile and systems
  "ios engineer":   "ios developer",
  "ios architect":  "ios developer",
  "android engineer": "android developer",
  "android architect": "android developer",
  "systems programmer": "systems engineer",
  "compiler engineer": "systems engineer",
  "low level engineer": "systems engineer",
  // Finance — billing and tax specifics
  "billing specialist": "billing specialist",
  "billing analyst": "billing specialist",
  "billing manager": "billing specialist",
  "billing coordinator": "billing specialist",
  "payables analyst": "accounts payable specialist",
  "receivables analyst": "accounts receivable specialist",
  "transfer pricing analyst": "tax analyst",
  "transfer pricing manager": "tax manager",
  // Operations
  "process analyst": "business analyst",
  "process improvement analyst": "business analyst",
  "contract manager": "contract manager",
  "contract administrator": "contract manager",
  // HR
  "recruitment manager": "recruiter",
  "recruitment director": "recruiter",
  // CRM
  "crm manager":    "crm manager",
  "crm analyst":    "crm manager",
  "crm specialist": "crm manager",
  // Customer success tiering
  "customer success specialist": "customer success specialist",
  "customer success director": "director of customer success",
  // Healthcare exec
  "chief pharmacy officer": "pharmacy manager",
  // Lab management
  "lab manager":    "lab manager",
  "laboratory manager": "lab manager",
  "lab director":   "lab manager",
  // Logistics / distribution
  "distribution manager": "distribution manager",
  "distribution director": "distribution manager",
  "transportation manager": "transportation manager",
  "transportation director": "transportation manager",
  "freight coordinator": "freight coordinator",
  "freight broker":   "freight coordinator",
  // Niche tech / hardware
  "quantum computing engineer": "quantum computing engineer",
  "quantum engineer": "quantum computing engineer",
  "hpc engineer":   "hpc engineer",
  "hpc developer":  "hpc engineer",
  "dsp engineer":   "dsp engineer",
  "dsp developer":  "dsp engineer",
  "avionics engineer": "avionics engineer",
  "avionics software engineer": "avionics engineer",
  // Marketing — reversed word order
  "marketing director": "director of marketing",
  "sales director":  "director of sales",
  "finance director": "director of finance",
  "hr director":    "hr director",
  "engineering director": "director of engineering",
  // Education — school psychologist
  "school psychologist": "school counselor",
  // Construction / surveying
  "superintendent":  "construction superintendent",
  "site superintendent": "construction superintendent",
  "project superintendent": "construction superintendent",
  "land surveyor":  "land surveyor",
  "surveyor":       "land surveyor",
  // BI tool-specific
  "dbt analyst":    "analytics engineer",
  "metabase analyst": "bi developer",
  "metabase developer": "bi developer",
  "sigma analyst":  "bi developer",
  "sisense analyst": "bi developer",
  // Data leadership
  "director of data engineering": "data engineering manager",
  "data engineering manager": "data engineering manager",
  "head of data science": "data science manager",
  "vp of data engineering": "data engineering manager",
  // Healthcare informatics
  "health informatics specialist": "health information manager",
  "health informatics analyst": "health information manager",
  "clinical informatics analyst": "health information manager",
  // Finance
  "insurance analyst": "insurance analyst",
  "insurance manager": "insurance analyst",
  "claims analyst": "claims adjuster",
  "claims specialist": "claims adjuster",
  // Operations
  "process improvement manager": "operations manager",
  "process improvement analyst": "operations analyst",
  "lean manager":   "operations manager",
  "lean consultant": "operations manager",
  // Urban design
  "urban designer":  "urban planner",
  // Fitness / sports
  "strength and conditioning coach": "strength and conditioning coach",
  "strength conditioning coach": "strength and conditioning coach",
  // Customer support tiering
  "customer support engineer": "customer support specialist",
  // Embedded / firmware
  "microcontroller programmer": "embedded engineer",
  "microcontroller engineer": "embedded engineer",
  "rtos developer":  "embedded engineer",
  "rtos engineer":   "embedded engineer",
  "linux kernel developer": "systems engineer",
  "linux kernel engineer": "systems engineer",
  // Integration
  "middleware engineer": "integration engineer",
  // Pharma / biotech
  "clinical trials manager": "clinical research associate",
  "cra":             "clinical research associate",
  "clinical research manager": "clinical research associate",
  "drug safety analyst": "pharmacovigilance specialist",
  "drug safety specialist": "pharmacovigilance specialist",
  // Insurance / risk
  "risk manager":    "risk manager",
  "enterprise risk manager": "risk manager",
  "risk director":   "risk manager",
  "risk engineer":   "risk manager",
  "loss prevention manager": "loss prevention manager",
  "loss prevention specialist": "loss prevention manager",
  "loss prevention director": "loss prevention manager",
  // Retail
  "assistant store manager": "assistant store manager",
  "food safety manager": "food safety manager",
  "food safety specialist": "food safety manager",
  // Film
  "filmmaker":       "film director",
  // Admin
  "executive coordinator": "executive assistant",
  // QA — QA specialist distinct from QA engineer
  "quality assurance specialist": "quality assurance specialist",
  // Nursing specialties (beat generic "registered nurse" alias)
  "occupational health nurse": "occupational health nurse",
  "school nurse":    "school nurse",
  "nurse educator":  "nurse educator",
  "infection control nurse": "infection control nurse",
  "utilization review nurse": "utilization review nurse",
  "clinical nurse specialist": "clinical nurse specialist",
  "charge nurse":    "charge nurse",
  // Social work specialties
  "medical social worker": "medical social worker",
  "child protective services worker": "social worker",
  "child protective specialist": "social worker",
  "foster care specialist": "social worker",
  "foster care worker": "social worker",
  // Allied health assistants (beat longer single-occupation aliases)
  "physical therapy assistant": "physical therapy assistant",
  "occupational therapy assistant": "occupational therapy assistant",
  // Speech / audiology
  "slp":             "speech therapist",
  // Retirement planning
  "retirement planning specialist": "financial advisor",
  "retirement planning advisor": "financial advisor",
  // Content / social
  "blog manager":    "content manager",
  "email marketer":  "email marketing specialist",
  // IT ops management
  "helpdesk manager": "it manager",
  "help desk manager": "it manager",
  "network manager": "it manager",
  "network director": "it manager",
  "storage engineer": "systems administrator",
  "backup engineer": "systems administrator",
  // Insurance ops
  "insurance coordinator": "insurance agent",
  "insurance specialist": "insurance agent",
  "claims manager":  "claims adjuster",
  "claims director": "claims adjuster",
  // Benefits / HR ops
  "benefits coordinator": "benefits specialist",
  "benefits administrator": "benefits specialist",
  // Solutions / presales
  "sales engineer":   "sales engineer",
  "technical architect": "solutions architect",
  "software architect": "solutions architect",
  // DevOps / CI-CD
  "implementation engineer": "implementation engineer",
  "implementation consultant": "implementation engineer",
  "deployment engineer": "devops engineer",
  "configuration manager": "devops engineer",
  "build engineer":  "devops engineer",
  // QA management
  "test manager":    "qa manager",
  "testing manager": "qa manager",
  // MLOps
  "mlops engineer":  "mlops engineer",
  "machine learning ops engineer": "mlops engineer",
  "ml ops engineer": "mlops engineer",
  "feature engineer": "machine learning engineer",
  // Docs
  "docs engineer":   "technical writer",
  "documentation engineer": "technical writer",
  // Strategy / M&A
  "strategy analyst": "strategy analyst",
  "corporate strategy analyst": "strategy analyst",
  "corporate development analyst": "strategy analyst",
  "mergers and acquisitions analyst": "mergers and acquisitions analyst",
  "business development analyst": "business development representative",
  // Auditing
  "internal auditor": "internal auditor",
  "internal audit manager": "audit manager",
  // Product — prevent "principal" alias collision
  "principal product manager": "product manager",
  "principal program manager": "program manager",
  // Customer ops
  "customer operations director": "customer operations manager",
  // Crypto
  "crypto analyst":  "crypto analyst",
  "crypto trader":   "trader",
  "smart contract auditor": "blockchain developer",
  "defi developer":  "blockchain developer",
  "nft developer":   "blockchain developer",
  // Nursing — advanced practice and perioperative
  "nurse anesthetist": "nurse anesthetist",
  "nurse midwife":   "nurse midwife",
  "cnm":             "nurse midwife",
  "certified nurse midwife": "nurse midwife",
  "perioperative nurse": "perioperative nurse",
  "preoperative nurse": "perioperative nurse",
  "post anesthesia care unit nurse": "pacu nurse",
  "pacu nurse":      "pacu nurse",
  "recovery room nurse": "pacu nurse",
  "emergency department nurse": "emergency room nurse",
  "ed nurse":        "emergency room nurse",
  // Agile
  "agile consultant": "agile coach",
  "agile trainer":   "agile coach",
  // Leadership — chief of staff
  "head of staff":   "chief of staff",
  "chief of staff":  "chief of staff",
  // Physician
  "doctor":          "physician",
  // Heavy equipment / trades
  "heavy equipment operator": "heavy equipment operator",
  "excavator operator": "heavy equipment operator",
  "bulldozer operator": "heavy equipment operator",
  "backhoe operator": "heavy equipment operator",
  "otr driver":      "truck driver",
  "over the road driver": "truck driver",
  "long haul driver": "truck driver",
  // Prevent "principal" alias collision for product
  "principal product designer": "product designer",
  "principal ux designer": "ux designer",
  // Government / public sector
  "policy director":  "policy analyst",
  "legislative analyst": "policy analyst",
  "legislative director": "policy analyst",
  "budget director":  "budget analyst",
  "program officer":  "program manager",
  "contract officer": "contract manager",
  "procurement officer": "procurement specialist",
  // Real estate
  "commercial real estate broker": "real estate agent",
  "mortgage specialist": "loan officer",
  "mortgage consultant": "loan officer",
  "escrow officer":   "escrow officer",
  "title officer":    "escrow officer",
  "title specialist": "escrow officer",
  "real estate appraiser": "appraiser",
  // ERP / enterprise apps
  "oracle cloud consultant": "erp consultant",
  "microsoft dynamics consultant": "erp consultant",
  "dynamics 365 consultant": "erp consultant",
  "d365 developer":   "erp consultant",
  "d365 consultant":  "erp consultant",
  "netsuite administrator": "erp consultant",
  "netsuite consultant": "erp consultant",
  "epicor consultant": "erp consultant",
  "epicor developer": "erp consultant",
  // Concrete / masonry
  "cement mason":     "concrete worker",
  // Roofing
  "roofing contractor": "roofer",
  // Drywall
  "taper":            "drywall installer",
  // Security
  "security guard":   "security officer",
  "loss prevention officer": "loss prevention manager",
  "cyber analyst":    "security analyst",
  "cybersecurity consultant": "security analyst",
  // Misc
  "appraisers":       "appraiser",
  "loss prevention director": "loss prevention manager",
  // NOC / IT ops
  "network operations center analyst": "network operations center analyst",
  "network operations center engineer": "network operations center analyst",
  "noc analyst":     "network operations center analyst",
  "noc engineer":    "network operations center analyst",
  "noc technician":  "network operations center analyst",
  "it operations analyst": "it operations analyst",
  "it operations manager": "it manager",
  "it operations director": "it manager",
  // FinTech / payments
  "fintech analyst":  "financial analyst",
  "payments engineer": "payments engineer",
  "payment systems engineer": "payments engineer",
  "payment engineer": "payments engineer",
  "card payments analyst": "payments engineer",
  "payments analyst": "payments engineer",
  // Financial reporting
  "financial reporting analyst": "financial analyst",
  "financial reporting manager": "financial analyst",
  // Design management
  "design manager":  "design manager",
  "design director": "design manager",
  "design lead":     "ux designer",
  // Contact center
  "contact center manager": "call center manager",
  "contact center director": "call center manager",
  "call center director": "call center manager",
  "customer care manager": "customer service manager",
  "client services manager": "customer service manager",
  "client services director": "customer service manager",
  // Travel
  "travel coordinator": "travel coordinator",
  "travel manager":   "travel coordinator",
  "corporate travel manager": "travel coordinator",
  // Immigration
  "immigration specialist": "immigration specialist",
  "visa specialist":  "immigration specialist",
  "immigration consultant": "immigration specialist",
  // Compliance / trade
  "export control specialist": "export control specialist",
  "trade compliance specialist": "export control specialist",
  "trade compliance manager": "export control specialist",
  // AI specialties
  "ai ethicist":      "research scientist",
  "ai safety researcher": "research scientist",
  "responsible ai lead": "machine learning engineer",
  "responsible ai engineer": "machine learning engineer",
  "llm researcher":   "research scientist",
  "foundation model engineer": "machine learning engineer",
  "foundation model researcher": "research scientist",
  // Knowledge graph / data semantics
  "knowledge graph engineer": "data engineer",
  "knowledge graph developer": "data engineer",
  "ontologist":       "data engineer",
  "ontology engineer": "data engineer",
  // EdTech / LMS
  "learning designer": "instructional designer",
  "learning engineer": "instructional designer",
  "lms administrator": "instructional designer",
  "lms manager":      "instructional designer",
  "lms specialist":   "instructional designer",
  // Biotech
  "protein engineer": "research scientist",
  "structural biologist": "research scientist",
  "bioinformatics scientist": "bioinformatics scientist",
  "computational biologist": "bioinformatics scientist",
  // Real estate
  "hoa manager":      "property manager",
  "hoa director":     "property manager",
  "facilities coordinator": "facilities manager",
  // UX research
  "design researcher": "ux researcher",
  // Warehouse
  "warehousing manager": "warehouse manager",
  "warehousing director": "warehouse manager",
  // QA
  "test automation developer": "qa engineer",
  "software quality engineer": "qa engineer",
  // Executive titles — C-suite abbreviations
  "cso":             "chief strategy officer",
  "chief strategy officer": "chief strategy officer",
  "cpo":             "chief product officer",
  "chief product officer": "chief product officer",
  // SVP / EVP abbreviations
  "svp sales":       "vp of sales",
  "svp engineering": "vp of engineering",
  "svp marketing":   "vp of marketing",
  "evp sales":       "vp of sales",
  "evp marketing":   "vp of marketing",
  "evp engineering": "vp of engineering",
  // No-code / low-code
  "no code developer": "software developer",
  "no-code developer": "software developer",
  "low code developer": "software developer",
  "low-code developer": "software developer",
  "citizen developer": "software developer",
  "no code engineer": "software developer",
  // Analytics leadership — distinct from data analyst
  "analytics director": "analytics manager",
  "vp of analytics": "analytics manager",
  "director of analytics": "analytics manager",
  // Project management with industry prefix
  "marketing project manager": "project manager",
  "healthcare project manager": "project manager",
  "finance project manager": "project manager",
  // Retail operations
  "retail operations manager": "operations manager",
  // Real estate attorney (override "estate attorney" shorter match)
  "real estate attorney": "attorney",
  // Nursing specialties
  "wound care nurse":  "wound care nurse",
  "wound care specialist": "wound care nurse",
  "wound care manager": "wound care nurse",
  "hospice nurse":    "hospice nurse",
  "palliative care nurse": "palliative care nurse",
  "hospice social worker": "medical social worker",
  "triage nurse":     "triage nurse",
  "case management nurse": "case manager",
  // Mental health counseling
  "mental health counselor": "mental health counselor",
  "licensed professional counselor": "mental health counselor",
  "licensed mental health counselor": "mental health counselor",
  "lmhc":            "mental health counselor",
  "behavioral health specialist": "mental health counselor",
  "behavioral health counselor": "mental health counselor",
  // Data engineering — streaming / orchestration
  "flink engineer":   "data engineer",
  "airflow engineer": "data engineer",
  "data pipeline engineer": "data engineer",
  "data infrastructure engineer": "data engineer",
  "kafka developer":  "data engineer",
  "spark developer":  "data engineer",
  // Software architecture patterns
  "microservices architect": "solutions architect",
  "event driven architect": "solutions architect",
  "domain architect": "solutions architect",
  "api architect":   "solutions architect",
  "cloud architect":  "cloud architect",
  // UX / design
  "design systems designer": "ux designer",
  // Revenue ops / go-to-market
  "revenue operations analyst": "revenue operations manager",
  "gtm engineer":    "revenue operations manager",
  "go to market manager": "product marketing manager",
  "go to market engineer": "revenue operations manager",
  // IT Administration specialties
  "active directory engineer": "systems administrator",
  "active directory administrator": "systems administrator",
  "exchange administrator": "systems administrator",
  "office 365 administrator": "systems administrator",
  "microsoft 365 administrator": "systems administrator",
  "m365 administrator": "systems administrator",
  "m365 engineer":    "systems administrator",
  "google workspace administrator": "systems administrator",
  "google workspace engineer": "systems administrator",
  "endpoint engineer": "systems administrator",
  "endpoint administrator": "systems administrator",
  "patch manager":   "systems administrator",
  "patch engineer":  "systems administrator",
  // Nonprofit / philanthropy
  "philanthropy officer": "development director",
  "major gifts officer": "development director",
  "major gifts director": "development director",
  "annual fund manager": "development director",
  "annual giving manager": "development director",
  // Supply chain planning
  "demand planner":  "supply chain analyst",
  "supply planner":  "supply chain analyst",
  "materials planner": "supply chain analyst",
  "production planner": "supply chain analyst",
  "capacity planner": "supply chain analyst",
  "sales and operations planning analyst": "supply chain analyst",
  "s op analyst":    "supply chain analyst",
  // Manufacturing engineering depth
  "continuous improvement engineer": "manufacturing engineer",
  "continuous improvement specialist": "manufacturing engineer",
  "continuous improvement manager": "operations manager",
  "lean manufacturing engineer": "manufacturing engineer",
  "plant engineer":  "manufacturing engineer",
  "tooling engineer": "manufacturing engineer",
  "product development engineer": "manufacturing engineer",
  "validation engineer": "validation engineer",
  "npi engineer":    "manufacturing engineer",
  "new product introduction engineer": "manufacturing engineer",
  // Quality
  "iso auditor":     "quality assurance manager",
  "quality inspector": "quality control inspector",
  "quality systems manager": "quality assurance manager",
  // Healthcare IT
  "health it analyst": "health information manager",
  "ehr implementation specialist": "health information manager",
  "epic analyst":    "health information manager",
  "epic consultant": "health information manager",
  "cerner analyst":  "health information manager",
  "cerner consultant": "health information manager",
  "meditech analyst": "health information manager",
  "healthcare it consultant": "health information manager",
  // Treasury / FX
  "cash management analyst": "treasury analyst",
  "treasury operations analyst": "treasury analyst",
  "fx analyst":      "treasury analyst",
  "forex analyst":   "treasury analyst",
  "fx trader":       "trader",
  // Sales depth
  "business development executive": "business development representative",
  "outside sales manager": "sales manager",
  // Startup
  "cofounder":       "founder",
  "co founder":      "founder",
  // Property
  "property analyst": "real estate analyst",
  "commercial property analyst": "real estate analyst",
  // Writing depth
  "proposal writer": "grant writer",
  "proposal manager": "grant writer",
  "content design manager": "content manager",
  // Hospitality operations
  "front office manager": "hotel manager",
  "rooms division manager": "hotel manager",
  "hotel operations manager": "hotel manager",
  "guest experience manager": "customer experience manager",
  // Revenue management (hospitality/SaaS)
  "revenue manager": "revenue operations manager",
  "revenue management analyst": "revenue operations manager",
  "yield manager": "revenue operations manager",
  // Research (must come after "principal" → "school principal")
  "principal investigator": "research scientist",
  // Clinical coordination
  "clinical coordinator": "clinical research associate",
  // Legal
  "prosecutor": "attorney",
  // Global mobility / immigration
  "global mobility manager": "immigration specialist",
  "relocation coordinator": "immigration specialist",
  // Algorithmic / quant trading
  "algorithmic trading engineer": "trader",
  // Fashion design
  "apparel designer": "fashion designer",
  "textile designer": "fashion designer",
  // Arts / culture
  "gallery director": "art director",
  // Veterinary
  "animal care specialist": "veterinary technician",
  // Library
  "library director": "librarian",
  // Law enforcement
  "fbi agent": "law enforcement officer",
  "dea agent": "law enforcement officer",
  // Audio
  "recording engineer": "audio engineer",
  // Packaging
  "packaging engineer": "packaging engineer",
  // Real estate (override "real estate agent" shorter match)
  "real estate investor": "real estate investor",
  // Finance — equity research (override generic "financial analyst" match)
  "equity research analyst": "equity research analyst",
  // Events
  "conference coordinator": "event planner",
  // Nonprofit leadership
  "nonprofit director": "executive director",
  // Government relations
  "government affairs manager": "government relations manager",
  "government relations manager": "government relations manager",
  // Diplomacy
  "foreign service officer": "diplomat",
  // Accounting management
  "accounting manager": "accounting manager",
  "director of accounting": "accounting manager",
  // Finance — private equity
  "private equity associate": "private equity analyst",
  // Security — IAM / incident response
  "incident response analyst": "security analyst",
  "identity access management": "security engineer",
  "iam engineer": "security engineer",
  // Sales
  "account development representative": "sales development representative",
  "solution engineer": "sales engineer",
  // HR
  "total rewards manager": "compensation analyst",
  // Construction
  "quantity surveyor": "quantity surveyor",
  // Logistics
  "import export coordinator": "logistics coordinator",
  "last mile delivery manager": "logistics coordinator",
  // Creative
  "creative strategist": "brand manager",
  "vfx artist": "vfx artist",
  // Social work
  "lmsw": "clinical social worker",
  // Finance — investment
  "investment analyst": "investment analyst",
  "fixed income analyst": "investment analyst",
  // Engineering — MEP / commissioning
  "mep engineer": "mechanical engineer",
  "commissioning engineer": "commissioning engineer",
  "building engineer": "facilities engineer",
  // Customer success depth
  "client success manager": "customer success manager",
  "onboarding specialist": "customer success manager",
  "implementation manager": "project manager",
  // Marketing depth
  "cro specialist": "cro specialist",
  "conversion rate optimization": "cro specialist",
  "campaign manager": "campaign manager",
  // Product
  "product director": "director of product",
  // Strategy
  "strategy manager": "strategy analyst",
  // Supply chain / sourcing
  "strategic sourcing analyst": "procurement manager",
  // Supplier quality
  "supplier quality engineer": "supplier quality engineer",
  // Science depth
  "senior scientist": "research scientist",
  "associate scientist": "research scientist",
  // Manufacturing
  "cnc programmer": "machinist",
  "tool and die maker": "tool and die maker",
  // Finance
  "insurance sales agent": "insurance agent",
  "collections analyst": "collections manager",
  "credit analyst": "credit analyst",
  "mergers and acquisitions director": "mergers and acquisitions analyst",
  // Business development
  "business development manager": "business development manager",
  // Partnerships
  "partnerships manager": "partnerships manager",
  "alliance manager": "partnerships manager",
  "channel partner manager": "partnerships manager",
  // Operations / transformation
  "integration manager": "project manager",
  "transformation manager": "change management consultant",
  // DevOps niche
  "observability engineer": "devops engineer",
  "chaos engineer": "site reliability engineer",
  "gitops engineer": "devops engineer",
  // Healthcare
  "nurse informatics specialist": "health information manager",
  "ems": "paramedic",
  // Education
  "reading specialist": "teacher",
  "financial aid advisor": "academic advisor",
  // Logistics / warehousing
  "yard manager": "warehouse manager",
  "receiving manager": "warehouse manager",
  "inventory control specialist": "inventory analyst",
  // Admin
  "office administrator": "office manager",
  "office coordinator": "office manager",
  "data entry clerk": "data entry specialist",
  // Finance — investment sides
  "buy side analyst": "investment analyst",
  "sell side analyst": "investment analyst",
  "hedge fund analyst": "investment analyst",
  // Fraud
  "fraud prevention analyst": "fraud analyst",
  "aml investigator": "fraud analyst",
  // Nursing abbreviations
  "acnp": "nurse practitioner",
  "fnp": "nurse practitioner",
  // Radiology
  "pet scan technologist": "radiology technician",
  // Legal
  "dispute resolution specialist": "attorney",
  // HR
  "director of people": "hr director",
  "benefits analyst": "benefits specialist",
  // Marketing product
  "product marketing director": "product marketing manager",
  // Hardware (override "ux designer" collision via "design" keyword)
  "hardware design engineer": "hardware engineer",
  "pcb designer": "hardware engineer",
  "circuit design engineer": "hardware engineer",
  // Software
  "performance engineer": "software engineer",
  // BI
  "bi engineer": "bi developer",
  // Revenue ops
  "sales operations manager": "revenue operations manager",
  "sales operations analyst": "revenue operations manager",
  // Finance
  "vp of accounting": "chief financial officer",
  "director of financial planning": "financial planning analyst",
  "revenue analyst": "financial analyst",
  "ap manager": "accounts payable specialist",
  "ar manager": "accounts receivable specialist",
  // NLP
  "natural language processing engineer": "nlp engineer",
  // C-suite
  "clo": "chief legal officer",
  // Retail
  "store director": "store manager",
  "department manager": "retail manager",
  "shift manager": "retail manager",
  // Hospitality
  "front of house manager": "restaurant manager",
  "back of house manager": "restaurant manager",
  // Psychology
  "school psychologist": "psychologist",
  // Medical abbreviations
  "pharmd": "pharmacist",
  "dds": "dentist",
  // Civil engineering variants
  "highway engineer": "civil engineer",
  "bridge engineer": "civil engineer",
  "tunnel engineer": "civil engineer",
  "transportation engineer": "civil engineer",
  // Real estate agents
  "listing agent": "real estate agent",
  "buyer agent": "real estate agent",
  "property consultant": "real estate agent",
  // Retail
  "retail buyer": "retail buyer",
  "wholesale manager": "retail manager",
  "ecommerce manager": "ecommerce manager",
  "e commerce manager": "ecommerce manager",
  // Recruiting
  "nurse recruiter": "recruiter",
  // Social media / content
  "instagram influencer": "content creator",
  "podcast producer": "content creator",
  // Manufacturing / production
  "assembly line worker": "production worker",
  // Agriculture
  "greenhouse manager": "farm manager",
  // Events
  "event director": "event planner",
  "entertainment manager": "entertainment manager",
  "stage manager": "stage manager",
  "tour manager": "tour manager",
  // PR / communications
  "public affairs manager": "public relations manager",
  // Nonprofit
  "fundraising manager": "development director",
  "philanthropy manager": "development director",
  // Developer advocacy
  "evangelist": "developer advocate",
  // Consulting (longer keys override shorter "consultant" match)
  "solutions consultant": "sales engineer",
  "client consultant": "account manager",
  "business consultant": "business consultant",
  "strategy consultant": "strategy consultant",
  // Real estate
  "commercial real estate broker": "real estate broker",
  // Salesforce
  "salesforce architect": "salesforce architect",
  // Embedded / systems
  "embedded linux engineer": "embedded engineer",
  "kernel engineer": "systems engineer",
  // Security
  "cryptographer": "security engineer",
  "cryptography engineer": "security engineer",
  // DevOps
  "containerization engineer": "devops engineer",
  // Healthcare
  "respiratory care practitioner": "respiratory therapist",
  "retail pharmacist": "pharmacist",
  "occupational health manager": "ehs manager",
  // Finance — banking
  "commercial banker": "commercial banker",
  "corporate banker": "commercial banker",
  "retail banker": "bank teller",
  "business banker": "relationship banker",
  "smb banker": "relationship banker",
  "consumer banker": "bank teller",
  // Finance — PE/VC
  "venture capital associate": "venture capital analyst",
  "vc analyst": "venture capital analyst",
  "pe analyst": "private equity analyst",
  "lbo analyst": "investment analyst",
  // FP&A (override existing fpa → financial analyst)
  "fpa director": "financial planning analyst",
  "vp fpa": "financial planning analyst",
  "head of fpa": "financial planning analyst",
  // Marketing
  "paid social manager": "paid social specialist",
  // Customer experience
  "cx manager": "customer experience manager",
  // Compliance / privacy
  "data protection officer": "compliance manager",
  // EHS / safety
  "hse officer": "ehs manager",
  "environmental manager": "ehs manager",
  "osha specialist": "safety manager",
  // Sales
  "chief sales officer": "chief sales officer",
  "inside sales manager": "sales manager",
  "bdr": "business development representative",
  "business development rep": "business development representative",
  // Customer service
  "customer support agent": "customer service representative",
  "customer service manager": "customer service manager",
  "customer service director": "customer service manager",
  "call center manager": "customer service manager",
  // IT support
  "tier 1 support": "it support specialist",
  "tier 2 support": "it support specialist",
  // Project management
  "software project manager": "project manager",
  // FP&A (additional preprocessed forms)
  "vp of fpa": "financial planning analyst",
  "director of fpa": "financial planning analyst",
  // Marketing
  "vp of product marketing": "product marketing manager",
  "director of demand generation": "demand generation manager",
  "head of brand": "brand manager",
  // HR / People
  "vp of talent": "chief human resources officer",
  "head of talent": "chief human resources officer",
  // IT leadership
  "vp of it": "chief information officer",
  "head of it": "it director",
  "infrastructure manager": "it manager",
  // Social work
  "child welfare worker": "social worker",
  "adult protective services": "social worker",
  "foster care coordinator": "social worker",
  "adoption specialist": "social worker",
  // Research
  "post doctoral researcher": "research scientist",
  "postdoctoral researcher": "research scientist",
  // Manufacturing
  "manufacturing manager": "manufacturing manager",
  "manufacturing director": "manufacturing manager",
  "process improvement engineer": "manufacturing engineer",
  "value stream manager": "manufacturing manager",
  // Automation / manufacturing
  "factory automation engineer": "automation engineer",
  "mechatronics engineer": "mechanical engineer",
  // Data
  "data lake engineer": "data engineer",
  "dataops engineer": "data engineer",
  // Sales management
  "sdr manager": "sales manager",
  "bdr manager": "sales manager",
  // Business development
  "head of business development": "business development manager",
  "vp of business development": "business development manager",
  // HR analytics
  "workforce analyst": "hr analyst",
  // Revenue ops
  "gtm analyst": "revenue operations manager",
  // Legal ops
  "legal ops manager": "legal operations manager",
  // Contracts
  "contracts manager": "contract manager",
  // Marketing creator
  "creator partnership manager": "influencer marketing manager",
  // UX accessibility
  "accessibility engineer": "ux designer",
  // Clinical
  "study coordinator": "clinical research associate",
  "irb coordinator": "clinical research associate",
  // Regulatory
  "regulatory submission specialist": "regulatory affairs specialist",
  // Drug safety
  "drug safety associate": "pharmacovigilance specialist",
  // Design
  "brand identity designer": "graphic designer",
  // Product (override web3 blockchain match)
  "web3 product manager": "product manager",
  // Content creators
  "youtuber": "content creator",
  "streamer": "content creator",
  "twitch streamer": "content creator",

  // ── Round 116 ──
  // C-suite gaps
  "chief ai officer": "chief technology officer",
  "chief digital officer": "chief technology officer",
  "chief growth officer": "chief marketing officer",
  "chief commercial officer": "chief sales officer",
  "chief client officer": "chief customer officer",
  "chief transformation officer": "chief operating officer",
  // UX research
  "user research analyst": "ux researcher",
  "ux strategist": "ux researcher",
  // Finance
  "budget analyst": "financial analyst",
  "cost analyst": "financial analyst",
  "price analyst": "financial analyst",
  "pricing analyst": "pricing analyst",
  "revenue growth manager": "revenue operations manager",
  "equity analyst": "equity research analyst",
  "securities analyst": "equity research analyst",
  "corporate finance manager": "financial analyst",
  // Sales engineering
  "customer solutions engineer": "sales engineer",
  "technical solutions engineer": "sales engineer",
  "field application engineer": "sales engineer",
  // Healthcare admin
  "hospital administrator": "hospital administrator",
  "healthcare administrator": "hospital administrator",
  "practice manager": "hospital administrator",
  // Marketing tools
  "hubspot specialist": "marketing specialist",
  "marketo specialist": "marketing specialist",
  "pardot specialist": "marketing specialist",
  // BI / reporting
  "data visualization specialist": "bi developer",
  "reporting analyst": "bi developer",
  "reporting manager": "bi developer",
  "microstrategy developer": "bi developer",
  // Healthcare tech
  "or tech": "surgical technologist",
  "echo tech": "ultrasound technician",
  "vascular tech": "ultrasound technician",
  "neuro tech": "eeg technician",
  // Allied health
  "pt assistant": "physical therapist",
  "rehab specialist": "physical therapist",
  "rehab manager": "physical therapist",
  // Education
  "stem coordinator": "teacher",
  "special education coordinator": "special education teacher",
  "school administrator": "school principal",
  // Digital marketing
  "digital strategist": "digital marketing manager",
  "digital analyst": "digital marketing manager",
  "web analytics specialist": "digital marketing manager",
  "google analytics specialist": "digital marketing manager",
  // Writing / communications
  "technical editor": "technical writer",
  "technical content writer": "technical writer",
  "scientific writer": "technical writer",
  "communications director": "communications manager",
  "vp of communications": "communications manager",

  // ── Round 125 ──
  // 2-char abbreviation aliases (not in AMBIGUOUS_ENGLISH)
  "bi": "bi developer",

  // ── Round 124 ──
  // Sales leadership (override "inside sales" endsWith match)
  "director of inside sales": "sales manager",
  "vp of inside sales": "sales manager",
  "sales enablement manager": "sales enablement manager",
  "sales enablement specialist": "sales enablement manager",
  // Technology director (not a software engineer)
  "technology director": "it director",
  // SOX / compliance
  "sox analyst": "compliance analyst",
  "sox manager": "compliance manager",
  "sox auditor": "compliance auditor",
  // Warehouse / fulfillment (more granular)
  "warehouse associate": "warehouse associate",
  "warehouse worker": "warehouse associate",
  "distribution center manager": "warehouse manager",
  "distribution manager": "warehouse manager",
  "fulfillment manager": "fulfillment manager",
  "fulfillment specialist": "fulfillment specialist",
  "fulfillment associate": "warehouse associate",

  // ── Round 123 ──
  // Design titles
  "user interface designer": "ui designer",
  "junior designer": "graphic designer",
  "senior designer": "senior designer",
  // Ad/media buying
  "programmatic manager": "programmatic manager",
  "display advertising manager": "display advertising manager",
  "digital advertising manager": "digital marketing manager",
  // Customer support
  "contact center agent": "customer service representative",
  "contact center manager": "customer service manager",
  "escalation manager": "customer service manager",
  // Pharma / med device
  "clinical specialist": "clinical specialist",
  "medical device sales rep": "medical device sales representative",
  "medical device sales representative": "medical device sales representative",
  // Nonprofit / fundraising
  "development associate": "development associate",
  "grant coordinator": "grant writer",
  // Real estate
  "real estate acquisitions analyst": "real estate analyst",
  "real estate acquisitions manager": "real estate analyst",
  // Community / HOA
  "community association manager": "property manager",

  // ── Round 122 ──
  // Gaming / esports
  "esports manager": "esports manager",
  // Finance / banking overrides
  "mortgage banker": "mortgage broker",
  "loan underwriter": "loan underwriter",
  "credit union manager": "credit union manager",
  "bank manager": "branch manager",
  // Healthcare admin
  "medical office manager": "medical office manager",
  "clinic manager": "hospital administrator",
  "clinic director": "hospital administrator",
  "patient access representative": "patient access representative",
  "patient services coordinator": "patient services coordinator",
  // Sports
  "athletic director": "athletic director",
  "sports director": "athletic director",
  // ESG / sustainability specifics
  "esg analyst": "esg analyst",
  "esg manager": "esg analyst",
  "sustainability analyst": "sustainability analyst",

  // ── Round 121 ──
  // Education
  "dean of students": "dean of students",
  "assistant dean": "dean of students",
  "esl teacher": "esl teacher",
  "efl teacher": "esl teacher",
  // Food service
  "food service manager": "food service manager",
  "food service director": "food service manager",
  "catering coordinator": "catering manager",
  // Fitness
  "pilates instructor": "pilates instructor",
  // Trades
  "electrical contractor": "electrician",
  "electrical subcontractor": "electrician",

  // ── Round 120 ──
  // VP-level overrides (prevent falling through to wrong C-suite)
  "vp of design": "vp of design",
  "vp of finance": "vp of finance",
  "vp of hr": "hr director",
  "vp of people": "hr director",
  "vice president of finance": "vp of finance",
  "vice president of design": "vp of design",
  // Head-of overrides
  "head of data": "chief data officer",
  "head of legal": "general counsel",
  "head of growth": "head of growth",
  // Security
  "security operations analyst": "security analyst",
  "penetration tester": "penetration tester",
  "red team engineer": "red team engineer",
  "pentest engineer": "penetration tester",
  // Finance
  "budget manager": "budget manager",
  "fpa manager": "financial planning analyst",
  "fpa analyst": "financial planning analyst",
  "cash flow analyst": "financial analyst",

  // ── Round 119 ──
  // Engineering truncation fixes
  "aeronautical engineer": "aeronautical engineer",
  "instrumentation engineer": "instrumentation engineer",
  "process control engineer": "controls engineer",
  "piping engineer": "piping engineer",
  "pipeline engineer": "pipeline engineer",
  // Data / product management
  "data product manager": "product manager",
  "master data manager": "data governance analyst",
  // CX / insights
  "voice of customer analyst": "customer insights analyst",
  "nps manager": "customer experience manager",
  "customer insights manager": "customer insights manager",
  "customer insights analyst": "customer insights analyst",
  // Counseling / therapy
  "career counselor": "career counselor",
  "addiction counselor": "substance abuse counselor",
  "family therapist": "family therapist",
  "marriage and family therapist": "family therapist",
  "mental health technician": "mental health technician",
  // Nursing specialties
  "geriatric nurse": "geriatric nurse",
  "or nurse": "or nurse",
  "perioperative nurse": "or nurse",
  // Retail
  "sales associate": "retail associate",
  "store associate": "retail associate",
  // Admin / document
  "document controller": "document controller",
  "records manager": "records manager",

  // ── Round 118 ──
  // HR / talent specifics
  "organizational development specialist": "organizational development specialist",
  "total rewards specialist": "total rewards specialist",
  "workforce planning manager": "workforce planning manager",
  "succession planning manager": "succession planning manager",
  "hris analyst": "hris analyst",
  "hris manager": "hris manager",
  // IT
  "it analyst": "it analyst",
  // Marketing specializations
  "affiliate manager": "affiliate marketing manager",
  "lifecycle marketing manager": "lifecycle marketing manager",
  "retention marketing manager": "retention marketing manager",
  "loyalty manager": "loyalty manager",
  "trade marketing manager": "trade marketing manager",
  "shopper marketing manager": "shopper marketing manager",
  // Ops / quality
  "continuous improvement manager": "continuous improvement manager",
  "continuous improvement engineer": "continuous improvement manager",
  "lean manager": "lean manager",
  "lean engineer": "lean engineer",
  // IT / infra
  "disaster recovery engineer": "disaster recovery engineer",
  "storage engineer": "storage engineer",
  // Healthcare
  "palliative care specialist": "palliative care specialist",
  "palliative care nurse": "palliative care specialist",

  // ── Round 117 ──
  // Privacy / compliance
  "data privacy manager": "privacy officer",
  "gdpr specialist": "privacy officer",
  "gdpr manager": "privacy officer",
  "data protection manager": "privacy officer",
  // Payments
  "payment operations manager": "payment operations manager",
  "payment processing specialist": "payment processing specialist",
  "merchant services rep": "sales representative",
  "merchant services representative": "sales representative",
  // Insurance / risk
  "loss control consultant": "risk analyst",
  "loss prevention analyst": "loss prevention manager",
  // Program / project mgmt distinction
  "program coordinator": "program coordinator",
  "program administrator": "program coordinator",
  // Aviation
  "aviation mechanic": "aviation mechanic",
  "aircraft mechanic": "aviation mechanic",
  "airframe mechanic": "aviation mechanic",
  // Public safety / government
  "border patrol agent": "law enforcement officer",
  "customs officer": "customs officer",
  // Energy / utilities
  "power plant operator": "power plant operator",
  "plant operator": "power plant operator",
  "utility operator": "power plant operator",
  // Biotech / pharma
  "process development scientist": "research scientist",
  "process scientist": "research scientist",
  // Media specific
  "photojournalist": "photojournalist",
  "news anchor": "news anchor",
  "broadcast journalist": "broadcast journalist",
  "sports reporter": "sports reporter",
  "copy editor": "copy editor",
  "managing editor": "managing editor",
  "editor in chief": "editor in chief",
  // Round 126 — head-of / vp-of clarifications (passthru for titles already searchable)
  "head of sales development": "head of sales development",  // prevents "head of sales" startsWith match
  "head of technology":  "chief technology officer",
  "head of it":          "it director",
  "head of digital":     "chief digital officer",
  "vp of product management": "vp of product management",
};

// ── Explicit industry patterns (only fire when user says the INDUSTRY, not a job title) ──
// e.g. "healthcare jobs", "jobs in tech", "finance sector", "in financial services"
export const EXPLICIT_INDUSTRY_PATTERNS = [
  { cat:"Healthcare",            rx:/\b(healthcare|health\s*care)(\s+(jobs?|roles?|positions?|work|industry|sector|field|opportunities?|services?))?\b/i },
  { cat:"Healthcare",            rx:/\bmedical\s+(jobs?|roles?|positions?|work|industry|sector|field|opportunities?|services?)\b/i },
  { cat:"Technology",           rx:/\b(tech(nology)?|information\s+technology|software|it)\s+(jobs?|roles?|positions?|work|industry|sector|field|space|opportunities?|services?|companies?)\b/i },
  { cat:"Technology",           rx:/\b(government|public\s+sector|federal|municipal)\s+(it|tech(nology)?|software)\s+(jobs?|roles?|work)?\b/i },
  // Bare-word industry triggers (no trailing "jobs/roles" required — consistent with Healthcare above)
  { cat:"Financial Services",  rx:/\b(finance|banking|fintech)(\s+(jobs?|roles?|positions?|work|industry|sector|field|opportunities?|services?))?\b/i },
  { cat:"Financial Services",  rx:/\b(financial|accounting)(\s+(jobs?|roles?|positions?|work|industry|sector|field|opportunities?|services?))?\b(?!\s+(?:analyst|manager|controller|advisor|planner|engineer|specialist|director|officer|consultant))/i },
  // Transition phrases: "switch to finance", "change to banking"
  { cat:"Financial Services",  rx:/\b(switch|change|pivot|move|transition|go)\s+to\s+(finance|banking|accounting|fintech)\b/i },
  { cat:"Technology",           rx:/\b(switch|change|pivot|move|transition|go)\s+to\s+(tech(nology)?|software|it|engineering)\b/i },
  { cat:"Healthcare",            rx:/\b(switch|change|pivot|move|transition|go)\s+to\s+(healthcare|health\s*care|medical|nursing|clinical)\b/i },
  { cat:"Marketing & Advertising",     rx:/\b(marketing\s*&\s*advertising)\s+(jobs?|roles?|positions?|work|industry|sector|field|opportunities?)?\b/i },
  { cat:"Marketing & Advertising",     rx:/\b(?:digital\s+)?(?:marketing|advertising|sales)\s+(jobs?|roles?|positions?|work|industry|sector|field|opportunities?)\b/i },
  { cat:"Education",             rx:/\b(education|academic|teaching)\s+(jobs?|roles?|positions?|work|industry|sector|field|opportunities?)\b/i },
  { cat:"Transportation & Logistics", rx:/\b(logistics|transport(ation)?|shipping|supply\s*chain)\s+(jobs?|roles?|positions?|work|industry|sector|opportunities?|services?)\b/i },
  { cat:"Hospitality",           rx:/\b(hospitality)\s+(jobs?|roles?|positions?|work|industry|sector|field|opportunities?)\b/i },
  { cat:"Manufacturing",  rx:/\b(manufacturing|factory|production)\s+(jobs?|roles?|positions?|work|industry|sector|opportunities?)\b/i },
  { cat:"Construction & Infrastructure",        rx:/\b(construction\s*(?:&\s*)?infrastructure|construction|infrastructure|trades?)\s+(jobs?|roles?|positions?|work|industry|sector|field|opportunities?)\b/i },
  { cat:"AI",                    rx:/\b(artificial\s+intelligence|machine\s+learning)\s+(jobs?|roles?|positions?|work|industry|sector|field|opportunities?)\b/i },
  { cat:"Consulting",            rx:/\b(consulting|advisory)\s+(jobs?|roles?|positions?|work|industry|sector|opportunities?|firms?)\b/i },
  { cat:"Marketing & Advertising",     rx:/\b(retail|e[\s-]?commerce|ecommerce|consumer\s+goods)\s+(jobs?|roles?|positions?|work|industry|sector|opportunities?)\b/i },
  { cat:"Government & Public Sector",           rx:/\b(government|public\s+sector|federal|municipal|defense|military|civil\s+service)\s+(jobs?|roles?|positions?|work|industry|sector|opportunities?)\b/i },
  { cat:"Technology",           rx:/\b(startup|startups?|tech\s+startup|saas(?:\s+company)?|software\s+company)\s+(jobs?|roles?|positions?|work|industry|sector|opportunities?)\b/i },
  { cat:"Manufacturing",  rx:/\b(automotive|auto|car\s+industry|vehicle)\s+(jobs?|roles?|positions?|work|industry|sector|opportunities?)\b/i },
  { cat:"Healthcare",            rx:/\b(pharma(ceutical)?|biotech|life\s+sciences?|biopharma)\s+(jobs?|roles?|positions?|work|industry|sector|opportunities?)\b/i },
  { cat:"Financial Services",  rx:/\b(real\s+estate|property|mortgage|realty)\s+(jobs?|roles?|positions?|work|industry|sector|opportunities?)\b/i },
  { cat:"Marketing & Advertising",     rx:/\b(media|advertising|pr|public\s+relations)\s+(jobs?|roles?|positions?|work|industry|sector|field|opportunities?)\b/i },
  { cat:"Technology",           rx:/\b(legal\s*tech|legaltech|lawtech)\s+(jobs?|roles?|positions?|work|industry|sector|opportunities?)\b/i },
  { cat:"Financial Services",  rx:/\b(legal|law\s+firm|law)\s+(jobs?|roles?|positions?|work|industry|sector|field|opportunities?)\b/i },
  { cat:"Financial Services",  rx:/\b(non[\s-]?profit|nonprofit|ngo|charity|third\s+sector)\s+(jobs?|roles?|positions?|work|industry|sector|opportunities?)\b/i },
  { cat:"Financial Services",  rx:/\b(crypto(currency)?|blockchain|web3|defi|nft)\s+(jobs?|roles?|positions?|work|industry|sector|opportunities?)\b/i },
  // ── Round 130 additions ─────────────────────────────────────────────────────
  { cat:"Financial Services",    rx:/\b(insurance)\s+(jobs?|roles?|positions?|work|industry|sector|field|opportunities?)\b/i },
  { cat:"Technology",             rx:/\b(telecom(munications?)?)\s+(jobs?|roles?|positions?|work|industry|sector|field|opportunities?)\b/i },
  { cat:"Media & Entertainment",  rx:/\b(entertainment|gaming)\s+(jobs?|roles?|positions?|work|industry|sector|field|opportunities?)\b/i },
  { cat:"Media & Entertainment",  rx:/\bfilm\s+(jobs?|roles?|positions?|work|industry|sector|field|opportunities?)\b/i },
  { cat:"Energy & Utilities",     rx:/\b(energy|oil\s+(?:and|&)\s+gas|utilities?|renewable\s+energy|solar\s+energy|petroleum|power\s+sector)\s+(jobs?|roles?|positions?|work|industry|sector|field|opportunities?)\b/i },
];

// ── Main NLP parser ───────────────────────────────────────────
export function parseJobQuery(rawQuery) {
  // categoryExplicit = true only when user ASKED for an industry, not inferred from a job title
  const result = { keyword:null, location:null, experience:null, employmentType:null, workSchedule:null, category:null, categoryExplicit:false, roleType:null, salaryMin:null, salaryMax:null };
  if (!rawQuery || !rawQuery.trim()) return result;

  // Early exit for conversational / non-job queries
  const greetingRx = /^(?:hi+|hello+|hey+|good\s+(?:morning|afternoon|evening|day)|what\s+can\s+you\s+do|how\s+are\s+you|thanks?|thank\s+you|goodbye|bye+|yo+)\s*[!?.]*$/i;
  if (greetingRx.test(rawQuery.trim())) return result;

  // Normalise: fix typos, replace punctuation-as-separators (e.g. "engineer...chicago")
  // Also normalise city abbreviations and role plurals
  let q = normaliseTypos(rawQuery).replace(/[.…]{2,}/g, " ");
  // Normalize special tech language names BEFORE stripping punctuation
  q = q.replace(/\bc\+\+/gi, "cplusplus").replace(/\bc#/gi, "csharp")
       .replace(/\.net\b/gi, "dotnet").replace(/\bnode\.js\b/gi, "nodejs")
       .replace(/\breact\.js\b/gi, "reactjs").replace(/\bvue\.js\b/gi, "vuejs")
       .replace(/\bnext\.js\b/gi, "nextjs").replace(/\bnuxt\.js\b/gi, "nuxtjs");
  // Normalize finance/HR abbreviations BEFORE punctuation strip
  q = q.replace(/\bfp\s*&\s*a\b/gi, "fpa").replace(/\bm\s*&\s*a\b/gi, "mergers and acquisitions")
       .replace(/\bl\s*&\s*d\b/gi, "learning and development");
  // Normalize domain-jargon compound terms BEFORE punctuation strip
  q = q.replace(/\bpre[\s-]?ipo\b/gi, "preipo")
       .replace(/\bscale[\s-]?up\b/gi, "scaleup")
       .replace(/\bseries\s+[ab]\b/gi, "seriesa")
       .replace(/\bfortune\s+500\b/gi, "fortune500")
       .replace(/\bwork[\s-]life\b/gi, "worklife");
  // Normalize work-authorization terms BEFORE punctuation strip
  q = q.replace(/\bh[\s-]?1[\s-]?b\b/gi, "h1bvisa")
       .replace(/\bl[\s-]?1\b/gi, "l1visa")
       .replace(/\bo[\s-]?1\b/gi, "o1visa")
       .replace(/\bopt\b/gi, "optvisa")
       .replace(/\bcpt\b/gi, "cptvisa")
       .replace(/\bean\b/gi, "eancard");   // EAD = Employment Authorization Document
  // Normalize "switch/pivot from X to management" before parsing
  q = q.replace(/\b(?:switch|pivot|transition|move)\s+from\s+(?:coding|engineering|developer?|tech|software)\s+to\s+(?:management|managing|manager)\b/gi, "engineering manager role")
       .replace(/\bwhat\s+if\s+i\s+wanted?\s+to\s+(?:switch\s+to|be\s+a?|do)\s+(?:management|manager)\b/gi, "engineering manager role");
  // Normalize abbreviated titles: "Sr." → "senior", "Dir." → "director", "VP," → "VP of", "Mgr." → "manager"
  q = q.replace(/\bsr\.\s*/gi, "senior ").replace(/\bjr\.\s*/gi, "junior ")
       .replace(/\bdir\.\s*/gi, "director ")
       .replace(/\bmgr\.\s*/gi, "manager ").replace(/\bvp,\s*/gi, "VP of ")
       .replace(/\bvp\s+(engineering|product|sales|marketing|data|finance|operations|hr|people|growth|design|security|analytics)\b/gi, "VP of $1");
  // City & country abbreviations → full names (before stripping punctuation)
  q = q.replace(/\bnyc\b/gi, "New York").replace(/\bla\b(?!\s*\w)/gi, "Los Angeles")
       .replace(/\bsf\b/gi, "San Francisco").replace(/\bdc\b/gi, "Washington DC")
       .replace(/\bchi\b/gi, "Chicago").replace(/\bsg\b/gi, "Singapore")
       .replace(/\bsilicon\s+valley\b/gi, "San Francisco")
       .replace(/\bbay\s+area\b/gi, "San Francisco")
       .replace(/\bpnw\b/gi, "Seattle")
       .replace(/\bsocal\b/gi, "Los Angeles")
       .replace(/\bsouth\s+bay\b/gi, "San Jose");
  // Country → representative major city (for location extraction)
  q = q.replace(/\buk\b/gi, "London")
       .replace(/\bindia\b/gi, "Bangalore")
       .replace(/\baustralia\b/gi, "Sydney")
       .replace(/\bgermany\b/gi, "Berlin")
       .replace(/\bjapan\b/gi, "Tokyo")
       .replace(/\bcanada\b(?!\s*(goose|dry|tire))/gi, "Toronto")
       .replace(/\buae\b/gi, "Dubai")
       .replace(/\bsaudi\b/gi, "Riyadh")
       .replace(/\bnigeria\b/gi, "Lagos")
       .replace(/\bfrance\b/gi, "Paris")
       .replace(/\bmexico\b/gi, "Mexico City")
       .replace(/\bbrazil\b/gi, "Sao Paulo")
       .replace(/\bsouth\s+korea\b/gi, "Seoul")
       .replace(/\bphilippines\b/gi, "Manila")
       .replace(/\bthailand\b/gi, "Bangkok")
       .replace(/\bindonesia\b/gi, "Jakarta")
       .replace(/\bmalaysia\b/gi, "Kuala Lumpur")
       .replace(/\bchina\b/gi, "Shanghai")
       .replace(/\bpakistan\b/gi, "Karachi")
       .replace(/\bkenya\b/gi, "Nairobi")
       .replace(/\bsouth\s+africa\b/gi, "Johannesburg")
       .replace(/\begypt\b/gi, "Cairo")
       .replace(/\bturkey\b/gi, "Istanbul")
       .replace(/\bbangladesh\b/gi, "Dhaka");
  // US state abbreviations → major cities (only when used as location signals)
  q = q.replace(/\bjobs?\s+in\s+il\b/gi, "jobs in Chicago")
       .replace(/\bjobs?\s+in\s+wa\b/gi, "jobs in Seattle")
       .replace(/\bjobs?\s+in\s+tx\b/gi, "jobs in Austin")
       .replace(/\bjobs?\s+in\s+ca\b/gi, "jobs in Los Angeles")
       .replace(/\bjobs?\s+in\s+ma\b/gi, "jobs in Boston")
       .replace(/\bjobs?\s+in\s+ga\b/gi, "jobs in Atlanta")
       .replace(/\bjobs?\s+in\s+co\b/gi, "jobs in Denver")
       .replace(/\bjobs?\s+in\s+fl\b/gi, "jobs in Miami");
  // US state names → representative major cities (only common state names in job search context)
  q = q.replace(/\bcalifornia\b/gi, "Los Angeles")
       .replace(/\btexas\b/gi, "Austin")
       .replace(/\bnew\s+york\s+state\b/gi, "New York")
       .replace(/\bwashington\s+state\b/gi, "Seattle")
       .replace(/\boregon\b/gi, "Portland")
       .replace(/\bflorida\b/gi, "Miami")
       .replace(/\bgeorgia\b/gi, "Atlanta")
       .replace(/\billlinois\b/gi, "Chicago")
       .replace(/\bminnesota\b/gi, "Minneapolis")
       .replace(/\bcolorado\b/gi, "Denver")
       .replace(/\bpennsylvania\b/gi, "Pittsburgh")
       .replace(/\bohio\b/gi, "Columbus");
  // Strip negation phrases before employment/location extraction
  // "not remote", "not in X city", "not hybrid", "not on-site"
  q = q.replace(/\bnot\s+(?:remote|wfh|work[\s-]+from[\s-]+home|hybrid|on[\s-]?site|onsite|in\s+office)\b/gi, "");
  q = q.replace(/\bnot\s+in\s+[A-Za-z]+(?:\s+[A-Za-z]+)?\b/g, "");
  // Strip "not [tech/role]" exclusions — "Python developer not C++" → keep "Python developer"
  q = q.replace(/\bnot\s+(?:a\s+)?(?:c\+\+|cpp|cplusplus|csharp|java(?:script)?|python|ruby|go|rust|swift|kotlin|php|scala|perl|haskell|r\b|matlab|objective[\s-]*c)\b/gi, "");
  q = q.replace(/\bnot\s+(?:a\s+)?(?:manager|director|lead|executive|vp|head|chief|consultant|advisor)\b/gi, "");
  q = q.trim();

  // Strip "OR Y" alternative role clauses — take only the first option (not "and" — avoids breaking compound titles like "Sales and Marketing Manager")
  q = q.replace(/\s+or\s+(?:\w+\s+)*(engineer|developer|scientist|analyst|manager|designer|architect|specialist|coordinator)\b.*/i, "").trim();
  // Strip "or [city]" alternatives (keep first city)
  q = q.replace(/\s+or\s+[A-Z][a-zA-Z]+(?:\s+[A-Z][a-zA-Z]+)?\b(?=\s*$)/g, "").trim();

  // Salary — extract BEFORE stripping punctuation (so $50K-$70K works)
  const rawForSalary = q.toLowerCase();
  // Hourly rate ranges: "$30-$40/hr", "$30-$40 per hour", "$30/hr" — annualise at 2080 hrs/yr
  // Also handles "N dollars per hour" and "N bucks per hour"
  const salHourlyRangeM = rawForSalary.match(/\$?\s*(\d+)\s*[-–]\s*\$?\s*(\d+)\s*(?:(?:dollars?|bucks?)?\s*\/\s*(?:hr|hour)|(?:dollars?|bucks?)?\s+per\s+hour|hourly)/i);
  if (salHourlyRangeM) {
    result.salaryMin = parseInt(salHourlyRangeM[1]) * 2080;
    result.salaryMax = parseInt(salHourlyRangeM[2]) * 2080;
  } else {
    const salHourlyM = rawForSalary.match(/\$?\s*(\d+)\s*(?:(?:dollars?|bucks?)?\s*\/\s*(?:hr|hour)|(?:dollars?|bucks?)\s+(?:a|per)\s+hour|per\s+hour|hourly)/i);
    if (salHourlyM) result.salaryMin = parseInt(salHourlyM[1]) * 2080;
  }
  // Six / seven figure shorthand
  if (!result.salaryMin && /\bsix[\s-]?figures?\b/i.test(rawForSalary)) result.salaryMin = 100000;
  if (!result.salaryMin && /\bseven[\s-]?figures?\b/i.test(rawForSalary)) result.salaryMin = 1000000;
  // Annual K-range patterns
  if (!result.salaryMin && !result.salaryMax) {
    // "between $80,000 and $120,000" — comma-formatted full numbers
    const commaRangeM = rawForSalary.match(/between\s+\$?\s*(\d{1,3}),(\d{3})\s+and\s+\$?\s*(\d{1,3}),(\d{3})/i);
    if (commaRangeM) {
      result.salaryMin = parseInt(commaRangeM[1]) * 1000 + parseInt(commaRangeM[2]);
      result.salaryMax = parseInt(commaRangeM[3]) * 1000 + parseInt(commaRangeM[4]);
    }
    const salRangeM = !result.salaryMin && (
                     rawForSalary.match(/between\s+\$?\s*(\d+)\s*k?\s+and\s+\$?\s*(\d+)\s*k/i)
                   || rawForSalary.match(/between\s+\$?\s*(\d+)\s+and\s+(\d+)\s+thousand/i)
                   || rawForSalary.match(/\$?\s*(\d+)\s*k\s*[-–to]+\s*\$?\s*(\d+)\s*k/i)
                   // "90-120k" — first number without k, second with k
                   || rawForSalary.match(/\$?\s*(\d{2,3})\s*[-–]\s*\$?\s*(\d{2,3})\s*k\b/i)
                   || rawForSalary.match(/\$?\s*(\d+)\s*,?\s*000\s*[-–to]+\s*\$?\s*(\d+)\s*,?\s*000/i));
    if (salRangeM) {
      const multiplier = salRangeM[0].match(/thousand/i) ? 1000 : (salRangeM[0].includes(',000') && !salRangeM[0].includes('k') ? 1 : 1000);
      result.salaryMin = parseInt(salRangeM[1]) * multiplier;
      result.salaryMax = parseInt(salRangeM[2]) * multiplier;
    } else if (!result.salaryMin) {
      const salMinM = rawForSalary.match(/(?:above|at\s+least|minimum|min|over|more\s+than|compensation\s+(?:of|above)?)\s+\$?\s*(\d+)\s*k/i)
                   || rawForSalary.match(/\$?\s*(\d+)\s*k\+/i)
                   // "salary [number]" or "salary of [number]" (bare integer without k)
                   || rawForSalary.match(/(?:salary|pay|compensation|wage)\s+(?:of\s+)?(?:above|over|min(?:imum)?\s+)?(\d{4,6})\b/i)
                   // "salary NNNk" — amount after salary keyword with k suffix
                   || rawForSalary.match(/(?:salary|pay|compensation)\s+(?:of\s+)?\$?(\d+)\s*k\b/i)
                   // "$NNNk" or "NNNk per year/annually" — standalone salary amount
                   || rawForSalary.match(/\$\s*(\d+)\s*k\b/i)
                   || rawForSalary.match(/\b(\d+)\s*k\s+(?:per\s+year|annually|a\s+year|p\.?a\.?)\b/i)
                   // "minimum salary NNNNN"
                   || rawForSalary.match(/(?:minimum|min)\s+salary\s+\$?\s*(\d{4,6})\b/i)
                   // "NNNNNN salary" or "NNNk salary" — number/amount before salary keyword
                   || rawForSalary.match(/\b(\d{5,6})\s+(?:salary|pay|compensation)\b/i)
                   || rawForSalary.match(/\b(\d+)\s*k\s+(?:salary|pay|compensation|per\s+year|annually|a\s+year)\b/i)
                   // "N thousand a year" — e.g. "60 thousand a year"
                   || rawForSalary.match(/\b(\d+)\s+thousand\s+(?:a\s+year|per\s+year|annually|dollars?)?\b/i)
                   // "Nk minimum" or standalone "Nk" as last resort (salary context)
                   || rawForSalary.match(/\b(\d{2,3})\s*k\s+(?:minimum|min|at\s+least|or\s+more)\b/i)
                   || rawForSalary.match(/\b(\d{2,3})\s*k\b(?:\s*$)/i)
                   // "Nk" not followed by non-salary context words — standalone salary amount
                   || rawForSalary.match(/\b(\d{2,3})\s*k\b(?!\s*(?:years?|yrs?|months?|views?|users?|downloads?|words?|miles?|rows?|records?|followers?))/i);
      if (salMinM) {
        const isThousand = salMinM[0].includes("thousand");
        const isK        = !!salMinM[0].match(/\d+\s*k/);
        result.salaryMin = parseInt(salMinM[1]) * (isThousand || isK ? 1000 : 1);
      }
      // "Around/roughly/approximately Nk" — approximate salary → create a ±5% range
      if (!result.salaryMin) {
        const approxM = rawForSalary.match(/\b(?:around|roughly|approximately|about|circa)\s+\$?(\d+)\s*k\b/i)
                     || rawForSalary.match(/\b(?:around|roughly|approximately|about|circa)\s+\$?(\d+),?000\b/i);
        if (approxM) {
          const mid = parseInt(approxM[1]) * (approxM[0].includes(',000') && !approxM[0].includes('k') ? 1 : 1000);
          result.salaryMin = Math.round(mid * 0.95 / 1000) * 1000;
          result.salaryMax = Math.round(mid * 1.05 / 1000) * 1000;
        }
      }
      const salMaxM = rawForSalary.match(/(?:up\s+to|maximum|max|under|less\s+than|below)\s+\$?\s*(\d+)\s*k/i);
      if (salMaxM) result.salaryMax = parseInt(salMaxM[1]) * 1000;
    }
  }
  // Preserve "N+" constructs before stripping punctuation: "7+" → "7plus", "5+" → "5plus"
  q = q.replace(/\b(\d+)\+/g, "$1plus");
  q = q.replace(/[^\w\s]/g, " ");
  // Normalise common role plurals so patterns match (engineers → engineer, developers → developer)
  q = q.replace(/\b(engineers|developers|managers|nurses|designers|analysts|scientists|programmers|architects|specialists|consultants|directors|coordinators|recruiters|accountants|teachers|drivers|writers|marketers)\b/gi,
    w => w.replace(/s$/i, ""));
  q = q.replace(/\b(engineers|developers|managers|nurses|designers|analysts|scientists|programmers|architects|specialists|consultants|directors|coordinators|recruiters|accountants|teachers|drivers|writers|marketers)\b/gi,
    w => w.replace(/s$/i, ""));

  // Blue-collar shortcut — sets keyword AND category (industry is implicit for trades)
  // NOTE: only fires if the blue-collar keyword appears WITHOUT explicit industry-browsing context
  const isIndustryBrowse = /\b(industry|sector|field|opportunities?|roles?|positions?)\b/i.test(q);
  if (!isIndustryBrowse) {
    for (const { rx, kw, cat } of BLUE_COLLAR_MAP) {
      if (rx.test(q)) {
        result.keyword = kw;
        result.category = cat;
        result.categoryExplicit = true; // trades ARE inherently industry-specific
        break;
      }
    }
  }

  // Experience
  const expPatterns = [
    { rx:/\b(entry[\s-]?level?|fresher|new\s+grad(uate)?|fresh\s+grad(uate)?|no\s+experience|no\s+exp|0[\s-]+years?|recently\s+grad(uated)?|just\s+graduated|new\s+graduate|just\s+started|fresh\s+out\s+of|recent\s+grad(uate)?|no\s+experience\s+required|0[\s-]?[12][\s-]+(years?|yrs?))\b/i, val:"0-1 Years" },
    { rx:/\b(junior|entry\b|associate\b)\b/i,                                                          val:"0-1 Years" },
    { rx:/\b(internship|intern\b)/i,                                                                   val:"0-1 Years" },
    // Seniority words — placed EARLY so explicit year counts override them (since later wins)
    { rx:/\b(senior|sr\b|lead|principal|staff|experienced\b)/i,                                        val:"7-10 Years" },
    { rx:/\b(?:with\s+)?1[\s-]+years?(?:\s+(of\s+)?(exp|experience))?\b/i,                           val:"1-2 Years" },
    { rx:/\b(?:with\s+)?2[\s-]+years?(?:\s+(of\s+)?(?:\w+\s+)?(exp|experience))?\b/i,               val:"1-3 Years" },
    { rx:/\b(?:with\s+)?3[\s-]+years?(?:\s+(of\s+)?(?:\w+\s+)?(exp|experience))?\b/i,               val:"2-5 Years" },
    { rx:/\b(mid[\s-]?level?|intermediate|3[\s-]+to[\s-]+5)\b/i,                                     val:"2-5 Years" },
    { rx:/\b[34][\s-]+years?\s+(of\s+)?(exp|experience)/i,                                            val:"2-5 Years" },
    { rx:/\b3plus\s*(years?|yrs?)/i,                                                                   val:"2-5 Years" },
    { rx:/\b5[\s-]+(years?|yrs?)(\s+(of\s+)?(exp|experience))?\b/i,                                   val:"5-7 Years" },
    { rx:/\b(5plus|five\s+years?|5\s+plus\s+years?)/i,                                                val:"5-7 Years" },
    { rx:/\b6[\s-]+(years?|yrs?)/i,                                                                    val:"5-7 Years" },
    { rx:/\b4plus\s*(years?|yrs?)/i,                                                                   val:"2-5 Years" },
    { rx:/\b6plus\s*(years?|yrs?)/i,                                                                   val:"5-7 Years" },
    { rx:/\b7plus\s*(years?|yrs?)/i,                                                                   val:"7-10 Years" },
    { rx:/\b7[\s-]+(years?|yrs?)\b/i,                                                                  val:"7-10 Years" },
    { rx:/\b8plus\s*(years?|yrs?)/i,                                                                   val:"7-10 Years" },
    { rx:/\b9plus\s*(years?|yrs?)/i,                                                                   val:"7-10 Years" },
    { rx:/\b(1[1-9]plus|2\dplus)\s*(years?|yrs?)?/i,                                                  val:"10+ Years" },
    { rx:/\b([89][\s-]*(years?|yrs?))\b/i,                                                             val:"7-10 Years" },
    { rx:/\b([2-9]\d[\s-]*(years?|yrs?)(\s+(of\s+)?(exp|experience))?)\b/i, val:"10+ Years" },
    { rx:/\b(1[0-9][\s-]*(years?|yrs?)(\s+(of\s+)?(exp|experience))?|10plus\s*(years?|yrs?)?|10\+\s*(years?|yrs?)?|veteran|decade|ten\s+years?)\b/i, val:"10+ Years" },
    // Director / VP / C-level / Head of → senior enough to be 10+ years
    { rx:/\b(ceo|cfo|cto|coo|cmo|ciso|cpo|cro|cdo|director|vp\b|vice\s+president|c[\s-]?level|c[\s-]?suite|head\s+of\s+\w+|chief\s+(?:executive|operating|marketing|technology|financial|data|product|revenue|people|information\s+security))\b/i, val:"10+ Years" },
    // Bootcamp / short courses → entry level
    { rx:/\b(bootcamp|boot\s*camp|coding\s+bootcamp|certificate\s+program|self[\s-]?taught|graduate\s+program|graduate\s+scheme|grad\s+program)\b/i, val:"0-1 Years" },
    { rx:/^graduate\b/i,                                                                              val:"0-1 Years" },
    // Months of experience → entry level (1-11 months) or 1-2 years (12-23 months)
    { rx:/\b([1-9]|1[01])\s*months?\s+(?:of\s+)?(?:\w+\s+)*(?:experience|exp)\b/i,                  val:"0-1 Years" },
    { rx:/\b(1[2-9]|2[0-3])\s*months?\s+(?:of\s+)?(?:\w+\s+)*(?:experience|exp)\b/i,               val:"1-2 Years" },
    // Range patterns placed LAST so they win over individual-number matches
    { rx:/\b[01][\s-]*2\s*(years?|yrs?)\b/i,                                                          val:"0-1 Years" },   // 0-2 yrs → entry
    { rx:/\b3\s*[\s-]?\s*5\s*(years?|yrs?)\b/i,                                                       val:"2-5 Years" },   // 3-5 yrs
    { rx:/\b5\s*[\s-]?\s*(10|seven|8|9)\s*(years?|yrs?)\b/i,                                          val:"5-7 Years" },   // 5-10 yrs
    { rx:/\b7\s*[\s-]?\s*(10|12|15)\s*(years?|yrs?)\b/i,                                              val:"7-10 Years" },  // 7-10 yrs
  ];
  // Run ALL patterns — later (more specific) patterns override earlier ones
  for (const { rx, val } of expPatterns) { if (rx.test(q)) { result.experience = val; } }

  // Salary range extraction also done post-strip for "80k to 120k" natural patterns (no $ sign)
  if (!result.salaryMin && !result.salaryMax) {
    const salaryQ = q.toLowerCase();
    const rangeM = salaryQ.match(/between\s+(\d+)\s*k\s+and\s+(\d+)\s*k/i)
                || salaryQ.match(/(\d+)\s*k\s*(?:to)\s*(\d+)\s*k/i)
                || salaryQ.match(/(\d+)\s*,?\s*000\s*(?:to)\s*(\d+)\s*,?\s*000/i);
    if (rangeM) {
      result.salaryMin = parseInt(rangeM[1]) * (rangeM[0].includes('000') && !rangeM[0].includes('k') ? 1 : 1000);
      result.salaryMax = parseInt(rangeM[2]) * (rangeM[0].includes('000') && !rangeM[0].includes('k') ? 1 : 1000);
    } else {
      const minM = salaryQ.match(/(?:above|at\s+least|minimum|min|over|more\s+than)\s+(\d+)\s*k/i);
      if (minM) result.salaryMin = parseInt(minM[1]) * 1000;
      const maxM = salaryQ.match(/(?:up\s+to|maximum|max|under|less\s+than|below)\s+(\d+)\s*k/i);
      if (maxM) result.salaryMax = parseInt(maxM[1]) * 1000;
    }
  }

  // Detect "jobs in Remote" as a location context — when remote is used as a location phrase
  // (e.g. "Part-time jobs in Remote"), don't also set employment type to Remote.
  // Instead set location to "Remote" so the filter searches remote-eligible positions.
  const remoteAsLocation = /\b(?:jobs?|roles?|positions?|work|opportunities?)\s+in\s+remote\b|\bin\s+remote\b/i.test(q);
  if (remoteAsLocation && !result.location) result.location = "Remote";

  // Employment type — contract/freelance wins, then strong remote signals, then hybrid, then bare remote
  // Priority: contract > WFH/fully-remote > hybrid > full/part time > on-site > bare remote
  // Note: explicit schedule words (full-time, part-time) beat bare "remote" to handle
  // queries like "Part-time data analyst remote" correctly.
  if      (/\binternship\b|\bto\s+intern\b|\binterning\b|\bintern\s+at\b|\bgraduate\s+program\b/i.test(q)) result.employmentType = "Internship";
  else if (/\b(contract(or)?|freelance|gigs?\b|1099|consulting\s+role|independent\s+contractor|side\s+hustle|platform\s+work|temporary|temp\b|seasonal|casual\s+work|zero[\s-]hour)\b/i.test(q)) result.employmentType = "Contract";
  else if (/\b(work[\s-]+from[\s-]+home|wfh|work\s+at\s+home|fully\s+remote|from\s+anywhere|no\s+commute|telecommut|distributed\s+team|remotely)\b/i.test(q)) result.employmentType = "Remote";
  else if (/\bhybrid\b/i.test(q))                                                           result.employmentType = "Hybrid";
  else if (/\b(full[\s-]?time|ft\b)/i.test(q))                                              result.employmentType = "Full time";
  else if (/\b(part[\s-]?time|pt\b)/i.test(q))                                              result.employmentType = "Part time";
  else if (/\b(on[\s-]?site|onsite|in[\s-]?office|office[\s-]?based|office\s+job)\b/i.test(q)) result.employmentType = "On-site";
  else if (!remoteAsLocation && /\bremote\b/i.test(q))                                      result.employmentType = "Remote";

  // Work schedule
  if      (/\binternship\b|\bto\s+intern\b|\binterning\b|\bintern\s+at\b/i.test(q)) result.workSchedule = "Internship";
  else if (/\bfull[\s-]?time\b/i.test(q)) result.workSchedule = "Full time";
  else if (/\bpart[\s-]?time\b/i.test(q)) result.workSchedule = "Part time";
  else if (/\bweekend[s]?\s+only\b|\bweekends?\s+job|\bsaturday\s+(and\s+)?sunday\b/i.test(q)) result.workSchedule = "Weekend";
  // Clear "weekend" as a keyword — it's a schedule signal, not a job title
  if (result.keyword === "weekend") result.keyword = null;

  // "Want to work in X" — fires BEFORE categoryExplicit to set a specific role keyword
  if (!result.keyword) {
    // "CS graduates" = computer science, not customer success — null out so no keyword set
    if (/\bcs\s+grad(uate)?s?\b/i.test(q)) { result.keyword = null; }
    const industryRolePatterns = [
      { rx:/\bwant\s+(?:to\s+)?(?:work|get\s+a\s+job|find\s+a\s+job|a\s+job)\s+in\s+(?:finance|banking|accounting)\b/i,     kw:"financial analyst" },
      { rx:/\bwant\s+(?:to\s+)?(?:work|get\s+a\s+job|find\s+a\s+job)\s+in\s+(?:tech|technology|software)\b/i,               kw:"software engineer" },
      { rx:/\bwant\s+(?:to\s+)?(?:work|get\s+a\s+job|find\s+a\s+job)\s+in\s+(?:marketing)\b/i,                              kw:"marketing manager" },
      { rx:/\bwant\s+(?:to\s+)?(?:work|get\s+a\s+job|find\s+a\s+job)\s+in\s+(?:sales)\b/i,                                  kw:"sales representative" },
      { rx:/\bwant\s+(?:to\s+)?(?:work|get\s+a\s+job|find\s+a\s+job)\s+in\s+(?:hr|human\s+resources)\b/i,                   kw:"hr generalist" },
      { rx:/\bwant\s+(?:to\s+)?(?:a\s+job|work)\s+in\s+(?:healthcare|medicine|medical|health\s+care)\b/i,                   kw:"registered nurse" },
      { rx:/\bcareer\s+(?:in|change\s+to|switch\s+to)\s+(?:finance|banking|accounting)\b/i,                                   kw:"financial analyst" },
      { rx:/\bcareer\s+(?:in|change\s+to|switch\s+to)\s+(?:tech|technology|software|software\s+engineering|programming)\b/i, kw:"software engineer" },
      { rx:/\bcareer\s+(?:in|change\s+to|switch\s+to)\s+(?:data\s+science|machine\s+learning)\b/i,                           kw:"data scientist" },
      { rx:/\b(?:finance|banking)\s+in\s+(?:healthcare|pharma|insurance)\b/i,                                                  kw:"financial analyst" },
      { rx:/\b(?:it|tech)\s+(?:jobs?|roles?|work)\s+in\s+(?:banking|finance|insurance|healthcare)\b/i,                       kw:"software engineer" },
      { rx:/\b(?:looking|searching|seeking)\s+(?:for\s+)?(?:a\s+)?tech\s+(?:job|role|position|work)\b/i,                     kw:"software engineer" },
      { rx:/\bwant\s+(?:a\s+)?(?:tech|software|engineering)\s+(?:job|role|position)\b/i,                                      kw:"software engineer" },
      { rx:/\bwant\s+(?:to\s+)?(?:work|get\s+a\s+job|find\s+a\s+job|a\s+job)\s+in\s+construction\b/i,                        kw:"construction worker" },
      { rx:/\bwant\s+(?:to\s+)?(?:work|get\s+a\s+job|find\s+a\s+job|a\s+job)\s+in\s+(?:logistics|supply\s+chain|shipping|freight)\b/i, kw:"logistics coordinator" },
      { rx:/\bwant\s+(?:to\s+)?(?:work|get\s+a\s+job|find\s+a\s+job|a\s+job)\s+in\s+(?:hospitality|hotel|restaurant)\b/i,    kw:"hotel manager" },
    ];
    for (const { rx, kw } of industryRolePatterns) {
      if (rx.test(q)) { result.keyword = kw; break; }
    }
  }

  // Category — ONLY when user explicitly mentions an industry, not a job title
  for (const { cat, rx } of EXPLICIT_INDUSTRY_PATTERNS) {
    if (rx.test(q)) { result.category = cat; result.categoryExplicit = true; break; }
  }

  // Reverse-order industry patterns: "jobs in banking", "work in healthcare", "find tech jobs"
  if (!result.categoryExplicit) {
    const reverseIndustry = [
      { cat:"Financial Services",  rx:/\b(jobs?|work|roles?|positions?|careers?|something|opportunities?|looking\s+for)\s+(in|at|within)\s+(?:the\s+)?(banking|finance|financial|fintech|accounting|investment|legal|law)\b/i },
      { cat:"Healthcare",            rx:/\b(jobs?|work|roles?|positions?|careers?|something|opportunities?|looking\s+for)\s+(in|at|within)\s+(?:the\s+)?(healthcare|health\s*care|medical|hospital|clinical|nursing)\b/i },
      // "Finance [role]" and "Healthcare [role]" — industry as adjective prefix
      { cat:"Financial Services",  rx:/\b(finance|financial|banking|fintech|accounting)\s+(?:data\s+)?(?:analyst|accountant|manager|engineer|developer|consultant|advisor|specialist|director)\b/i },
      { cat:"Healthcare",            rx:/\b(healthcare|medical|clinical|hospital|health)\s+(?:software\s+)?(?:engineer|developer|analyst|it|technologist|specialist|director)\b/i },
      { cat:"Technology",           rx:/\b(jobs?|work|roles?|positions?|careers?|something|opportunities?|looking\s+for)\s+(in|at|within)\s+(tech(nology)?|software|it|information\s+technology)\b/i },
      { cat:"Marketing & Advertising",     rx:/\b(jobs?|work|roles?|positions?|careers?|something|opportunities?|looking\s+for)\s+(in|at|within)\s+(marketing|advertising|media|sales)\b/i },
      { cat:"Education",             rx:/\b(jobs?|work|roles?|positions?|careers?|something|opportunities?|looking\s+for)\s+(in|at|within)\s+(education|teaching|academic|schools?)\b/i },
      { cat:"Transportation & Logistics", rx:/\b(jobs?|work|roles?|positions?|careers?|something|opportunities?|looking\s+for)\s+(in|at|within)\s+(logistics|transport(ation)?|shipping|supply\s*chain)\b/i },
      { cat:"Manufacturing",  rx:/\b(jobs?|work|roles?|positions?|careers?|something|opportunities?|looking\s+for)\s+(in|at|within)\s+(manufacturing|production|factory)\b/i },
      { cat:"Consulting",            rx:/\b(jobs?|work|roles?|positions?|careers?|something|opportunities?|looking\s+for)\s+(in|at|within)\s+(consulting|advisory)\b/i },
      { cat:"Government & Public Sector", rx:/\b(jobs?|work|roles?|positions?|careers?|something|opportunities?|looking\s+for)\s+(in|at|within)\s+(government|public\s+sector|federal|municipal|defense|military)\b/i },
      { cat:"Construction & Infrastructure", rx:/\b(jobs?|work|roles?|positions?|careers?|something|opportunities?|looking\s+for)\s+(in|at|within)\s+(construction|infrastructure)\b/i },
    ];
    for (const { cat, rx } of reverseIndustry) {
      if (rx.test(q)) { result.category = cat; result.categoryExplicit = true; break; }
    }
  }

  // Role type
  for (const rt of ROLE_TYPES) {
    if (rt.rx.test(q)) { result.roleType = rt.label; break; }
  }

  // Location — knownCities FIRST (handles multi-word cities + abbreviation expansions)
  if (!result.location) {
    const ql = q.toLowerCase();
    for (const city of knownCities) {
      if (ql.includes(city) && !LOC_BLOCKLIST.has(city.toLowerCase())) {
        result.location = city === "remote" ? "Remote" : city.replace(/\b\w/g, c => c.toUpperCase());
        break;
      }
    }
  }
  // Regex fallback — for cities not in knownCities list
  if (!result.location) {
    const locPatterns = [
      // "in/near CityName" — only match 1-2 words (avoid over-greedily grabbing 3 unrelated words)
      /\b(?:in|near|around|based\s+in|located\s+in)\s+([A-Z][a-zA-Z]+(?:\s+[A-Z][a-zA-Z]+)?)\b/,
      // "City, ST" format (e.g. "Austin, TX")
      /\b([A-Z][a-zA-Z]+(?:\s+[A-Z][a-zA-Z]+)?),\s*([A-Z]{2})\b/,
    ];
    for (const rx of locPatterns) {
      const m = q.match(rx);
      if (m) {
        const city = (m[1] || m[0]).trim().toLowerCase().replace(/,$/, "");
        if (city.length > 3 && !LOC_BLOCKLIST.has(city)) {
          result.location = city.replace(/\b\w/g, c => c.toUpperCase());
          break;
        }
      }
    }
  }

  // Standalone "engineering" (no manager/director suffix) → software engineer
  if (!result.keyword && !result.categoryExplicit) {
    if (/\bengineering\b(?!\s+(manager|director|lead|head|vp|team|department))/i.test(q) &&
        !/\b(software|hardware|cloud|data|network|systems|embedded|platform)\s+engineering\b/i.test(q)) {
      // Only map bare "engineering" to software engineer when it's the main signal
      if (/^(engineering|engineering\s+jobs?|engineering\s+work|engineering\s+roles?)$/i.test(q.trim()) ||
          /\bengineering\s+(job|work|role|position)\b/i.test(q)) {
        result.keyword = "software engineer";
      }
    }
  }

  // ── Career-advice / informational question early-return ──────────────────────────
  // These queries look like job searches but are actually FAQ/advice questions.
  // Return early with null keyword (location/exp may still be extracted above).
  const careerAdvicePatterns = [
    /\bhow\s+(long|do\s+i|do\s+you|can\s+i)\s+(does?\s+it\s+take\s+to|become\s+a|get\s+into)\b/i,
    /\bwhat\s+(skills?|qualifications?|degree|education|certifications?)\s+(do\s+i|does\s+one|is|are)\s+(need|require|required|necessary)/i,
    /\bhow\s+to\s+(?:become\s+a?|break\s+into|get\s+into)\s+\w/i,
    /\bis\s+(?:a\s+)?[\w\s]+(?:a\s+good\s+career|hard\s+to\s+get|worth\s+it|in\s+high\s+demand)/i,
    /\b(what\s+does?\s+a\s+)[\w\s]+\s+do\s*\??$/i,
    // "Can I get a job without X" / "Can I get into X without a degree"
    /\bcan\s+i\s+(?:get|land|find|work\s+as)\s+(?:a\s+)?(?:[\w\s]+)?(?:job|role|position|career)\s+without\b/i,
    /\bdo\s+(?:i|you)\s+(?:need\s+a\s+degree|need\s+to)\s+(?:to\s+)?(?:become|be|get)\b/i,
    // Account / profile management queries — not job searches
    /\b(?:update|edit|change|reset|delete|create|set\s+up|manage)\s+(?:my\s+)?(?:profile|account|password|email|name|resume|cv)\b/i,
    /\b(?:how\s+(?:do\s+i|to)|can\s+i)\s+(?:upload|attach|submit|send|download)\s+(?:my\s+)?(?:resume|cv|cover\s+letter|portfolio)\b/i,
  ];
  for (const rx of careerAdvicePatterns) {
    if (rx.test(q)) return result;  // early return: no keyword
  }

  // Pre-alias patterns — run before alias check for queries where a contextual phrase
  // should override a simple abbreviation match (e.g. "work with AI and ML" → ML engineer, not "ai engineer")
  if (!result.keyword && !result.categoryExplicit) {
    const preAliasPatterns = [
      { rx:/\bwork\s+(with|in|on)\s+(ai|artificial\s+intelligence)\s+and\s+(machine\s+learning|ml)\b/i, kw:"machine learning engineer" },
      { rx:/\b(machine\s+learning|ml)\s+(engineer|developer|researcher|scientist)\b/i,                  kw:"machine learning engineer" },
      { rx:/\bai\s+and\s+(machine\s+learning|ml)\b/i,                                                   kw:"machine learning engineer" },
      // Full-stack wins over individual tech stack aliases when explicit
      { rx:/\bfull[\s-]?stack\b/i,                                                                      kw:"full stack developer" },
      // VP of X without "of" (normalized by pre-processor but catch remaining cases)
      { rx:/\bvp\s+of\s+(engineering|product|sales|marketing|data|finance|operations|hr|people|growth|design|security)\b/i, kw:null },  // let title patterns handle
    ];
    for (const { rx, kw } of preAliasPatterns) {
      if (rx.test(q)) { result.keyword = kw; break; }
    }
  }

  // Keyword aliases — always run, even if industry was identified, because abbreviations like
  // "PM roles in tech", "ML jobs in finance" clearly indicate a role alongside an industry.
  // Sort by key length DESCENDING so multi-word aliases ("front end dev") beat single-word ones ("dev")
  if (!result.keyword) {
    const ql = q.toLowerCase().trim();
    const sortedAliases = Object.entries(KEYWORD_ALIASES).sort((a, b) => b[0].length - a[0].length);
    for (const [alias, canonical] of sortedAliases) {
      if (!canonical) continue; // skip null-canonical entries
      // Common English words that happen to be 2-char abbreviations — restrict to start/end only
      // to prevent false matches (e.g. "be" matching "I want to be a developer")
      const AMBIGUOUS_ENGLISH = new Set(['be','go','do','to','of','by','in','on','at','or','as','if','is','it','no','so','we','up','an','me']);
      const restrictToEdge = alias.length <= 2 && AMBIGUOUS_ENGLISH.has(alias.toLowerCase());
      const matches = ql === alias
        || ql.startsWith(alias + " ")
        || ql.endsWith(" " + alias)
        || (!restrictToEdge && ql.includes(" " + alias + " "));
      if (matches) { result.keyword = canonical; break; }
    }
  }

  // Keyword — comprehensive title patterns (extended with poor-English + abbreviated forms)
  if (!result.keyword) {
    const titlePatterns = [
      // Tech roles
      /\b(software|full[- ]?stack|backend|back[\s-]?end|frontend|front[\s-]?end|mobile|cloud|machine\s*learning|devops|platform|site\s*reliability|security|network|systems|embedded|ios|android|react|python|java|node)\s+(engineer|developer|architect|scientist|specialist|dev)\b/i,
      /\b(software|web|app|application)\s+(developer|dev|engineer|programmer)\b/i,
      // "full stack [tech] developer/engineer" — allow optional 1-2 tech words between
      /\b(full[- ]?stack)\s+\w+(?:\s+\w+)?\s+(developer|engineer|dev)\b/i,
      // "X developer" where X is a specific tech stack
      /\b(javascript|typescript|golang|go|rust|ruby|php|swift|kotlin|flutter|vue|angular|react\s+native|svelte|next\.?js|node\.?js|django|rails)\s+(developer|engineer|dev)\b/i,
      /\b(data\s+(?:scientist|analyst|engineer|architect|warehouse|quality|lead)|machine\s+learning\s+engineer|ml\s+engineer|ai\s+engineer)\b/i,
      // Product / design
      /\b(business\s+(?:analyst|intelligence|development\s+(?:rep|manager|representative))|product\s+(?:manager|designer|analyst|lead|owner|director)|project\s+manager|program\s+manager|engineering\s+manager|scrum\s+master)\b/i,
      /\b(ux\/ui|ux|ui|graphic|product|motion|creative|visual)\s+(designer|design\s+lead|design\s+manager|researcher)\b/i,
      // Sales / CS
      /\b(account\s+(?:executive|manager|director|rep|representative)|sales\s+(?:engineer|manager|director|rep|representative|lead|vp|executive|director))\b/i,
      /\b(customer\s+success\s+(?:manager|lead|rep|specialist)|customer\s+support\s+(?:manager|specialist)|client\s+(?:success|relations)\s+manager)\b/i,
      /\b(business\s+development\s+(?:rep|manager|representative|director)|sdr|bdr)\b/i,
      // Healthcare
      /\b(registered\s+nurse|nurse\s+practitioner|licensed\s+practical\s+nurse|lpn|cna|medical\s+assistant|physician\s+assistant|physical\s+therapist|occupational\s+therapist|pharmacist|dentist|surgeon|paramedic|radiologist)\b/i,
      /\b(nurse|doctor|physician|therapist|clinician|healthcare\s+(?:professional|worker|specialist))\b/i,
      // Finance
      /\b(financial\s+analyst|investment\s+(?:banker|analyst)|portfolio\s+manager|tax\s+(?:accountant|analyst|specialist)|cfo|controller|chief\s+financial|wealth\s+manager|actuary|auditor)\b/i,
      /\b(accountant|bookkeeper|treasurer|compliance\s+officer|risk\s+analyst|credit\s+analyst)\b/i,
      // Marketing
      /\b(marketing\s+(?:manager|director|specialist|coordinator|analyst|lead)|content\s+(?:manager|strategist|writer|creator|marketer)|seo\s+(?:specialist|manager)|social\s+media\s+(?:manager|specialist)|growth\s+(?:manager|hacker|marketer)|brand\s+manager|pr\s+manager|email\s+marketer)\b/i,
      // HR
      /\b(hr\s+(?:manager|director|generalist|business\s+partner|coordinator)|talent\s+(?:acquisition|partner|manager)|recruiter|headhunter|people\s+(?:ops|operations)|human\s+resources\s+(?:manager|director))\b/i,
      // Operations / Revenue
      /\b(revenue\s+(?:operations|ops)\s*(?:manager|director|analyst|lead)?|revenue\s+ops)\b/i,
      /\b(sales\s+(?:operations|ops)\s*(?:manager|director|analyst|lead)?)\b/i,
      /\b(operations\s+(?:manager|director|analyst|coordinator)|supply\s+chain\s+(?:manager|analyst|director)|logistics\s+(?:manager|coordinator|director)|chief\s+operating|process\s+improvement)\b/i,
      // QA / IT support
      /\b(software\s+)?qa\s+(?:engineer|analyst|tester|lead|manager)\b/i,
      /\b(it\s+(?:support\s+specialist|support|helpdesk|specialist|administrator|admin|manager)|system\s+admin|sysadmin|network\s+admin|database\s+admin|dba)\b/i,
      // Trades
      /\b(electrician|plumber|carpenter|welder|hvac\s+(?:technician|tech)?|mechanic|truck\s+driver|cdl\s+driver|forklift\s+operator|construction\s+worker|mason|roofer|painter|glazier)\b/i,
      // Food / hospitality
      /\b(chef|sous\s+chef|head\s+chef|executive\s+chef|pastry\s+chef|line\s+cook|prep\s+cook|kitchen\s+manager|restaurant\s+manager|bartender|barista|server|waiter|waitress|host|hostess)\b/i,
      // Education
      /\b(teacher|professor|lecturer|instructor|tutor|school\s+counselor|curriculum\s+developer|academic\s+advisor|education\s+coordinator)\b/i,
      // Mobile
      /\b(android|ios|react\s+native|flutter|swift|kotlin)\s+developer\b/i,
      // C-suite / leadership
      /\b(cto|coo|cmo|ciso|vp\s+of\s+(?:engineering|product|sales|marketing|finance|operations|data|analytics|security)|head\s+of\s+(?:engineering|product|sales|marketing|finance|operations|growth|data|analytics|design))\b/i,
      /\b(director\s+of\s+(?:engineering|product|sales|marketing|finance|operations|data|analytics|hr|people|growth|design))\b/i,
      /\b(chief\s+of\s+staff|chief\s+(?:product|technology|marketing|data|revenue|people)\s+officer)\b/i,
      // Consulting
      /\b(management\s+consultant|strategy\s+consultant|business\s+consultant|tech\s+consultant|it\s+consultant)\b/i,
      // Additional patterns for common abbreviations
      /\b(bi\s+(?:analyst|developer|engineer)|business\s+intelligence\s+(?:analyst|engineer))\b/i,
      /\b(nlp\s+engineer|computer\s+vision|cv\s+engineer|ai\s+researcher)\b/i,
      /\b(staff\s+(?:engineer|scientist)|distinguished\s+engineer|principal\s+(?:engineer|scientist|architect))\b/i,
    ];
    for (const rx of titlePatterns) {
      const m = q.match(rx);
      if (m) {
        result.keyword = m[0].trim()
          .replace(/^(senior|junior|lead|principal|staff|mid[\s-]level|associate|experienced|expert|skilled)\s+/i, "")
          .trim()
          .toLowerCase();   // normalise case — filterJobs lowercases anyway
        break;
      }
    }
  }

  // Company-name extraction — "jobs at Google/Tesla/McKinsey" → keyword = company name
  // Runs AFTER titlePatterns so explicit role ("Software Engineer at Google") wins first.
  // The company name as keyword lets filterJobs match against job.company field.
  if (!result.keyword) {
    const companyRx = /\b(?:at|with|from|for)\s+(google|alphabet|facebook|meta|amazon|apple|microsoft|netflix|tesla|spotify|nvidia|stripe|openai|anthropic|spacex|uber|airbnb|linkedin|twitter|tiktok|bytedance|salesforce|adobe|oracle|ibm|intel|qualcomm|snap|pinterest|palantir|coinbase|robinhood|doordash|lyft|shopify|atlassian|zoom|slack|dropbox|twilio|databricks|snowflake|mongodb|cloudflare|tcs|infosys|wipro|deloitte|mckinsey|goldman\s+sachs|jpmorgan|morgan\s+stanley|accenture|pwc|bain|bcg|kpmg|ey|ernst|booz|capgemini|cognizant)\b/i;
    const compM = q.match(companyRx);
    if (compM) result.keyword = compM[1].toLowerCase().trim();
  }

  // Poor-English / informal intent patterns — extract keywords from broken sentences
  // Skip if industry was explicitly mentioned — user wants to browse the industry, not a specific role
  if (!result.keyword && !result.categoryExplicit) {
    const informalPatterns = [
      { rx:/\b(good\s+at\s+selling|sales\s+person|sales\s+guy|good\s+salesperson)\b/i,  kw:"sales representative" },
      { rx:/\b(coding\s+job|job\s+in\s+coding|work\s+in\s+coding)\b/i,                  kw:"software developer" },
      { rx:/\b(job\s+in\s+accounting|accounting\s+job|accounting\s+work)\b/i,            kw:"accountant" },
      { rx:/\b(hospital\s+job|job\s+in\s+hospital|medical\s+job|job\s+in\s+medical)\b/i, kw:"healthcare" },
      { rx:/\b(teaching\s+job|job\s+in\s+school|school\s+job)\b/i,                       kw:"teacher" },
      { rx:/\b(driving\s+job|job\s+for\s+driver|driver\s+job)\b/i,                       kw:"driver" },
      { rx:/\b(manual\s+(work|job)|not\s+office|physical\s+work)\b/i,                    kw:"trades" },
      // "tech role / tech job / want tech" — when NOT an industry browse (categoryExplicit guard already wraps this)
      { rx:/\b(tech|technology)\s+(role|job|work|position|opportunity)\b/i,              kw:"software engineer" },
      { rx:/\bwant\s+(a\s+)?(tech|technology)\s+(role|job|position)\b/i,                 kw:"software engineer" },
      // Career pivot — extract the TARGET role after "move into / transition to / want to be / from X to Y"
      { rx:/\b(move\s+into|transition\s+(in)?to|pivot\s+to|want\s+to\s+be|become|to)\s+(a\s+)?(product\s+manager|product\s+management|pm)\b/i,  kw:"product manager" },
      { rx:/\b(move\s+into|transition\s+(in)?to|pivot\s+to|want\s+to\s+be|become|to)\s+(a\s+)?product\b(?!\s+(engineer|developer|designer))/i,  kw:"product manager" },
      { rx:/\b(move\s+into|transition\s+(in)?to|pivot\s+to|want\s+to\s+be|become)\s+(a\s+)?(software\s+engineer|developer|engineering)\b/i,     kw:"software engineer" },
      { rx:/\b(move\s+into|transition\s+(in)?to|pivot\s+to|want\s+to\s+be|become)\s+(a\s+)?(data\s+engineer|data\s+engineering)\b/i,             kw:"data engineer" },
      { rx:/\b(move\s+into|transition\s+(in)?to|pivot\s+to|want\s+to\s+be|become)\s+(a\s+)?(data\s+scientist|data\s+analyst|data)\b/i,          kw:"data scientist" },
      { rx:/\b(move\s+into|transition\s+(in)?to|pivot\s+to|want\s+to\s+be|become)\s+(a\s+)?(ux|ui|product\s+designer|designer)\b/i,             kw:"ux designer" },
      { rx:/\b(move\s+into|transition\s+(in)?to|pivot\s+to|want\s+to\s+be)\s+(a\s+)?(recruiter|talent)\b/i,                                     kw:"recruiter" },
      { rx:/\b(move\s+into|transition\s+(in)?to|pivot\s+to|want\s+to\s+be|become)\s+(a\s+)?(nurse|nursing)\b/i,                                  kw:"registered nurse" },
      { rx:/\b(move\s+into|transition\s+(in)?to|pivot\s+to|want\s+to\s+be|become)\s+(a\s+)?(marketing\s+manager|marketer|marketing)\b/i,          kw:"marketing manager" },
      { rx:/\b(move\s+into|transition\s+(in)?to|pivot\s+to|want\s+to\s+be|become)\s+(a\s+)?(financial\s+analyst|finance|accounting)\b/i,          kw:"financial analyst" },
      // "I want to be a [role]" — direct role intent
      { rx:/\bi\s+want\s+to\s+be\s+(a\s+)?(software\s+engineer|developer|coder)\b/i,    kw:"software engineer" },
      { rx:/\bi\s+want\s+to\s+be\s+(a\s+)?(product\s+manager|pm)\b/i,                   kw:"product manager" },
      { rx:/\bi\s+want\s+to\s+be\s+(a\s+)?(data\s+scientist|data\s+analyst)\b/i,        kw:"data scientist" },
      { rx:/\bi\s+want\s+to\s+be\s+(a\s+)?(nurse|doctor|physician)\b/i,                 kw:"registered nurse" },
      { rx:/\bi\s+want\s+to\s+be\s+(a\s+)?(designer|ux\s+designer)\b/i,                 kw:"ux designer" },
      { rx:/\bi\s+want\s+(a\s+job\s+(as\s+a?|as|in))\s+(.+)/i,                          kw:null }, // handled by fallback
      // "Looking to get into X"
      { rx:/\b(looking\s+to\s+get\s+into|getting\s+into|breaking\s+into)\s+(software|tech|technology|coding|programming)\b/i, kw:"software engineer" },
      { rx:/\b(looking\s+to\s+get\s+into|getting\s+into|breaking\s+into)\s+(marketing|advertising)\b/i,                       kw:"marketing manager" },
      { rx:/\b(looking\s+to\s+get\s+into|getting\s+into|breaking\s+into)\s+(finance|banking|accounting)\b/i,                  kw:"financial analyst" },
      { rx:/\b(looking\s+to\s+get\s+into|getting\s+into|breaking\s+into)\s+(healthcare|nursing|medical)\b/i,                  kw:"registered nurse" },
      // Bare "engineer in [city]" — almost always means software engineer
      { rx:/^(?:an?\s+)?engineer\s+(?:in|near|at|for|from)\b/i,                         kw:"software engineer" },
      // "Technology manager/director" — vague tech management → software engineer
      { rx:/\btechnology\s+(manager|director|lead|head)\b/i,                             kw:"software engineer" },
      // Generic role descriptors when used alone, in combination, or with jobs/work
      { rx:/\bengineering\s+(job|work|role|position)\b/i,                                kw:"software engineer" },
      { rx:/\bmarketing\s+(job|work|role|position)\b/i,                                  kw:"marketing manager" },
      { rx:/^engineering\s*(jobs?|work|roles?)?$/i,                                      kw:"software engineer" },
      { rx:/^marketing\s*(jobs?|work|roles?)?$/i,                                        kw:"marketing manager" },
      // "Something with numbers/data" — vague interest queries
      { rx:/\bsomething\s+(?:with|involving?|related\s+to|around)\s+(data|numbers?|analytics?|stats?|statistics)\b/i, kw:"data analyst" },
      { rx:/\bsomething\s+(?:with|involving?|related\s+to)\s+(coding|programming|tech|software|computers?)\b/i,       kw:"software developer" },
      { rx:/\bsomething\s+(?:with|involving?|related\s+to)\s+(people|humans?|customers?|clients?)\b/i,                kw:null }, // too vague — don't infer role
      { rx:/\bsomething\s+(?:with|involving?|related\s+to)\s+(design|creativity|creative|art)\b/i,                   kw:"ux designer" },
      // "Jobs that involve [activity]" — pattern
      { rx:/\bjobs?\s+(?:that\s+)?(?:involve|require|need|use)\s+(coding|programming|software|tech|computers?)\b/i,  kw:"software developer" },
      { rx:/\bjobs?\s+(?:that\s+)?(?:involve|require|need|use)\s+(data|analytics?|numbers?|stats?)\b/i,              kw:"data analyst" },
      { rx:/\bjobs?\s+(?:that\s+)?(?:involve|require|need|use)\s+(people|humans?|customers?|clients?)\b/i,           kw:null }, // customer-facing → too broad
      { rx:/\bjobs?\s+(?:that\s+)?(?:involve|require|need|use)\s+(design|creativity|art|ux|ui)\b/i,                  kw:"ux designer" },
      // Interest / skill-based queries (from test sheet NLQ)
      { rx:/\b(love|enjoy|like|good\s+at|interested\s+in)\s+(working\s+with\s+)?data\b/i, kw:"data scientist" },
      { rx:/\bworking\s+with\s+data\b/i,                                                   kw:"data scientist" },
      { rx:/\b(passionate\s+about|interested\s+in)\s+(data|analytics)\b/i,                 kw:"data scientist" },
      { rx:/\b(crypto|blockchain|web3|nft|defi|decentralized)\b/i,                        kw:"blockchain developer" },
      { rx:/\b(ai|artificial\s+intelligence)\s+(job|work|role|career|position)\b/i,       kw:"ai engineer" },
      { rx:/\bwork\s+(with|in|on)\s+(ai|artificial\s+intelligence|machine\s+learning)\b/i, kw:"machine learning engineer" },
      { rx:/\b(really\s+good|great)\s+at\s+(excel|spreadsheet)\b/i,                      kw:"data analyst" },
      { rx:/\bgood\s+at\s+(excel|spreadsheet|vlookup|pivot\s+table)\b/i,                 kw:"data analyst" },
      { rx:/\b(sustainability|green\s+tech|clean\s+energy|renewable\s+energy|esg)\b/i,    kw:"sustainability manager" },
      { rx:/\b(nonprofit|non[\s-]profit|ngo|not[\s-]for[\s-]profit|social\s+impact)\b/i, kw:"program manager" },
      // Layoff/unemployment — no specific role, let context determine
      { rx:/\b(laid\s+off|let\s+go|fired|lost\s+my\s+job|unemployed|between\s+jobs)\b/i, kw:null },
      // Hedging / wishing phrases — extract the role from the indirect intent
      { rx:/\b(wish|wonder|hope|imagine|dream)\s+(i\s+)?(could|can|would|might)?\s*(find|get|have|see|work\s+as)\s+(a\s+)?(data\s+scientist|data\s+analyst|data\s+engineer)\b/i, kw:"data scientist" },
      { rx:/\b(wish|wonder|hope|imagine)\s+(i\s+)?(could|can|would|might)?\s*(find|get|see)\s+(a\s+)?(software|dev|engineer|coding|developer)\b/i, kw:"software engineer" },
      { rx:/\b(wish|wonder|hope|imagine|would\s+like)\s+(to\s+)?(find|see|get|have)\s+(some|any|a\s+few)?\s*(ux|product|design|marketing|sales)\b/i, kw:null }, // handled by aliases below
      { rx:/\b(it\s+would\s+be\s+nice|would\s+love)\s+to\s+(see|find|get)\s+(some|any)?\s*(\w+)\s+(jobs?|roles?|positions?)\b/i, kw:null }, // generic — fallback keyword handles it
      // Data role without specific title
      { rx:/\b(data\s+role|data\s+position|data\s+(job|work))\b/i,             kw:"data scientist" },
      { rx:/\bdata\s+analyst\s+(role|position|work)\b/i,                        kw:"data analyst" },
      // "Hook me up with X" colloquial
      { rx:/\bhook\s+me\s+up\s+with\s+(a\s+)?(coding|dev|developer|software|tech)\b/i, kw:"software developer" },
      { rx:/\bhook\s+me\s+up\s+with\s+(a\s+)?(marketing|sales|finance|data|design)\b/i, kw:null }, // let fallback handle
      // "Switch/transition to management" — handled by pre-processor, catch residual + bare form
      { rx:/\bengineering\s+manager\s+role\b/i, kw:"engineering manager" },
      { rx:/\b(?:switch|transition|move|pivot)\s+(?:from\s+\w+\s+)?to\s+management\b/i, kw:"engineering manager" },
      { rx:/\bic\s+to\s+(?:management|manager|lead)\b/i, kw:"engineering manager" },
      // "I hate my commute" / "remote only" intent
      { rx:/\bhate\s+(my\s+)?(commute|commuting|traffic|driving\s+to\s+work)\b/i, kw:null },
      // MBA usage → management/consulting roles
      { rx:/\b(use|leverage|with)\s+(my\s+)?mba\b/i, kw:"management consultant" },
      { rx:/\bmba\s+(background|degree|graduate|holder)\b/i, kw:"business analyst" },
      // "People-facing" roles → customer success
      { rx:/\b(people[\s-]facing|customer[\s-]facing|work\s+with\s+people|client[\s-]facing)\b/i, kw:"customer success manager" },
      // Visa / work-authorization — normalized in pre-processor; also catch residuals
      { rx:/\b(h1bvisa|l1visa|o1visa|optvisa|cptvisa|eancard|green\s+card|daca|asylum|tn\s+visa|visa\s+sponsor|sponsors?\s+(?:\w+\s+)?visa|work\s+(?:authori|permit|visa))\b/i, kw:null },
      // Work-life balance — don't infer a role
      { rx:/\b(work[\s-]?life\s+balance|worklife|wlb|flexible\s+hours|flexible\s+schedule)\b/i, kw:null },
      // "Something new" / "make more money" — general search
      { rx:/\b(make\s+more\s+money|earn\s+more|higher\s+salary|better\s+pay)\b/i, kw:null },
      // "I am a [role] looking for work" — persona queries
      { rx:/\bi\s+(?:am\s+a?|'m\s+a?)\s+(nurse|doctor|physician|therapist|dentist)\b/i,       kw:"registered nurse" },
      { rx:/\bi\s+(?:am\s+a?|'m\s+a?)\s+(developer|coder|programmer|software\s+engineer)\b/i, kw:"software developer" },
      { rx:/\bi\s+(?:am\s+a?|'m\s+a?)\s+(nurse|doctor|physician|therapist|dentist)\b/i,       kw:"registered nurse" },
      // "looking for / searching for [field] work/jobs"
      { rx:/\b(?:looking\s+for|searching\s+for|seeking)\s+(?:\w+\s+)?(?:nursing|nurse)\s*(?:jobs?|work|roles?|positions?)?\b/i, kw:"registered nurse" },
      { rx:/\b(?:looking\s+for|searching\s+for|seeking)\s+(?:\w+\s+)?(?:marketing)\s*(?:jobs?|work|roles?|positions?)\b/i,     kw:"marketing manager" },
      { rx:/\b(?:looking\s+for|searching\s+for|seeking)\s+(?:\w+\s+)?(?:accounting|finance)\s*(?:jobs?|work|roles?|positions?)\b/i, kw:"accountant" },
      { rx:/\b(?:looking\s+for|searching\s+for|seeking)\s+(?:\w+\s+)?(?:coding|dev|software)\s*(?:jobs?|work|roles?|positions?)\b/i, kw:"software developer" },
      { rx:/\b(?:looking\s+for|searching\s+for|seeking)\s+(?:\w+\s+)?(?:sales)\s*(?:jobs?|work|roles?|positions?)\b/i,          kw:"sales representative" },
      // "I know/have/use [skill]" → role inference (not just "jobs requiring X")
      { rx:/\bi\s+(?:know|have|use|work\s+with|specialize\s+in)\s+(react|angular|vue)\b/i,    kw:"react developer" },
      { rx:/\bi\s+(?:know|have|use|work\s+with|specialize\s+in)\s+python\b/i,                 kw:"python developer" },
      { rx:/\bi\s+(?:know|have|use|work\s+with|specialize\s+in)\s+(aws|azure|gcp)\b/i,        kw:"cloud engineer" },
      { rx:/\bi\s+(?:know|have|use|work\s+with|specialize\s+in)\s+docker\b/i,                 kw:"devops engineer" },
      { rx:/\bi\s+(?:know|have|use|work\s+with|specialize\s+in)\s+sql\b/i,                    kw:"data analyst" },
      // "I want to [action] [thing]" — action-based role inference
      { rx:/\b(want\s+to|love\s+to|like\s+to|plan\s+to)\s+(code|program|develop|build\s+(?:apps?|software|websites?)|write\s+code)\b/i, kw:"software developer" },
      { rx:/\bcode\s+for\s+(a\s+)?living\b/i,                                                kw:"software developer" },
      { rx:/\b(want\s+to|love\s+to|like\s+to)\s+(design|create\s+(?:apps?|designs?|interfaces?|ui|ux))\b/i, kw:"ux designer" },
      { rx:/\b(want\s+to|love\s+to)\s+(analyze|work\s+with|crunch)\s+(data|numbers?|stats?)\b/i, kw:"data analyst" },
      { rx:/\b(want\s+to|love\s+to)\s+manage\s+(products?|features?|roadmaps?)\b/i,          kw:"product manager" },
      { rx:/\b(want\s+to|love\s+to)\s+manage\s+(teams?|engineers?|developers?)\b/i,           kw:"engineering manager" },
      { rx:/\b(want\s+to|love\s+to)\s+(sell|close\s+deals?|do\s+sales)\b/i,                   kw:"sales representative" },
      { rx:/\b(want\s+to|love\s+to)\s+(hire|recruit|find\s+talent)\b/i,                       kw:"recruiter" },
      // "want to work in X" — industry/domain context
      { rx:/\bwant\s+(?:to\s+)?(?:work|get\s+a\s+job|find\s+a\s+job)\s+in\s+(?:finance|banking|accounting)\b/i, kw:"financial analyst" },
      { rx:/\bwant\s+(?:to\s+)?(?:work|get\s+a\s+job|find\s+a\s+job)\s+in\s+(?:tech|technology|software)\b/i,   kw:"software engineer" },
      { rx:/\bwant\s+(?:to\s+)?(?:work|get\s+a\s+job|find\s+a\s+job)\s+in\s+(?:marketing)\b/i,                  kw:"marketing manager" },
      { rx:/\bwant\s+(?:to\s+)?(?:work|get\s+a\s+job|find\s+a\s+job)\s+in\s+(?:sales)\b/i,                      kw:"sales representative" },
      { rx:/\bwant\s+(?:to\s+)?(?:work|get\s+a\s+job|find\s+a\s+job)\s+in\s+(?:hr|human\s+resources)\b/i,       kw:"hr generalist" },
      { rx:/\bwant\s+(?:to\s+)?a\s+job\s+in\s+(?:healthcare|medicine|medical)\b/i,                              kw:"registered nurse" },
      { rx:/\bcareer\s+in\s+(?:data\s+science|machine\s+learning)\b/i,                                           kw:"data scientist" },
      { rx:/\bcareer\s+in\s+(?:software\s+engineering|software\s+development|programming|coding)\b/i,            kw:"software engineer" },
      // "I want to work at a startup/FAANG/etc." — company context → SE (only when no explicit role)
      { rx:/\bi\s+want\s+to\s+work\s+at\s+(?:a\s+)?(startup|faang|saas\s+company|unicorn|tech\s+company|big\s+tech|fortune500|big\s+company|large\s+company)\b/i, kw:"software engineer" },
      // Career-advice / informational questions — NOT job searches, return null
      { rx:/\bwhat\s+(skills?|qualifications?|degree|education|experience)\s+(do\s+i|does\s+one|is|are)\s+(need|require|required|necessary)\b/i, kw:null },
      { rx:/\bhow\s+(long|do\s+i|can\s+i|do\s+you|much)\s+(does?\s+it\s+take\s+to|become|get\s+into|switch\s+to|transition)\b/i, kw:null },
      { rx:/\bwhat\s+is\s+(the\s+)?(?:salary|pay|compensation)\s+for\b/i, kw:null },
      { rx:/\b(tips?|advice|guidance)\s+(for|on)\s+(becoming|getting|landing)\b/i, kw:null },
      // "startup" as context word (not at start of query = company-context, not "I want to work at a startup")
      { rx:/\bat\s+(?:a\s+)?startup\b/i, kw:null },   // "Junior PM at a startup" → don't override PM alias
      // NOTE: Company-name queries now handled by the dedicated company-name block above
    ];
    for (const { rx, kw } of informalPatterns) {
      if (rx.test(q)) { if (kw !== undefined) result.keyword = kw; break; }
    }
  }

  // If industry was explicitly identified (not inferred from a role title), skip keyword fallback
  // — the user wants to browse an industry, not a specific role
  if (result.categoryExplicit && !result.keyword) {
    return result;
  }

  // Fallback keyword — filter out stopwords and noise words
  if (!result.keyword) {
    const stopwords = new Set([
      // Structural / filler
      "i","me","my","we","you","want","need","looking","find","get","give","show","help",
      "job","jobs","work","position","role","roles","opportunity","opportunities","career","employment",
      "a","an","the","in","at","for","near","around","about","from","with","without","and",
      "or","but","not","of","on","to","into","by","as","is","am","are","was","be","been",
      "do","does","did","can","will","would","could","should","may","might","have","has",
      // Intent words
      "full","part","time","level","experienced","please","some","any","good","best","top",
      "new","open","available","now","today","urgent","fast","quickly","immediate","asap",
      "actually","also","just","still","only","very","really","quite","too","so","that",
      "switch","change","career","careers","field","move","moves","pivot","transition","become","between","above","below","under","over","least","minimum","maximum","plus",
      "find","look","search","want","need","like","hope","wish","try","seeking",
      "hire","hiring","recruit","recruiting","apply","applying","fill","filling","post",
      "currently","lateral","happy","unhappy","current","better","background","previous",
      "former","recently","into","from","onto","within","outside","through","across",
      // Time / experience words that end up as keyword noise
      "year","years","yrs","months","month","week","weeks","experience","exp","expereince",
      "have","has","make","earn","earn","spend","spent","worked","working","done","doing",
      "mind","never","browsing","browse","checking","nothing","something",
      "management","administration","operations","services","sector","industry","sector",
      // Skill-query words
      "requiring","require","required","know","match","matches","matching","proficient","skilled","experienced",
      "using","based","stack","tech","tools","tool","skill","skills","expertise","knowledge",
      // Industry-only words that should not become standalone keywords when paired with role words
      "fintech","edtech","healthtech","insurtech","legaltech","proptech","agritech","cleantech",
      // Visa / legal / admin noise
      "visa","sponsor","sponsors","sponsoring","sponsored","sponsorship","authorized","authorization","eligible","eligibility",
      // Work-life balance / lifestyle query noise
      "worklife","balance","wlb","flexible","lifestyle","culture","environment","atmosphere",
      "annually","monthly","weekly","hourly","hour","annual","salary","compensation",
      // Common search noise
      "list","show","find","filter","sort","search","browse","explore","discover","high","best","highest","paying",
      // Time of day / greeting fragments
      "morning","afternoon","evening","night","today","yesterday",
      // Vague preference words that should not become keywords
      "creative","something","anything","everything","nothing","nights","days","hours","shift","shifts",
      "people","person","persons","someone","humans","team","teams","group","groups",
      "numbers","figures","figure","math","maths","statistics","stats",
      // Contract / temp / perm modifiers — should not become standalone keywords
      "temp","perm","hire","rehire","onsite","site","remote","hybrid","location",
      // Urgency words
      "urgently","urgently","immediately","asap","quickly","soon","immediately",
      "posted","posting","listing","listings","opening","openings","paying","hiring","hires",
      "recommended","recommend","referral","referred","suggested","suggest",
      "holder","holders","optional","practical","training","certificate",
      "expat","expats","foreigner","foreigners","overseas","abroad","international",
      // Director/VP/C-level — experience signals, not standalone job titles (titlePatterns capture "director of X")
      "director","directors",
      // Generic role nouns that should not become bare keywords (titlePatterns handle qualified forms)
      "engineer","engineers",
      // Note: "designer" NOT stopworded — maps to "ux designer" via fallback alias
      "manager","managers","analyst","analysts","specialist","specialists",
      "coordinator","coordinators","director","advisor","advisors",
      // Note: "consultant" and "consultants" NOT stopworded — "Deloitte consultant" → needs "consultant" to get role hint
      // Note: "developer" and "developers" NOT stopworded — "developer" alone → alias "software developer"
      // Visa normalized tokens — digits stripped in fallback so catch split fragments too
      "h1bvisa","l1visa","o1visa","optvisa","cptvisa","eancard","h1b",
      "bvisa","hvisa","lvisa","ovisa","visa",  // fragments after digit removal
      // Money / spam-adjacent words that pollute keyword extraction
      "money","cash","income","wage","rich","fast","quick","easy","online","paid","paying",
      "needed","required","wanted","urgent","available","open","free","more","less","earn",
      // Sentiment / feeling words that leak as keywords
      "love","hate","like","enjoy","miss","tired","bored","excited","happy","unhappy",
      "frustrated","wish","hope","prefer","interested","disinterested","think","rethink",
      // Vague nouns from NLQ
      "anything","something","someone","anyone","somewhere","everywhere","nowhere",
      "stuff","things","thing","deal","spot","idea","clue","know","known",
      // Negative/story words
      "laid","fired","quit","resigned","yesterday","tomorrow","today","last","next",
      "ago","recently","currently","previously","finally","still","already","even",
      // Nonsense / social tokens
      "lol","lmao","omg","bruh","hmm","okay","sure","yeah","yes","hey","sup",
      "test","hello","thanks","thank","cool","great","nice","wow","haha","hehe","tbh","ngl","idk","brb",
      "wanna","gonna","gotta","kinda","sorta","lemme","gimme","tryna","dunno","yall","asap",
      "wonder","wish","hope","imagine","dream","would","could","might","should","shall","must",
      "there","these","those","their","them","then","than","thus","such","like","nice","well",
      "newer","oldest","latest","recent","interested","disinterested","excited",
      "perfect","ideal","dream","better","best","worst","easy","hard","tough",
      // Seasonal / time modifiers that leak as keywords
      "summer","spring","fall","winter","seasonal",
      // Vague position words
      "positions","program","programs","opportunities",
      // Experience qualifiers (already extracted by expPatterns)
      "fresh","fresher","graduate","graduates","graduated","grad","intern","internship","trainee","beginner","novice","veteran",
      "started","starting","just","been","working","worked","years","year","ago","since",
      // Employment modifiers already extracted
      "remote","hybrid","onsite","office","based","anywhere","flexible","commute","wfh","remotely","telecommute","telework",
      "home","house","freelance","contract","contractor","gig","1099","fulltime","parttime",
      "senior","junior","entry","associate","lead","principal",
      // Education / life-stage words
      "college","university","school","degree","campus",
      // Industry/domain words used alone (→ let industry filter handle them)
      "engineering","technology","healthcare","finance","accounting","marketing","banking",
      // Common city component words that leak after abbreviation expansion
      "york","angeles","francisco","diego","antonio","phoenix","dallas","houston",
      "austin","boston","denver","atlanta","seattle","portland","detroit","miami",
      // Geographic region words that aren't cities
      "area","valley","region","bay","coast","north","south","east","west","central","greater",
      // "City" leaks as keyword when "New York City" is used
      "city","town","village","district","county","province","territory","suburb","suburbs",
      // Job-detail / FAQ query words that should never become keywords
      "detail","details","vacancy","vacancies","wage","wages","gigs",
      "legit","authentic","reset","password","upload","stuck","twice","same",
      "think","thinking","more","less","cover","letter","letters","format","formats",
      "file","files","login","logout","account","accounts","apply","applies","applied",
      "resume","tips","tip","accepted","accept","application","applications","status",
      // Schedule / availability words that are not job titles
      "weekend","weekends","nights","overnight","evening","mornings","shift","shifts",
      // Company context words that should not become standalone keywords
      "fortune","startup","startups","unicorn","bootstrap","bootstrapped","saas",
      // Venue/place words that should not become keywords
      "hotel","motel","restaurant","clinic","hospital","school","university","college","church","airport","warehouse",
      // Government/sector query words that should not become standalone keywords
      "civil","federal","municipal","sector","public","national","local","state",
      "service","services",  // "civil service" / "Technology" — sector words
      // Misc noise from real-world FAQ queries
      "criteria","requirement","requirements","deadline","deadlines",
      "process","processes","procedure","procedures","step","steps","guide","guides",
      "question","questions","answer","answers","info","information","page","pages",
      "section","link","links","email","emails","contact","contacts","support",
      "error","errors","issue","issues","problem","problems","trouble",
      // Common pronouns/determiners that pass the >3 char length filter
      "this","that","these","those","they","them","their","there","here","what","when","where","which","whom","your","mine","ours","your",
    ]);
    // Dynamically exclude extracted location words from keyword fallback
    const locWords = result.location
      ? new Set(result.location.toLowerCase().split(/\s+/).filter(w => w.length > 2))
      : new Set();
    const cleaned = q.toLowerCase()
      .replace(/\b(salary|pay|earn|compensation|wage|how\s+much|what|does|do|can|will)\b/gi, "")
      .replace(/[^a-z\s]/g, " ")
      .split(/\s+/)
      .filter(w => w.length > 3 && !stopwords.has(w) && !locWords.has(w) && !/^\d+$/.test(w));
    if (cleaned.length > 0) {
      // Apply alias map to the fallback keyword too
      const candidate = cleaned.slice(0, 2).join(" ");
      let resolved = KEYWORD_ALIASES[candidate] || KEYWORD_ALIASES[cleaned[0]] || candidate;
      // Bare generic role nouns → canonical job titles
      if (resolved === "developer" || resolved === "developers") resolved = "software developer";
    if (resolved === "designer" || resolved === "designers")   resolved = "ux designer";
      result.keyword = resolved;
    }
  }

  // Final check: if keyword is suspiciously short (1-2 chars) or all-numeric, clear it
  if (result.keyword && (result.keyword.length <= 2 || /^\d+$/.test(result.keyword))) {
    result.keyword = null;
  }

  // Infer category from specific role keywords when no category was set by industry patterns
  if (!result.category && result.keyword) {
    const kw = result.keyword.toLowerCase();
    const healthcareKws = new Set([
      "registered nurse","nurse practitioner","licensed practical nurse","nurse","doctor","physician",
      "pharmacist","physical therapist","occupational therapist","surgeon","dentist","paramedic",
      "radiologist","medical assistant","physician assistant","clinician","lpn","cna","crna",
      "anesthesiologist","ophthalmologist","healthcare professional","pharmacy technician",
      "veterinarian","optometrist","psychologist","speech therapist",
      "respiratory therapist","occupational therapist","physical therapist","massage therapist",
      "social worker","case manager","medical device engineer","biomedical engineer",
      "clinical engineer","medical assistant","phlebotomist","radiology technician",
      "radiologist","surgeon","orthopedic surgeon","doctor"
    ]);
    const financeKws = new Set([
      "accountant","actuary","auditor","financial analyst","investment banker","cpa","controller",
      "bookkeeper","tax specialist","wealth manager","credit analyst","risk analyst",
      "compliance officer","treasurer","quantitative analyst","portfolio manager",
      "financial officer","chief financial officer","fund manager","hedge fund analyst",
    ]);
    const educationKws = new Set([
      "teacher","professor","lecturer","instructor","tutor","school counselor","academic advisor",
      "curriculum developer","education coordinator","teaching assistant","librarian",
    ]);
    const energyKws = new Set([
      "petroleum engineer","reservoir engineer","refinery engineer","drilling engineer",
      "renewable energy engineer","solar engineer","wind turbine technician",
      "power plant operator","energy analyst","energy manager","utilities manager",
      "grid engineer","energy consultant","oil and gas consultant",
    ]);
    if (healthcareKws.has(kw)) result.category = "Healthcare";
    else if (financeKws.has(kw)) result.category = "Financial Services";
    else if (educationKws.has(kw)) result.category = "Education";
    else if (energyKws.has(kw)) result.category = "Energy & Utilities";
  }
  // Biotech/pharma context in query → Healthcare (even without explicit industry pattern)
  if (!result.category && /\b(biotech|pharma(ceutical)?|life\s+sciences?|biopharma)\b/i.test(q)) {
    result.category = "Healthcare";
  }
  // Non-profit / NGO context in query → Finance & accounting
  if (!result.category && /\b(non[\s-]?profit|nonprofit|ngo|charity|third\s+sector)\b/i.test(q)) {
    result.category = "Financial Services";
  }

  // Post-processing: when categoryExplicit=true and the query is just
  // "[generic industry word] + [roles/jobs suffix]", the keyword extracted from
  // a single-word alias should be cleared so the category filter dominates.
  // e.g. "marketing roles" → kw:"marketing manager" + catEx:true → clear kw
  // but "marketing manager jobs" → kw:"marketing manager" + catEx:false → keep kw
  if (result.categoryExplicit && result.keyword) {
    const GENERIC_INDUSTRY_TERMS = new Set([
      "marketing","sales","finance","banking","healthcare","tech","technology",
      "education","consulting","accounting","fintech","legal","hospitality",
      "manufacturing","logistics","retail","insurance","government","nonprofit",
      "media","advertising","engineering","operations","it","software",
      // multi-word / renamed category terms
      "supply chain","real estate","construction","infrastructure",
      "marketing & advertising","marketing advertising",
      "transportation","transport",
      "government & public sector","government public sector","public sector","federal",
      "construction & infrastructure","construction infrastructure",
      // Round 130 additions
      "telecom","telecommunications","entertainment","film","gaming",
      "energy","energy & utilities","energy utilities",
      "media & entertainment","media entertainment",
      "unicorn","unicorn startup",
    ]);
    const qNoSuffix = q.toLowerCase()
      .replace(/\b(jobs?|roles?|positions?|work|sector|industry|field|careers?|opportunities?)\s*$/i, "")
      .replace(/^(show\s+(me\s+)?|find\s+(me\s+)?|get\s+(me\s+)?|i\s+want\s+|looking\s+for\s+|search\s+for\s+)/i, "")
      .replace(/\s+/g, " ")   // collapse spaces left by & / punctuation strip
      .trim();
    if (GENERIC_INDUSTRY_TERMS.has(qNoSuffix)) {
      result.keyword = null;
    }
  }

  return result;
}

// ── Category alias map — handles API returning different names than our NLP ───
const CATEGORY_ALIASES = {
  "it services":           ["it services","information technology","software","technology","tech","engineering","computer science"],
  "ai":                    ["ai","artificial intelligence","machine learning","data science","analytics","deep learning"],
  "healthcare":            ["healthcare","health care","medical","health","clinical","nursing","pharmaceutical"],
  "finance & accounting":  ["finance","financial","accounting","banking","investment","insurance","fintech"],
  "sales & marketing":     ["sales","marketing","advertising","media","communications","public relations","pr"],
  "consulting":            ["consulting","advisory","management consulting","strategy","professional services"],
  "education":             ["education","academic","teaching","training","e-learning","edtech"],
  "transport & logistics": ["transport","logistics","delivery","shipping","freight","supply chain","warehousing","distribution"],
  "infrastructure":        ["infrastructure","construction","engineering","trades","utilities","civil"],
  "manufacturing & prod":  ["manufacturing","production","factory","assembly","industrial","operations"],
  "hospitality":           ["hospitality","hotel","food","beverage","tourism","restaurant","catering"],
};

function categoryMatches(jobCat, filterCat) {
  if (!jobCat || !filterCat) return false;
  const jc = jobCat.toLowerCase();
  const fc = filterCat.toLowerCase();
  // Direct match
  if (jc.includes(fc) || fc.includes(jc)) return true;
  // Alias match
  const aliases = CATEGORY_ALIASES[fc] || [];
  return aliases.some(alias => jc.includes(alias));
}

// ── Client-side filtering ─────────────────────────────────────
export function filterJobs(jobs, filters) {
  return jobs.filter(job => {
    const title   = (job.title   || "").toLowerCase();
    const company = (job.company?.name || job.company || "").toLowerCase();
    const desc    = (job.description || "").toLowerCase();
    const loc     = (job.location?.display || job.location || "").toLowerCase();
    const cat     = (job.category || "").toLowerCase();
    const lvl     = (job.experienceLevel || "").toLowerCase();
    const empType = (Array.isArray(job.employmentType) ? job.employmentType.join(" ") : (job.employmentType || "")).toLowerCase();

    if (filters.keyword) {
      const kw = filters.keyword.toLowerCase();
      // Split multi-word keyword and match any word for broader coverage
      const kwWords = kw.split(/\s+/).filter(w => w.length > 2);
      const anyMatch = kw.length <= 6
        ? kwWords.some(w => title.includes(w) || desc.includes(w))
        : title.includes(kw) || desc.includes(kw);
      if (!anyMatch && !company.includes(kw)) return false;
    }
    if (filters.location) {
      const fl = filters.location.toLowerCase();
      if (fl === "remote") {
        if (!empType.includes("remote") && !loc.includes("remote")) return false;
      } else if (!loc.includes(fl)) return false;
    }
    // Category: use fuzzy alias matching + fallback to title scan if no category on job
    if (filters.category) {
      const catFromTitle = !cat && filters.category
        ? CATEGORY_ALIASES[filters.category.toLowerCase()]?.some(alias => title.includes(alias) || desc.includes(alias))
        : false;
      if (!categoryMatches(cat, filters.category) && !catFromTitle) return false;
    }
    if (filters.employmentType && !empType.includes(filters.employmentType.toLowerCase())) return false;
    if (filters.experience) {
      const exp = filters.experience;
      if (exp === "0-1 Years"  && !lvl.match(/entry|junior|intern/i))         return false;
      if (exp === "1-2 Years"  && !lvl.match(/entry|junior|mid|associate/i))  return false;
      if (exp === "2-5 Years"  && !lvl.match(/mid|associate/i))               return false;
      if ((exp === "5-7 Years" || exp === "7-10 Years" || exp === "10+ Years") && !lvl.match(/senior|lead|principal/i)) return false;
    }
    if (filters.salaryMin || filters.salaryMax) {
      const est = estimateSalary(job.title, job.experienceLevel);
      if (est) {
        const nums = est.match(/\d+/g);
        if (nums && nums.length >= 2) {
          const mid = (parseInt(nums[0]) + parseInt(nums[1])) / 2 * 1000;
          if (filters.salaryMin && mid < parseInt(filters.salaryMin)) return false;
          if (filters.salaryMax && mid > parseInt(filters.salaryMax)) return false;
        }
      }
    }
    return true;
  });
}

// ── Hybrid job scoring — soft relevance (no hard excludes except zero-match) ──
export function scoreJob(job, filters) {
  let score = 0;
  const title   = (job.title   || "").toLowerCase();
  const company = (job.company?.name || job.company || "").toLowerCase();
  const desc    = (job.description || "").toLowerCase();
  const loc     = (job.location?.display || job.location || "").toLowerCase();
  const empType = (Array.isArray(job.employmentType) ? job.employmentType.join(" ") : (job.employmentType || "")).toLowerCase();
  const lvl     = (job.experienceLevel || "").toLowerCase();

  // ── Keyword (most important — gates everything) ──────────────
  if (filters.keyword) {
    const kw = filters.keyword.toLowerCase();
    const kwWords = kw.split(/\s+/).filter(w => w.length > 2);
    if (title === kw)                                                   score += 12; // exact title
    else if (title.includes(kw))                                        score += 10; // kw in title
    else if (kwWords.length > 1 && kwWords.every(w => title.includes(w))) score += 8;  // all words in title
    else if (kwWords.some(w => title.includes(w)))                      score += 5;  // partial title
    else if (company.includes(kw))                                      score += 4;  // company match
    else if (desc.includes(kw))                                         score += 3;  // description
    else if (kwWords.some(w => desc.includes(w)))                       score += 1;  // partial desc
    else return 0; // no keyword match at all — exclude
  }

  // ── Location boost (doesn't gate) ───────────────────────────
  if (filters.location) {
    const fl = filters.location.toLowerCase();
    if (fl === "remote") {
      if (empType.includes("remote") || loc.includes("remote")) score += 8;
    } else {
      if (loc.includes(fl)) score += 8;
    }
  }

  // ── Employment type boost ────────────────────────────────────
  if (filters.employmentType) {
    if (empType.includes(filters.employmentType.toLowerCase())) score += 6;
  }

  // ── Experience boost ─────────────────────────────────────────
  if (filters.experience) {
    const exp = filters.experience;
    const match = (
      (exp === "0-1 Years"  && lvl.match(/entry|junior|intern/i)) ||
      (exp === "1-2 Years"  && lvl.match(/entry|junior|associate/i)) ||
      (exp === "2-5 Years"  && lvl.match(/mid|associate/i)) ||
      ((exp === "5-7 Years" || exp === "7-10 Years" || exp === "10+ Years") && lvl.match(/senior|lead|principal/i))
    );
    if (match) score += 5;
  }

  return Math.max(0, score);
}

/** Rank jobs by relevance score (soft scoring — no hard excludes except zero-match keyword) */
export function rankJobs(jobs, filters) {
  if (!filters || Object.keys(filters).every(k => !filters[k])) return jobs;
  return jobs
    .map(job => ({ job, score: scoreJob(job, filters) }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .map(({ job }) => job);
}

/** Same as rankJobs but preserves score on each job as job._score */
export function rankJobsWithScores(jobs, filters) {
  if (!filters || Object.keys(filters).every(k => !filters[k])) return jobs.map(j => ({ ...j, _score: 0 }));
  return jobs
    .map(job => ({ job, score: scoreJob(job, filters) }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .map(({ job, score }) => ({ ...job, _score: score }));
}

// ── Similar roles for 0-results recovery ──────────────────────
export const SIMILAR_ROLES_MAP = {
  "software engineer":   ["developer","engineer","full stack","web developer","programmer"],
  "software developer":  ["engineer","developer","full stack","web developer","programmer"],
  "product manager":     ["product owner","program manager","project manager","product lead"],
  "data scientist":      ["data analyst","ml engineer","data engineer","business analyst"],
  "registered nurse":    ["nurse practitioner","medical assistant","clinical coordinator","nursing"],
  "nurse":               ["nurse practitioner","medical assistant","healthcare worker","clinical"],
  "marketing manager":   ["growth manager","content strategist","brand manager","marketing specialist"],
  "financial analyst":   ["business analyst","accountant","investment analyst","finance manager"],
  "ux designer":         ["ui designer","product designer","graphic designer","web designer"],
  "devops engineer":     ["cloud engineer","sre","infrastructure engineer","platform engineer"],
  "recruiter":           ["talent acquisition","hr manager","people ops","hiring manager"],
  "sales":               ["account executive","business development","sales representative","customer success"],
  "teacher":             ["instructor","tutor","lecturer","educator","trainer"],
  "truck driver":        ["delivery driver","cdl driver","fleet driver","transportation"],
  "electrician":         ["hvac technician","plumber","maintenance technician","trades worker"],
  "plumber":             ["hvac technician","electrician","pipefitter","maintenance technician"],
  "hvac technician":     ["electrician","plumber","building systems","facilities maintenance"],
  "chef":                ["sous chef","cook","kitchen manager","food service manager"],
  "accountant":          ["bookkeeper","financial analyst","cpa","controller"],
  "doctor":              ["physician","medical officer","clinician","specialist"],
  "pharmacist":          ["pharmacy technician","clinical pharmacist","drug specialist"],
  "qa engineer":         ["test engineer","quality assurance","automation engineer","sdet"],
  "scrum master":        ["agile coach","project manager","delivery manager","program manager"],
  "technical writer":    ["content designer","documentation engineer","ux writer","information architect"],
  "site reliability engineer":["devops engineer","cloud engineer","platform engineer","infrastructure engineer"],
  "cybersecurity analyst":["security engineer","penetration tester","information security","soc analyst"],
  "civil engineer":      ["structural engineer","project engineer","construction manager","site engineer"],
  "mechanical engineer": ["systems engineer","product engineer","manufacturing engineer","design engineer"],
  "physical therapist":  ["occupational therapist","athletic trainer","rehabilitation specialist","physiotherapist"],
  "content writer":      ["copywriter","technical writer","content strategist","blogger"],
  "social media manager":["content manager","digital marketer","community manager","brand manager"],
  "graphic designer":    ["visual designer","ui designer","brand designer","creative director"],
  "machine learning":    ["ml engineer","ai engineer","data scientist","nlp engineer"],
  "cloud architect":     ["solutions architect","devops engineer","infrastructure architect","cloud engineer"],
  "security engineer":   ["cybersecurity analyst","soc analyst","penetration tester","network security"],
  "business analyst":    ["data analyst","financial analyst","systems analyst","product analyst"],
  "project manager":     ["program manager","delivery manager","scrum master","operations manager"],
  "operations manager":  ["project manager","supply chain manager","logistics manager","general manager"],
  "hr manager":          ["people ops manager","talent manager","hr business partner","recruiter"],
  "account executive":   ["sales representative","business development rep","account manager","sdr"],
  "customer success":    ["account manager","client success","customer support manager","cs manager"],
  "data analyst":        ["business analyst","data scientist","bi analyst","reporting analyst"],
  "frontend developer":  ["react developer","web developer","ui engineer","javascript developer"],
  "backend developer":   ["api engineer","server-side developer","node developer","python developer"],
  "full stack developer":["software engineer","web developer","frontend developer","backend developer"],
  "ios developer":       ["mobile developer","swift developer","apple developer","react native developer"],
  "android developer":   ["mobile developer","kotlin developer","react native developer","flutter developer"],
  "paralegal":           ["legal assistant","legal secretary","case manager","law clerk"],
  "attorney":            ["lawyer","legal counsel","litigator","corporate attorney"],
  "welder":              ["pipe fitter","boilermaker","fabricator","structural welder"],
  "carpenter":           ["cabinetmaker","woodworker","framer","finish carpenter"],
};

export function getSimilarRoles(keyword) {
  if (!keyword) return [];
  const kl = keyword.toLowerCase();
  for (const [k, v] of Object.entries(SIMILAR_ROLES_MAP)) {
    if (kl === k || kl.includes(k) || k.includes(kl.split(" ")[0])) return v;
  }
  return [];
}

/** Given current result set, generate one smart proactive tip */
export function getProactiveTip(matchCount, profile, parsed) {
  const hasLoc  = !!(parsed.location || profile.location);
  const hasExp  = !!(parsed.experience || profile.experience);
  const hasType = !!(parsed.employmentType || profile.type);
  const role    = parsed.keyword || profile.role || "";

  // Salary hint takes priority when user has searched multiple times (headhunter touch)
  if ((profile.searchCount || 0) >= 3 && role)
    return `💡 *You've searched a few times — want a salary estimate for ${role}?*`;
  if (matchCount > 20 && !hasLoc)
    return `💡 *Found lots of results — add a city to narrow things down.*`;
  if (matchCount > 20 && !hasType)
    return `💡 *${matchCount} results — want remote only, hybrid, or on-site?*`;
  if (matchCount > 0 && matchCount <= 4)
    return `💡 *Only a few matches — want me to search similar roles too?*`;
  if (matchCount > 0 && !hasExp && role)
    return `💡 *Want to filter by experience level? Try "senior ${role}" or "entry level ${role}".*`;
  return "";
}

// ── Nova Intelligence Layer ───────────────────────────────────

/** Confidence score 0–100 based on how many dimensions are populated */
export function scoreSearch(parsed, profile) {
  let score = 0;
  if (parsed.keyword      || profile.role)      score += 40;
  if (parsed.location     || profile.location)  score += 20;
  if (parsed.experience   || profile.experience)score += 15;
  if (parsed.employmentType || profile.type)    score += 15;
  if (parsed.category     || profile.category)  score += 10;
  return Math.min(score, 100);
}

/** Route queries by complexity: simple / standard / complex */
export function getQueryComplexity(raw, parsed) {
  const words = raw.trim().split(/\s+/).length;
  const dims  = [parsed.keyword, parsed.location, parsed.experience, parsed.employmentType, parsed.category].filter(Boolean).length;
  if (words >= 7 || dims >= 3) return "complex";
  if (words >= 4 || dims >= 2) return "standard";
  return "simple";
}

// ── Market intelligence — demand signals per role ───────────────────────────
export const MARKET_INTEL = {
  "software engineer":        { demand:"🔥 Very high demand",   tip:"Remote roles are especially competitive — a strong GitHub profile is key." },
  "data scientist":           { demand:"📈 High demand",         tip:"Python, SQL, and storytelling skills are the winning combo." },
  "data engineer":            { demand:"🔥 High demand",         tip:"Spark, dbt, and cloud data platforms are the most sought-after skills." },
  "product manager":          { demand:"🔥 Very high demand",   tip:"Fintech and SaaS PMs command the highest packages." },
  "engineering manager":      { demand:"📈 High demand",         tip:"Strong technical background + people skills is the winning combo." },
  "registered nurse":         { demand:"🔥 Critical shortage",  tip:"ICU and ER specialists see the fastest placement." },
  "nurse practitioner":       { demand:"🔥 High demand",         tip:"Primary care NPs are being hired directly by retail clinics." },
  "financial analyst":        { demand:"📊 Steady demand",       tip:"CFA or MBA holders are preferred for senior roles." },
  "marketing manager":        { demand:"📈 Growing demand",      tip:"Digital and performance marketing expertise commands a premium." },
  "devops engineer":          { demand:"🔥 Very high demand",    tip:"Kubernetes, Terraform, and CI/CD mastery are table-stakes skills." },
  "cloud architect":          { demand:"🔥 Very high demand",    tip:"Multi-cloud experience is a major differentiator." },
  "ux designer":              { demand:"📈 High demand",          tip:"Portfolio quality matters more than years of experience." },
  "machine learning":         { demand:"🔥 Explosive growth",   tip:"LLM and GenAI experience commands a 20–30% salary premium." },
  "ml engineer":              { demand:"🔥 Explosive growth",   tip:"Production ML experience is rare and highly valued." },
  "security engineer":        { demand:"🔥 Critical need",       tip:"CISSP/CEH certifications open senior roles quickly." },
  "cybersecurity":            { demand:"🔥 Critical shortage",   tip:"Zero-trust and cloud security experience are in high demand." },
  "devops":                   { demand:"🔥 Very high demand",    tip:"Kubernetes and IaC (Terraform) are table-stakes skills." },
  "site reliability":         { demand:"🔥 High demand",         tip:"SREs with strong observability skills are very hard to find." },
  "qa engineer":              { demand:"📊 Steady demand",       tip:"Automation (Selenium, Cypress, Playwright) makes you stand out." },
  "scrum master":             { demand:"📊 Steady demand",       tip:"CSM or SAFe certification is expected for most roles." },
  "sales manager":            { demand:"📊 Consistent demand",   tip:"A strong quota track record is your most important asset." },
  "accountant":               { demand:"📊 Stable demand",       tip:"CPA certification significantly expands your opportunities." },
  "recruiter":                { demand:"📈 Growing demand",      tip:"Technical recruiting is especially valued — and well-paid." },
  "truck driver":             { demand:"🔥 Driver shortage",     tip:"CDL Class A with clean record gets instant callbacks." },
  "electrician":              { demand:"🔥 Skilled trade shortage", tip:"Master electrician license unlocks the highest-paying contracts." },
  "plumber":                  { demand:"🔥 Skilled trade shortage", tip:"Commercial plumbers can earn significantly more than residential." },
  "hvac technician":          { demand:"🔥 High demand",          tip:"HVAC certifications (EPA 608, NATE) unlock more positions." },
  "teacher":                  { demand:"📈 High demand",           tip:"STEM and special-ed roles have the most openings nationwide." },
  "pharmacist":               { demand:"📊 Steady demand",         tip:"Hospital and specialty pharmacy roles pay the most." },
  "physical therapist":       { demand:"📈 Growing demand",        tip:"Outpatient orthopedic PT is the highest-paying specialty." },
  "content writer":           { demand:"📊 Steady demand",         tip:"Demonstrated expertise in a specific niche commands better rates." },
  "social media manager":     { demand:"📊 Steady demand",         tip:"Data-driven storytelling + platform expertise sets you apart." },
  "civil engineer":           { demand:"📈 Growing demand",        tip:"Infrastructure bill funding is driving demand for civil engineers." },
  "mechanical engineer":      { demand:"📊 Steady demand",         tip:"EV and clean energy roles are seeing the fastest growth." },
  "welder":                   { demand:"🔥 Skilled trade shortage", tip:"Certified welders (AWS CWI) earn significantly more than uncertified peers." },
  "carpenter":                { demand:"🔥 High demand",            tip:"Residential construction is booming — union membership accelerates pay." },
  "project manager":          { demand:"📈 High demand",            tip:"PMP certification is highly valued across industries." },
  "business analyst":         { demand:"📊 Steady demand",          tip:"SQL and data visualization skills set you apart from the competition." },
  "account executive":        { demand:"📈 Growing demand",         tip:"SaaS AEs are in the highest demand — target Series B/C companies." },
  "graphic designer":         { demand:"📊 Steady demand",          tip:"Motion design and video editing skills command a 20% premium." },
  "ux researcher":            { demand:"📈 Growing demand",         tip:"Mixed-methods research experience is especially sought after." },
};

export function getMarketIntel(keyword) {
  if (!keyword) return null;
  const kl = keyword.toLowerCase();
  // Sort by key length descending — longer (more specific) keys match first
  const sorted = Object.entries(MARKET_INTEL).sort((a, b) => b[0].length - a[0].length);
  // 1st pass: role key contained IN keyword (e.g. "devops engineer" includes "devops engineer")
  for (const [role, intel] of sorted) {
    if (kl.includes(role)) return intel;
  }
  // 2nd pass: keyword first word contained IN role key (prefix match)
  const first = kl.split(" ")[0];
  for (const [role, intel] of sorted) {
    if (role.includes(first)) return intel;
  }
  return null;
}

/** Typed response templates */
export const RESPONSE_TEMPLATES = {
  greeting: () =>
    "👋 Hi! I'm **JobGPT 2.0** — your AI job search assistant.\n\nI work like a headhunter — the more you tell me, the better I match. Try:\n• *\"Senior software engineer, remote, 8 years exp\"*\n• *\"ICU nurse jobs in Chicago\"*\n• *\"Healthcare jobs\"* (browse an industry)\n• *\"What does a product manager earn?\"*",

  vague: () =>
    "I'd be happy to help — could you share a bit more about what you're looking for?\n\nJust mention a role, location, or industry and I'll take it from there. For example:\n• **\"Software Engineer in New York\"**\n• **\"Remote nursing jobs\"**\n• **\"Finance roles, entry level\"**",

  spam: () =>
    "⚠️ I can't help with that type of opportunity. I specialise in legitimate professional job searches. What role can I find for you?",

  salary: ({ role, estimate, isSenior, context }) => {
    const level = isSenior ? "senior-level " : "";
    const intel = getMarketIntel(role);
    const demandLine = intel ? `\n\n${intel.demand} — ${intel.tip}` : "";
    return `💰 **Salary estimate for ${level}${role}:** ${estimate || "Not available"}${demandLine}\n\n${context}\n\n*Ranges are US market estimates. Location, company size, and your background affect actual offers.*`;
  },

  search_results: ({ confirmMsg, count, complexity, confidence, role, abVariant }) => {
    const plural = count === 1 ? "job" : "jobs";
    const confBadge = confidence >= 80 ? ` 🎯 ${confidence}% match` : confidence >= 50 ? ` ⚡ ${confidence}% match` : "";
    const intel = role ? getMarketIntel(role) : null;
    const demandHint = (intel && abVariant === "B" && complexity !== "simple")
      ? `\n💡 *${intel.demand} for ${role} — ${intel.tip}*` : "";
    return `${confirmMsg}\n\n✅ Found **${count} ${plural}**${confBadge}${demandHint}! Here are the top picks:`;
  },

  no_results: ({ confirmMsg, hasLocation, hasExperience }) => {
    let tip = "Sorry, no exact matches found. ";
    if (!hasLocation)       tip += "Try adding a city or switching to Remote.";
    else if (hasExperience) tip += "Try expanding the experience range.";
    else                    tip += "Try broadening your filters.";
    return `${confirmMsg}\n\n${tip}`;
  },

  similar_roles: ({ role, suggestions }) =>
    `💡 Since you searched for **${role}**, you might also like:\n**${suggestions}**\n\nWant me to search any of these?`,

  career_pivot: ({ from, to }) =>
    `🔄 Great move! Transitioning from **${from}** to **${to}** is very achievable.\n\nI'll search for **${to}** roles that value transferable skills. Want to narrow by location or experience level?`,

  headhunter_intro: ({ role }) =>
    `🎯 **${role}** — great choice. Before I search, a quick question: are you open to remote roles, or do you prefer a specific city? And what experience level are you targeting?`,
};

/** Compute context-aware quick reply suggestions — headhunter style */
export function computeFollowUps(parsed, matchCount, profile) {
  const followUps = [];
  const hasLocation   = !!(parsed.location   || profile.location);
  const hasType       = !!(parsed.employmentType || profile.type);
  const hasExperience = !!(parsed.experience || profile.experience);
  const role          = parsed.keyword || profile.role || "";
  const isTechRole    = /\b(engineer|developer|data|devops|cloud|product|software|ml|ai)\b/i.test(role);
  const isHealthRole  = /\b(nurse|doctor|physician|therapist|pharmacist|medical)\b/i.test(role);
  const isTradeRole   = /\b(electrician|plumber|welder|hvac|carpenter|mechanic|driver|cdl)\b/i.test(role);

  // Primary action — only show count chip if it's meaningful
  if (matchCount > 5)      followUps.push(`Show all ${matchCount} jobs`);
  else if (matchCount > 0) followUps.push("Show similar roles");
  else                     followUps.push("Broaden search");

  // Employment type suggestions — context-aware
  if (!hasType) {
    if (isTradeRole)       followUps.push("On-site jobs");
    else if (isTechRole)   followUps.push("Remote only");
    else                   followUps.push("Remote only");
  }

  // Experience suggestions — context-aware
  if (!hasExperience) {
    if (isTechRole)   followUps.push("Senior level");
    else if (isHealthRole) followUps.push("Entry level");
    else              followUps.push("Senior level");
  }

  // Salary insight — after 2nd search
  if (role && (profile.searchCount || 0) >= 2 && !profile.salaryAsked) {
    followUps.push(`What does a ${role} earn?`);
  } else if (role && !hasLocation && matchCount > 5) {
    followUps.push("Add a location");
  } else if (role && followUps.length < 4) {
    followUps.push(`Interview prep for ${role}`);
  }

  // Interview prep if role found and haven't suggested yet
  if (role && !followUps.some(f => f.startsWith("Interview")) && followUps.length < 4) {
    followUps.push(`Interview prep`);
  }

  return [...new Set(followUps)].slice(0, 4);
}

/**
 * Generate a smart headhunter discovery question when search lacks key dims.
 * Returns null if profile is already complete enough.
 */
export function getHeadhunterQuestion(parsed, profile, matchCount) {
  const hasLoc  = !!(parsed.location    || profile.location);
  const hasType = !!(parsed.employmentType || profile.type);
  const hasExp  = !!(parsed.experience  || profile.experience);
  const role    = parsed.keyword || profile.role;
  const count   = profile.searchCount || 0;

  // Only ask after first search (don't overwhelm on first interaction)
  if (count < 1) return null;

  if (!hasLoc && !hasType && role)
    return `\n\n📍 *Are you looking for remote work, or targeting a specific city?*`;
  if (hasLoc && !hasType && matchCount > 10)
    return `\n\n🏠 *Would you prefer remote, hybrid, or on-site?*`;
  if (!hasExp && role && count >= 2)
    return `\n\n🎯 *What experience level are you at — entry, mid, or senior?*`;
  if (role && count === 2 && !profile.salaryAsked)
    return `\n\n💰 *Do you have a target salary in mind? I can filter by compensation range.*`;
  return null;
}
