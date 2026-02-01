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
    title: 'Image Color Detector',
    description: 'Tool that identifies whether images are monochrome or colorful and automatically separates them into corresponding folders',
    url: 'https://color-detector-72hg.onrender.com/',
    logoVariant: 'intro',
  },
  {
    id: '2',
    title: 'Travel Cost Estimator',
    description: 'Application that lets users calculate trip costs and fuel consumption for multiple vehicles and routes instantly',
    url: 'https://travel-estimator-1000853843394.europe-west2.run.app/',
    logoVariant: 'default',
  },
  {
    id: '3',
    title: 'Frameshot',
    description: 'Product that extracts frames from videos, automatically detecting video duration and setting valid time ranges',
    url: 'https://frameshot.onrender.com/',
    logoVariant: 'intro',
  },
  // Add more: logoVariant 'intro' | 'default' or add new in PixelProjectLogo
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
