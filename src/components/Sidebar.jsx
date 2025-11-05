import { useState, useMemo } from 'react'

export default function Sidebar({ items, current, onSelect }) {
  const [open, setOpen] = useState(false)
  const groups = useMemo(() => {
    return items.reduce((acc, it) => {
      const title = typeof it === 'string' ? it : it.title
      const letter = title[0].toUpperCase()
      if (!acc[letter]) acc[letter] = []
      acc[letter].push(title)
      return acc
    }, {})
  }, [items])
  const letters = Object.keys(groups).sort()

  return (
    <aside className="border-r border-neutral-200 dark:border-neutral-800 h-full">
      <div className="lg:hidden p-3 border-b border-neutral-200 dark:border-neutral-800">
        <button
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          className="w-full inline-flex items-center justify-between rounded-md border border-neutral-300 dark:border-neutral-700 px-3 py-2 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800"
        >
          <span>Navigation</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
      <nav className={`px-3 pb-4 lg:block ${open ? 'block' : 'hidden'}`} aria-label="Alphabetische Navigation">
        {letters.map(letter => (
          <div key={letter} className="mt-3">
            <div className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 px-2" aria-hidden="true">{letter}</div>
            <ul className="mt-1 space-y-0.5">
              {groups[letter].sort().map(title => (
                <li key={title}>
                  <button
                    onClick={() => { onSelect(title); setOpen(false) }}
                    className={`w-full text-left px-2 py-1.5 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800 text-sm ${current === title ? 'font-semibold text-neutral-900 dark:text-neutral-100' : 'text-blue-700 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300'}`}
                  >
                    {title}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  )
}
