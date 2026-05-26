import { FAAExamQuestion, FAAResource, GlossaryTerm, StudyConcept, AirspaceZone } from "../types";

export const faaResources: FAAResource[] = [
  {
    name: "FAA UAS Website Portal",
    url: "https://www.faa.gov/uas",
    category: "Manuals",
    purpose: "Primary landing page for online UAS registration, safety guidelines, and federal program updates.",
    examRelevance: "Critical source for drone pilot certificate tracking, registration guidelines, and the FAA DroneZone portal.",
    businessRelevance: "Direct interface for logging commercial fleets, submitting Part 107 waivers, and checking advisory directives.",
    relatedConcepts: ["DroneZone", "sUAS Registration", "Waivers"]
  },
  {
    name: "FAA Dynamic Regulatory System (DRS)",
    url: "https://drs.faa.gov",
    category: "Regulations",
    purpose: "Unified portal hosting all active aviation regulations, FAA Orders, advisory circulars, and historical exemptions.",
    examRelevance: "Primary database for 14 CFR Part 107, Part 48, Advisory Circular AC 107-2, and airworthiness checklists.",
    businessRelevance: "Invaluable for researching commercial operation authorizations and analyzing legal precedents for waiver requests.",
    relatedConcepts: ["14 CFR Part 107", "AC 107-2", "Advisory Circulars"]
  },
  {
    name: "FAA UAS Policy Library",
    url: "https://www.faa.gov/uas/resources/policy_library/",
    category: "Policy",
    purpose: "Repository details official policy statements, NOTAM guidelines, active sovereign orders, and agency legal briefs.",
    examRelevance: "Supports the study of Temporary Flight Restrictions (TFRs) and standard NOTAM issuance mechanics.",
    businessRelevance: "Ensures business operations conform to federal drone defense guidelines, Remote ID implementation, and state laws.",
    relatedConcepts: ["NOTAMs", "TFRs", "Remote ID"]
  },
  {
    name: "FAA Airman Testing Standards Branch",
    url: "https://www.faa.gov/training_testing/testing/",
    category: "Manuals",
    purpose: "Coordinates remote pilot certification testing, publishes testing supplement books and official sample exams.",
    examRelevance: "Hosts the Airman Certification Standards (ACS), Knowledge Testing Supplements, and PHAK references.",
    businessRelevance: "Provides the strict syllabus for training internal fleet operations personnel to pass the Part 107 exam.",
    relatedConcepts: ["ACS", "Knowledge Supplement", "PHAK"]
  },
  {
    name: "Aeronautical Chart User's Guide",
    url: "https://www.faa.gov/air_traffic/flight_info/aeronav/digital_products/aero_guide/",
    category: "Charts",
    purpose: "Comprehensive legend and explanation of all aeronautical chart features, terminal charts, and airport symbols.",
    examRelevance: "Indispensable for decoding VFR Sectional charts, airport symbols, radio frequencies, and airspace limits on the exam.",
    businessRelevance: "Used for accurate visual map analysis when planning commercial operations in tight municipal grids.",
    relatedConcepts: ["VFR Sectional", "Airport Symbols", "Tower Frequencies"]
  },
  {
    name: "NWS Aviation Weather Center",
    url: "https://www.aviationweather.gov/",
    category: "Weather",
    purpose: "Weather portal for standard raw weather feeds, including METARs, TAFs, SIGMETs, and wind aloft charts.",
    examRelevance: "Core exam questions require decoding METAR text logs, evaluating wind direction, temperature spreads, and cloud levels.",
    businessRelevance: "Crucial operational system for daily flight planning to prevent microburst impacts and thermal battery losses.",
    relatedConcepts: ["METAR", "TAF", "Icing Risks"]
  },
  {
    name: "LAANC Authorization Portal",
    url: "https://www.faa.gov/uas/programs_resources/laanc",
    category: "Agencies",
    purpose: "Provides near-real-time automated airspace authorization to pilots wishing to operate in controlled NAS airspaces.",
    examRelevance: "Establishes procedural protocol for flying within Class B, C, D, and E surface areas legally.",
    businessRelevance: "Dramatically reduces authorization lead times from months to seconds, enabling rapid commercial flight dispatch.",
    relatedConcepts: ["LAANC", "Controlled Airspace", "Altitude Grid"]
  },
  {
    name: "Integrated Airman Certification and Rating (IACRA)",
    url: "https://iacra.faa.gov/iacra/",
    category: "Policy",
    purpose: "FAA portal to register a FAA Tracking Number (FTN) and submit official Pilot Certificates upon passing the Part 107 exam.",
    examRelevance: "Understanding the chain of command: passing the exam -> registering FTN on IACRA -> receiving temporary certificate.",
    businessRelevance: "Administrative tool for managing executive pilot licenses and tracking professional recurrency timelines.",
    relatedConcepts: ["IACRA", "FTN", "Remote Pilot License"]
  }
];

export const glossaryTerms: GlossaryTerm[] = [
  {
    term: "AIS",
    short: "Abbreviated Injury Scale",
    definition: "An anatomical-based consensus classification grading system that rates injury severity on an incrementing scale from 1 (minor) to 6 (fatal). An AIS score of 3 or higher triggers the mandatory FAA accident reporting threshold.",
    relatedConcepts: ["Accident Reporting", "Regulations"],
    relatedQuestions: ["FAA-Q1"]
  },
  {
    term: "sUAS Accident",
    short: "Small UAS Accident",
    definition: "Under Part 107, an incident requiring reporting within 10 days to the FAA if it involves serious injury (AIS level 3 or higher), loss of consciousness of any crew member, or property damage over $500 (excluding the drone itself).",
    relatedConcepts: ["AIS", "10-Day Notification"],
    relatedQuestions: ["FAA-Q1", "FAA-Q10"]
  },
  {
    term: "AGL",
    short: "Above Ground Level",
    definition: "The altitude of an aircraft measured relative to the terrain directly below it. Part 107 caps standard altitude at 400 feet AGL unless operating near towers.",
    relatedConcepts: ["Altitude", "VFR Sectional"],
    relatedQuestions: ["FAA-Q5"]
  },
  {
    term: "ACS",
    short: "Airman Certification Standards",
    definition: "The official FAA testing framework containing knowledge requirements, task parameters, and risk management guidelines for standard airman tests.",
    relatedConcepts: ["Aviation Testing", "Remote Pilot Guide"],
    relatedQuestions: ["FAA-Q11"]
  },
  {
    term: "NOTAM",
    short: "Notice to Airmen",
    definition: "A tactical telecom warning issued by the FAA to notify pilots of critical operations, temporary flight safety hazards, or airforce movements in specific regions.",
    relatedConcepts: ["TFR", "Air traffic alerts"],
    relatedQuestions: ["FAA-Q12"]
  },
  {
    term: "Remote PIC",
    short: "Remote Pilot in Command",
    definition: "The final authority and person strictly responsible for the safety, integrity, inspection, crew management, and compliance of a sUAS flight mission.",
    relatedConcepts: ["Crew Resource Management", "Preflight Checklist"],
    relatedQuestions: ["FAA-Q4", "FAA-Q8"]
  },
  {
    term: "VLOS",
    short: "Visual Line of Sight",
    definition: "The physical pilot constraint requiring that the Remote PIC or visual observer retains direct naked-eye (un-aided, corrective lenses allowed) sight of the aircraft.",
    relatedConcepts: ["VO", "Operations over people"],
    relatedQuestions: ["FAA-Q2", "FAA-Q13"]
  },
  {
    term: "LAANC",
    short: "Low Altitude Authorization & Notification Capability",
    definition: "An automated agency system allowing certified sUAS pilots to receive instant flight clearance in controlled airspace around hundreds of participating airports.",
    relatedConcepts: ["Airspace", "ATC Clearance"],
    relatedQuestions: ["FAA-Q2", "FAA-Q3"]
  },
  {
    term: "Class G",
    short: "Uncontrolled Airspace",
    definition: "Airspace that is not designated as Class A, B, C, D, or E controlled airspace. Drone flights are authorized up to 400 feet AGL without prior ATC clearance.",
    relatedConcepts: ["AGL", "Airspace"],
    relatedQuestions: ["FAA-Q5"]
  },
  {
    term: "Waiver (14 CFR 107.200)",
    short: "FAA Part 107 Waiver",
    definition: "An official authorization from the FAA permitting deviation from specific Part 107 regulations (e.g., flight at night, beyond line of sight, swarm ops) if safety is proven.",
    relatedConcepts: ["Regulations", "Swarm systems"],
    relatedQuestions: ["FAA-Q14", "FAA-Q15"]
  }
];

