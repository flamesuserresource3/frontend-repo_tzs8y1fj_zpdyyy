import { useState } from 'react'

export default function AIExplain({ baseUrl }) {
  const [term, setTerm] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [sentences, setSentences] = useState([])

  const handleExplain = async () => {
    const q = term.trim()
    if (!q) return
    setLoading(true)
    setError('')
    setSentences([])
    try {
      const res = await fetch(`${baseUrl}/ai/explain?term=${encodeURIComponent(q)}`)
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.detail || 'Fehler bei der Abfrage')
      }
      const data = await res.json()
      setSentences(data.sentences || [])
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section aria-labelledby="ai-explain" className="mt-8">
      <h2 id="ai-explain" className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-2">KI-Erklärung (5 Sätze)</h2>
      <div className="flex items-center gap-2">
        <label htmlFor="ai-term" className="sr-only">Begriff</label>
        <input
          id="ai-term"
          type="text"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          placeholder="Begriff eingeben (z. B. Quantenphysik)"
          className="flex-1 rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-600 text-neutral-900 dark:text-neutral-100 placeholder-neutral-400"
        />
        <button
          onClick={handleExplain}
          disabled={loading}
          className="inline-flex items-center gap-2 text-sm px-3 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Lädt…' : 'Erklären'}
        </button>
      </div>
      {error && (
        <p className="mt-3 text-sm text-red-600 dark:text-red-400" role="alert">{error}</p>
      )}
      {sentences.length > 0 && (
        <div className="mt-4 space-y-3 leading-relaxed">
          {sentences.map((s, idx) => (
            <p key={idx}>{s}</p>
          ))}
        </div>
      )}
    </section>
  )}
