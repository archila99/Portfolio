import { NavLink } from 'react-router-dom'
import PixelProjectLogo from './PixelProjectLogo'

const navItems = [
  { to: '/', label: 'ABOUT' },
  { to: '/projects', label: 'PROJECTS' },
  { to: '/game', label: 'GAME' },
]

export default function Navbar() {
  return (
    <header className="site-nav">
      <div className="container site-nav-inner">
        <NavLink to="/" end className="brand">
          <PixelProjectLogo variant="header" />
          <span>AK_portfolio</span>
        </NavLink>
        <nav className="nav-links" aria-label="Primary">
          {navItems.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `nav-link ${isActive ? 'nav-link-active' : ''}`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}
