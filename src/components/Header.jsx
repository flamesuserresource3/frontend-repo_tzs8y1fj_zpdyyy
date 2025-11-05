import { useState, useEffect, useRef } from 'react'

function Logo() {
  return (
    <div className="flex items-center gap-2 select-none" aria-label="Enzyklopädie Logo">
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true"
        className="text-blue-700">
        <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 0a10 10 0 00-9 5.5M12 2a10 10 0 019 5.5M3 7.5h18M4 16.5c2 .5 4 .5 8 .5s6 0 8-.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      <span className="font-semibold text-xl tracking-tight">Kompakt-Enzyklopädie</span>
    </div>
  )
}

export default function Header({ query, onQueryChange, suggestions, onSelectSuggestion, onRandom, dark, onToggleDark }) {
  const [open, setOpen] = useState(false)
  const inputRef = useRef(null)
  const listRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(-1)

  useEffect(() => {
    const handleClick = (e) => {
      if (!listRef.current) return
      if (!listRef.current.contains(e.target) && e.target !== inputRef.current) {
        setOpen(false)
        setActiveIndex(-1)
      }
    }
    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])

  const onKeyDown = (e) => {
    if (!open) return
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIndex((i) => Math.min(i + 1, suggestions.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIndex((i) => Math.max(i - 1, 0))
    } else if (e.key === 'Enter') {
      if (activeIndex >= 0 && activeIndex < suggestions.length) {
        onSelectSuggestion(suggestions[activeIndex].title)
        setOpen(false)
        setActiveIndex(-1)
      }
    } else if (e.key === 'Escape') {
      setOpen(false)
      setActiveIndex(-1)
    }
  }

  return (
    <header className="sticky top-0 z-20 bg-white/95 dark:bg-neutral-900/90 backdrop-blur border-b border-neutral-200 dark:border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        <Logo />
        <div className="flex-1 max-w-2xl mx-4 relative" role="search">
          <label htmlFor="search" className="sr-only">Suche</label>
          <input
            id="search"
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => { onQueryChange(e.target.value); setOpen(true); setActiveIndex(-1) }}
            onFocus={() => setOpen(true)}
            onKeyDown={onKeyDown}
            placeholder="Begriff suchen…"
            className="w-full rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-600 text-neutral-900 dark:text-neutral-100 placeholder-neutral-400"
            aria-autocomplete="list"
            aria-expanded={open}
            aria-controls="suggestions-list"
          />
          {open && suggestions.length > 0 && (
            <ul
              id="suggestions-list"
              ref={listRef}
              role="listbox"
              className="absolute mt-1 w-full max-h-72 overflow-auto rounded-md border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 shadow-lg"
            >
              {suggestions.map((s, i) => (
                <li
                  key={s.slug || s.title}
                  role="option"
                  aria-selected={i === activeIndex}
                  tabIndex={0}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => { onSelectSuggestion(s.title); setOpen(false) }}
                  className={`px-3 py-2 text-sm cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-100 flex items-center justify-between ${i === activeIndex ? 'bg-neutral-100 dark:bg-neutral-800' : ''}`}
                >
                  <span>{s.title}</span>
                  {s.categories && s.categories.length > 0 && (
                    <span className="ml-3 hidden sm:flex gap-1">
                      {s.categories.slice(0, 2).map((c) => (
                        <span key={c} className="text-[10px] px-1.5 py-0.5 rounded border border-neutral-300 dark:border-neutral-700 text-neutral-600 dark:text-neutral-300">{c}</span>
                      ))}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button onClick={onRandom} className="hidden sm:inline-flex items-center gap-2 text-sm px-3 py-2 rounded-md border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-blue-700 dark:text-blue-400" aria-label="Zufälliger Artikel">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="">
              <path d="M4 4h5l2 3-2 3H4V4zm0 13h5l2 3-2 3H4v-6zm11-8h5v6h-5l-2-3 2-3z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Zufälliger Artikel
          </button>
          <button onClick={onToggleDark} aria-pressed={dark} aria-label="Darstellung umschalten" className="inline-flex items-center justify-center w-9 h-9 rounded-md border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800">
            {dark ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-yellow-400" aria-hidden="true">
                <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-yellow-500" aria-hidden="true">
                <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5M17.5 17.5L19 19M5 19l1.5-1.5M17.5 6.5L19 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            )}
          </button>
        </div>
      </div>
    </header>
  )
}
