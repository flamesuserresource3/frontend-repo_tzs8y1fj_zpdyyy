import { useEffect, useMemo, useState } from 'react'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import ArticleView from './components/ArticleView'
import Footer from './components/Footer'

const ARTICLES = [
  {
    title: 'Startseite',
    intro: 'Diese Enzyklopädie bietet kompakte, neutrale Erklärungen in genau fünf Sätzen pro Begriff.',
    sentences: [
      'Alle Artikel sind sachlich formuliert und konzentrieren sich auf das Wesentliche.',
      'Die Navigation erfolgt über die alphabetische Liste links oder die Suche oben.',
      'Begriffe wie [[Computer]], [[Demokratie]] oder [[Photosynthese]] sind bereits angelegt.',
      'Jeder Artikel enthält mindestens einen internen Verweis auf verwandte Themen wie [[Künstliche Intelligenz]] oder [[Internet]].',
      'Das Design orientiert sich an einer klassischen Online-Enzyklopädie mit hoher Lesbarkeit.'
    ],
    categories: ['Hinweise']
  },
  {
    title: 'Computer',
    intro: 'Ein Computer ist ein elektronisches System zur automatischen Verarbeitung von Daten.',
    sentences: [
      'Er besteht typischerweise aus Hardwarekomponenten wie Prozessor, Speicher und Ein- sowie Ausgabegeräten.',
      'Programme, oft als Software bezeichnet, steuern die Verarbeitungsschritte und ermöglichen vielfältige Anwendungen.',
      'Computer werden in Bereichen wie Wissenschaft, Wirtschaft und Unterhaltung eingesetzt und sind allgegenwärtig.',
      'Historisch reichen mechanische Vorläufer bis zu Rechenmaschinen zurück, moderne Systeme basieren auf der von-Neumann-Architektur.',
      'Verwandte Themen sind [[Algorithmus]] und [[Künstliche Intelligenz]].'
    ],
    categories: ['Technik']
  },
  {
    title: 'Demokratie',
    intro: 'Demokratie ist eine Herrschaftsform, in der politische Entscheidungen durch das Volk legitimiert sind.',
    sentences: [
      'Sie zeichnet sich durch freie Wahlen, Gewaltenteilung und den Schutz von Grundrechten aus.',
      'Es existieren verschiedene Ausprägungen, darunter direkte und repräsentative Modelle.',
      'Historische Wurzeln liegen in den griechischen Stadtstaaten, moderne Demokratien entwickelten sich seit der Aufklärung.',
      'Medien, Parteien und Zivilgesellschaft tragen zur Meinungsbildung und Kontrolle der Macht bei.',
      'Verwandte Begriffe sind [[Stadt]] und [[Sprache]] im Kontext öffentlicher Debatten.'
    ],
    categories: ['Gesellschaft', 'Politik']
  },
  {
    title: 'Photosynthese',
    intro: 'Photosynthese ist ein biochemischer Prozess, bei dem Lichtenergie in chemische Energie umgewandelt wird.',
    sentences: [
      'Pflanzen, Algen und bestimmte Bakterien nutzen Licht, Wasser und Kohlendioxid zur Bildung von Glukose und Sauerstoff.',
      'Der Prozess findet in Chloroplasten statt, insbesondere in den Thylakoidmembranen.',
      'Er ist Grundlage fast aller Nahrungsketten und beeinflusst den globalen Kohlenstoffkreislauf.',
      'Die Effizienz hängt von Faktoren wie Lichtintensität, Temperatur und Wasserverfügbarkeit ab.',
      'Verwandt sind die Themen [[Energie]] und [[Ozean]] im Hinblick auf globale Stoffkreisläufe.'
    ],
    categories: ['Natur']
  },
  {
    title: 'Künstliche Intelligenz',
    intro: 'Künstliche Intelligenz bezeichnet Systeme, die Aufgaben mit Methoden der intelligenten Informationsverarbeitung lösen.',
    sentences: [
      'Sie umfasst Teilbereiche wie maschinelles Lernen, Wissensrepräsentation und Sprachverarbeitung.',
      'Anwendungen reichen von Empfehlungssystemen über Bilderkennung bis zu autonomen Fahrzeugen.',
      'Ethische Fragen betreffen Transparenz, Fairness und Verantwortung in automatisierten Entscheidungen.',
      'Technisch basieren viele Verfahren auf statistischen Modellen und großen Datensätzen.',
      'Verwandte Begriffe sind [[Computer]] und [[Internet]].'
    ],
    categories: ['Technik', 'Informatik']
  },
  {
    title: 'Ozean',
    intro: 'Der Ozean ist die zusammenhängende Wassermasse der Erde, die den größten Teil der Oberfläche bedeckt.',
    sentences: [
      'Er beeinflusst Klima, Wetter und den globalen Stoffaustausch durch Strömungen und Verdunstung.',
      'Lebensräume reichen von Küstenzonen bis zu Tiefseegräben mit hoch angepassten Organismen.',
      'Wirtschaftlich sind Schifffahrt, Fischerei und Rohstoffgewinnung von Bedeutung.',
      'Umweltfragen betreffen Verschmutzung, Versauerung und den Rückgang der Biodiversität.',
      'Verwandt sind [[Energie]] in Form von Wellen- und Gezeitenkraft sowie Prozesse wie [[Photosynthese]] im Phytoplankton.'
    ],
    categories: ['Natur', 'Geographie']
  },
  {
    title: 'Algorithmus',
    intro: 'Ein Algorithmus ist eine endliche, eindeutige Handlungsanweisung zur Lösung eines Problems.',
    sentences: [
      'Er besteht aus klar definierten Schritten, die in einer bestimmten Reihenfolge ausgeführt werden.',
      'Algorithmen können in Programmiersprachen implementiert und auf [[Computer]]n ausgeführt werden.',
      'Effizienz wird häufig mit den Konzepten Zeit- und Speicherkomplexität beschrieben.',
      'Beispiele finden sich in Sortierverfahren, Suchstrategien und Optimierungsproblemen.',
      'Verwandt sind die Themen [[Künstliche Intelligenz]] und [[Internet]] hinsichtlich Datenverarbeitung und Skalierung.'
    ],
    categories: ['Informatik', 'Technik']
  },
  {
    title: 'Energie',
    intro: 'Energie ist die Fähigkeit eines Systems, Arbeit zu verrichten oder Wärme abzugeben.',
    sentences: [
      'Sie tritt in verschiedenen Formen auf, etwa als kinetische, potenzielle, thermische oder elektrische Energie.',
      'Energieerhaltung ist ein grundlegendes Prinzip der Physik und gilt in abgeschlossenen Systemen.',
      'Umwandlungen zwischen Formen erfolgen in Maschinen, Kraftwerken und biologischen Prozessen.',
      'Gesellschaftlich bedeutsam sind Versorgungssicherheit, Effizienz und Nachhaltigkeit.',
      'Verwandte Begriffe sind [[Ozean]] als Energiespeicher und [[Photosynthese]] als Umwandlungsprozess.'
    ],
    categories: ['Physik']
  },
  {
    title: 'Gravitation',
    intro: 'Gravitation ist die anziehende Wechselwirkung zwischen Massen.',
    sentences: [
      'Sie erklärt Phänomene wie Planetenbahnen, Gezeiten und den freien Fall.',
      'Klassisch wird sie durch Newtons Gravitationsgesetz beschrieben, modern durch die Allgemeine Relativitätstheorie.',
      'Messungen erfolgen unter anderem mit Pendeln, Satellitenbahnen und Beobachtungen von Gravitationswellen.',
      'Die Gravitationskonstante ist schwer präzise zu bestimmen und Gegenstand aktueller Forschung.',
      'Verwandte Themen sind [[Energie]] und [[Ozean]] durch Gezeitenwirkungen.'
    ],
    categories: ['Physik', 'Astronomie']
  },
  {
    title: 'Internet',
    intro: 'Das Internet ist ein globales Netzwerk, das Rechner und Dienste über standardisierte Protokolle verbindet.',
    sentences: [
      'Es basiert auf Paketvermittlung und Protokollen wie TCP/IP und HTTP.',
      'Anwendungen umfassen das World Wide Web, E-Mail, Streaming und Cloud-Dienste.',
      'Skalierung und Resilienz werden durch verteilte Architekturen und Redundanz erreicht.',
      'Sicherheitsfragen betreffen Verschlüsselung, Authentifizierung und Datenschutz.',
      'Verwandte Begriffe sind [[Computer]] und [[Algorithmus]].'
    ],
    categories: ['Technik', 'Kommunikation']
  },
  {
    title: 'Musik',
    intro: 'Musik ist die organisierte Gestaltung von Klang in Zeit.',
    sentences: [
      'Sie umfasst Parameter wie Tonhöhe, Rhythmus, Dynamik und Klangfarbe.',
      'Kulturelle Ausprägungen sind vielfältig und reichen von Volksmusik bis zu zeitgenössischen Stilen.',
      'Wahrnehmung und Wirkung werden in Musikwissenschaft und Psychologie untersucht.',
      'Technische Entwicklungen wie Aufnahmetechnik und Streaming verändern Produktion und Verbreitung.',
      'Verwandt sind [[Sprache]] in ihrer Struktur sowie mediale Verbreitung über das [[Internet]].'
    ],
    categories: ['Kultur']
  },
  {
    title: 'Sprache',
    intro: 'Sprache ist ein System von Zeichen und Regeln zur Verständigung.',
    sentences: [
      'Sie ermöglicht die codierte Übertragung von Bedeutungen zwischen Menschen.',
      'Sprachen variieren in Grammatik, Lautsystem und Wortschatz, zeigen aber universelle Strukturen.',
      'Erwerb und Wandel werden in Linguistik, Psychologie und Anthropologie untersucht.',
      'Schriftliche und mündliche Formen ergänzen sich je nach Medium und Zweck.',
      'Verwandte Themen sind [[Musik]] als Ausdrucksform und [[Demokratie]] im Diskurs.'
    ],
    categories: ['Kultur', 'Kommunikation']
  },
  {
    title: 'Stadt',
    intro: 'Eine Stadt ist eine dicht besiedelte, funktional gegliederte Siedlung.',
    sentences: [
      'Sie bündelt Wohnen, Arbeiten, Bildung und Kultur auf begrenztem Raum.',
      'Stadtentwicklung wird durch Planung, Infrastruktur und wirtschaftliche Dynamik geprägt.',
      'Herausforderungen umfassen Verkehr, Wohnraum und ökologische Nachhaltigkeit.',
      'Historisch entwickelten sich Städte an Handelswegen, Flüssen und Knotenpunkten.',
      'Verwandte Begriffe sind [[Demokratie]] in der Selbstverwaltung und [[Internet]] in der digitalen Infrastruktur.'
    ],
    categories: ['Geographie', 'Gesellschaft']
  }
]

