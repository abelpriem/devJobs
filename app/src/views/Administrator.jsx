import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Header, ListOffersAuthor } from '../components/index.js'
import { retrieveOffersAuthor } from '../logic/index.js'
import session from '../helpers/session.js'

// VIEW - ADMINISTRATOR
export default function Administrator() {
    const [search, setSearch] = useState(false)
    const [offertsAuthor, setOffersAuthor] = useState('')

    const navigate = useNavigate()

    // RETRIEVE OFFER'S AUTHOR
    useEffect(() => {
        async function fetchOffersAuthor() {
            try {
                const offers = await retrieveOffersAuthor() 
                setOffersAuthor(offers)
            } catch(error) {
                navigate('/404')
            }
        }

        fetchOffersAuthor()
    }, [navigate])

    return <>
        <Header search={search}/>

        <div className="site-header contenedor separador">
            <h2>Panel de Administración</h2>
            <p className="tagline">Crea y Administra tus vacantes desde aquí</p>
        </div>

        <div className="contenedor lista-vacantes">
            <h2>Navegación</h2>
            <div className="botones separador">
                <a href={`/editar-perfil/${session.sessionUserId}`} className="btn btn-azul">Editar Perfil</a>
                <a href="/vacantes/crear" className="btn btn-verde">Nueva Vacante</a>
            </div>
        </div>

        <div className="contenedor lista-vacantes">
            <h2>Tus Ofertas</h2>
                {offertsAuthor.length 
                    ? <ListOffersAuthor offersAuthor={offertsAuthor} />
                    : <p>No hay ofertas creadas todavía... ¡Empieza por una nueva!</p>
                }
        </div>
    </>
}