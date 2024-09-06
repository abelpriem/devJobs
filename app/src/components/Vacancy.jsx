
export default function Vacancy() {
    
    return <>
        <div className="vacante">
            <div className="caja">
                <h3>Facebook</h3>
                <p className="puesto">React Developer</p>
            </div>

            <div className="caja">
                <p className="etiqueta">Ubicación</p>
                <p className="nombre">Remoto</p>
            </div>

            <div className="caja">
                <p className="etiqueta">Contrato</p>
                <p className="nombre contrato">Tiempo completo</p>
            </div>

            <div className="caja centrar-vertical">
                <a href="#" className="btn btn-verde">Mas info</a>
            </div>
        </div>
    </>
}