export const airspaceZones: AirspaceZone[] = [
  {
    id: "B",
    name: "Class B Airspace",
    altitude: "Normally SFC (Surface) to 10,000 feet MSL",
    authorization: "Prior Airspace Authorization Required (via LAANC or FAA DroneZone)",
    meaning: "Surrounds the nation's busiest commercial passenger hubs. Structured like an upside-down multi-tiered wedding cake.",
    missionExample: "Delivering cargo in metropolitan Boston center adjacent to Logan International.",
    faaLogic: "Densest commercial air corridors call for secondary radar, advanced radio equipment, and positive air traffic control.",
    memoryLock: "Blue concentric solid circles on Sectional. Needs EXPLICIT tactical hazard authorization BEFORE operating.",
    relatedQuery: "What is Class B and how do I receive permission to operate inside it?"
  },
  {
    id: "C",
    name: "Class C Airspace",
    altitude: "Normally SFC to 4,000 feet above airport elevation",
    authorization: "Prior Airspace Authorization Required (via LAANC or FAA DroneZone)",
    meaning: "Surrounds moderately busy regional airports featuring active radar service and passenger towers. Structured with a 5 NM inner ring and 10 NM outer shelf.",
    missionExample: "Filming commercial real estate within 3 miles of Oakland International Airport.",
    faaLogic: "Moderate commercial passenger volume calls for transponders and coordinated radar spacing services.",
    memoryLock: "Solid magenta concentric circles on Sectional. Operations require LAANC clearance before throttle up.",
    relatedQuery: "Does Class C airspace require radio contact or automated LAANC approval?"
  },
  {
    id: "D",
    name: "Class D Airspace",
    altitude: "Normally SFC to 2,500 feet above airport elevation",
    authorization: "Prior Airspace Authorization Required (via LAANC or FAA DroneZone)",
    meaning: "Surrounds smaller regional airports that feature active control towers but lack comprehensive radar assistance networks.",
    missionExample: "Inspecting an industrial shipyard within 1.5 miles of a local regional airfield tower.",
    faaLogic: "Ensures local tower controllers can safely sequence incoming light aircraft without sUAS visual interference.",
    memoryLock: "Dashed blue circles on Sectional. Space is only controlled when the tower is fully active.",
    relatedQuery: "What happens to Class D airspace when the control tower closes for the night?"
  },
  {
    id: "E",
    name: "Class E Airspace",
    altitude: "Varies; normally starts at 700 ft AGL, 1200 ft AGL or some Surface Areas",
    authorization: "Authorization Required ONLY if designated as Surface Class E (E2)",
    meaning: "Controlled airspace comprising federal air routes, dynamic transition areas, and airport surrounds without Tower coordination.",
    missionExample: "Mapping agricultural cornfields starting at SFC in Class E airspace extension hubs.",
    faaLogic: "Maintains positive control of high-speed instrument flight rules (IFR) traffic transitioning safely between terminal airspaces.",
    memoryLock: "Dashed magenta outline on Sectional indicates surface area (Clearance needed) vs fading magenta (starts at 700 AGL).",
    relatedQuery: "When is Class E airspace free to operate under Part 107 without prior ATC authorization?"
  },
  {
    id: "G",
    name: "Class G Airspace",
    altitude: "Surface to overlying controlled airspace (normally 700 or 1,200 ft AGL)",
    authorization: "No prior FAA authorization or notification required",
    meaning: "Uncontrolled airspace in which standard pilots operate under Visual Flight Rules. Standard drone gold-zone up to 400 ft AGL.",
    missionExample: "Performing roof inspections or building swarm systems over suburban industrial clusters away from airports.",
    faaLogic: "No specialized radio equipment or air traffic sequence controllers are available or mandated in this sector.",
    memoryLock: "Free operation zone. Respect the physical 400 ft AGL cell height ceiling restriction and yield right of way to manned aircraft immediately.",
    relatedQuery: "Can I operate a 50 lb drone in Class G airspace without registering?"
  }
];

