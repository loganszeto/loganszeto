export type Project = {
  slug: string;
  title: string;
  description: string;
  tech: string[];
};

export const projects: Project[] = [
  {
    slug: 'the-recovery-loop',
    title: 'The Recovery Loop',
    description: 'A strength training insights dashboard visualizing the feedback loop between lifting, recovery, and cardiovascular adaptation.',
    tech: ['Next.js', 'React', 'Chart.js', 'Apple HealthKit', 'Vercel'],
  },
  {
    slug: 'another-project',
    title: 'Another Cool Project',
    description: 'A brief description of another awesome thing you built.',
    tech: ['Python', 'Flask', 'SQL'],
  },
]; 