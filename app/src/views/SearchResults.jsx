import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import session from '../helpers/session.js'
import { searchOffer } from '../logic/index.js'
import { Header, HandlebarList } from '../components/index.js'

export default function SearchResults() {
    const { offerSearched } = useParams()
    const [search, setSearch] = useState(true)
    const [searched, setSearched] = useState([])

    useEffect(() => {
        async function fetchSearchedOffers() {
            try {
                const offers = await searchOffer(offerSearched)
                setSearched(offers)
            } catch (error) {
                console.log(error.message)
            }
        }

        fetchSearchedOffers()
    }, [offerSearched])

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
            {searched.length 
                ? <HandlebarList offers={searched}/> 
                : <p className="tagline text-center"> No hay resultados para "{offerSearched}"</p>
            }
        </div>
    </>
}
