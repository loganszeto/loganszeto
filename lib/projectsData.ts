export type Project = {
  slug: string;
  title: string;
  description: string;
  tech: string[];
  githubUrl?: string;
  liveUrl?: string;
};

export const projects: Project[] = [
  {
    slug: 'health-auto-export',
    title: 'Health Auto Export',
    description: 'A dashboard visualizing Apple Watch health data including sleep, activity, and recovery metrics.',
    tech: ['Next.js', 'React', 'Chart.js', 'Apple HealthKit'],
    githubUrl: 'https://github.com/loganszeto/health-auto-export',
    liveUrl: 'https://health-auto-export.vercel.app', // Update this after Vercel deployment
  },
]; 