import { Link } from 'react-router-dom'
import { FaArrowRight } from 'react-icons/fa'
import './Hero.css'

function Hero({ title, subtitle, ctaText, ctaTo }) {
  return (
    <section className="hero-section">
      <h1>{title}</h1>
      <p>{subtitle}</p>
      <Link to={ctaTo} className="hero-cta">
        {ctaText}
        <FaArrowRight />
      </Link>
    </section>
  )
}

export default Hero
