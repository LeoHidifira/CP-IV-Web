import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa'
import { getTitleDetails, IMAGE_BASE_URL } from '../api/tmdb'
import './AssistidoDetalhe.css'

const STORAGE_KEY = 'filmes-online:watched-list'

function findWatchedEntry(mediaType, id) {
  const raw = localStorage.getItem(STORAGE_KEY)
  const watchedList = raw ? JSON.parse(raw) : []

  return watchedList.find(
    (item) => item.mediaType === mediaType && String(item.id) === id,
  )
}

function AssistidoDetalhe({ mediaType, id }) {
  const [status, setStatus] = useState('carregando')
  const [details, setDetails] = useState(null)

  useEffect(() => {
    getTitleDetails(mediaType, id)
      .then((data) => {
        setDetails(data)
        setStatus('sucesso')
      })
      .catch(() => {
        setStatus('erro')
      })
  }, [mediaType, id])

  const watchedEntry = findWatchedEntry(mediaType, id)

  return (
    <div className="detalhe-page">
      <Link to="/assistidos" className="detalhe-voltar">
        <FaArrowLeft /> Voltar para meus assistidos
      </Link>

      {status === 'carregando' && <p className="assistidos-status">Carregando...</p>}
      {status === 'erro' && (
        <p className="assistidos-status assistidos-status-erro">
          Não foi possível carregar os detalhes deste título.
        </p>
      )}

      {status === 'sucesso' && details && (
        <div className="detalhe-content">
          {details.poster_path && (
            <img
              src={`${IMAGE_BASE_URL}${details.poster_path}`}
              alt={details.title || details.name}
            />
          )}
          <div className="detalhe-info">
            <h1>{details.title || details.name}</h1>
            {watchedEntry && (
              <span className="detalhe-watched-at">
                Assistido em {watchedEntry.addedAt}
              </span>
            )}
            <p className="detalhe-overview">
              {details.overview || 'Sem sinopse disponível.'}
            </p>
            {details.genres?.length > 0 && (
              <div className="detalhe-genres">
                {details.genres.map((genre) => (
                  <span key={genre.id}>{genre.name}</span>
                ))}
              </div>
            )}
            {details.vote_average > 0 && (
              <p className="detalhe-nota">
                Nota TMDB: {details.vote_average.toFixed(1)} / 10
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

function AssistidoDetalheRoute() {
  const { mediaType, id } = useParams()

  return <AssistidoDetalhe key={`${mediaType}-${id}`} mediaType={mediaType} id={id} />
}

export default AssistidoDetalheRoute
