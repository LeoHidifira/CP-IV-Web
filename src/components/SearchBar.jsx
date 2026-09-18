import { FaSearch } from 'react-icons/fa'
import './SearchBar.css'

function SearchBar({ value, onChange, onSubmit }) {
  function handleSubmit(event) {
    event.preventDefault()
    onSubmit()
  }

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <FaSearch className="search-icon" />
      <input
        type="text"
        placeholder="Buscar filme ou série..."
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
      <button type="submit">Buscar</button>
    </form>
  )
}

export default SearchBar
