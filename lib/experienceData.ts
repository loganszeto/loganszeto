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
    description: "At the Design and Partnership Lab, I worked on evaluating large language models in an educational context where outputs directly affect human judgment. My work focused on building and assessing an LLM based rubric scoring pipeline used to support educators. One of my first responsibilities was curating a labeled dataset of over 120 ground truth samples spanning a twelve domain rubric. This process exposed me to the inherent ambiguity in qualitative evaluation and the challenges of establishing consistent labels across evaluators.\n\nBeyond dataset creation, I designed evaluation frameworks that measured not only accuracy but also consistency and failure patterns across repeated model runs. I developed domain specific prompting strategies and structured evaluation criteria that captured five competency dimensions, allowing us to compare qualitative feedback stability rather than relying solely on aggregate scores. This work highlighted how traditional machine learning metrics often fail to reflect user facing reliability and fairness.\n\nI also implemented a human in the loop evaluation dashboard using React Next.js and Prisma. The goal was to support auditability, manual overrides, and traceability for every model generated score. Knowing that the system would be used by over a thousand educators serving tens of thousands of students shaped many of my design decisions. This experience reinforced my interest in trustworthy machine learning systems and in building tooling that augments rather than replaces human judgment.",
    id: "research-0",
    slug: "design-partnership-lab"
  },
  {
    title: "Undergraduate Research Assistant",
    organization: "Spider Lab",
    location: "Irvine, CA",
    date: "Jan 2024 – May 2025",
    description: "My work at Spider Lab focused on empirical software engineering and developer tooling research. I engineered telemetry instrumentation for a VS Code extension in order to capture runtime behavior, developer interactions, and failure cases. Designing this instrumentation required careful consideration of performance overhead, data granularity, and the types of signals that meaningfully reflect developer experience and software quality.\n\nI also designed and ran controlled experiments comparing LLM generated tests against baseline test templates. I evaluated fault detection capability, line and branch coverage, and debugging efficiency. Through this work, I learned that higher coverage does not necessarily imply better tests and that assertion correctness is often the limiting factor in automated test generation. These findings challenged my initial assumptions and motivated deeper investigation into evaluation metrics.\n\nThis research experience taught me how to design experiments, reason about noisy data, and communicate tradeoffs clearly. It shaped how I think about AI assisted developer tools by emphasizing careful evaluation and calibration rather than raw automation. I gained a strong appreciation for rigorous methodology in software engineering research.",
    id: "research-1",
    slug: "spider-lab"
  }
];

export const internships: Experience[] = [
  {
    title: "Software Engineering Project Lead",
    organization: "Northrop Grumman",
    location: "Remote",
    date: "Jan 2025 – Present",
    description: "My role as a Software Engineering Project Lead at Northrop Grumman has been centered on designing software systems that operate in a security critical and compliance driven environment. From the beginning of the project, I had to think beyond implementation details and focus on how software artifacts interact with regulatory requirements, risk assessment processes, and operational decision making. Our work focused on building an automated platform to screen third party software against the NIST CVE database, which required me to develop a detailed understanding of vulnerability data formats, severity scoring, and remediation workflows.\n\nA major part of my responsibility involved translating high level security and compliance needs into precise technical designs. Rather than working from a fixed specification, I collaborated with stakeholders to clarify how vulnerability severity should be interpreted, how results should be aggregated, and how findings should be presented for downstream approval. This required designing data models, ingestion workflows, and validation logic that were robust to incomplete or inconsistent CVE records. I learned how important it is to document assumptions explicitly and design systems that are resilient to ambiguous inputs.\n\nAs we prototyped logic to identify High and Critical vulnerabilities, I became increasingly aware of the tradeoffs involved in automation for security applications. False positives can introduce unnecessary delays, while false negatives carry serious risk. This experience pushed me to think carefully about threshold selection, traceability, and explainability. It strengthened my interest in building software systems that balance efficiency with trust and that can withstand technical and organizational scrutiny.",
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
    title: "Software Engineering Fellow",
    organization: "PingCAP",
    location: "Sunnyvale, CA",
    date: "Jun 2024 – Sep 2024",
    description: "At PingCAP, I worked on production software systems where reliability and performance issues had immediate real world impact. My work involved analyzing performance regressions and diagnosing failure modes in distributed systems. This required deep engagement with system metrics and an understanding of how concurrency and resource contention manifest at scale.\n\nI instrumented latency distributions, lock wait behavior, and contention patterns to identify sources of instability. Through this process, I developed a more systematic approach to debugging complex systems by forming hypotheses, validating them against empirical data, and iterating when assumptions were incorrect. I learned that many performance issues emerge from interactions between components rather than isolated defects.\n\nI also collaborated closely with senior engineers to define actionable health indicators and alert thresholds. This experience taught me that effective observability is not about collecting as many metrics as possible, but about selecting signals that align with real operational risks. The internship significantly strengthened my systems thinking and interest in reliable infrastructure.",
    id: "internship-0",
    slug: "pingcap"
  }
];

