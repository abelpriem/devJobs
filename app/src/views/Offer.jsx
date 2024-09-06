import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import session from '../helpers/session.js'
import { Header } from '../components/index.js'
import { retrieveOneOffer, uploadCv } from '../logic/index.js'

// VIEW - OFFER
export default function Offer(props) {
    const [search, setSearch] = useState(false)
    const [offer, setOffer] = useState([])
    const [author, setAuthor] = useState('')
    const { offerUrl } = useParams()

    const [showError, setShowError] = useState('')
    const [showMessage, setShowMessage] = useState('')

    const cvInputRef = useRef(null)
    const navigate = useNavigate()

    // RETRIEVE OFFER SELECTED
    useEffect(() => {
        async function fetchOffer() {            
            try {
                const selectedOffer = await retrieveOneOffer(offerUrl)
                setOffer(selectedOffer.offer)
                setAuthor(selectedOffer.author)
            } catch(error) {
                navigate('/404')
            } 
        }

        fetchOffer()
    }, [offerUrl, session, navigate])

    // SEND APLICATION
    async function handleSubmitAplication(event) {
        event.preventDefault()

        setShowError('')
        setShowMessage('')

        const name = event.target.name.value
        const email = event.target.email.value        
        const cv = cvInputRef.current.files[0]
        const offerUrl = offer.url

        if (!cv || cv.type !== 'application/pdf') {
            setShowError('Por favor, seleccione un archivo PDF válido')
            return
        }

        try {
            await uploadCv(offerUrl, name, email, cv)
            setShowMessage('Su CV se ha enviado correctamente!')
        } catch(error) {
            setShowError(error.message)
        }
    }

    return <>
        <Header search={search}/>

        <h2 className="site-header contenedor separador">{offer.title}</h2>

        <div className="contenido-superior vacante contenedor">
            <div className="caja">
                <p className="etiqueta">Empresa</p>
                <p className="nombre">{offer.company}</p>
            </div>
            <div className="caja">
                <p className="etiqueta">Ubicación</p>
                <p className="nombre">{offer.location}</p>
            </div>
            <div className="caja">
                <p className="etiqueta">Contrato</p>
                <p className="nombre contrato">{offer.contract}</p>
            </div>
            <div className="caja">
                <p className="etiqueta">Salario</p>
                <p className="nombre">{offer.salary}</p>
            </div>
        </div>

        <div className="vacante-contenedor contenedor">
            <main className="contenido">
                <h2>Descripción del Puesto</h2>
                <div className="vacante-descripcion mt-10 my-20" dangerouslySetInnerHTML={{ __html: offer.description }}></div>

                {session === null || session.sessionUserId === offer.author && (
                     <a href={`/vacantes/editar/${offer.url}`} className='btn btn-azul editar-btn my-20'>Editar vacante</a>
                )}
            </main>

            <asside className="sidebar mt-10">
                <h2>Conocimientos Deseados</h2>
                <ul className="skills">
                    {offer.skills && offer.skills.length > 0 ? (
                        offer.skills.map((skill, index) => (
                            <li key={index}>{skill}</li>
                        ))
                    ) : (
                        <p>No se han especificado habilidades.</p>
                    )}
                </ul>
            </asside>
        </div>

        <div className="contenedor datos-reclutador">
            <div className="enviar-datos">
                <h2>Aplicar oferta</h2>
                <p>Rellena el formulario y sube tu currículum para contactar con el reclutador</p>

                {showError && (
                    <div className="error alerta">{showError}</div>
                )}

                {showMessage && (
                    <div className="correcto alerta">{showMessage}</div>
                )}

                <form onSubmit={handleSubmitAplication} className='default-form'>
                    <div className="campo">
                        <label htmlFor='name'>Nombre</label>
                        <input type="text" name="name" placeholder="Escribe aquí tu nombre" required/>
                    </div>
                    <div className="campo">
                        <label htmlFor='email'>Email</label>
                        <input type="email" name="email" placeholder="Indica aquí tu correo electrónico" required/>
                    </div>
                    <div className="campo">
                        <label>{`CV (PDF)`}</label>
                        <input type="file" name="cv" ref={cvInputRef}/>
                    </div>
                    <div className="campo">
                        <input type="submit" className="btn btn-verde" value="Enviar"/>
                    </div>
                    
                </form>
            </div>

            <div className="info-reclutador">
                <h2>Información Reclutador</h2>
                {offer.author && (
                    <p>{author}</p> 
                )}
            </div>
        </div>
    </>
}