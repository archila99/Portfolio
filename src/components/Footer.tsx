export default function Footer() {
  const contacts = [
    { label: 'LinkedIn', href: 'https://linkedin.com/in/alibek-kerimov/', icon: 'in' },
    { label: 'Instagram', href: 'https://www.instagram.com/archila_001/', icon: 'ig' },
    { label: 'GitHub', href: 'https://github.com/archila99', icon: 'gh' },
  ]

  return (
    <footer
      style={{
        backgroundColor: 'var(--surface)',
        borderTop: '1px solid var(--border)',
        padding: '1.5rem 2rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '2rem',
        flexWrap: 'wrap',
      }}
    >
      {contacts.map(({ label, href }) => (
        <a
          key={label}
          href={href}
          target={href.startsWith('http') ? '_blank' : undefined}
          rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
          style={{
            color: 'var(--text-muted)',
            fontSize: '0.95rem',
          }}
        >
          {label}
        </a>
      ))}
      <div style={{
            color: 'var(--text-muted)',
            fontSize: '0.95rem',}}>
              +447946061199
      </div>
    </footer>
  )
}
