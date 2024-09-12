import { useNavigate } from 'react-router-dom'

export default function Handlebar() {
    const navigate = useNavigate()

    function handleSubmitHandlebar(event) {
        event.preventDefault()
        const offerToSearch = event.target.q.value

        navigate(`/search-offer/${offerToSearch}`)
    }

    return <>
        <div className="buscador px-10">
            <form onSubmit={handleSubmitHandlebar}>
                <input type="text" name="q" className="buscar"></input>
                <input type="submit" value="Buscar"></input>
            </form>
        </div>
    </>
}
