export interface FAAExamQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  category: "Regulations" | "Airspace" | "Weather" | "Operations" | "Human Factors";
  examRelevance: string;
  reference?: string;
  whyWrong?: string[];
  memoryLock?: string;
  operationalMeaning?: string;
}

export interface FAAResource {
  name: string;
  url: string;
  category: "Manuals" | "Agencies" | "Regulations" | "Weather" | "Charts" | "Policy";
  purpose: string;
  examRelevance: string;
  businessRelevance: string;
  relatedConcepts: string[];
}

export interface GlossaryTerm {
  term: string;
  short: string;
  definition: string;
  relatedConcepts: string[];
  relatedQuestions: string[];
}

export interface StudyConcept {
  id: string;
  title: string;
  section: string;
  summary: string;
  details: string[];
  memoryLock: string;
  mastered: boolean;
  confidence: "Low" | "Medium" | "High";
  notes?: string;
}

export interface AirspaceZone {
  id: string; // "B" | "C" | "D" | "E" | "G"
  name: string;
  altitude: string;
  authorization: string;
  meaning: string;
  missionExample: string;
  faaLogic: string;
  memoryLock: string;
  relatedQuery: string;
}

// Full app status state for local tracking / analytics
export interface UserState {
  currentQuestionIndex: number;
  selectedAnswer: number | null;
  score: number;
  correctAnswers: string[]; // question ids
  incorrectAnswers: string[]; // question ids
  completedQuestions: Record<string, number>; // questionId -> selectedIndex
  weakAreas: string[];
  strongAreas: string[];
  examFinished: boolean;
  readinessScore: number;
  confidenceScore: number;
  examAttempts: { score: number; date: string }[];
  studyProgress: Record<string, boolean>; // conceptId -> mastered
  studyNotes: Record<string, string>; // conceptId -> notes
  studyConfidence: Record<string, "Low" | "Medium" | "High">; // conceptId -> level
}
