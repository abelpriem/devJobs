import { useNavigate } from 'react-router-dom'
import session from '../helpers/session.js'

export default function Header({search}) {
    const navigate = useNavigate()

    // LOGOUT
    async function handleLogout(event) {
        event.preventDefault()

        sessionStorage.clear()
        navigate('/')
    }

    return <>
        <div className="nombre-sitio contenedor">
            <h1>
                <a href="/">DevJobs</a>
            </h1>

            {search === true && 
                <div className="buscador px-10">
                    <form action="#">
                        <input type="text" className="buscar"></input>
                        <input type="submit" value="Buscar"></input>
                    </form>
                </div>
            }

            {session.token && 
                <div className="cerrar-sesion">
                    <p>Hola! {session.username}</p>
                    <a href="/administracion">Administración</a>
                    <a href="/cerrar-sesion" onClick={handleLogout}>Cerrar Sesión</a>
                </div>
            }
        </div>
    </>
}