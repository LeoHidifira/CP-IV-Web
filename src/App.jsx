import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
import Assistidos from './pages/Assistidos'
import AssistidoDetalhe from './pages/AssistidoDetalhe'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="assistidos" element={<Assistidos />} />
          <Route path="assistidos/:mediaType/:id" element={<AssistidoDetalhe />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
