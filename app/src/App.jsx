import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Home, NewOffer, Offer, Edit, Register, Login, Administrator, Profile, Candidates, Error } from './views/index.js'
import { PrivateRoute } from './components/index.js'

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/vacantes/crear" element={
            <PrivateRoute>
              <NewOffer />
            </PrivateRoute>} />
          <Route path="/vacantes/:offerUrl" element={<Offer />} />
          <Route path="/vacantes/editar/:offerUrl" element={
            <PrivateRoute>
              <Edit />
            </PrivateRoute>} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/administracion" element={
            <PrivateRoute>
              <Administrator />
            </PrivateRoute>} />
          <Route path="/editar-perfil/:userId" element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>} />
          <Route path="/candidatos/:offerUrl" element={
            <PrivateRoute>
              <Candidates />
            </PrivateRoute>} />
          <Route path="/404" element={<Error />} />

          {/* Ruta para capturar cualquier URL no existente */}
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </Router>
    </>
  )
}
