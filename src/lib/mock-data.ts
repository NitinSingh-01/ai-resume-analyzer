export interface ResumeAnalysis {
  id: string;
  fileName: string;
  uploadedAt: string;
  score: number;
  skills: string[];
  missingSkills: string[];
  experienceLevel: string;
  atsCompatibility: number;
  suggestions: string[];
  keywordTips: string[];
  summary: string;
}

export interface JobMatch {
  id: string;
  jobTitle: string;
  company: string;
  matchPercentage: number;
  matchingSkills: string[];
  missingRequirements: string[];
  recommendations: string[];
  analyzedAt: string;
}

export const mockAnalyses: ResumeAnalysis[] = [
  {
    id: "1",
    fileName: "john_doe_resume.pdf",
    uploadedAt: "2026-02-18",
    score: 78,
    skills: ["React", "TypeScript", "Node.js", "PostgreSQL", "AWS", "Docker"],
    missingSkills: ["Kubernetes", "GraphQL", "CI/CD pipelines"],
    experienceLevel: "Mid-Senior (4-6 years)",
    atsCompatibility: 72,
    suggestions: [
      "Add quantifiable achievements to each role",
      "Include a professional summary at the top",
      "Use action verbs consistently",
      "Add relevant certifications section",
    ],
    keywordTips: [
      "Include 'agile methodology' — appears in 85% of target roles",
      "Add 'REST API' — critical for backend positions",
      "Mention 'microservices' — trending keyword in your field",
    ],
    summary:
      "Mid-senior full-stack developer with strong React/Node.js skills. Good technical foundation but resume lacks quantifiable impact metrics and modern DevOps keywords.",
  },
  {
    id: "2",
    fileName: "jane_smith_cv.docx",
    uploadedAt: "2026-02-15",
    score: 91,
    skills: ["Python", "Machine Learning", "TensorFlow", "SQL", "Data Analysis", "AWS SageMaker"],
    missingSkills: ["MLOps"],
    experienceLevel: "Senior (6+ years)",
    atsCompatibility: 88,
    suggestions: ["Consider adding publications or patents section"],
    keywordTips: ["Add 'LLM' and 'generative AI' for trending roles"],
    summary:
      "Senior ML engineer with excellent credentials and strong ATS formatting. Minor improvements in emerging tech keywords would make this resume exceptional.",
  },
];

export const mockJobMatches: JobMatch[] = [
  {
    id: "1",
    jobTitle: "Senior Full-Stack Engineer",
    company: "TechCorp Inc.",
    matchPercentage: 82,
    matchingSkills: ["React", "TypeScript", "Node.js", "PostgreSQL", "AWS"],
    missingRequirements: ["Kubernetes", "GraphQL"],
    recommendations: [
      "Highlight AWS experience more prominently",
      "Add a project showcasing GraphQL usage",
      "Get Kubernetes certification",
    ],
    analyzedAt: "2026-02-19",
  },
  {
    id: "2",
    jobTitle: "Frontend Lead",
    company: "StartupXYZ",
    matchPercentage: 68,
    matchingSkills: ["React", "TypeScript"],
    missingRequirements: ["Team leadership", "Next.js", "Design systems"],
    recommendations: [
      "Emphasize any mentoring or leadership experience",
      "Add Next.js projects to portfolio",
    ],
    analyzedAt: "2026-02-17",
  },
];
