import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import session from '../helpers/session.js'
import { Header, List } from '../components/index.js'
import { retrieveOffers } from '../logic/index.js'

// VIEW - HOME 
export default function Home() {
    const [search, setSearch] = useState(true)
    const [offers, setOffers] = useState([])

    const navigate = useNavigate()

    // RETRIEVE ALL OFFERS
    useEffect(() => {
        async function fetchOffers() {
            try {
                const allOfers = await retrieveOffers()
                setOffers(allOfers)
            } catch (error) {
                navigate('/404')
            }
        }
        
        fetchOffers()
    }, [navigate])

    return <>
        <Header search={search}/>

        <div class="site-header contenedor separador">
            <h2>¡Bienvenido al portal devJobs!</h2>
            <p className="tagline">Encuentra y Publica Trabajos para Desarrolladores Web</p>
            {session.token 
                ? <a href="/vacantes/crear" className="btn btn-azul">Publicar Nueva Vacante</a>
                : <a href="/login" className="btn btn-azul">Iniciar sesión</a>
            }
        </div>

        <div className="contenido-principal contenedor">
            {offers.length 
                ? <List offers={offers}/>
                : <p className="tagline text-center"> No hay Vacantes</p>
            }
        </div>
    </>
}