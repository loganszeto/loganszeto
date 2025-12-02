export interface Experience {
  title: string;
  organization: string;
  location: string;
  date: string;
  description: string;
  id: string;
}

export const research: Experience[] = [
  {
    title: "Undergraduate Research Assistant",
    organization: "Design and Partnership Lab",
    location: "Irvine, CA",
    date: "May 2025 - Present",
    description: "Fine-tuned an AI model to assess qualitative student work by generating a dataset of over 120 high-quality examples against a 12-domain performance rubric. Architected a domain-specific prompt engineering framework that enables the AI to evaluate student projects based on 5 core competencies, serving as a proposed alternative to standardized testing. Developed a full-stack dashboard using React, Next.js, and Prisma for educators to audit the AI's feedback, creating a human-in-the-loop system for model validation and transparency.",
    id: "research-0"
  },
  {
    title: "Undergraduate Research Assistant",
    organization: "Spider Lab, UC Irvine",
    location: "Irvine, CA",
    date: "Jan 2024 - May 2025",
    description: "Engineered the telemetry architecture for a VS Code extension that suggests unit tests, logging model suggestions, developer edits, and test outcomes to analyze real-world usage. Designed experiments to compare LLM-generated tests against baseline templates, measuring seeded-fault detection, line/branch coverage, and developer debugging efficiency. Identified cases where prompting strategies increased coverage but introduced subtly incorrect assertions, motivating new evaluation and calibration metrics for AI-assisted developer tools.",
    id: "research-1"
  }
];

export const internships: Experience[] = [
  {
    title: "Software Engineering Intern",
    organization: "PingCAP",
    location: "Sunnyvale, CA",
    date: "Jun 2024 - Sep 2024",
    description: "Developed tooling around TiDB to monitor and tune large-scale distributed SQL deployments, focusing on surfacing actionable performance and reliability signals. Analyzed latency distributions, error codes, and lock-wait statistics to uncover failure modes that average latency metrics masked. Helped derive composite health indicators and alert thresholds that better predicted operator interventions and real incidents than traditional single-metric dashboards.",
    id: "internship-0"
  },
  {
    title: "Data Labeler",
    organization: "HandshakeAI",
    location: "Remote",
    date: "June 2025 - December 2025",
    description: "Contributed to high-quality dataset creation and annotation for AI model training and evaluation.",
    id: "internship-1"
  }
];

export const teaching: Experience[] = [
  {
    title: "Software Engineering Teaching Assistant",
    organization: "UC Irvine - ICS Summer Academy",
    location: "Irvine, CA",
    date: "Jun 2025 - Aug 2025",
    description: "Mentored a cohort of 60+ students through an introductory software engineering curriculum, achieving a 100% final project deployment rate. Taught core object-oriented design principles, guiding students in creating UML class diagrams, defining system architecture, and applying agile methodologies. Led breakout sessions to provide real-time feedback on code and design, helping students translate project requirements into functional applications.",
    id: "teaching-0"
  },
  {
    title: "Informatics 115 Reader / Grader",
    organization: "UC Irvine",
    location: "Irvine, CA",
    date: "August 2025 - Present",
    description: "Evaluated 150+ student implementations using formal software testing principles, providing detailed feedback on correctness, edge-case handling, and test design quality. Led weekly office hours and midterm review support, clarifying concepts in structural testing, coverage analysis, and automated test generation. Collaborated with course staff to maintain grading consistency and contribute to improvements in course materials and autograder clarity.",
    id: "teaching-1"
  }
];

