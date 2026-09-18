import { Link } from 'react-router-dom'
import { FaPlus, FaTrash, FaTv, FaFilm } from 'react-icons/fa'
import { IMAGE_BASE_URL } from '../api/tmdb'
import './MovieCard.css'

function MovieCard({ item, variant, onAdd, onRemove, watchedAt }) {
  const mediaTypeLabel = item.mediaType === 'tv' ? 'Série' : 'Filme'
  const MediaIcon = item.mediaType === 'tv' ? FaTv : FaFilm

  const poster = item.posterPath ? (
    <img src={`${IMAGE_BASE_URL}${item.posterPath}`} alt={item.title} />
  ) : (
    <div className="movie-card-placeholder">
      <MediaIcon />
    </div>
  )

  const cardContent = (
    <>
      {poster}
      <div className="movie-card-info">
        <span className="movie-card-type">
          <MediaIcon /> {mediaTypeLabel}
        </span>
        <h3>{item.title}</h3>
        {item.year && <span className="movie-card-year">{item.year}</span>}
        {watchedAt && (
          <span className="movie-card-watched-at">
            Assistido em {watchedAt}
          </span>
        )}
      </div>
    </>
  )

  return (
    <div className="movie-card">
      {variant === 'watched' ? (
        <Link to={`/assistidos/${item.mediaType}/${item.id}`} className="movie-card-link">
          {cardContent}
        </Link>
      ) : (
        cardContent
      )}

      {variant === 'search' && (
        <button type="button" className="movie-card-action" onClick={onAdd}>
          <FaPlus /> Marcar como assistido
        </button>
      )}

      {variant === 'watched' && (
        <button
          type="button"
          className="movie-card-action movie-card-action-remove"
          onClick={onRemove}
        >
          <FaTrash /> Remover
        </button>
      )}
    </div>
  )
}

export default MovieCard
