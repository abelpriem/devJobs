

export default function ListOffersCandidate(props) {
    const candidates = props.candidates

    return <>
        <div className="lista-candidatos">
            {candidates.map(candidate => (
                <div className="candidato">
                <div className="caja">
                    <p className="etiqueta">Nombre:</p>
                    <p className="etiqueta">{candidate.name}</p>
                </div>
                <div className="caja">
                    <p className="etiqueta">Email:</p>
                    <p className="etiqueta">{candidate.email}</p>
                </div>
                <div className="caja">
                    <a href={`http://localhost:9001/uploads/curriculums/${candidate.cv}`} target="_blank" rel="noopener noreferrer" className="btn btn-verde">
                            Ver CV
                        </a>
                </div>
            </div>
            ))}
        </div>
    </>
}