export const teaching: Experience[] = [
  {
    title: "Undergraduate Course Assistant",
    organization: "ICS 32",
    location: "Irvine, CA",
    date: "Jan 2025 – Present",
    description: "Serving as a reader and grader for ICS 32 gave me direct exposure to how students transition from foundational programming to building applications using real world software libraries. The course covers a wide range of environments including graphics, graphical user interfaces, databases, web services, and networked systems, which required me to evaluate student work across many different programming contexts. Grading these assignments pushed me to assess not only whether programs functioned correctly, but also how effectively students leveraged library abstractions and managed complexity beyond introductory coursework.\n\nIn addition to grading, I regularly hosted office hours where I worked with students to debug library usage issues, reason about program structure, and understand unfamiliar APIs. Many students struggled with integrating external modules or interpreting documentation, and these sessions allowed me to guide them toward systematic debugging and experimentation rather than trial and error. Helping students reason through library behavior strengthened my own understanding of how abstraction boundaries affect program design and maintainability.\n\nI also contributed to writing automated tests and autograders to support faster and more consistent grading of student projects. This involved designing tests that captured both functional correctness and common failure cases while remaining robust to differences in implementation style. To ensure academic integrity, we compared current submissions against prior student work and analyzed version control activity, including timing between Git pushes, to identify patterns consistent with copying rather than incremental development. This work gave me insight into how automated evaluation, data analysis, and human judgment must work together to fairly assess student learning.\n\nBeyond major projects, I assisted with grading other homework assignments and refining test coverage to reduce ambiguity in scoring. Through this role, I developed a deeper appreciation for scalable assessment design, clear specification writing, and the role of tooling in large programming courses. The experience reinforced my interest in software quality, education, and building systems that support both learning and fairness.",
    id: "teaching-2",
    slug: "ics-32"
  },
  {
    title: "Undergraduate Course Assistant",
    organization: "INF 115",
    location: "Irvine, CA",
    date: "Aug 2025 – Dec 2025",
    description: "Serving as a reader and grader for Informatics 115 gave me a rigorous perspective on how students apply formal software testing principles in practice. I evaluated over 150 student implementations, focusing not only on functional correctness but also on edge case handling, assertion quality, and overall test design. Reviewing a wide range of submissions exposed recurring misconceptions in how students reason about coverage and failure modes, which strengthened my ability to analyze code critically and systematically.\n\nA key part of my role involved writing detailed feedback that explained why certain tests were insufficient and how they could be improved. I emphasized reasoning about boundary conditions, input partitioning, and meaningful assertions rather than surface level fixes. This process required translating abstract testing concepts into clear and actionable guidance that students could apply in future assignments. Through this work, I developed a stronger appreciation for how evaluation criteria shape student understanding of software quality.\n\nIn addition to grading, I held weekly office hours and midterm review sessions where I worked directly with students to debug failing tests and interpret autograder results. These interactions reinforced the importance of clarity and consistency in automated assessment tools. I also provided feedback on autograder behavior and course materials, which gave me insight into the challenges of designing scalable and fair evaluation systems for large technical courses.",
    id: "teaching-1",
    slug: "inf-115"
  },
  {
    title: "Software Engineering Teaching Assistant",
    organization: "ICS Summer Academy",
    location: "Irvine, CA",
    date: "Jun 2025 – Aug 2025",
    description: "As an undergraduate teaching assistant for the ICS Summer Academy, I mentored over 60 students in an intensive introductory software engineering program. Many students entered the program with limited prior experience, which required me to focus on building strong conceptual foundations. I supported instruction in object oriented design, UML modeling, system architecture, and agile development practices, helping students connect abstract concepts to concrete implementation decisions.\n\nI led breakout sessions where students presented code and design artifacts and received real time feedback. During these sessions, I focused on improving class structure, abstraction boundaries, and overall system organization. Providing immediate feedback helped students understand how design choices impact maintainability and scalability, and it strengthened my own ability to reason about software at multiple levels of abstraction.\n\nThis role emphasized the importance of communication and adaptability in technical teaching. Explaining design principles to diverse learners required me to adjust explanations, draw diagrams, and reason through examples collaboratively. The experience reinforced my interest in software engineering education and deepened my understanding of how structured guidance and iterative feedback support the development of strong engineering habits.",
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