export const examQuestions: FAAExamQuestion[] = [
  {
    id: "FAA-Q1",
    question: "Under 14 CFR Part 107, which of the following is considered a reportable 'sUAS Accident' to the FAA?",
    options: [
      "Any scratch or hull fracture to the drone frame requiring minor composite repairs costing $150.",
      "An incident resulting in an injury requiring hospitalization, a loss of consciousness, or third-party property damage exceeding $500.",
      "A total hull-loss flyaway where the drone lands in an empty forest causing no external injury or structural property damage."
    ],
    correctIndex: 1,
    explanation: "Under 14 CFR Part 107.9, an accident must be reported to the FAA within 10 calendar days only if it results in 'serious injury' (equal to or greater than AIS level 3), loss of consciousness of any crew member, or damage to property other than the sUAS itself exceeding $500 to repair or replace.",
    category: "Regulations",
    examRelevance: "High - Direct citation of Part 107.9 accident thresholds.",
    reference: "14 CFR Part 107.9",
    whyWrong: [
      "Minor frame repairs costing $150 fall below the $500 threshold and do not count as serious injuries.",
      "A total hull loss with absolutely no third-party injury or damage does not trigger a federal report."
    ],
    memoryLock: "10 calendar days, > $500 third-party damage, Serious Injury (AIS 3), Loss of Consciousness.",
    operationalMeaning: "If you nick a car's paint and it costs $600 to respray, you must report it within 10 days in the DroneZone portal."
  },
  {
    id: "FAA-Q2",
    question: "To operate legally in controlled airspace (Class B, C, or D), what is the correct operational procedure for a Remote PIC?",
    options: [
      "Initiate radio transmission with local Air Traffic Control on the CTAF frequency immediately prior to take-off.",
      "Apply for and secure positive airspace clearance via the automated LAANC portal or the FAA DroneZone web application.",
      "Activate the drone's anti-collision lights and limit flight strictly to under 100 feet AGL to bypass authorization."
    ],
    correctIndex: 1,
    explanation: "Operations in controlled Class B, C, D, or surface Class E airspace are strictly prohibited without prior authorization. Remote pilots must request and obtain airspace authorization via LAANC (instant automated approval) or FAA DroneZone (for complex airspace waiver needs). Direct tower radio contact is normally prohibited unless requested.",
    category: "Airspace",
    examRelevance: "Core - National Airspace System Authorization Protocol.",
    reference: "14 CFR Part 107.41",
    whyWrong: [
      "Radio transmissions on the CTAF are for advisory notifications, not control approvals, and towers do not monitor them for authorizations.",
      "No automatic low-altitude bypass exits in FAA regulations. All operations in controlled airfields need positive permission."
    ],
    memoryLock: "Controlled airspace = prior digital clearance (LAANC or DroneZone).",
    operationalMeaning: "Check a mapping software like B4UFLY before your flight to see if you are operating inside a controlled airfield grid."
  },
  {
    id: "FAA-Q3",
    question: "What is the absolute maximum weight limit of a small Unmanned Aircraft System (sUAS) to legally operate under 14 CFR Part 107 rules?",
    options: [
      "55 pounds total weight, which includes payload, batteries, and fuel.",
      "Strictly less than 55 pounds (including everything onboard at the moment of launch).",
      "Up to 55 pounds for the frame alone, with an additional 15 pounds allowed for cameras and optics."
    ],
    correctIndex: 1,
    explanation: "Under Part 107, a small UAS is defined as weighing strictly LESS THAN 55 pounds (i.e. up to 54.9 lbs). A drone weighing exactly 55 lbs or more does not qualify as small and must be certificated under alternative standard FAA airworthiness rules.",
    category: "Regulations",
    examRelevance: "Critical - Foundation definition of a small UAS weight boundary.",
    reference: "14 CFR Part 107.3",
    whyWrong: [
      "55 pounds total weight does not meet the legal definition because the drone must weigh *less than* 55 lbs.",
      "The weight limit refers to the aggregate takeoff mass, which strictly includes all framing, batteries, and sensors."
    ],
    memoryLock: "Max sUAS weight = 54.99 lbs (strictly less than 55 lbs).",
    operationalMeaning: "Always weigh heavy carbon frame quadcopters on an industrial scale prior to launch in commercial jobs."
  },
  {
    id: "FAA-Q4",
    question: "Under CRM (Crew Resource Management) principles, who is the absolute final authority regarding the safe operational envelope of a flight mission?",
    options: [
      "The designated Visual Observer (VO) tracking live airspace conflicts.",
      "The Remote Pilot in Command (Remote PIC).",
      "The local ATC controller monitoring regional air traffic radar systems."
    ],
    correctIndex: 1,
    explanation: "The Remote PIC is directly responsible for, and has ultimate veto power and direct final authority as to, the safety of all sUAS operations under Part 107, mirroring standard manned aviation command structures.",
    category: "Operations",
    examRelevance: "High - CRM responsibility and PIC final authority.",
    reference: "14 CFR Part 107.19",
    whyWrong: [
      "The Visual Observer assists in scanning the skies, but handles no command authority over flight decisions.",
      "Air Traffic Control manages airspace separation but is not responsible for the drone's structural safety or piloting decisions."
    ],
    memoryLock: "Remote PIC = absolute captain of the crew.",
    operationalMeaning: "If a supervisor or customer pressures you to fly in a storm override, you must assert your final authority and refuse."
  },
  {
    id: "FAA-Q5",
    question: "In uncontrolled Class G airspace, what is the maximum standard relative altitude of a sUAS flight under Part 107 rules?",
    options: [
      "No absolute altitude limits exist as long as the pilot remains clear of clouds.",
      "400 feet above ground level (AGL) unless flown within a 400-foot radius of a structure, in which case it can fly up to 400 feet above the structure's highest point.",
      "500 feet mean sea level (MSL) or up to the ceiling of overlying aircraft routes."
    ],
    correctIndex: 1,
    explanation: "Under Part 107.51, maximum altitude is 400 feet AGL. Operating above 400 feet AGL is permitted only if you operate within a 400-foot lateral radius of a structure (like a tower or building) and stay within 400 feet of that structure's absolute highest point.",
    category: "Operations",
    examRelevance: "High - Standard vertical altitude limitations.",
    reference: "14 CFR Part 107.51",
    whyWrong: [
      "The sky is not open-altitude. Flying without restraint would severely endanger manned search-and-rescue or general aviation traffic.",
      "Mean sea level (MSL) is height relative to the sea, whereas Part 107 prescribes relative Above Ground Level height."
    ],
    memoryLock: "400 ft AGL standard limit, or 400 ft over structure within a 400 ft radius.",
    operationalMeaning: "To inspect a 300-foot meteorological tower, you can legally fly up to 700 feet AGL if you remain within a 400-foot circle of the tower structure."
  },
  {
    id: "FAA-Q6",
    question: "How should a remote pilot navigate when encountering a manned aircraft (such as an incoming landing helicopter or glider)?",
    options: [
      "Signal right-of-way by shifting to hover mode since the drone is physically smaller and more agile.",
      "Immediately yield right-of-way to the manned aircraft by descending rapidly, landing, or moving well away from the flight path.",
      "Maintain heading and altitude to remain predictable to the manned pilot's TCAS automated radar warning systems."
    ],
    correctIndex: 1,
    explanation: "Under FAA regulations, the Remote PIC must always yield the right-of-way to all manned aircraft (including hot air balloons, airships, gliders, helicopters, and planes). You must immediately yield right of way to maintain safe flight path separation.",
    category: "Operations",
    examRelevance: "Core - Manned aircraft safe separation protocols.",
    reference: "14 CFR Part 107.37",
    whyWrong: [
      "Hovering in place does not yield the right-of-way and still poses a severe mid-air collision hazard.",
      "Maintaining heading assumes the manned pilot can easily spot your small 10-inch frame, which is visually impossible from a cockpit speed."
    ],
    memoryLock: "Manned aircraft ALWAYS have right-of-way. Yield immediately.",
    operationalMeaning: "If you hear an engine sound, immediately descend or hover at a low altitude (e.g., 50 feet) until the helicopter or plane completes transition."
  },
  {
    id: "FAA-Q7",
    question: "What are the cloud separation boundaries required for a sUAS operated under standard Part 107 rules?",
    options: [
      "Keep the drone at least 500 feet below clouds and 2,000 feet horizontally away from any cloud structure.",
      "Remain completely clear of cloud bases; a physical distance buffer is only required when moisture matches icing levels.",
      "Operate at least 1,000 feet below clouds and 3 statute miles horizontally to maintain VFR visibility."
    ],
    correctIndex: 0,
    explanation: "Part 107.51 requires that the sUAS remain at least 500 feet vertically below clouds and at least 2,000 feet horizontally away from any cloud formations to ensure manned pilots descending through a cloud deck have reaction time to see you.",
    category: "Weather",
    examRelevance: "High - Specific visibility and separation thresholds.",
    reference: "14 CFR Part 107.51",
    whyWrong: [
      "Hugging cloud lines represents a hazard to high-speed transitioning manned traffic coming through clouds.",
      "A 1,000-foot buffer and 3-mile horizontal separation are manned instrument criteria, exceeding the default drone rules."
    ],
    memoryLock: "500 feet below, 2,000 feet side-to-side (horizontal).",
    operationalMeaning: "If a cloud ceiling is at 800 feet AGL, your maximum legal altitude is capped at 300 feet AGL to maintain the 500-foot vertical buffer."
  },
  {
    id: "FAA-Q8",
    question: "To legally perform a night operation, what anti-collision lighting equipment is mandated on the sUAS?",
    options: [
      "Any standard high-brightness LED landing lights regardless of flash frequency.",
      "An anti-collision lighting system visible for at least 3 statute miles with a flashing rate sufficient to avoid collision.",
      "An approved infrared strobe visible exclusively to other thermal-equipped remote operations crew."
    ],
    correctIndex: 1,
    explanation: "Under 14 CFR Part 107.29, night operations are permitted without waiver if the drone features functional anti-collision lighting visible for at least 3 statute miles and has a flashing rate sufficient to prevent collisions.",
    category: "Operations",
    examRelevance: "Critical - Contemporary night operations update rules.",
    reference: "14 CFR Part 107.29",
    whyWrong: [
      "Standard operational LEDs do not meet the strict 3 statute mile visibility standard required for airspace collision avoidance.",
      "Infrared strobes are invisible to standard sight and do not protect the drone from incoming classical manned pilots."
    ],
    memoryLock: "Night flight lights = 3 statute miles visibility, flashing strobe.",
    operationalMeaning: "Install high-power strobe units (mounted facing both up and down) before taking commercial night-sky photos."
  },
  {
    id: "FAA-Q9",
    question: "What effect does high density altitude have on sUAS performance, particularly regarding aerodynamics and electrical duty cycles?",
    options: [
      "High density altitude increases air density, which dramatically improves airfoil lift and decreases motor temperature levels.",
      "High density altitude represents thin air, which decreases propeller lift efficiency, degrades engine thrust, and reduces overall battery cruise efficiency.",
      "It has zero operational effect on electrical drone systems, as electric brushless motors are entirely independent from gas compression ratios."
    ],
    correctIndex: 1,
    explanation: "High density altitude represents thin air (caused by high heat, low pressure, or high elevation). This degrades performance because thin air reduces airfoil lift and propeller efficiency, forcing drone motors to work harder to achieve hover, draining batteries faster.",
    category: "Weather",
    examRelevance: "High - Density altitude aerodynamical effects.",
    reference: "FAA Pilot's Handbook of Aeronautical Knowledge",
    whyWrong: [
      "High density altitude is actually low air density, which reduces airfoil life and increases heating.",
      "While electric motors don't need oxygen to combust, they absolutely suffer from lack of air molecules to generate propeller thrust."
    ],
    memoryLock: "High density altitude = thin air = sluggish flight, fast battery drain.",
    operationalMeaning: "When flying in a mountain sector (e.g. Denver in high summer), expect your battery endurance to drop by 20-30%."
  },
  {
    id: "FAA-Q10",
    question: "If a drone crash punctures a high-output Lithium Polymer (LiPo) battery, what is the safest immediate action to prevent severe hazard?",
    options: [
      "Submerge the battery in an insulated saltwater solution inside the control station immediately.",
      "Place the punctured battery in a fire-safe non-combustible isolated zone and monitor for signs of thermal runaway such as swelling or fumes.",
      "Wrap the battery tightly in duct tape to isolate any exposed toxic active chemical cells from moisture."
    ],
    correctIndex: 1,
    explanation: "Lithium Polymer batteries are volatile. A puncture can trigger localized short-circuits leading to thermal runaway (extreme temperatures and intense fire). The safest procedure is to isolate the battery in a non-combustible container (like a metal box or sand bucket) outdoors.",
    category: "Operations",
    examRelevance: "High - Battery safety and hazmat operational guidelines.",
    reference: "FAA Advisory Circular AC 107-2A",
    whyWrong: [
      "Submerging a freshly punctured hot battery in water can produce highly toxic gases or explosive hydrogen gas mixtures.",
      "Wrapping the battery in duct tape traps intense chemical heat inside, increasing the explosive severity of thermal runaway."
    ],
    memoryLock: "Punctured battery = Isolate in a fire-safe zone, never wrap, do not submerge.",
    operationalMeaning: "Always carry a heavy-duty fire bag or sand bucket in your crew truck specifically for volatile cells."
  },
  {
    id: "FAA-Q11",
    question: "What is the standard FAA recurrent training requirement to maintain active remote pilot certification privileges?",
    options: [
      "You must retake the in-person proctored Part 107 examination at a Knowledge Testing center every 12 calendar months.",
      "Complete the FAA-approved free online recurrent training course on the FAA Safety portal every 24 calendar months.",
      "Log at least 50 hours of documented commercial flight commands in an approved digital logbook every year."
    ],
    correctIndex: 1,
    explanation: "Under active FAA rules, remote pilots maintain currency by completing the official online recurrent training module every 24 calendar months (2 years). This training is free and hosted on the FAA's specialized web portal.",
    category: "Regulations",
    examRelevance: "Core - Maintaining active pilot status and currency.",
    reference: "14 CFR Part 107.65",
    whyWrong: [
      "The physical exam does not need to be repeated in person unless a license has expired and you bypass online recurrency.",
      "Manned flight hours or commercial drone logbook entries do not substitute for the mandatory FAA safety training module."
    ],
    memoryLock: "Recurrency cycle = 24 calendar months (free online course).",
    operationalMeaning: "Always check your Pilot ID certificate dates. Complete your recurrency course before the end of the 24th month."
  },
  {
    id: "FAA-Q12",
    question: "Which pre-flight weather informational feed provides real-time conditions at a specific airport terminal in structured coded text?",
    options: [
      "TAF (Terminal Aerodrome Forecast), which lists expected projections.",
      "METAR (Meteorological Aerodrome Report), which lists current observed conditions.",
      "Surface Prognostic Charts, which list localized regional weather fronts."
    ],
    correctIndex: 1,
    explanation: "METAR is an aviation report reflecting actual real-time weather observations at a specific airport. TAF stands for Terminal Aerodrome Forecast, projecting expected future conditions over a 24- to 30-hour window.",
    category: "Weather",
    examRelevance: "Core - Pre-flight weather assessment services.",
    reference: "FAA Weather Services Guide (AC 00-45H)",
    whyWrong: [
      "TAF provides forward projections of what weather *will be*, not what is currently happening on the runway.",
      "Surface Prognostic Charts show large-scale synoptic fronts, not terminal-level data logs."
    ],
    memoryLock: "METAR = Measured / Meteorological (Now); TAF = Tomorrow / Forecast (Later).",
    operationalMeaning: "Check neighboring METAR reports for crosswinds and cloud ceilings before flying close to municipal borders."
  },
  {
    id: "FAA-Q13",
    question: "Which hazardous pilot attitude is represented by the thought: 'It won't happen to me'?",
    options: [
      "Macho attitude.",
      "Invulnerability attitude.",
      "Anti-authority attitude."
    ],
    correctIndex: 1,
    explanation: "Invulnerability represents the hazardous state of mind where general accidents are understood to happen to other pilots, but not to oneself. The correct mental antidote is: 'It could happen to me.'",
    category: "Human Factors",
    examRelevance: "High - Aviation Psychology and Human Factors.",
    reference: "FAA Advisory Circular AC 60-22 (Aeronautical Decision Making)",
    whyWrong: [
      "Macho is the 'I can do it' attitude, which is characterized by over-risky stunts to impress others.",
      "Anti-authority is the 'Don't tell me what to do' attitude, which rejects standard regulations as redundant constraint."
    ],
    memoryLock: "It won't happen to me = Invulnerable. Antidote: It COULD happen to me.",
    operationalMeaning: "Never skip your preflight inspection because you haven't crashed in two years. Normalcy bias is a pilot killer."
  },
  {
    id: "FAA-Q14",
    question: "Under Part 107.21, what command overrides standard regulations in the event of an in-flight emergency threat?",
    options: [
      "The Remote PIC must contact ATC to request permission before deviating from safety limits.",
      "The Remote PIC may immediately deviate from any Part 107 regulation to the extent necessary to meet that emergency.",
      "The flight crew must immediately initiate the fail-safe Return-to-Home protocol, even if it breaches airspace bounds."
    ],
    correctIndex: 1,
    explanation: "In an active in-flight emergency, the Remote PIC has ultimate emergency authority and may immediately deviate from any Part 107 rule to ensure safety. A written report must be submitted to the FAA only if requested.",
    category: "Operations",
    examRelevance: "High - Emergency authority and deviation rules.",
    reference: "14 CFR Part 107.21",
    whyWrong: [
      "In an active crash threat, dial-in clearances are impossible. Safe separation of life and property comes first.",
      "Return-to-Home scripts might carry the drone straight into high-tension lines or manned aircraft vectors depending on layout."
    ],
    memoryLock: "Emergency = Deviation allowed to meet the crisis. Report upon request.",
    operationalMeaning: "If a toddler runs into your landing area, you can climb the drone into controlled airspace without prior clearance."
  },
  {
    id: "FAA-Q15",
    question: "To operate multiple drones simultaneously using a single control station (Swarm Operations), what is required?",
    options: [
      "An active FAA Part 107 waiver for Section 107.35 (Operation of multiple small UAS).",
      "Assigning one distinct Visual Observer to monitor each separate aircraft with manual cutoff switches.",
      "Double high-power radio arrays utilizing redundant military channels to prevent cross-interference."
    ],
    correctIndex: 0,
    explanation: "Under standard Part 107, single-pilot dual-drone operations are forbidden. To fly more than one drone at the same time, the operator must obtain an official Part 107 waiver (specifically waiving Section 107.35).",
    category: "Regulations",
    examRelevance: "Core - FAA waiver protocols for swarm environments.",
    reference: "14 CFR Part 107.200 / Part 107.35",
    whyWrong: [
      "Adding Visual Observers does not overcome the core regulatory constraint that prohibits a single PIC from controlling multiple drones.",
      "Military-grade radios do not lift the federal requirement for a formal operational waiver."
    ],
    memoryLock: "Multiple drones = Section 107.35 Waiver required.",
    operationalMeaning: "Drone light show businesses must apply for and secure FAA Section 107.35 waivers containing safety proofs months in advance."
  },
  {
    id: "FAA-Q16",
    question: "What is the minimum age requirement for an applicant to be eligible to apply for a Remote Pilot Certificate with a small UAS rating?",
    options: [
      "Exactly 14 years of age.",
      "Exactly 16 years of age.",
      "Exactly 18 years of age."
    ],
    correctIndex: 1,
    explanation: "Under 14 CFR Part 107.61, an applicant must be at least 16 years of age to be eligible for a Remote Pilot Certificate. This ensures sufficient maturity to take physical command of complex aircraft.",
    category: "Regulations",
    examRelevance: "High - Pilot certificate criteria.",
    reference: "14 CFR Part 107.61",
    whyWrong: [
      "14 years is too young under FAA safety standards for commercial PIC command authority.",
      "While 18 is the legal majority, the FAA permits certified remote pilots to operate at 16."
    ],
    memoryLock: "16 = Part 107 Remote Pilot License, driving a car.",
    operationalMeaning: "Teenage flight trainees can take the proctored test as long as they have crossed their 16th birthday."
  },
  {
    id: "FAA-Q17",
    question: "What is the primary function of a Notice to Airmen (NOTAM) in pre-flight mission coordination?",
    options: [
      "To provide detailed billing updates regarding FAA registration numbers.",
      "To notify pilots of time-sensitive flight safety hazards, temporary flight restrictions, or active airspace closures.",
      "To document historical weather trends around specific mountain valleys."
    ],
    correctIndex: 1,
    explanation: "NOTAMs contain immediate, crucial aeronautical information regarding active runway closures, military operations, temporary flight restrictions (TFRs) for rocket launches or stadium crowds, or damaged beacon lights.",
    category: "Airspace",
    examRelevance: "Core - Airspace safety warnings.",
    reference: "FAA Order Jo 7930.2 (NOTAM Manual)",
    whyWrong: [
      "A NOTAM is not a financial or administrative invoice system.",
      "A NOTAM contains real-time critical hazards, not slow historical atmospheric weather aggregates."
    ],
    memoryLock: "NOTAM = Notice of Temporary Airspace Mishaps / Hazards.",
    operationalMeaning: "Always check the FAA NOTAM Search tool before launch to ensure your drone job isn't inside an active VIP TFR."
  },
  {
    id: "FAA-Q18",
    question: "According to 14 CFR Part 107, what are the strict operational duties of a Visual Observer (VO)?",
    options: [
      "The VO must visually track the drone's position to assist the Remote PIC in scanning the surrounding sky for manned aircraft hazard.",
      "The VO must maintain direct co-piloting controls on a secondary buddy box receiver at all times.",
      "The VO is responsible for logging radio communications directly into the airport CTAF terminal."
    ],
    correctIndex: 0,
    explanation: "The Visual Observer's sole designated duty is to assist the Remote PIC in scanning the sky for potential manned traffic or physical obstacles. The use of a VO is optional, but highly recommended in tight corridors.",
    category: "Operations",
    examRelevance: "High - Flight crew roles.",
    reference: "14 CFR Part 107.33",
    whyWrong: [
      "The VO is not required or expected to hold active physical steering control on a secondary radio unit.",
      "Radio logging for ATC lies inside the legal duties of the PIC, not the advisory VO."
    ],
    memoryLock: "VO = Sky scanner eye partner. Assists PIC with visual safety.",
    operationalMeaning: "Ensure your VO knows standard direction clocks (e.g. 'Manned helicopter 2 o'clock, descending') out on site."
  },
  {
    id: "FAA-Q19",
    question: "What is the key regulatory distinction between the Remote PIC and a Person Manipulating the Flight Controls (PMC)?",
    options: [
      "The PMC must be certified, while the Remote PIC does not need any aviation licenses as long as they supervise.",
      "The Remote PIC holds the ultimate responsibility for the safe outcome of the flight, even if another non-certified person is manipulating the control sticks.",
      "The PMC has final veto authority over all flight command routes regardless of pilot agreement."
    ],
    correctIndex: 1,
    explanation: "A non-certified person may manipulate the controls of a drone (the PMC) as long as they are directly supervised by an active, certified Remote PIC. The PIC maintains ultimate legal liability and final authority for the flight's safety.",
    category: "Operations",
    examRelevance: "Core - Command hierarchies and crew roles.",
    reference: "14 CFR Part 107.19 / 107.12",
    whyWrong: [
      "The supervisor (Remote PIC) MUST be licensed under Part 107, while the person steering (PMC) does not need to be certified if supervised.",
      "The PMC has no legal veto power; the Remote PIC is the absolute captain of the flight envelope."
    ],
    memoryLock: "PIC = Ultimate Boss. PMC = Stick holder.",
    operationalMeaning: "You can let a client fly a camera drone to test it, as long as you are standing next to them, ready to grab the controller."
  },
  {
    id: "FAA-Q20",
    question: "To operate a drone legally under Category 1 Operations Over People, what is the maximum aggregate weight limit of the aircraft?",
    options: [
      "Strictly 0.55 pounds (including everything onboard at flight).",
      "Strictly 2.00 pounds (with prop guards installed).",
      "Strictly 4.40 pounds (with active parachute systems)."
    ],
    correctIndex: 0,
    explanation: "Category 1 operations allow flights over people without waiver or specific declaration as long as the drone weighs strictly 0.55 pounds or less (approx 250g) and has no exposed rotating components that could lacerate skin.",
    category: "Regulations",
    examRelevance: "Critical - New operations over people guidelines.",
    reference: "14 CFR Part 107.110",
    whyWrong: [
      "2.00 pounds is the upper zone for Category 2/3 weight models, which require strict kinetic impact certifications.",
      "4.40 pounds exceeds the Category 1 limits and requires full Category 4 airworthiness certification or strict Category 3 bounds."
    ],
    memoryLock: "Category 1 Over People = Under 0.55 lbs (250g). Think DJI Mini series.",
    operationalMeaning: "If your drone weighs 249g (under 0.55 lbs) and has prop guards, you can fly over unsheltered transient crowds."
  },
  {
    id: "FAA-Q21",
    question: "Under Category 2 Operations Over People, what is the primary structural requirement regarding kinetic impact safety?",
    options: [
      "The drone must be equipped with active parachute recovery systems that deploy instantly in microbursts.",
      "The aircraft must be certified to not cause an impact greater than 11 foot-pounds of kinetic energy when hitting a human body, and must have no slashing parts.",
      "The drone must have dual-redundant GPS receivers and operate exclusively inside a geofenced ring."
    ],
    correctIndex: 1,
    explanation: "Category 2 operations require that the manufacturer certifies the UAS does not cause injuries equivalent to or greater than those caused by an impact of 11 foot-pounds of kinetic energy, and has no exposed rotating parts that could lacerate skin.",
    category: "Regulations",
    examRelevance: "High - Kinetic impact thresholds for operations over crowds.",
    reference: "14 CFR Part 107.120",
    whyWrong: [
      "Parachutes are popular safety modifiers, but the exact legal threshold is defined by certified foot-pounds of impact energy.",
      "GPS rings do not prevent kinetic impact cuts or transfer energy thresholds during structural gravity failures."
    ],
    memoryLock: "Category 2 = Under 11 foot-pounds of impact energy, no lacerating blades.",
    operationalMeaning: "Ensure you check the FAA Declaration of Compliance list to see if your drone is labeled as Category 2 and cleared for crowds."
  },
  {
    id: "FAA-Q22",
    question: "What is a main operational restriction placed on drone operations conducted under Category 3 rules Over People?",
    options: [
      "The drone must have a bright orange frame and only fly in absolute daylight hours.",
      "The operation must be conducted in closed-or-restricted-access sites where everyone is on notice, OR flight is limited to passing transiently over citizens.",
      "The aircraft must maintain a physical altitude under 50 feet AGL at all times."
    ],
    correctIndex: 1,
    explanation: "Category 3 rules permit slightly larger impact thresholds (up to 25 foot-pounds). Because of this, you cannot fly over open assemblies of people. Operations must occur either in closed-access controlled job sites, or the drone must only transit transiently over people without hovering.",
    category: "Regulations",
    examRelevance: "High - Operational constraints for Category 3.",
    reference: "14 CFR Part 107.130",
    whyWrong: [
      "Airframe color and absolute daytime filters are not the legal boundaries defining Category 3 crowd buffers.",
      "There is no standard 50-foot altitude cap; altitude is guided by target pre-flight plans and general airspace bounds."
    ],
    memoryLock: "Category 3 = Closed restricted sites, transient hover transit only, no static crowd hovering.",
    operationalMeaning: "At construction sites, brief all crew members during morning meetings about the drone before operating under Category 3 rules."
  },
  {
    id: "FAA-Q23",
    question: "What distinguishes Category 4 Operations Over People from the other three categories?",
    options: [
      "Category 4 aircraft must have an official FAA airworthiness certificate issued under Part 21.",
      "Category 4 operations are exempt from all airspace pilot authorization rules.",
      "Category 4 drones can only fly inside indoor arenas or closed concrete tunnels."
    ],
    correctIndex: 0,
    explanation: "Category 4 applies to larger commercial aircraft. Instead of relying purely on impact calculations, the aircraft must have an official, standard FAA-issued Part 21 airworthiness certificate, operates with strict maintenance manuals, and has registered declarations.",
    category: "Regulations",
    examRelevance: "Core - Heavy drone certification rules.",
    reference: "14 CFR Part 107.140",
    whyWrong: [
      "No drone category is ever exempt from airspace authorizations in controlled Class B, C, or D airfields.",
      "Legally, Category 4 drones operate outdoors in standard aviation grids, just like manned commercial planes."
    ],
    memoryLock: "Category 4 = Airworthiness Certificate (Standard aircraft scale).",
    operationalMeaning: "Heavy delivery drones (e.g. cargo aircraft) must be treated with formal, registered airworthiness manuals."
  },
  {
    id: "FAA-Q24",
    question: "Under 14 CFR Part 107, when is a remote pilot permitted to fly a sUAS from a moving land vehicle?",
    options: [
      "Only when operating over unpopulated or sparsely populated areas, and the drone is not transport of property for compensation.",
      "Anytime, provided the vehicle maintains a relative speed under 15 miles per hour.",
      "From a moving vehicle inside Class G airspace only after filing a NOTAM 24 hours in advance."
    ],
    correctIndex: 0,
    explanation: "Operating from a moving vehicle (car, truck, or boat) is allowed under Part 107 *only* if you are in a sparsely populated area and are not carrying another person's cargo/property for compensation or hire.",
    category: "Operations",
    examRelevance: "Core - Moving vehicle logistics constraints.",
    reference: "14 CFR Part 107.25",
    whyWrong: [
      "Vehicle absolute speed is not quantified; populated density and population counts are the key legal limiters.",
      "Filing a NOTAM does not allow you to bypass high population risks or transport compensation limits."
    ],
    memoryLock: "Sparsely populated areas only, NO commercial delivery cargo from moving cars.",
    operationalMeaning: "You can map empty desert pipeline stretches from the back of an active truck bed, but you cannot deliver groceries while driving."
  },
  {
    id: "FAA-Q25",
    question: "What are the strict FAA regulations regarding alcohol consumption and wait-times for sUAS crew members?",
    options: [
      "No alcohol within 4 hours of flight, and a maximum Blood Alcohol Concentration (BAC) limit of 0.08%.",
      "No alcohol within 8 hours of flight, must not be under the influence, and must maintain a BAC of strictly under 0.04%.",
      "Crew members are exempt as long as the main autopilot handles emergency route returns."
    ],
    correctIndex: 1,
    explanation: "FAA Part 107.27 references standard manned aviation rules: '8 hours bottle to throttle', no lingering hangover influence, and a maximum Blood Alcohol Concentration (BAC) strictly under 0.04%.",
    category: "Regulations",
    examRelevance: "Critical - Alcohol boundary thresholds.",
    reference: "14 CFR Part 107.27 / Part 91.17",
    whyWrong: [
      "The 4-hour window and 0.08% limits are too low; the FAA enforces much stricter limits (8 hours, under 0.04% BAC).",
      "Autopilots do not relieve human crew members of visual separation and collision liability duties."
    ],
    memoryLock: "8 hours, under 0.04% BAC, no hangover.",
    operationalMeaning: "If you had a beer at midnight, you must not touch the control sticks as a PIC or VO until at least 8:00 AM."
  },
  {
    id: "FAA-Q26",
    question: "When operating in Class E airspace, when is prior Airspace Authorization required from Air Traffic Control?",
    options: [
      "Authorization is always required throughout any Class E airspace structure.",
      "Authorization is required ONLY when operating inside the lateral boundaries of Class E surface airspace designated for an airport.",
      "Authorization is never required in Class E since it does not have physical towers."
    ],
    correctIndex: 1,
    explanation: "Class E airspace comes in various forms. Most Class E starts at 700 or 1,200 feet AGL, which is above the 400-foot drone ceiling, so no authorization is needed. However, around some airports, Class E goes down to the surface (known as Class E Surface Airspace, E2). This requires authorization.",
    category: "Airspace",
    examRelevance: "High - Class E differentiation on charts.",
    reference: "14 CFR Part 107.41",
    whyWrong: [
      "Most Class E starts high up (e.g. 700 ft AGL), making drone authorization redundant since the drone ceiling is 400 ft.",
      "Surface-level Class E is highly controlled and does require positive LAANC clears to protect transitioning IFR aircraft."
    ],
    memoryLock: "Class E Surface (dashed magenta circle on sectional) = Authorization required. Faded magenta = No authorization.",
    operationalMeaning: "Check if the airport boundary is marked with a dashed magenta circle. If so, apply for LAANC before taking off."
  },
  {
    id: "FAA-Q27",
    question: "What is the absolute minimum flight visibility required to operate a small UAS under Part 107?",
    options: [
      "At least 1 statute mile visibility.",
      "At least 3 statute miles visibility.",
      "At least 5 statute miles visibility."
    ],
    correctIndex: 1,
    explanation: "Part 107.51 requires that the minimum flight visibility, as observed from the location of the control station, must be at least 3 statute miles (SM) to allow adequate tracking and manned hazard spotting.",
    category: "Weather",
    examRelevance: "Core - Flight visibility caps.",
    reference: "14 CFR Part 107.51",
    whyWrong: [
      "1 statute mile is extremely thin fog and does not provide enough sight for safe visual-observer tracking.",
      "5 statute miles is a high safety standard, but exceeds the minimum legal FAA baseline of 3 SM."
    ],
    memoryLock: "3 statute miles minimum visibility. Think '3 SM'."
    ,
    operationalMeaning: "If morning haze restricts your view of the horizon below 3 miles, keep the drone grounded until midday sun burns it off."
  },
  {
    id: "FAA-Q28",
    question: "What wind and shear conditions can a remote pilot expect when operating a sUAS around tall buildings or structures?",
    options: [
      "Wind speed is entirely predictable and behaves uniformly around physical obstructions.",
      "Wind speeds can speed up abruptly (the Venturi effect) and build highly turbulent, twisting eddies on the downwind side of buildings.",
      "Physical structures completely block wind, creating an absolute zone of calm air up to 200 feet out."
    ],
    correctIndex: 1,
    explanation: "Buildings block and divert standard wind paths. This creates wind shear and turbulent eddies on the downwind (leeward) side, and can accelerate wind speeds abruptly between narrow gaps (Venturi effect), endangering drone control structures.",
    category: "Weather",
    examRelevance: "High - Building wind aerodynamics.",
    reference: "FAA PHAK Chapter 12 (Aviation Weather)",
    whyWrong: [
      "Wind is fluid and highly turbulent when hitting complex angled obstacles, making it erratic rather than uniform.",
      "Downwind areas represent low-pressure zones featuring intense down-drafting eddies, not calm air."
    ],
    memoryLock: "Downwind of structures = severe turbulence and downdrafts. Gap spaces = Venturi speed up.",
    operationalMeaning: "When mapping a high-rise city block, expect sudden downdrafts on the leeward side of the tower."
  },
  {
    id: "FAA-Q29",
    question: "Which of the following describes the FAA's standard Remote ID rule requirements for active sUAS operations?",
    options: [
      "The drone must actively broadcast its serial number, current location, altitude, and velocity via local radio frequency (Wi-Fi or Bluetooth).",
      "Remote ID is optional for all commercial operations, and only required for high-risk swarm events.",
      "Remote ID data must be logged and uploaded to the pilot's logbook, but does not need live broadcasting."
    ],
    correctIndex: 0,
    explanation: "Under Remote ID guidelines, drones weighing over 0.55 lbs must broadcast identity and telemetry (serial number, take-off location, current altitude, heading, velocity) over Bluetooth or Wi-Fi to enhance airspace security.",
    category: "Regulations",
    examRelevance: "Critical - Key contemporary compliance update.",
    reference: "14 CFR Part 89 (Remote ID)",
    whyWrong: [
      "Remote ID is a mandatory active broadcast for all operations exceeding 0.55 lbs, not a voluntary optional option.",
      "Live broadcasting is required so citizens and local agencies can identify drones in real-time, making post-flight logging insufficient."
    ],
    memoryLock: "Remote ID = Live RF broadcast of location & ID.",
    operationalMeaning: "Do not fly model aircraft that emit 'Remote ID Failure' alerts on the pilot screen in public parks."
  },
  {
    id: "FAA-Q30",
    question: "What are the typical meteorological characteristics associated with a stable air mass?",
    options: [
      "Stratiform clouds, continuous smooth precipitation, stable low-visibility haze/fog, and smooth air.",
      "Cumulonimbus clouds, sudden squall thunderstorms, severe wind shear, and high-visibility air.",
      "Abrupt thermal updrafts, dry hail storms, and heavy localized turbulence."
    ],
    correctIndex: 0,
    explanation: "Stable air resists vertical motion. This leads to flat, stratiform clouds, steady continuous precipitation, calm smooth air, and trapped dust/moisture that limits horizontal visibility (haze or fog).",
    category: "Weather",
    examRelevance: "High - Air mass stability characteristics.",
    reference: "FAA PHAK Chapter 12 (Stable vs Unstable Air)",
    whyWrong: [
      "Cumulonimbus clouds and thunderstorms are products of unstable air masses, where hot air rises rapidly.",
      "Updrafts and convective turbulence are major indicators of air instability."
    ],
    memoryLock: "Stable = Stratiform, Steady showers, Smooth air, Stagnant/haze.",
    operationalMeaning: "Stable days are perfect for high-resolution cameras since the drone won't bounce, but watch out for lower ground fog limits."
  },
  {
    id: "FAA-Q31",
    question: "What meteorological features are indicative of an unstable air mass?",
    options: [
      "Thick uniform layer clouds, smooth horizontal breeze, and low ground visibility.",
      "Cumuliform clouds, showery intermittent precipitation, severe ground turbulence, and exceptionally clear visibility.",
      "Constant steady drizzle under flat gray skies with absolute wind calm."
    ],
    correctIndex: 1,
    explanation: "Unstable air rises warm and fast. This physical convection creates cumulus clouds, showery rainfall, bumpy convective turbulence, and clears away surface pollutants, yielding excellent horizontal visibility.",
    category: "Weather",
    examRelevance: "High - Unstable air indicators.",
    reference: "FAA PHAK Chapter 12 (Meteorology Standards)",
    whyWrong: [
      "Uniform layers of clouds and steady drizzle represent stable air structures without convective currents.",
      "Flat gray skies with dead calm winds describe a highly stable system, not an active unstable air cell."
    ],
    memoryLock: "Unstable = Cumulus, Choppy air, Clear sight, Showery rain.",
    operationalMeaning: "Unstable afternoon air results in bumpy flight paths; keep your gimbal speed slow to isolate the shaking."
  },
  {
    id: "FAA-Q32",
    question: "When flying a sUAS near an uncontrolled airport, what is the default, standard traffic pattern direction remote pilots must respect?",
    options: [
      "A right-hand traffic pattern direction to stay clear of manned approach lanes.",
      "A left-hand traffic pattern direction unless specific airport indicator signs indicate right patterns.",
      "A chaotic variable orbit pattern directly over the center runway line."
    ],
    correctIndex: 1,
    explanation: "Under Standard FAA VFR rules, the default direction of all airport traffic patterns is left-hand (meaning pilots make all turns to the left), unless the airport specifies right-hand loops. You must avoid disrupting these patterns.",
    category: "Airspace",
    examRelevance: "Core - Uncontrolled airport safety.",
    reference: "14 CFR Part 107.43 / AIM Chapter 4",
    whyWrong: [
      "Right-hand turns are only used if explicitly specified on sectional chart legends or sectional indicators.",
      "Hovering directly over the center runway represents an immediate hazard to pilots landing blind."
    ],
    memoryLock: "Default Traffic Pattern = Left-hand turns.",
    operationalMeaning: "Listen to the airport CTAF frequency to know exactly where manned aircraft are executing their downwind left turns."
  },
  {
    id: "FAA-Q33",
    question: "What is the primary regulatory purpose of a Temporary Flight Restriction (TFR)?",
    options: [
      "To designate commercial drone corridors for testing heavy industrial deliveries.",
      "To protect persons or property on the ground/air from hazard, such as disaster recovery zones, presidential flights, or major stadium games.",
      "To provide a sandbox for military crews to test low-altitude laser arrays."
    ],
    correctIndex: 1,
    explanation: "The FAA issues TFRs to restrict all non-participating flight operations immediately over sensitive areas, such as forest fires, train derailments, VIP presidential routes, or professional stadium sporting events. Drones are strictly banned from entering TFRs.",
    category: "Airspace",
    examRelevance: "Core - Temporary Flight Restrictions.",
    reference: "14 CFR Section 91.137 / AIM Chapter 3",
    whyWrong: [
      "TFRs do not establish drone delivery corridors or commercial testing sandboxes.",
      "Military testing zones are designated as Restricted or Warning Areas, not temporary flight restrictions."
    ],
    memoryLock: "TFR = Forbidden zone. Banned for fires, stadiums, and VIP movements.",
    operationalMeaning: "Do not fly anywhere near a sporting stadium from one hour before kickoff until one hour after the game ends."
  },
  {
    id: "FAA-Q34",
    question: "What is the correct mental antidote for the hazardous pilot attitude of 'Anti-Authority' (defined as 'Don't tell me what to do')?",
    options: [
      "It could happen to me.",
      "Follow the rules. They are usually right.",
      "Taking chances is foolish."
    ],
    correctIndex: 1,
    explanation: "The Anti-Authority attitude resents rules and procedures. The correct, established FAA cognitive antidote is: 'Follow the rules. They are usually right.'",
    category: "Human Factors",
    examRelevance: "High - ADM performance metrics.",
    reference: "FAA AC 60-22 (Aeronautical Decision Making)",
    whyWrong: [
      "'It could happen to me' is the correct counter-acting antidote for Invulnerability.",
      "'Taking chances is foolish' is the correct counter-acting antidote for Macho."
    ],
    memoryLock: "Anti-Authority Antidote = Follow the rules, they are usually right.",
    operationalMeaning: "When you feel like skipping a preflight check because the FAA doesn't inspect sites, remind yourself that safety rules exist to protect lives."
  },
  {
    id: "FAA-Q35",
    question: "What is the correct FAA cognitive antidote for the hazardous pilot attitude of 'Macho' ('I can do it, I'll show them')?",
    options: [
      "Not so fast, think first.",
      "Taking chances is foolish.",
      "I am not helpless, I can make a difference."
    ],
    correctIndex: 1,
    explanation: "The Macho attitude seeks to impress others by taking unnecessary flight risks. The official antidote is: 'Taking chances is foolish.'",
    category: "Human Factors",
    examRelevance: "High - Aeronautical human factors.",
    reference: "FAA AC 60-22 (ADM Standards)",
    whyWrong: [
      "'Not so fast, think first' is the antidote for Impulsivity.",
      "'I am not helpless' is the antidote for Resignation."
    ],
    memoryLock: "Macho Antidote = Taking chances is foolish.",
    operationalMeaning: "Do not perform complex manual stunts near clients or structures to show off your piloting skills."
  },
  {
    id: "FAA-Q36",
    question: "What is the correct FAA cognitive antidote for the hazardous pilot attitude of 'Impulsivity' ('Do it quickly, do something now')?",
    options: [
      "Not so fast. Think first.",
      "Follow the rules. They are usually right.",
      "It could happen to me."
    ],
    correctIndex: 0,
    explanation: "Impulsivity is the threat state where a pilot feels compelled to act immediately without reviewing consequences. The proper FAA cognitive antidote is: 'Not so fast. Think first.'",
    category: "Human Factors",
    examRelevance: "High - ADM performance metrics.",
    reference: "FAA AC 60-22",
    whyWrong: [
      "'Follow the rules' is the antidote for Anti-Authority.",
      "'It could happen to me' is the antidote for Invulnerability."
    ],
    memoryLock: "Impulsivity Antidote = Not so fast. Think first.",
    operationalMeaning: "If your screen flickers, don't yank the sticks in panic; pause, assess, and act methodically."
  },
  {
    id: "FAA-Q37",
    question: "What is the correct FAA cognitive antidote for the hazardous pilot attitude of 'Resignation' ('What's the use, there is nothing I can do')?",
    options: [
      "Taking chances is foolish.",
      "I am not helpless. I can make a difference.",
      "It won't happen to me."
    ],
    correctIndex: 1,
    explanation: "Resignation occurs when pilots feel helpless and surrender control to circumstances. The correct antidote is: 'I am not helpless. I can make a difference.'",
    category: "Human Factors",
    examRelevance: "High - ADM pilot psychology.",
    reference: "FAA AC 60-22",
    whyWrong: [
      "'Taking chances is foolish' addresses Macho behavior, not helpless fatalism.",
      "'It won't happen to me' is the dangerous expression of Invulnerability, not Resignation."
    ],
    memoryLock: "Resignation Antidote = I am not helpless, I can make a difference.",
    operationalMeaning: "If wind begins pushing your drone towards a cliff, don't freeze up; dynamically steer down and utilize manual override controls."
  },
  {
    id: "FAA-Q38: Who is legally responsible for inspecting the sUAS prior to flight to ensure it is in a safe condition for operation?",
    question: "Under Part 107, who is legally responsible for performing pre-flight inspections to ensure the sUAS is in a safe condition for operation?",
    options: [
      "The aircraft manufacturer, via online firmware diagnostics.",
      "The Remote Pilot in Command (Remote PIC).",
      "The systems flight mechanic who last serviced the battery housing."
    ],
    correctIndex: 1,
    explanation: "According to 14 CFR Part 107.49, the Remote PIC must perform a complete pre-flight assessment and inspection before EVERY flight. Safe flight condition verification is the legal responsibility of the PIC.",
    category: "Operations",
    examRelevance: "Core - Pre-flight inspection responsibilities.",
    reference: "14 CFR Part 107.49",
    whyWrong: [
      "Online manufacturer diagnostics cannot physically inspect if a propeller is cracked or a payload is loose.",
      "Maintenance mechanics can log repairs, but the launching Pilot in Command is responsible for the actual launch safety condition."
    ],
    memoryLock: "Pre-flight safety inspection = Remote PIC's responsibility before EVERY takeoff.",
    operationalMeaning: "Always perform a circular visual check of props, motor mounts, screws, and battery connections prior to flight."
  },
  {
    id: "FAA-Q39",
    question: "Where and how must a remote pilot mark their FAA drone registration number on the sUAS?",
    options: [
      "Strictly inside the battery compartment as long as it does not require tools to access.",
      "On an external, clearly visible surface of the aircraft that can be inspected without disassembly.",
      "The number does not need to be marked on the craft as long as the pilot carries a digital FAA cert."
    ],
    correctIndex: 1,
    explanation: "Under FAA Part 48 registration guidelines, the registration number must be placed on an external surface of the aircraft and must be clearly visible to the naked eye upon visual inspection.",
    category: "Regulations",
    examRelevance: "High - Registration markings guidelines.",
    reference: "14 CFR Part 48.205",
    whyWrong: [
      "A previous rule allowed placement inside battery compartments, but current rules require external, visible markings.",
      "Having a digital card on your phone is not a substitute for marking the physical hull of the aircraft."
    ],
    memoryLock: "Registration number = External, clearly visible, no disassembly.",
    operationalMeaning: "Use a sharp permanent marker or durable vinyl label on the top or side of the drone shell."
  },
  {
    id: "FAA-Q40",
    question: "What is the key factor that determines if a drone operation falls under 14 CFR Part 107 commercial rules rather than recreational rules?",
    options: [
      "Whether the drone has a camera or high-definition mapping sensor.",
      "The intent of the flight, specifically whether it supports a business enterprise or is conducted for compensation or hire.",
      "The gross takeoff weight of the drone, specifically if it exceeds 2 pounds."
    ],
    correctIndex: 1,
    explanation: "The deciding factor between recreational and commercial rules is the intent of the flight. Any operation that supports a business or is done for compensation (direct or indirect) must be conducted under Part 107 commercial flight rules.",
    category: "Regulations",
    examRelevance: "Critical - Legal scope definitions.",
    reference: "14 CFR Part 107 / Section 44809",
    whyWrong: [
      "Many recreational flyers use high-end cameras strictly for personal pleasure with no commercial intent.",
      "Both commercial and recreational aircraft share the same weight range boundaries up to 55 pounds."
    ],
    memoryLock: "Commercial intent or business support = Part 107. Fun recreation = Section 44809.",
    operationalMeaning: "If you take a photo of a roof for a friend's real-estate listing for free, it still supports a business and is a Part 107 flight."
  },
  {
    id: "FAA-Q41",
    question: "How does acute fatigue impact a remote pilot's operational abilities and reaction times during complex tasks?",
    options: [
      "Acute fatigue narrows visual scanning and dramatically slows cognitive decision-making, leading to missed hazards.",
      "It has zero impact on drone control, since the active autopilot handles standard steady hover tasks.",
      "Fatigue increases sensory hearing acuity, making the pilot more alert to engine noises."
    ],
    correctIndex: 0,
    explanation: "Fatigue impairs cognitive abilities, degrades peripheral vision, slows physical reaction times, and can cause a pilot to hyper-focus on single tasks, ignoring approaching manned aircraft threats.",
    category: "Human Factors",
    examRelevance: "Core - Fatigue effects on ADM.",
    reference: "FAA AC 60-22 (Aeronautical Human Factors)",
    whyWrong: [
      "Autopilots are prone to sensor errors or battery failures. A fatigued pilot will fail to take immediate manual command.",
      "Fatigue dulls all physical senses and visual reflexes, severely impairing situational awareness rather than sharpening it."
    ],
    memoryLock: "Fatigue = Missed details, slow reaction. IMSAFE checklist protects you.",
    operationalMeaning: "If you stayed up all night editing video, don't conduct high-altitude urban operations the next morning."
  },
  {
    id: "FAA-Q42",
    question: "What should a remote PIC monitor regarding crew physical conditions when operating in high heat, desert airspaces?",
    options: [
      "Ensure crew members consume energy drinks to maintain adrenaline levels.",
      "Monitor for symptoms of dehydration, such as headaches, dizziness, and dry mouth, which degrade situational awareness.",
      "Instruct crew members to maintain strict hyperventilation breathing patterns to prevent heatstroke."
    ],
    correctIndex: 1,
    explanation: "Dehydration is a serious hazard in high-heat operations. Headaches, fatigue, and dry mouth are early signs of dehydration, which can lead to mistakes and slower reaction times. PICs should ensure plenty of water is provided.",
    category: "Human Factors",
    examRelevance: "High - Environmental crew risks.",
    reference: "FAA AC 60-22 / PHAK Aeronautical Physiology",
    whyWrong: [
      "Energy drinks accelerate dehydration through high sodium, sugar, and caffeine concentrations.",
      "Hyperventilation causes carbon dioxide depletion in the bloodstream, leading to extreme lightheadedness and fainting."
    ],
    memoryLock: "Heat operations = Hydration. Watch for headaches, dizziness, and cognitive sluggishness.",
    operationalMeaning: "Pack twice as much water as you think you need when mapping construction zones in hot environments."
  },
  {
    id: "FAA-Q43",
    question: "If a remote PIC exercises emergency authority to deviate from standard Part 107 regulations, when must they submit a written report to the FAA?",
    options: [
      "A written report must be submitted automatically to the FAA within 48 hours of landing.",
      "Only if specifically requested to do so by an authorized FAA representative.",
      "No written record is ever required since emergency deviations are protected."
    ],
    correctIndex: 1,
    explanation: "Under 14 CFR Part 107.21, a remote PIC who deviates from any regulation during an emergency is only required to submit a detailed written report to the FAA if they are requested to do so by an FAA representative.",
    category: "Regulations",
    examRelevance: "High - Emergency accounting limits.",
    reference: "14 CFR Part 107.21",
    whyWrong: [
      "There is no standard 48-hour automatic reporting requirement for emergency deviations.",
      "The Pilot in Command must keep a detailed log of the event in case the local Flight Standards District Office (FSDO) asks for it."
    ],
    memoryLock: "Emergency report = Only upon request.",
    operationalMeaning: "Take notes on any emergency event (date, time, exact hazard, actions taken) in your flight logs right after safe landing."
  },
  {
    id: "FAA-Q44",
    question: "Why does the FAA strongly recommend that remote pilots maintain systematic, updated maintenance logbooks for their sUAS fleet?",
    options: [
      "To prove in-service airworthiness during random inspection checks and help establish predictive structural replacement timelines.",
      "It is a strict federal requirement under Part 107, and operating without logs will trigger an automatic $5,000 fine.",
      "To bypass FAA drone registration rules once active logs hit a 100-hour ceiling."
    ],
    correctIndex: 0,
    explanation: "While formal logbooks are technically a recommendation under Part 107 (unlike manned aircraft), keeping records of battery cycles, motor wear, and structural replacements is critical to prove airworthiness and avoid mechanical failure.",
    category: "Operations",
    examRelevance: "Core - Drone maintenance recommendations.",
    reference: "FAA AC 107-2A Chapter 7",
    whyWrong: [
      "Maintenance logs are a highly recommended best practice, not a strict Part 107 rule that triggers automatic fines.",
      "Keeping logs does not exempt any commercial or recreational drone from federal registration rules."
    ],
    memoryLock: "Maintenance Logs = Best practice to prove airworthiness and track wear.",
    operationalMeaning: "Maintain a simple spreadsheet tracking flight hours and battery structural wear for every drone in your fleet."
  },
  {
    id: "FAA-Q45",
    question: "On a VFR Sectional Chart, a faded magenta circular boundary indicates that overlying Class E airspace begins at what altitude AGL?",
    options: [
      "The airspace is controlled starting at the surface.",
      "The airspace is controlled starting at 700 feet above ground level (AGL).",
      "The airspace is controlled starting at 1,200 feet above ground level (AGL)."
    ],
    correctIndex: 1,
    explanation: "A faded magenta band indicates that Class E controlled airspace begins at 700 feet AGL. This transitional airspace protects incoming instrument-rated manned traffic as they make their approach.",
    category: "Airspace",
    examRelevance: "Critical - Sectional chart interpretation.",
    reference: "FAA Airman Knowledge Supplement / PHAK",
    whyWrong: [
      "Class E beginning at the surface is marked with a dashed magenta circle (Surface Class E).",
      "If there is no faded magenta or blue boundary, Class E airspace defaults to starting at 1,200 feet AGL."
    ],
    memoryLock: "Faded magenta = Class E starts at 700 ft AGL. Dashed magenta = SFC.",
    operationalMeaning: "If you operate within a faded magenta zone, your drone can fly up to 400 feet AGL with no ATC permission, as Class E starts at 700 feet."
  }
];

