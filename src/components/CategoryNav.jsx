export default function CategoryNav({ categories, active, onSelect }) {
  if (!categories || categories.length === 0) return null
  return (
    <div className="w-full border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50/60 dark:bg-neutral-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-wrap gap-2">
        <button
          onClick={() => onSelect(null)}
          className={`text-xs px-2.5 py-1.5 rounded-md border ${active === null ? 'bg-blue-600 text-white border-blue-600' : 'border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800'}`}
        >Alle</button>
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => onSelect(c)}
            className={`text-xs px-2.5 py-1.5 rounded-md border ${active === c ? 'bg-blue-600 text-white border-blue-600' : 'border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800'}`}
          >{c}</button>
        ))}
      </div>
    </div>
  )
}
