export default function Footer() {
  const contacts = [
    { label: 'LinkedIn', href: 'https://linkedin.com/in/alibek-kerimov/', hideOnMobile: false },
    { label: 'Instagram', href: 'https://www.instagram.com/archila_001/', hideOnMobile: false },
    { label: 'GitHub', href: 'https://github.com/archila99', hideOnMobile: false },
  ]

  return (
    <footer className="site-footer">
      <div className="container site-footer-inner">
        {contacts.map(({ label, href, hideOnMobile }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith('http') ? '_blank' : undefined}
            rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
            className={`${hideOnMobile ? 'footer-hide-mobile ' : ''}footer-link`}
          >
            {label}
          </a>
        ))}
      </div>
    </footer>
  )
}
