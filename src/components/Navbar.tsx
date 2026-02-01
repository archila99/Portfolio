import { NavLink } from 'react-router-dom'

const navItems = [
  { to: '/', label: 'ABOUT' },
  { to: '/projects', label: 'PROJECTS' },
  { to: '/game', label: 'GAME' },
]

export default function Navbar() {
  return (
    <nav
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        backgroundColor: 'var(--surface)',
        borderBottom: '1px solid var(--border)',
        padding: '1rem 2rem',
        display: 'flex',
        justifyContent: 'center',
        gap: '2rem',
      }}
    >
      {navItems.map(({ to, label }) => (
        <NavLink
          key={to}
          to={to}
          end={to === '/'}
          style={({ isActive }) => ({
            color: isActive ? 'var(--accent)' : 'var(--text)',
            fontWeight: 600,
            letterSpacing: '0.1em',
            textDecoration: 'none',
          })}
        >
          {label}
        </NavLink>
      ))}
    </nav>
  )
}
