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
    slug: 'zothacks',
    title: 'ZotWee',
    description: 'A campus restroom finder that maps nearby gender-neutral bathrooms and routes users to the closest option.',
    tech: ['Next.js', 'React', 'Google Maps API', 'Google Directions API'],
    liveUrl: 'https://zot-wee.vercel.app/',
  },
  {
    slug: 'health-auto-export',
    title: 'Health Auto Export',
    description: 'A dashboard visualizing Apple Watch health data including sleep, activity, and recovery metrics.',
    tech: ['Next.js', 'React', 'Chart.js', 'Apple HealthKit'],
    githubUrl: 'https://github.com/loganszeto/health-auto-export',
    liveUrl: 'https://health-auto-export.vercel.app', // Update this after Vercel deployment
  },
]; 