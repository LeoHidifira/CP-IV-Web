import { Link, NavLink } from 'react-router-dom'
import { FaClapperboard } from 'react-icons/fa6'
import './Header.css'

function Header() {
  return (
    <header className="header">
      <Link to="/" className="header-logo">
        <FaClapperboard />
        <span>Filmes Online</span>
      </Link>

      <nav className="header-nav">
        <NavLink
          to="/"
          end
          className={({ isActive }) => (isActive ? 'active' : '')}
        >
          Início
        </NavLink>
        <NavLink
          to="/assistidos"
          className={({ isActive }) => (isActive ? 'active' : '')}
        >
          Meus assistidos
        </NavLink>
      </nav>
    </header>
  )
}

export default Header
