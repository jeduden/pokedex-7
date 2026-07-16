import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

function PokemonDetail() {
  const { name } = useParams()
  const [pokemon, setPokemon] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    setError(null)
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then(res => res.json())
      .then(data => {
        setPokemon(data)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [name])

  return (
    <div className="container">
      <Link to="/" className="back-link">&larr; Back to Pokédex</Link>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {pokemon && (
        <div className="pokemon-detail">
          <img
            src={pokemon.sprites?.front_default}
            alt={pokemon.name}
          />
          <h1>{pokemon.name}</h1>
          <p>#{pokemon.id}</p>
        </div>
      )}
    </div>
  )
}

export default PokemonDetail
