import { useState, useEffect } from 'react'
import PokemonCard from '../components/PokemonCard.jsx'

function PokedexGrid() {
  const [pokemon, setPokemon] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
      .then(res => res.json())
      .then(data => {
        setPokemon(data.results)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  if (loading) return <div className="container"><p>Loading...</p></div>
  if (error) return <div className="container"><p>Error: {error}</p></div>

  return (
    <div className="container">
      <h1>Pokédex</h1>
      <div className="pokemon-grid">
        {pokemon.map(poke => (
          <PokemonCard key={poke.name} name={poke.name} url={poke.url} />
        ))}
      </div>
    </div>
  )
}

export default PokedexGrid
