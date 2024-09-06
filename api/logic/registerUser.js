import validator from 'validator'
import bcrypt from 'bcrypt'
import { Usuario } from '../data/models.js'
import { errors } from 'com'
const { SystemError, ContentError, DuplicityError, CredentialsError } = errors

export default async function registerUser(name, email, password, repeatPassword) {
    const validateName = !validator.isEmpty(name)
    const validateEmail = !validator.isEmpty(email) 
    const validateFormatEmail = validator.isEmail(email)
    const validatePassword = !validator.isEmpty(password)
    const validateRepeatPassword = !validator.isEmpty(repeatPassword)

    try {
        if (!validateFormatEmail) {
            throw new ContentError('Formato de email inválido. Por favor, vuelva a intentarlo')
        } else if (!validateName || !validateEmail || !validatePassword || !validateRepeatPassword) {
            throw new ContentError('Campos vacíos. Por favor, reviselos y vuelva a enviarlos')
        }  

        if (password === repeatPassword) {
            const hash = await bcrypt.hash(password, 5)
            const user = await Usuario.create({ name, email, password: hash })

            await user.save()            
        } else {
            throw new CredentialsError('La contraseña y su repetición han de ser iguales... Inténtelo de nuevo')
        }
    } catch(error) {
        if (error.code === 11000) {
            throw new DuplicityError('Usuario ya registrado. Inténtelo de nuevo')
        } 
        
        if (error instanceof ContentError || error instanceof CredentialsError) {
            throw error
        }

        throw new SystemError(error.message)
    }
}