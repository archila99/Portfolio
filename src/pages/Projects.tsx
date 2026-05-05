import PixelProjectLogo from '../components/PixelProjectLogo'

export type Project = {
  id: string
  title: string
  description?: string
  url: string
  logoVariant?: string
}

const projects: Project[] = [
  {
    id: '1',
    title: 'EventBooking',
    description: 'A full-stack ticket reservation and purchase system with roles (Admin, Artist, User), venues, time slots, events, and atomic capacity handling.',
    url: 'https://event-posting-app-nine.vercel.app/',
    logoVariant: 'event',
  },
  {
    id: '2',
    title: 'Travel Cost Estimator',
    description: 'Web app lets users calculate trip costs and fuel consumption for multiple vehicles and routes instantly.',
    url: 'https://travel-cost-estimoator-9zdko8fpe-archila99s-projects.vercel.app/',
    logoVariant: 'travel',
  },
  {
    id: '3',
    title: 'Movie-Selection',
    description: 'Web app to browse and select movies with search, filtering, and detailed information.',
    url: 'https://movie-selection-pi.vercel.app/',
    logoVariant: 'movie',
  },
  {
    id: '4',
    title: 'Video & Image Processing',
    description: 'Web app that extracts frames from videos (with adjustable time range and interval) and classifies images as color or monochrome.',
    url: 'https://video-color-analyzer.vercel.app/',
    logoVariant: 'video',
  },
  {
    id: '5',
    title: 'NASA Data Visualization Platform',
    description: 'A full-stack web application that fetches data from multiple NASA APIs and visualizes it through interactive charts and diagrams.',
    url: 'https://nasa-data-viz.web.app',
    logoVariant: 'nasa',
  },
  {
    id: '6',
    title: 'US News',
    description: 'Web app that displays US news with a clean UI for browsing headlines and reading articles.',
    url: 'https://news-beta-drab.vercel.app/',
    logoVariant: 'news',
  },
]

export default function Projects() {
  return (
    <section className="page">
      <div className="container">
        <h1 className="section-title">Projects</h1>
        <div className="projects-grid">
          {projects.map((project) => (
            <a
              key={project.id}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="project-card"
            >
              <PixelProjectLogo variant={project.logoVariant ?? 'default'} />
              <div>
                <div className="project-title">{project.title}</div>
                {project.description && (
                  <div className="project-desc">{project.description}</div>
                )}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
