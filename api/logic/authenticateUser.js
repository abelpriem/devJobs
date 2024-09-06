import validator from 'validator'
import bcrypt from 'bcrypt'
import { Usuario } from '../data/models.js'
import { errors } from 'com'
const { SystemError, ContentError, CredentialsError, NotFoundError } = errors

export default async function authenticateUser(email, password) {
    const validateEmail = !validator.isEmpty(email)
    const validateFormat = validator.isEmail(email)
    const validatePassword = !validator.isEmpty(password)

    try {
        if (!validateEmail || !validatePassword) {
            throw new ContentError('Campos vacíos. Por favor, rellene los campos correctamente')
        } else if (!validateFormat) {
            throw new ContentError('Formato email inválido. Revíselo de nuevo')
        }

        const user = await Usuario.findOne({ email }).lean()

        if (!user) {
            throw new NotFoundError('Usuario no encontrado. Inténtelo de nuevo')
        }

        const match = await bcrypt.compare(password, user.password)

        if (match) {
            // const userId = user._id
            return { id: user._id, username: user.name }
        } else {
            throw new CredentialsError('Error de credenciales. Inténtelo de nuevo')
        }
    } catch(error) {
        if (error instanceof NotFoundError || error instanceof ContentError || error instanceof CredentialsError) {
            throw error
        }

        throw new SystemError(error.message)
    }
}