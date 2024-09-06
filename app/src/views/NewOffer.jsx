import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Header, SkillsSelector } from '../components/index.js'
import { createOffer } from '../logic/index.js'

// VIEW - NEW OFFER
export default function NewOffer() {
    const [search, setSearch] = useState(false)
    const [selectedSkills, setSelectedSkills] = useState([])

    const navigate = useNavigate()

    // TOGGLE SKILL
    function handleSelectSkill(skill) {
        setSelectedSkills(prevSkills => prevSkills.includes(skill)
                ? prevSkills.filter(s => s !== skill) 
                : [...prevSkills, skill] 
        )
    }

    // SUBMIT FORM
    async function handleSubmit(event) {
        event.preventDefault()

        const title = event.target.title.value
        const company = event.target.company.value
        const location = event.target.location.value
        const salary = event.target.salary.value
        const contract = event.target.contract.value
        const description = event.target.x.value

        try {
            await createOffer(title,company,location,salary,contract,description,selectedSkills)
            navigate('/')
        } catch(error) {
            navigate('/404')
        }
    }

    return <>
        <Header search={search}/>

        <div className="site-header contenedor separador">
            <h2>Nueva Vacante</h2>
            <p className="tagline">Llena el formulario y publica tu vacante</p>
        </div>
        
        <main className="contenedor">
            <form onSubmit={handleSubmit} className="default-form">
                <h3>Información General</h3>

                <div className="campo">
                    <label>Titulo</label>
                    <input type="text" name="title" placeholder="Ej: React Developer" required></input>
                </div>

                <div className="campo">
                    <label>Empresa</label>
                    <input type="text" name="company" placeholder="Ej: Facebook" required></input>
                </div>

                <div className="campo">
                    <label>Ubicación</label>
                    <input type="text" name="location" placeholder="Ej: Madrid o Remoto" required></input>
                </div>

                <div className="campo">
                    <label>Salario (EUR)</label>
                    <input type="text" name="salary" placeholder="Ej: 28.000€" required></input>
                </div>

                <div className="campo">
                    <label>Contrato</label>
                    <select name="contract">
                        <option value="" disable="true">Selecciona una opción</option>
                        <option value="Jornada Completa">Jornada Completa</option>
                        <option value="Media Jornada">Media Jornada</option>
                        <option value="Freelance">Freelance</option>
                        <option value="Por Proyecto">Por Proyecto</option>
                    </select>
                </div>

                <h3>Descripción del Puesto</h3>
                <div className="campo descripcion">
                    <label>Descripción</label>
                    <input type="hidden" id="x" name="description"></input>
                    <trix-editor input="x"></trix-editor>
                </div>

                <h3>Conocimientos</h3>
                <ul className="lista-conocimientos">
                    <SkillsSelector selectedSkills={selectedSkills} onSelectSkill={handleSelectSkill} />
                </ul>

                <div className="campo centrar-horizontal">
                    <input type="submit" value="Publicar" className="btn btn-azul"/>
                </div>

            </form>
        </main>
    </>
}