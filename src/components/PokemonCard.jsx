import { Link } from 'react-router-dom'

function idFromUrl(url) {
  const match = url.match(/\/pokemon\/(\d+)\/?$/)
  return match ? match[1] : null
}

function PokemonCard({ name, url }) {
  const id = idFromUrl(url)
  const spriteUrl = id
    ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
    : null

  return (
    <Link to={`/pokemon/${name}`} className="pokemon-card">
      {spriteUrl && <img src={spriteUrl} alt={name} loading="lazy" />}
      <span className="pokemon-id">#{id}</span>
      <strong className="pokemon-name">{name}</strong>
    </Link>
  )
}

export default PokemonCard
