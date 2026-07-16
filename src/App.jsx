import { useState, useEffect } from 'react'

function App() {
  const [pokemon, setPokemon] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=20')
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
      <p>Showing first 20 Pokémon from PokéAPI</p>
      <ul className="pokemon-list">
        {pokemon.map((poke, idx) => (
          <li key={idx}>
            <strong>{poke.name}</strong>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
