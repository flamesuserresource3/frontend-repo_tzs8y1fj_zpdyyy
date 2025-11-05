import { useEffect, useMemo, useState } from 'react'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import ArticleView from './components/ArticleView'
import Footer from './components/Footer'
import CategoryNav from './components/CategoryNav'
import AIExplain from './components/AIExplain'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || ''

export default function App() {
  const [dark, setDark] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  })
  useEffect(() => {
    const root = document.documentElement
    if (dark) root.classList.add('dark')
    else root.classList.remove('dark')
  }, [dark])

  const [articles, setArticles] = useState([])
  const [categories, setCategories] = useState([])
  const [activeCategory, setActiveCategory] = useState(null)
  const [currentTitle, setCurrentTitle] = useState('Startseite')
  const [currentArticle, setCurrentArticle] = useState(null)
  const [globalError, setGlobalError] = useState('')
  const [loading, setLoading] = useState(true)

  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState([])

  const baseUrl = BACKEND_URL || window.location.origin.replace(':3000', ':8000')

  // Load categories and initial article list
  useEffect(() => {
    const loadBase = async () => {
      try {
        setLoading(true)
        setGlobalError('')
        const [catsRes, artRes] = await Promise.all([
          fetch(`${baseUrl}/categories`),
          fetch(`${baseUrl}/articles`)
        ])
        if (!catsRes.ok || !artRes.ok) throw new Error('Backend nicht erreichbar')
        const cats = await catsRes.json()
        const arts = await artRes.json()
        setCategories(cats)
        setArticles(arts)
      } catch (e) {
        console.error(e)
        setGlobalError('Die Verbindung zum Backend ist gestört. Bitte später erneut versuchen.')
      } finally {
        setLoading(false)
      }
    }
    loadBase()
  }, [baseUrl])

  // Load filtered list by category
  useEffect(() => {
    const loadList = async () => {
      try {
        const url = activeCategory ? `${baseUrl}/articles?category=${encodeURIComponent(activeCategory)}` : `${baseUrl}/articles`
        const res = await fetch(url)
        if (!res.ok) throw new Error('Fehler beim Laden der Liste')
        const data = await res.json()
        setArticles(data)
      } catch (e) {
        setGlobalError('Konnte die Artikelliste nicht laden.')
      }
    }
    loadList()
  }, [activeCategory, baseUrl])

  // Load current article details whenever title changes
  useEffect(() => {
    const art = articles.find((a) => a.title === currentTitle)
    if (!art) return
    const loadArticle = async () => {
      try {
        const res = await fetch(`${baseUrl}/articles/${encodeURIComponent(art.slug)}`)
        if (!res.ok) throw new Error('Artikel nicht gefunden')
        const data = await res.json()
        setCurrentArticle(data)
      } catch (e) {
        setGlobalError('Konnte den Artikel nicht laden.')
      }
    }
    loadArticle()
  }, [currentTitle, articles, baseUrl])

  // Search suggestions
  useEffect(() => {
    let active = true
    const q = query.trim()
    if (!q) { setSuggestions([]); return }
    const load = async () => {
      try {
        const res = await fetch(`${baseUrl}/search?q=${encodeURIComponent(q)}`)
        if (!res.ok) throw new Error('Fehler bei der Suche')
        const data = await res.json()
        if (active) setSuggestions(data)
      } catch (e) {
        setSuggestions([])
      }
    }
    load()
    return () => { active = false }
  }, [query, baseUrl])

  const handleNavigate = (title) => {
    setCurrentTitle(title)
    setQuery('')
  }

  const handleRandom = () => {
    const pool = articles.map(a => a.title).filter(t => t !== currentTitle)
    if (pool.length === 0) return
    const pick = pool[Math.floor(Math.random() * pool.length)]
    handleNavigate(pick)
  }

  const titles = useMemo(() => articles.map(a => a.title), [articles])

  return (
    <div className="min-h-screen bg-white text-neutral-900 dark:bg-neutral-900 dark:text-neutral-100 font-sans">
      <Header
        query={query}
        onQueryChange={setQuery}
        suggestions={suggestions}
        onSelectSuggestion={handleNavigate}
        onRandom={handleRandom}
        dark={dark}
        onToggleDark={() => setDark(d => !d)}
      />
      {globalError && (
        <div className="bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800 px-4 py-2 text-sm" role="alert">
          {globalError}
        </div>
      )}
      <CategoryNav categories={categories} active={activeCategory} onSelect={setActiveCategory} />
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[300px_1fr]">
        <Sidebar items={titles} current={currentTitle} onSelect={handleNavigate} />
        <main className="min-h-[60vh]">
          {loading && (
            <div className="p-6 text-sm text-neutral-600 dark:text-neutral-400">Lade Inhalte…</div>
          )}
          <ArticleView article={currentArticle} onNavigate={handleNavigate} />
          <div className="px-6 pb-10 max-w-3xl">
            <AIExplain baseUrl={baseUrl} />
          </div>
        </main>
      </div>
      <Footer />
    </div>
  )
}
