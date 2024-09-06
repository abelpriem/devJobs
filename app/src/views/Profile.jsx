import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Header } from '../components/index.js'
import { retrieveUser, changeUserData, changeUserPassword } from '../logic/index.js'

export default function Profile() {
    const [search, setSearch] = useState(false)
    const [user, setUser] = useState('')
    const [showMessage, setShowMessage] = useState('')
    const [showError, setShowError] = useState('')

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')

    const navigate = useNavigate()

    // RETRIEVE USER
    useEffect(() => {
        async function fetchUser() {
            try {
                const userInfo = await retrieveUser()
                setUser(userInfo)
                setName(userInfo.name)
                setEmail(userInfo.email)
            } catch(error) {
                navigate('/404')
            }
        }

        fetchUser()
    }, [navigate])

    // CHANGE DATA INFO
    async function handleSubmitChangeData(event) {
        event.preventDefault()

        setShowMessage('')
        setShowError('')

        const password = event.target.password.value
        setName(event.target.name.value)
        setEmail(event.target.email.value)

        const dataUser = {
            name,
            email,
            password
        }

        try {
            await changeUserData(dataUser)
            setUser(prevUser => ({
                ...prevUser,
                name: dataUser.name,
                email: dataUser.email
            }))
            
            window.scrollTo({
                top: 0,
                behavior: 'smooth' 
            })
            setShowMessage('Datos de usuario modificados correctamente!')
        } catch(error) {
            window.scrollTo({
                top: 0,
                behavior: 'smooth' 
            })
            setShowError(error.message)
        }
    }

    // CHANGE PASSWORD
    async function handleSubmitChangePassword(event) {
        event.preventDefault()

        setShowMessage('')
        setShowError('')

        const password = event.target.password.value
        const newPassword = event.target.newPassword.value
        const repeatNewPassword = event.target.repeatNewPassword.value

        try {
            await changeUserPassword(password, newPassword, repeatNewPassword)
            window.scrollTo({
                top: 0,
                behavior: 'smooth' 
              })

            setShowMessage('Contraseña cambiada correctamente!')
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
            <h2>{`Editar perfil: ${user.name}`}</h2>
            <p className="tagline">Modifica aquí tus datos de perfil</p>
        </div>


        {showError && (
                <div className="error alerta">{showError}</div>
            )}

        {showMessage && (
            <div className="correcto alerta">{showMessage}</div>
        )}

        <form onSubmit={handleSubmitChangeData} className="default-form">

            <h2 className="py-20">Información de usuario</h2>

            <div className="campo">
                <label>Nombre</label>
                <input type="text" name="nombre" placeholder={user.name} value={name} onChange={(e) => { setName(e.target.value)} } required></input>
            </div>

            <div className="campo">
                <label>Email</label>
                <input type="email" name="email" placeholder={user.email} value={email} onChange={(e) => { setEmail(e.target.value)} } required></input>
            </div>

            <div className="campo">
                <label>Contraseña</label>
                <input type="password" name="password" placeholder="**********" required></input>
            </div>

            <div className="campo justify-center">
                <input type="submit" className="btn btn-azul" value="Guardar cambios"></input>
            </div>
        </form>

        <form onSubmit={handleSubmitChangePassword} className="default-form">
            <h2 className="mt-20 py-20">Cambio de contraseña</h2>

            <div className="campo">
                <label>Contraseña</label>
                <input type="password" name="password" placeholder="**********" required></input>
            </div>

            <div className="campo">
                <label>Nueva contraseña</label>
                <input type="password" name="newPassword" placeholder="**********" required></input>
            </div>

            <div className="campo">
                <label>Repetir nueva contraseña</label>
                <input type="password" name="repeatNewPassword" placeholder="**********" required></input>
            </div>

            <div className="campo justify-center">
                <input type="submit" className="btn btn-azul" value="Cambiar contraseña"></input>
            </div>
        </form>
    </>
}