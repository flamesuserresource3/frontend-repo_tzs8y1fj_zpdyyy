import { useEffect } from 'react'

const linkColor = 'text-[#0645AD] hover:text-[#0b3d91] dark:text-blue-400 dark:hover:text-blue-300'

function renderLinkedText(text, onLink) {
  const parts = []
  const regex = /\[\[(.+?)\]\]/g
  let lastIndex = 0
  let match
  while ((match = regex.exec(text)) !== null) {
    const before = text.slice(lastIndex, match.index)
    if (before) parts.push(before)
    const term = match[1]
    parts.push(
      <button
        key={match.index + term}
        onClick={() => onLink(term)}
        className={`${linkColor} underline underline-offset-2`}
      >
        {term}
      </button>
    )
    lastIndex = match.index + match[0].length
  }
  const after = text.slice(lastIndex)
  if (after) parts.push(after)
  return parts
}

export default function ArticleView({ article, onNavigate }) {
  useEffect(() => {
    if (!article) return
    document.title = `${article.title} – Kompakt-Enzyklopädie`
    const meta = document.querySelector('meta[name="description"]')
    const desc = `${article.title}: ${article.intro}`
    if (meta) meta.setAttribute('content', desc)
  }, [article])

  if (!article) return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-2">Willkommen</h1>
      <p className="text-neutral-700 dark:text-neutral-300">Diese Enzyklopädie bietet prägnante Erklärungen in genau fünf Sätzen pro Begriff. Verwenden Sie die Suche, Kategorien oder die alphabetische Navigation, um zu starten.</p>
    </div>
  )

  return (
    <article className="px-6 py-6 lg:py-8 max-w-3xl">
      <header>
        <h1 className="text-3xl font-bold tracking-tight mb-2 text-neutral-900 dark:text-neutral-100">{article.title}</h1>
        <p className="text-neutral-700 dark:text-neutral-300 mb-4">{article.intro}</p>
      </header>
      <section aria-labelledby="erklaerung">
        <h2 id="erklaerung" className="sr-only">Erklärung</h2>
        <div className="space-y-3 leading-relaxed text-neutral-900 dark:text-neutral-100">
          {article.sentences.map((s, idx) => (
            <p key={idx} className="">
              {renderLinkedText(s, onNavigate)}
            </p>
          ))}
        </div>
      </section>
      {article.categories && article.categories.length > 0 && (
        <section className="mt-6" aria-labelledby="kategorien">
          <h2 id="kategorien" className="text-sm font-semibold text-neutral-600 dark:text-neutral-400">Kategorien</h2>
          <div className="mt-2 flex flex-wrap gap-2">
            {article.categories.map((c) => (
              <span key={c} className="text-xs px-2 py-1 rounded border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300">{c}</span>
            ))}
          </div>
        </section>
      )}
    </article>
  )
}
