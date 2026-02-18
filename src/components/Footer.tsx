export default function Footer() {
  const contacts = [
    { label: 'LinkedIn', href: 'https://linkedin.com/in/alibek-kerimov/', hideOnMobile: false },
    { label: 'Instagram', href: 'https://www.instagram.com/archila_001/', hideOnMobile: false },
    { label: 'GitHub', href: 'https://github.com/archila99', hideOnMobile: false },
  ]

  return (
    <footer
      className="site-footer"
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
      {contacts.map(({ label, href, hideOnMobile }) => (
        <a
          key={label}
          href={href}
          target={href.startsWith('http') ? '_blank' : undefined}
          rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
          className={hideOnMobile ? 'footer-hide-mobile' : ''}
          style={{
            color: 'var(--text-muted)',
            fontSize: '0.95rem',
          }}
        >
          {label}
        </a>
      ))}
    </footer>
  )
}
