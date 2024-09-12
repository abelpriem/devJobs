
export default function HandlebarList(props) {
    const offers = props.offers

    return <>
        <main className="lista-vacantes">
            <h2>Lista de Vacantes en base a tu búsqueda:</h2>

            {offers.map(offer => (
                <div className="vacante" key={offer.id}>
                    <div className="caja">
                        <h3>{offer.company}</h3>
                        <p className="puesto">{offer.title}</p>
                    </div>

                    <div className="caja">
                        <p className="etiqueta">Ubicación</p>
                        <p className="nombre">{offer.location}</p>
                    </div>

                    <div className="caja">
                        <p className="etiqueta">Contrato</p>
                        <p className="nombre contrato">{offer.contract}</p>
                    </div>

                    <div className="caja centrar-vertical">
                        <a href={`/vacantes/${offer.url}`} className="btn btn-verde">Mas info</a>
                    </div>
                </div>
            ))}
        </main>
    </>
}