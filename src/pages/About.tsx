import PixelAvatar from '../components/PixelAvatar'

const FRAME_SIZE = 236

export default function About() {
  return (
    <section
      style={{
        maxWidth: 720,
        margin: '0 auto',
        padding: '3rem 1.5rem',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '2rem',
        }}
      >
        <div
          style={{
            width: FRAME_SIZE,
            height: FRAME_SIZE,
            padding: 8,
            borderRadius: 4,
            background: 'linear-gradient(135deg, #00f5ff 0%, #a855f7 35%, #ec4899 70%, #f59e0b 100%)',
            boxShadow: `
              0 0 20px rgba(0, 245, 255, 0.4),
              0 0 40px rgba(168, 85, 247, 0.3),
              inset 0 0 30px rgba(0, 0, 0, 0.3)
            `,
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              borderRadius: 4,
              overflow: 'hidden',
              position: 'relative',
              background: 'linear-gradient(180deg, #1e1b4b 0%, #0f0a1e 100%)',
              boxShadow: 'inset 0 0 60px rgba(0, 245, 255, 0.08)',
            }}
          >
            <PixelAvatar />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.04) 2px, rgba(0,0,0,0.04) 4px)',
                pointerEvents: 'none',
              }}
            />
          </div>
        </div>
        <p
          style={{
            fontSize: '1.1rem',
            color: 'var(--text)',
            lineHeight: 1.8,
            textAlign: 'center',
          }}
        >
          I am a software engineer passionate about building full-stack web applications that solve 
          real-world problems and improve user experiences. I deliver end-to-end solutions that enhance 
          efficiency, reduce manual work, and combine clean architecture with intuitive interfaces.
        </p>
      </div>
    </section>
  )
}
