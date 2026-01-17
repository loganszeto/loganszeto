export interface Experience {
  title: string;
  organization: string;
  location: string;
  date: string;
  description: string;
  id: string;
  slug: string;
}

export const research: Experience[] = [
  {
    title: "Undergraduate Research Assistant",
    organization: "Design & Partnership Lab",
    location: "Irvine, CA",
    date: "May 2025 – Present",
    description: "Fine-tuned an AI model to evaluate student projects using a 12-domain performance rubric. Built a domain-specific prompt framework enabling competency-based evaluation instead of standardized testing. Developed a full-stack educator dashboard (React, Next.js, Prisma) supporting human-in-the-loop auditing of AI feedback.",
    id: "research-0",
    slug: "design-partnership-lab"
  },
  {
    title: "Undergraduate Research Assistant",
    organization: "Spider Lab",
    location: "Irvine, CA",
    date: "Jan 2024 – May 2025",
    description: "Engineered telemetry for a VS Code extension that logs test suggestions, developer edits, and outcomes. Designed experiments comparing LLM-generated tests with baseline templates, measuring fault detection and developer efficiency. Identified misleading coverage increases and proposed new evaluation & calibration metrics for AI-assisted testing tools.",
    id: "research-1",
    slug: "spider-lab"
  }
];

export const internships: Experience[] = [
  {
    title: "Software Engineering Intern",
    organization: "Northrop Grumman",
    location: "Remote",
    date: "Jan 2025 – Present",
    description: "",
    id: "internship-2",
    slug: "northrop-grumman"
  },
  {
    title: "Data Labeler",
    organization: "HandshakeAI",
    location: "Remote",
    date: "Jun 2025 – Dec 2025",
    description: "Contributed to high-quality dataset creation and annotation for AI model training and evaluation.",
    id: "internship-1",
    slug: "handshakeai"
  },
  {
    title: "Software Engineering Intern",
    organization: "PingCAP",
    location: "Sunnyvale, CA",
    date: "Jun 2024 – Sep 2024",
    description: "Built tooling to monitor and tune large-scale TiDB deployments, surfacing actionable reliability signals. Analyzed latency distributions, error codes, and lock-wait behavior to uncover hidden failure patterns. Helped design composite health indicators and alert thresholds that outperformed single-metric dashboards.",
    id: "internship-0",
    slug: "pingcap"
  }
];

export const teaching: Experience[] = [
  {
    title: "ICS 32 Reader / Grader",
    organization: "ICS 32",
    location: "Irvine, CA",
    date: "Jan 2025 – Present",
    description: "",
    id: "teaching-2",
    slug: "ics-32"
  },
  {
    title: "Informatics 115 Reader / Grader",
    organization: "INF 115",
    location: "Irvine, CA",
    date: "Aug 2025 – Dec 2025",
    description: "Evaluated 150+ student implementations using formal software testing principles. Provided detailed feedback on correctness, edge-case handling, and test design quality. Held weekly office hours and midterm review sessions; supported improvements to autograder clarity and course materials.",
    id: "teaching-1",
    slug: "inf-115"
  },
  {
    title: "Software Engineering Teaching Assistant",
    organization: "ICS Summer Academy",
    location: "Irvine, CA",
    date: "Jun 2025 – Aug 2025",
    description: "Mentored 60+ students in an introductory software engineering program. Taught object-oriented design, UML modeling, system architecture, and agile practices. Led breakout sessions offering real-time code and design feedback.",
    id: "teaching-0",
    slug: "ics-summer-academy"
  }
];

// Helper function to get all experiences
export function getAllExperiences(): Experience[] {
  return [...research, ...internships, ...teaching];
}

// Helper function to find experience by slug
export function getExperienceBySlug(slug: string): Experience | undefined {
  return getAllExperiences().find(exp => exp.slug === slug);
}
