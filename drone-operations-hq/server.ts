import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import { examQuestions, airspaceZones, glossaryTerms } from "./src/data/faaData";

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT || 8080);

app.use(express.json());

// Initialize Gemini Client
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;
if (apiKey && apiKey !== "MY_GEMINI_API_KEY" && apiKey !== "") {
  ai = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });
}

// Global FAA Offline Helper following required structure
const generateOfflineResponse = (query: string) => {
  const q = query.toLowerCase();
  
  if (q.includes("airspace") || q.includes("class") || q.includes("b") || q.includes("c") || q.includes("d") || q.includes("e") || q.includes("g")) {
    return `### 📚 FAA-Based Explanation
Under 14 CFR Part 107.41, operating a small UAS in Class B, Class C, or Class D airspace, or within the lateral boundaries of the surface area of Class E airspace designated for an airport, is strictly prohibited without prior authorization from Air Traffic Control (ATC). Class G is uncontrolled and requires no prior waiver up to 400 feet AGL.

### 💡 Plain-Language Clarification
Controlled airspace exists around airport control towers to coordinate heavy airplanes. Uncontrolled airspace is open space where you can fly freely up to 400 feet AGL as long as you yield the right of way to manned aircraft.

### 🦾 Operational Meaning
Before packing your crew for a commercial drone mission, you must check pilot sectional charts. If the site falls inside Class B/C/D borders, you must request and secure a positive clearance token using the digital LAANC portal.

### 🎯 Exam Relevance & Strategy
Expect 10-15 sectional chart questions on the 107 exam. If a dashed blue circle is pictured, that is Class D. Always look for altitudes listed in AGL/MSL supplements.

### 🧠 Memory Lock
- **Controlled airspace**: Surface to Ceiling requires LAANC authorization before throttle up.
- **Class D**: Dashed blue lines on VFR sectional chart.

### 📝 Related Practice Question
**Question ID: FAA-Q2**
To operate legally in controlled airspace (Class B, C, or D), what is the correct operational procedure for a Remote PIC?
- A) Initiate radio transmission with local Air Traffic Control on the CTAF frequency immediately prior to take-off.
- B) Apply for and secure positive airspace clearance via the automated LAANC portal or the FAA DroneZone web application.
- C) Activate the drone's anti-collision lights and limit flight strictly to under 100 feet AGL to bypass authorization.

*(Try answering this question in the Practice Exam tab!)*`;
  }
  
  if (q.includes("weight") || q.includes("lbs") || q.includes("limit") || q.includes("55")) {
    return `### 📚 FAA-Based Explanation
Under 14 CFR Part 107.3, a "small unmanned aircraft" represents an aircraft weighing strictly less than 55 pounds on takeoff. This threshold includes everything on board or otherwise attached to the aircraft at transit (payload, frame, cameras, battery).

### 💡 Plain-Language Clarification
If your drone weighs exactly 55.0 pounds or more, it is legally too heavy to be classified as a "small" drone. It falls under standard commercial airline rules and requires higher-tier certification.

### 🦾 Operational Meaning
Keep a calibrated weight scale in your pilot flight case. Weigh the aircraft with battery, heavy gimbal optics, and custom drops mounted before takeoff. If it is 55 pounds or higher, cancel the flight or strip gear.

### 🎯 Exam Relevance & Strategy
A classic FAA "trick" question asks if a drone weighing exactly 55 lbs qualifies as a small UAS. The answer is NO. It must weigh *less than* 55 lbs.

### 🧠 Memory Lock
- **sUAS Limit**: Strictly less than 55 pounds (< 55 lbs).

### 📝 Related Practice Question
**Question ID: FAA-Q3**
What is the absolute maximum weight limit of a small Unmanned Aircraft System (sUAS) to legally operate under 14 CFR Part 107 rules?
- A) 55 pounds total weight, which includes payload, batteries, and fuel.
- B) Strictly less than 55 pounds (including everything onboard at the moment of launch).
- C) Up to 55 pounds for the frame alone, with an additional 15 pounds allowed for cameras and optics.

*(Try answering this question in the Practice Exam tab!)*`;
  }

  if (q.includes("accident") || q.includes("report") || q.includes("incident") || q.includes("damage") || q.includes("injury")) {
    return `### 📚 FAA-Based Explanation
According to 14 CFR Part 107.9, any occurrence resulting in serious injury, loss of consciousness, or third-party property damage exceeding $500 to repair or replace must be reported to the FAA within 10 calendar days.

### 💡 Plain-Language Clarification
If someone is hospitalized, passes out, or you cause more than $500 in property damage (external to the drone itself), you have exactly ten days to log into the FAA DroneZone portal and report the accident details.

### 🦾 Operational Meaning
If your drone crashes in an empty field and is destroyed, you do not need to notify the FAA (only the drone itself is damaged). But if you nick a luxury car and scratches cost $550 to fix, a federal report is mandatory.

### 🎯 Exam Relevance & Strategy
Learn the limits by heart: 10 calendar days, >$500 damage, AIS Level 3 serious injury, and *any* loss of consciousness.

### 🧠 Memory Lock
- **Accident Reports**: 10 calendar days to report, > $500 damage.

### 📝 Related Practice Question
**Question ID: FAA-Q1**
Under 14 CFR Part 107, which of the following is considered a reportable 'sUAS Accident' to the FAA?
- A) Any scratch or hull fracture to the drone frame requiring minor composite repairs costing $150.
- B) An incident resulting in injury requiring hospitalization, a loss of consciousness, or third-party property damage exceeding $500.
- C) A total hull-loss flyaway where the drone lands in an empty forest causing no external injury or structural property damage.

*(Try answering this question in the Practice Exam tab!)*`;
  }

  // Fallback for general FAA topics checking standard data files
  const matchedTerm = glossaryTerms.find(g => q.includes(g.term.toLowerCase()) || q.includes(g.short.toLowerCase()));
  if (matchedTerm) {
    return `### 📚 FAA-Based Explanation
FAA Ground Intelligence references ${matchedTerm.term} (${matchedTerm.short}): ${matchedTerm.definition}. Standard pilot procedures dictate maximum care when dealing with operational definitions of this caliber.

### 💡 Plain-Language Clarification
Think of ${matchedTerm.short} as the primary airman baseline for checking ${matchedTerm.term.toLowerCase()}. It governs safe flight vectors.

### 🦾 Operational Meaning
From a flight director's standpoint, failing to implement correct checks for ${matchedTerm.term} results in regulatory safety infractions and potentially severe physical drone accidents.

### 🎯 Exam Relevance & Strategy
Keep an eye out for terms like ${matchedTerm.term} and note how they connect to human factors and Remote PIC authority.

### 🧠 Memory Lock
- **${matchedTerm.term}**: ${matchedTerm.short} - ${matchedTerm.definition.slice(0, 80)}...

### 📝 Related Practice Question
**Question ID: FAA-Q8**
The Remote Pilot in Command (Remote PIC) has the ultimate authority and responsibility over:
- A) Only the flight controller logs and manual landing mechanics.
- B) The entire sUAS operation, visual observers, crew coordination, and safety inspections.
- C) Scheduling corporate aerial contracts without federal registration compliance.

*(Try answering this question in the Practice Exam tab!)*`;
  }

  // If outside known loaded dataset
  const standardFAAKeywords = [
    "faa", "cfr", "part 107", "pilot", "drone", "airspace", "sectional", "weather", "metar", "taf",
    "notam", "weight", "accident", "remote pic", "vlos", "observer", "lipo", "battery", "safety",
    "waiver", "altitude", "height", "speed", "cloud", "visibility", "night", "twilight", "remote id",
    "propeller", "manned", "yield"
  ];
  const containsFAAWord = standardFAAKeywords.some(w => q.includes(w));
  
  if (!containsFAAWord) {
    return `### 📚 FAA-Based Explanation
No matching FAA regulation or official supplement records found on this topic. **This needs FAA verification.**

### 💡 Plain-Language Clarification
The concept specified does not reside within the preloaded FAA Part 107 database rules. **This needs FAA verification.**

### 🦾 Operational Meaning
Operating on unverified flight instructions carries major insurance and compliance risks. Always refer to official FAA advisory documents. **This needs FAA verification.**

### 🎯 Exam Relevance & Strategy
Avoid guessing on standard test items that rely on unverified non-FAA definitions. Always select answers directly grounded in Part 107 text. **This needs FAA verification.**

### 🧠 Memory Lock
- **Advisory Warning**: This needs FAA verification before flying.

### 📝 Related Practice Question
**Verification Diagnostic Item:**
Does standard FAA Part 107 permit executing unregulated flight concepts?
- A) No, flights must fall strictly within verified Part 107 operating limits.
- B) Yes, pilots can invent operational rules dynamically.
- C) Only with personal written waivers from local police.

*(Try answering this question in the Practice Exam tab!)*`;
  }

  // General FAA Response with required format
  return `### 📚 FAA-Based Explanation
Under standard Part 107 guidelines, the Remote Pilot in Command (Remote PIC) has final authority for the entire sUAS drone flight operation. They must confirm preflight safety inspections, verify local weather conditions, and confirm airspace clearance rules.

### 💡 Plain-Language Clarification
As the lead drone pilot, you are the captain of the ship. You have final responsibility and must ensure your flight follows all standard safety mandates.

### 🦾 Operational Meaning
Always verify that your equipment check is logged, battery voltages are balanced, and visual observers are briefed on safety boundaries before arming the rotors.

### 🎯 Exam Relevance & Strategy
Expect direct questions about final PIC authority. Remember, the PIC carries final regulatory responsibility and can deviate from any rule only during an emergency.

### 🧠 Memory Lock
- **Captain Rule**: Remote PIC holds ultimate authorization and liability.

### 📝 Related Practice Question
**Question ID: FAA-Q4**
When operating under 14 CFR Part 107, who carries final liability and authority for the safety of drone visual flight operations?
- A) The visual observer or cargo delivery logistic manager.
- B) The certified Remote Pilot in Command (Remote PIC).
- C) The airport control tower chief.

*(Try answering this question in the Practice Exam tab!)*`;
};

