import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PokedexGrid from './pages/PokedexGrid.jsx'
import PokemonDetail from './pages/PokemonDetail.jsx'

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<PokedexGrid />} />
        <Route path="/pokemon/:name" element={<PokemonDetail />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
