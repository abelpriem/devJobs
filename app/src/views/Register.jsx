import { useState } from 'react'
import { Header } from '../components/index.js'
import { registerUser } from '../logic/index.js'

// VIEW - REGISTER
export default function Register() {
    const [search, setSearch] = useState(false)
    const [showError, setShowError] = useState('')
    const [showMessage, setShowMessage] = useState('')

    // REGISTER USER
    async function handleSubmitRegister(event) {
        event.preventDefault()

        setShowError('')
        setShowMessage('')

        const name = event.target.name.value
        const email = event.target.email.value
        const password = event.target.password.value
        const repeatPassword = event.target.repeatPassword.value

        try {
            await registerUser(name, email, password, repeatPassword)
            window.scrollTo({
                top: 0,
                behavior: 'smooth' 
            })

            setShowMessage('Usuario registrado correctamente!')
        } catch(error) {
            window.scrollTo({
                top: 0,
                behavior: 'smooth' 
            })
            
            setShowError(error.message)
        }
    }

    return <>
        <Header search={search}/>

        <div className="site-header contenedor separador">
            <h2>Registrate en devJobs</h2>
            <p className="tagline">¡Comienza a publicar tus ofetas gratis! Solo debes crearte una cuenta</p>
        </div>

        {showError && (
            <div className="error alerta">{showError}</div>
        )}

        {showMessage && (
            <div className="correcto alerta">{showMessage}</div>
        )}
        
        <main className="contenedor">
            <form onSubmit={handleSubmitRegister} className="default-form">
                <div className="campo">
                    <label>Nombre</label>
                    <input type="text" name="name" placeholder="Nombre de usuario" required></input>
                </div>

                <div className="campo">
                    <label>Email</label>
                    <input type="email" name="email" placeholder="Correo electrónico" required></input>
                </div>

                <div className="campo">
                    <label>Contraseña</label>
                    <input type="password" name="password" placeholder="Contraseña" required></input>
                </div>

                <div className="campo">
                    <label>Repetir contraseña</label>
                    <input type="password" name="repeatPassword" placeholder="Repetir contraseña" required></input>
                </div>

                <div className="campo acciones">
                    <a href="/login">Volver a iniciar sesión</a>
                </div>

                <div className="campo centrar-horizontal">
                    <input type="submit" value="Crear cuenta" className="btn btn-azul"/>
                </div>

            </form>
        </main>
    </>
}