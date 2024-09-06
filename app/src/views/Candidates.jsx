import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Header, ListOffersCandidate } from '../components/index.js'
import { retrieveOneOffer } from '../logic/index.js'

export default function Candidates() {
    const [search, setSearch] = useState(false)
    const [candidates, setCandidates] = useState([])
    const [offer, setOffer] = useState([])

    const { offerUrl } = useParams()
    const navigate = useNavigate()

    // RETRIEVE SELECTED OFFER
    useEffect(() => {
        async function fetchOffer() {
            try {
                const offerSelected = await retrieveOneOffer(offerUrl)
                setOffer(offerSelected.offer)
                setCandidates(offerSelected.offer.candidates)
            } catch(error) {
                navigate('/404')
            }
        }

        fetchOffer()
    }, [offerUrl, navigate])


    return <>
        <Header search={search}/>

        <div className="site-header contenedor separador">
            <h2>Candidatos Vacante - {offer.title}</h2>
            <p className="tagline">Listado total de aplicaciones a la oferta</p>
        </div>

        <div className='contenedor'>
            <h2>Lista de Candidatos</h2>

            {candidates.length
                ? <ListOffersCandidate candidates={candidates} />
                : <p className="tagline text-center"> No hay candidatos aún</p>
            }
        </div>
    </>
}