export const studyConcepts: StudyConcept[] = [
  {
    id: "concept-1",
    title: "Part 107 Administrative Privileges",
    section: "14 CFR Part 107.1",
    summary: "Basic definitions, age boundaries, registration requirements, and pilot rating validity periods.",
    details: [
      "Minimum age to receive standard remote pilot certificate is 16.",
      "Must be proficient in reading, speaking, and understanding English.",
      "Must hold a valid Part 107 Certificate, which requires completion of recurrent training every 24 calendar months.",
      "Weight limit for sUAS is strictly less than 55 lbs (aggregate weight at take-off).",
      "FAA registration is required for all drone aircraft operated for commercial or non-recreational purposes."
    ],
    memoryLock: "Less than 55 lbs, Minimum Age 16, 24 Calendar Month Recurrency cycle.",
    mastered: false,
    confidence: "Medium"
  },
  {
    id: "concept-2",
    title: "Controlled Airspace Operations",
    section: "14 CFR Part 107.41",
    summary: "Regulatory constraints for operating within Class B, C, D, and surface E airspace grids.",
    details: [
      "Controlled airspace operations require explicit, formal airspace authorization prior to launch.",
      "Direct control tower radio transmission is normally prohibited; authorization must be initiated via the LAANC portal or the FAA DroneZone.",
      "Class B space is highly controlled and represents dense commercial airports.",
      "Class C surrounds moderately busy corridors, while Class D is for towered airports without radar services.",
      "Surface Class E airspace extends right down to ground level and requires full airspace approval."
    ],
    memoryLock: "Controlled = SFC to Cap. Always use LAANC for speed.",
    mastered: false,
    confidence: "Low"
  },
  {
    id: "concept-3",
    title: "Accident Reporting Protocols",
    section: "14 CFR Part 107.9",
    summary: "Threshold conditions that oblige a Remote PIC to notify the FAA of a flight accident within 10 days.",
    details: [
      "Reports must be filed electronically via FAA DroneZone or physical mail within 10 calendar days.",
      "Reporting is triggered by serious injury (hospitalization or AIS Level 3 or higher).",
      "Any loss of consciousness of a crew member (pilot, visual observer, etc.) triggers reporting.",
      "Property damage to third parties exceeding $500 (to replace or repair) triggers reporting.",
      "Damage strictly limited to the drone itself does not require notification, regardless of cost."
    ],
    memoryLock: "10 calendar days, > $500 third-party damage, Serious Injury, Loss of Consciousness.",
    mastered: false,
    confidence: "Medium"
  },
  {
    id: "concept-4",
    title: "Preflight Inspection Requirements",
    section: "14 CFR Part 107.49",
    summary: "Mandatory system status, battery safety, and environment assessments that the Remote PIC must perform before every flight.",
    details: [
      "The Remote PIC must conduct a complete structural, hardware, and physical inspection.",
      "Ensure all control links are functional and verify radio communications are stable.",
      "Verify the payload is securely attached and does not interfere with visual sensors or motor rotation.",
      "Check drone and controller battery charge and monitor thermal limits.",
      "Assess local weather conditions, VFR sectional safety zones, and active NOTAM charts."
    ],
    memoryLock: "The PIC must verify safe flight condition before EVERY takeoff.",
    mastered: false,
    confidence: "High"
  },
  {
    id: "concept-5",
    title: "Lithium Polymer Battery Management",
    section: "FAA Safety Circulars",
    summary: "Crucial storage, charging, structural handling, and hazard mitigation strategies for high-discharge sUAS LiPo battery units.",
    details: [
      "Check for signs of swelling, physical wrapper cracks, puncture marks, or excessive heat before flights.",
      "Store batteries strictly inside fire-retardant lithium polymer charging bags.",
      "Never charge batteries unattended; utilize balance charging to keep cells balanced.",
      "During crashes, check batteries immediately for punctures. Inward damage can result in rapid thermal runaway.",
      "Cold-weather operations diminish chemical ion transfer, leading to drastic cell voltage drops. Pre-heat batteries before cold launches."
    ],
    memoryLock: "Do not puncture. Warm up cold cells. Store in a fireproof bag.",
    mastered: false,
    confidence: "Low"
  }
];
