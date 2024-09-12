import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { retrieveOneOffer, editOffer } from '../logic/index.js'
import { Header, SkillsSelector } from '../components/index.js'

// VIEW - EDIT OFFER
export default function Edit() {
    const [search, setSearch] = useState(false)
    const [offer, setOffer] = useState([])
    const { offerUrl } = useParams()

    console.log(offer)

    const navigate = useNavigate()

    const [title, setTitle] = useState('')
    const [company, setCompany] = useState('')
    const [location, setLocation] = useState('')
    const [salary, setSalary] = useState('')
    const [contract, setContract] = useState('')
    const [selectedSkills, setSelectedSkills] = useState([])

    // RETRIEVE OFFER SELECTED
    useEffect(() => {
        async function fetchOffer() {            
            try {
                const selectedOffer = await retrieveOneOffer(offerUrl)
                setOffer(selectedOffer.offer)
                setTitle(selectedOffer.title)
                setCompany(selectedOffer.company)
                setLocation(selectedOffer.location)
                setSalary(selectedOffer.salary)
                setContract(selectedOffer.contract)
            } catch(error) {
                navigate('/404')
            } 
        }

        fetchOffer()
    }, [offerUrl, navigate])

    // UPDATE SELECTED SKILLS 
    useEffect(() => {
        if (offer && offer.skills) {
            setSelectedSkills(offer.skills)
        }
    }, [offer])

    // TOGGLE SKILLS
    function handleSelectSkill(skill) {
        setSelectedSkills(prevSkills => prevSkills.includes(skill)
                ? prevSkills.filter(s => s !== skill) 
                : [...prevSkills, skill] 
        )
    }

    // VALUES CHANGED - Title
    function handleTitleChange(event) {
        setTitle(event.target.value)
    }

    // VALUES CHANGED - Company
    function handleCompanyChange(event) {
        setCompany(event.target.value)
    }

    // VALUES CHANGED - Location
    function handleLocationChange(event) {
        setLocation(event.target.value)
    }

    // VALUES CHANGED - Salary
    function handleSalaryChange(event) {
        setSalary(event.target.value)
    }

    // VALUES CHANGED - Contract
    function handleContractChange(event) {
        setContract(event.target.value)
    }

    // EDIT & SAVE CHANGES
    function handleSubmitEdit(event) {
        event. preventDefault()

        const updatedOffer = {
            title,
            company,
            location,
            salary,
            contract,
            description: event.target.x.value,
            skills: selectedSkills
        }

        try {
            editOffer(offerUrl, updatedOffer)
            navigate(`/vacantes/${offerUrl}`)
        } catch(error) {
            navigate('/404')
        }
    } 


    return <>
        <Header search={search}/>

        <div className="site-header contenedor separador">
            <h2>Editar Oferta - {offer.title}</h2>
        </div>

        <main className="contenedor">
            <form onSubmit={handleSubmitEdit} className="default-form">
                <h3>Información General</h3>

                <div className="campo">
                    <label>Titulo</label>
                    <input type="text" name="title" placeholder={offer.title} value={title} onChange={handleTitleChange} required></input>
                </div>

                <div className="campo">
                    <label>Empresa</label>
                    <input type="text" name="company" placeholder={offer.company} value={company} onChange={handleCompanyChange} required></input>
                </div>

                <div className="campo">
                    <label>Ubicación</label>
                    <input type="text" name="location" placeholder={offer.location} value={location} onChange={handleLocationChange} required></input>
                </div>

                <div className="campo">
                    <label>Salario (EUR)</label>
                    <input type="text" name="salary" placeholder={offer.salary} value={salary} onChange={handleSalaryChange} required></input>
                </div>

                <div className="campo">
                    <label>Contrato</label>
                    <select name="contract" value={contract} onChange={handleContractChange}>
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
                    <input type="hidden" id="x" name="description" ></input>
                    <trix-editor input="x" dangerouslySetInnerHTML={{ __html: offer.description }}></trix-editor>
                </div>

                <h3>Conocimientos</h3>
                <ul className="lista-conocimientos">
                    <SkillsSelector selectedSkills={selectedSkills} onSelectSkill={handleSelectSkill} />
                </ul>

                <div className="campo centrar-horizontal">
                    <input type="submit" value="Guardar cambios" className="btn btn-azul"/>
                </div>

            </form>
        </main>
    </>
}