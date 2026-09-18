const API_KEY = import.meta.env.VITE_TMDB_API_KEY
const BASE_URL = 'https://api.themoviedb.org/3'
const LANGUAGE = 'pt-BR'

export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w342'

export async function searchTitles(query) {
  const url = `${BASE_URL}/search/multi?api_key=${API_KEY}&language=${LANGUAGE}&query=${encodeURIComponent(query)}`
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error('Não foi possível buscar os títulos.')
  }

  const data = await response.json()

  return data.results.filter(
    (item) => item.media_type === 'movie' || item.media_type === 'tv',
  )
}

export async function getTitleDetails(mediaType, id) {
  const url = `${BASE_URL}/${mediaType}/${id}?api_key=${API_KEY}&language=${LANGUAGE}`
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error('Não foi possível carregar os detalhes do título.')
  }

  return response.json()
}
