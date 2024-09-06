import Swal from 'sweetalert2'
import { useState } from 'react'
import { deleteOffer } from '../logic/index.js'

export default function ListOffersAuthor(props) {
    const [offers, setOffers] = useState(props.offersAuthor)

    // DELETE OFFER
    function handleDeleteOfer(event, offerUrl) {
        event.preventDefault()

        Swal.fire({
            title: "¿Desea eliminar la oferta seleccionada?",
            text: "No se podrán revertir los cambios...",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Eliminar"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await deleteOffer(offerUrl)
                    setOffers(prevOffers => prevOffers.filter(offer => offer.url !== offerUrl))

                    Swal.fire({
                        title: "Eliminada",
                        text: "¡La oferta ha sido eliminada con éxito!",
                        icon: "success"
                    })

                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    })

                } catch (error) {
                    Swal.fire({
                        title: "Error",
                        text: "Hubo un problema al eliminar la oferta. Por favor, inténtalo de nuevo.",
                        icon: "error"
                    })
                }
            }
        })
    }

    return <>
        <main>
            {offers.map(offer => (
                <div className="vacante panel-administracion" key={offer.id}>
                    <div className="caja">
                        <h3>{offer.company}</h3>
                        <p className="puesto">{offer.title}</p>
                        <p className="candidatos">{offer.candidates.length} Candidato(s)</p>
                    </div>
                    <div className="centrar-vertical caja">
                        <a href={`/candidatos/${offer.url}`} className="btn btn-amarillo">Candidatos</a>
                    </div>
                    <div className="centrar-vertical caja">
                        <a href={`/vacantes/editar/${offer.url}`} className="btn btn-verde">Editar</a>
                    </div>
                    <div className="centrar-vertical caja">
                        <a href={`/vacantes/delete/${offer.url}`} className="btn btn-rojo" onClick={(event) => handleDeleteOfer(event, offer.url)}>Eliminar</a>
                    </div>
                </div>
            ))}
        </main>
    </>
}