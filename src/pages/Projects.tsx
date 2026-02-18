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
    title: 'Video & Image Processing',
    description: 'Web app that extracts frames from videos (with adjustable time range and interval) and classifies images as color or monochrome.',
    url: 'https://video-image-processing-e-30530.web.app/',
    logoVariant: 'video',
  },
  {
    id: '2',
    title: 'NASA Data Visualization Platform',
    description: 'A full-stack web application that fetches data from multiple NASA APIs and visualizes it through interactive charts and diagrams.',
    url: 'https://nasa-data-viz.web.app',
    logoVariant: 'nasa',
  },
  {
    id: '3',
    title: 'Travel Cost Estimator',
    description: 'Web app lets users calculate trip costs and fuel consumption for multiple vehicles and routes instantly.',
    url: 'https://travel-estimator-r5y2jd5kga-uc.a.run.app/',
    logoVariant: 'travel',
  },
  {
    id: '4',
    title: 'Movie-Selection',
    description: 'Web app to browse and select movies with search, filtering, and detailed information.',
    url: 'https://movie-selection-pi.vercel.app/',
    logoVariant: 'movie',
  },
]

export default function Projects() {
  return (
    <section
      style={{
        maxWidth: 800,
        margin: '0 auto',
        padding: '3rem 1.5rem',
      }}
    >
      <h1
        style={{
          fontSize: '1.75rem',
          marginBottom: '2rem',
          textAlign: 'center',
        }}
      >
        Projects
      </h1>
      <ul
        style={{
          listStyle: 'none',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
        }}
      >
        {projects.map((project) => (
          <li key={project.id}>
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '1.25rem',
                backgroundColor: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 8,
                textDecoration: 'none',
                color: 'var(--text)',
                transition: 'border-color 0.2s, box-shadow 0.2s',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.borderColor = 'var(--accent)'
                e.currentTarget.style.boxShadow = '0 0 0 1px var(--accent)'
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.borderColor = 'var(--border)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <PixelProjectLogo variant={project.logoVariant ?? 'default'} />
              <div>
                <strong style={{ display: 'block', marginBottom: 4 }}>
                  {project.title}
                </strong>
                {project.description && (
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                    {project.description}
                  </span>
                )}
              </div>
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}
