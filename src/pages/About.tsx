import PixelAvatar from '../components/PixelAvatar'
import { Link } from 'react-router-dom'

const FRAME_SIZE = 236

export default function About() {
  return (
    <section className="page">
      <div className="container hero">
        <div className="card hero-card">
          <div
            style={{
              width: FRAME_SIZE,
              height: FRAME_SIZE,
              margin: '0 auto',
              padding: 8,
              borderRadius: 8,
              background:
                'linear-gradient(135deg, #00f5ff 0%, #a855f7 35%, #ec4899 70%, #f59e0b 100%)',
              boxShadow:
                '0 0 20px rgba(0, 245, 255, 0.35), 0 0 40px rgba(168, 85, 247, 0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                borderRadius: 8,
                overflow: 'hidden',
                position: 'relative',
                background:
                  'linear-gradient(180deg, #1e1b4b 0%, #0f0a1e 100%)',
                boxShadow: 'inset 0 0 60px rgba(0, 245, 255, 0.08)',
              }}
            >
              <PixelAvatar />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.04) 2px, rgba(0,0,0,0.04) 4px)',
                  pointerEvents: 'none',
                }}
              />
            </div>
          </div>

          <h1 className="hero-name">
            <span style={{ color: 'var(--accent)' }}>Alibek Kerimov</span>
          </h1>
          <p className="hero-subtitle">
            I am <strong style={{ color: 'var(--text)' }}>Alibek Kerimov</strong>, a software engineer
            passionate about building full-stack web applications that solve real-world problems and
            improve user experiences. I deliver end-to-end solutions that enhance efficiency, reduce
            manual work, and combine clean architecture with intuitive interfaces.
          </p>

          <div className="hero-cta">
            <Link className="btn btn-primary" to="/projects">
              View projects
            </Link>
            <Link className="btn" to="/game">
              Play Snake
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
