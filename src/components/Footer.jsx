export default function Footer() {
  const link = (href, label) => (
    <a href={href} className="text-blue-700 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline underline-offset-2">
      {label}
    </a>
  )
  return (
    <footer className="mt-auto border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-sm text-neutral-700 dark:text-neutral-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <p>© {new Date().getFullYear()} Kompakt-Enzyklopädie – Sachlich. Neutral. Prägnant.</p>
        <nav className="flex items-center gap-4" aria-label="Footer Navigation">
          {link('#impressum','Impressum')}
          {link('#datenschutz','Datenschutz')}
          {link('#kontakt','Kontakt')}
        </nav>
      </div>
    </footer>
  )
}
