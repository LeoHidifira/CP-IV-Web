import Hero from '../components/Hero'

function Home() {
  return (
    <Hero
      title="Nunca mais esqueça o que já assistiu"
      subtitle="O TV Time acabou, mas sua lista de filmes e séries assistidos não precisa se perder. Registre, organize e reveja tudo em um só lugar."
      ctaText="Organizar meus assistidos"
      ctaTo="/assistidos"
    />
  )
}

export default Home
