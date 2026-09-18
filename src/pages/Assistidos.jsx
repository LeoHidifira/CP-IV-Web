import { useEffect, useState } from 'react'
import SearchBar from '../components/SearchBar'
import MovieCard from '../components/MovieCard'
import Toast from '../components/Toast'
import { searchTitles } from '../api/tmdb'
import './Assistidos.css'

const STORAGE_KEY = 'filmes-online:watched-list'

function normalizeResult(result) {
  return {
    id: result.id,
    mediaType: result.media_type,
    title: result.title || result.name,
    posterPath: result.poster_path,
    year: (result.release_date || result.first_air_date || '').slice(0, 4),
  }
}

function loadWatchedList() {
  const raw = localStorage.getItem(STORAGE_KEY)
  return raw ? JSON.parse(raw) : []
}

function Assistidos() {
  const [query, setQuery] = useState('')
  const [searchStatus, setSearchStatus] = useState('inicial')
  const [searchResults, setSearchResults] = useState([])
  const [watchedList, setWatchedList] = useState(loadWatchedList)
  const [filter, setFilter] = useState('all')
  const [toastMessage, setToastMessage] = useState('')

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(watchedList))
  }, [watchedList])

  useEffect(() => {
    if (!toastMessage) {
      return
    }

    const timer = setTimeout(() => setToastMessage(''), 3000)

    return () => clearTimeout(timer)
  }, [toastMessage])

  async function handleSearch() {
    const trimmedQuery = query.trim()

    if (!trimmedQuery) {
      return
    }

    setSearchStatus('carregando')

    try {
      const results = await searchTitles(trimmedQuery)
      const normalized = results.map(normalizeResult)

      setSearchResults(normalized)
      setSearchStatus(normalized.length > 0 ? 'sucesso' : 'vazio')
    } catch {
      setSearchStatus('erro')
    }
  }

  function addToWatched(item) {
    const alreadyWatched = watchedList.some(
      (watchedItem) =>
        watchedItem.id === item.id && watchedItem.mediaType === item.mediaType,
    )

    if (alreadyWatched) {
      return
    }

    const newItem = {
      ...item,
      addedAt: new Date().toLocaleDateString('pt-BR'),
    }

    setWatchedList([newItem, ...watchedList])
    setToastMessage(`"${item.title}" foi adicionado aos assistidos.`)
  }

  function removeFromWatched(item) {
    setWatchedList(
      watchedList.filter(
        (watchedItem) =>
          !(watchedItem.id === item.id && watchedItem.mediaType === item.mediaType),
      ),
    )
    setToastMessage(`"${item.title}" foi removido dos assistidos.`)
  }

  const filteredWatchedList = watchedList.filter((item) => {
    if (filter === 'all') return true
    return item.mediaType === filter
  })

  return (
    <div className="assistidos-page">
      <h1>Organize o que você já assistiu</h1>
      <p className="assistidos-intro">
        Busque um filme ou série e marque como assistido para manter sua
        lista sempre organizada.
      </p>

      <SearchBar value={query} onChange={setQuery} onSubmit={handleSearch} />

      {searchStatus === 'carregando' && <p className="assistidos-status">Buscando...</p>}
      {searchStatus === 'erro' && (
        <p className="assistidos-status assistidos-status-erro">
          Não foi possível buscar agora. Verifique a API key configurada e tente novamente.
        </p>
      )}
      {searchStatus === 'vazio' && (
        <p className="assistidos-status">Nenhum resultado encontrado para "{query}".</p>
      )}

      {searchStatus === 'sucesso' && (
        <section className="assistidos-section">
          <h2>Resultados da busca</h2>
          <div className="assistidos-grid">
            {searchResults.map((item) => (
              <MovieCard
                key={`${item.mediaType}-${item.id}`}
                item={item}
                variant="search"
                onAdd={() => addToWatched(item)}
              />
            ))}
          </div>
        </section>
      )}

      <section className="assistidos-section">
        <div className="assistidos-section-header">
          <h2>Minha lista de assistidos ({filteredWatchedList.length})</h2>
          <div className="assistidos-filters">
            <button
              type="button"
              className={filter === 'all' ? 'active' : ''}
              onClick={() => setFilter('all')}
            >
              Todos
            </button>
            <button
              type="button"
              className={filter === 'movie' ? 'active' : ''}
              onClick={() => setFilter('movie')}
            >
              Filmes
            </button>
            <button
              type="button"
              className={filter === 'tv' ? 'active' : ''}
              onClick={() => setFilter('tv')}
            >
              Séries
            </button>
          </div>
        </div>

        {filteredWatchedList.length === 0 ? (
          <p className="assistidos-status">
            Você ainda não marcou nada como assistido. Busque um título acima
            para começar.
          </p>
        ) : (
          <div className="assistidos-grid">
            {filteredWatchedList.map((item) => (
              <MovieCard
                key={`${item.mediaType}-${item.id}`}
                item={item}
                variant="watched"
                watchedAt={item.addedAt}
                onRemove={() => removeFromWatched(item)}
              />
            ))}
          </div>
        )}
      </section>

      <Toast message={toastMessage} />
    </div>
  )
}

export default Assistidos