// API Routes FIRST
app.post("/api/tutor", async (req: any, res: any) => {
  try {
    const { message, history } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    if (!ai) {
      const responseText = generateOfflineResponse(message);
      return res.json({
        text: `${responseText}\n\n*(Note: Running in FAA Offline Mode. Configure GEMINI_API_KEY in Secrets for live custom AI feedback)*`,
        simulated: true
      });
    }

    const formattedQuestionsText = examQuestions.map(q => {
      const correctOptionLetter = String.fromCharCode(65 + q.correctIndex);
      return `Question ID: ${q.id}
Category: ${q.category}
Reference: ${q.reference}
Question: ${q.question}
Options:
${q.options.map((opt, i) => `  ${String.fromCharCode(65 + i)}) ${opt}`).join("\n")}
Correct Option: ${correctOptionLetter}
Explanation: ${q.explanation}
Why wrong alternatives: ${q.whyWrong?.join(" | ") || ""}
Memory Lock: ${q.memoryLock}
Operational Meaning: ${q.operationalMeaning}`;
    }).join("\n\n");

    const systemPrompt = `You are the lead FAA Operational Learning Specialist and Aviation Architect for Drone Operations HQ.
Your task is to instruct pilots and fleet operators on FAA Part 107 compliance, aviation weather, airspace, human factors, and operational systems based strictly on verified FAA rules.

We have preloaded the local FAA Part 107 dataset consisting of all 45 official FAA concepts and questions:
=== PRELOADED FAA PART 107 CONCEPTS AND QUESTIONS (LOCAL TRUTH DATASET) ===
${formattedQuestionsText}

=== STRICT RESPONSE FORMAT RULES ===
You MUST structure every response using the following 6 headers EXACTLY. Do not skip headers, merge headers, or rename them. Format them in clean, scannable Markdown:

### 📚 FAA-Based Explanation
[Provide the official citation, supplement reference, target CFR (e.g., Part 107.9, Part 107.41) and detailed flight rule details.]

### 💡 Plain-Language Clarification
[Provide a simple, clear, conversational translation of the rule that is easy for a student pilot to absorb.]

### 🦾 Operational Meaning
[Explain the commercial, real-world field application of this concept. How it affects preflight briefings, fleet management, and actual drone operations.]

### 🎯 Exam Relevance & Strategy
[Provide tips on how this shows up inside the exam, what supplement pages are relevant, and how to avoid trick answers.]

### 🧠 Memory Lock
- **[Brief Bullet Name]**: [Provide a quick bulleted operational memory lock or mnemonics rule.]

### 📝 Related Practice Question
[If a matched or highly relevant practice question is available in the local FAA set (FAA-Q1 to FAA-Q45), reproduce it here in full, including its ID, question text, and list options (A, B, C) using bulleted style. Do NOT give away the correct answer option letter directly—instead prompt the user to try answering it to test themselves! If no exact match exists, write a high-fidelity diagnostic question based strictly on standard rules.]

=== THE TRUTH RULE ===
You are strictly forbidden from inventing FAA regulations or making up custom codes that do not exist.
If the user asks about a concept that is NOT covered by standard FAA aviation knowledge, or you cannot verify its legal basis within Part 107, you MUST include or reply with the exact phrase: "This needs FAA verification."

Keep the answers detailed, precise, highly professional, and perfectly structured under the 6 headers. DO NOT exceed 400 words total.`;

    const contents = [];
    if (history && Array.isArray(history)) {
      for (const msg of history) {
        contents.push({
          role: msg.role === 'user' ? 'user' : 'model',
          parts: [{ text: msg.text }]
        });
      }
    }
    contents.push({ role: 'user', parts: [{ text: message }] });

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: contents,
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.7,
      },
    });

    res.json({ text: response.text || "I apologize, but I could not formulate a response. Please check your query." });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ error: error?.message || "Internal server error connecting to the AI model." });
  }
});

// Start Vite middleware or serve static files
async function start() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running at http://0.0.0.0:${PORT}`);
  });
}

start();
