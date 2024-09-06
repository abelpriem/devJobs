import session from '../helpers/session.js'
import { Navigate } from 'react-router-dom'

export default function PrivateRoute({ children }) {
  return session.token ? children : <Navigate to="/login" />
}
