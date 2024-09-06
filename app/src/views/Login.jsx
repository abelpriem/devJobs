import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Header } from '../components/index.js'
import { loginUser } from '../logic/index.js'

// VIEW - LOGIN
export default function Login() {
    const [search, setSearch] = useState(false)
    const [showError, setShowError] = useState('')
    const navigate = useNavigate()

    // LOGIN FUNCTION
    async function handleSubmitLogin(event) {
        event.preventDefault()

        setShowError('')

        const email = event.target.email.value
        const password = event.target.password.value

        try {
            await loginUser(email, password)
            navigate('/administracion')
        } catch(error) {
            setShowError(error.message)
        }
    }

    return <>
        <Header search={search}/>

        <div className="site-header contenedor separador">
            <h2>Iniciar sesión</h2>
            <p className="tagline">Introduce tus credentiales para entrar en devJobs</p>
        </div>

        {showError && (
            <div className="error alerta">{showError}</div>
        )}
        
        <main className="contenedor">
            <form onSubmit={handleSubmitLogin} className="default-form">
                <div className="campo">
                    <label>Email</label>
                    <input type="email" name="email" placeholder="Correo electrónico" required></input>
                </div>

                <div className="campo">
                    <label>Contraseña</label>
                    <input type="password" name="password" placeholder="Contraseña" required></input>
                </div>

                <div className="campo acciones">
                    <a href="/register">Registrarse en devJobs</a>
                    <a href="/restrablecer-contraseña">Olvidé mi contraseña</a>
                </div>

                <div className="campo centrar-horizontal">
                    <input type="submit" value="Iniciar sesión" className="btn btn-azul"/>
                </div>
            </form>
        </main>
    </>
}