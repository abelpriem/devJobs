import { useNavigate } from 'react-router-dom'
import session from '../helpers/session.js'
import { Handlebar } from './index.js'
import { searchOffer } from '../logic/index.js'

export default function Header({search}) {
    const navigate = useNavigate()

    // LOGOUT
    async function handleLogout(event) {
        event.preventDefault()

        sessionStorage.clear()
        navigate('/')
    }

    // SUBMIT HANDLEBAR
    function handleSubmitHandlebar(event) {
        event.preventDefault()
        
        const offerToSearch = event.target.q.value

        try {
            searchOffer(offerToSearch)
        } catch(error) {
            navigate('/404')
        }
    }

    return <>
        <div className="nombre-sitio contenedor">
            <h1>
                <a href="/">DevJobs</a>
            </h1>

            {search === true && 
               <Handlebar />
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