export default function App() {
  const [selected, setSelected] = useState('Startseite')
  const [query, setQuery] = useState('')
  const titles = useMemo(() => ARTICLES.map(a => a.title), [])
  const articleByTitle = useMemo(() => Object.fromEntries(ARTICLES.map(a => [a.title, a])), [])

  // Dark mode
  const [dark, setDark] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  })
  useEffect(() => {
    const root = document.documentElement
    if (dark) root.classList.add('dark')
    else root.classList.remove('dark')
  }, [dark])

  const currentArticle = articleByTitle[selected]

  const suggestions = useMemo(() => {
    if (!query.trim()) return []
    const q = query.toLowerCase()
    return titles.filter(t => t.toLowerCase().includes(q)).slice(0, 8)
  }, [query, titles])

  const handleNavigate = (title) => {
    if (!articleByTitle[title]) return
    setSelected(title)
    setQuery('')
  }

  const handleRandom = () => {
    const pool = titles.filter(t => t !== selected)
    const pick = pool[Math.floor(Math.random() * pool.length)]
    handleNavigate(pick)
  }

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
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[280px_1fr]">
        <Sidebar items={titles} current={selected} onSelect={handleNavigate} />
        <main className="min-h-[60vh]">
          <ArticleView article={currentArticle} onNavigate={handleNavigate} />
        </main>
      </div>
      <Footer />
    </div>
  )
}
