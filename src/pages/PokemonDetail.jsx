import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

const TYPE_COLORS = {
  normal: '#A8A878',
  fire: '#F08030',
  water: '#6890F0',
  electric: '#F8D030',
  grass: '#78C850',
  ice: '#98D8D8',
  fighting: '#C03028',
  poison: '#A040A0',
  ground: '#E0C068',
  flying: '#A890F0',
  psychic: '#F85888',
  bug: '#A8B820',
  rock: '#B8A038',
  ghost: '#705898',
  dragon: '#7038F8',
  dark: '#705848',
  steel: '#B8B8D0',
  fairy: '#EE99AC',
}

const STAT_LABELS = {
  hp: 'HP',
  attack: 'Attack',
  defense: 'Defense',
  'special-attack': 'Sp. Atk',
  'special-defense': 'Sp. Def',
  speed: 'Speed',
}

const STAT_MAX = 200

function PokemonDetail() {
  const { name } = useParams()
  const [pokemon, setPokemon] = useState(null)
  const [species, setSpecies] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    setError(null)
    setPokemon(null)
    setSpecies(null)

    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then(res => res.json())
      .then(data => {
        setPokemon(data)
        setLoading(false)
        return fetch(data.species.url)
      })
      .then(res => res.json())
      .then(data => setSpecies(data))
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [name])

  const flavorText = species?.flavor_text_entries
    ?.find(entry => entry.language.name === 'en')
    ?.flavor_text.replace(/[\n\f\r]/g, ' ')

  const artwork =
    pokemon?.sprites?.other?.['official-artwork']?.front_default ||
    pokemon?.sprites?.front_default

  return (
    <div className="container">
      <Link to="/" className="back-link">&larr; Back to Pokédex</Link>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {pokemon && (
        <div className="pokemon-detail">
          <img src={artwork} alt={pokemon.name} />
          <p className="pokemon-id">#{String(pokemon.id).padStart(3, '0')}</p>
          <h1>{pokemon.name}</h1>

          <div className="pokemon-types">
            {pokemon.types.map(({ type }) => (
              <span
                key={type.name}
                className="type-badge"
                style={{ backgroundColor: TYPE_COLORS[type.name] || '#777' }}
              >
                {type.name}
              </span>
            ))}
          </div>

          {flavorText && <p className="pokemon-flavor">{flavorText}</p>}

          <div className="pokemon-measurements">
            <div>
              <span className="measurement-value">{(pokemon.height / 10).toFixed(1)} m</span>
              <span className="measurement-label">Height</span>
            </div>
            <div>
              <span className="measurement-value">{(pokemon.weight / 10).toFixed(1)} kg</span>
              <span className="measurement-label">Weight</span>
            </div>
          </div>

          <div className="pokemon-abilities">
            <h2>Abilities</h2>
            <ul>
              {pokemon.abilities.map(({ ability, is_hidden }) => (
                <li key={ability.name}>
                  {ability.name.replace(/-/g, ' ')}
                  {is_hidden && <span className="hidden-ability"> (hidden)</span>}
                </li>
              ))}
            </ul>
          </div>

          <div className="pokemon-stats">
            <h2>Base Stats</h2>
            {pokemon.stats.map(({ stat, base_stat }) => (
              <div className="stat-row" key={stat.name}>
                <span className="stat-label">{STAT_LABELS[stat.name] || stat.name}</span>
                <span className="stat-value">{base_stat}</span>
                <div className="stat-bar-track">
                  <div
                    className="stat-bar-fill"
                    style={{ width: `${Math.min(100, (base_stat / STAT_MAX) * 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default PokemonDetail
