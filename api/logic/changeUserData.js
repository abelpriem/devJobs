import bcrypt from 'bcrypt'
import { Usuario } from '../data/models.js'
import validator from 'validator'
import { errors } from 'com'
const { SystemError, ContentError, NotFoundError, CredentialsError } = errors

export default async function changeUserData(userId, dataUser) {
    const name = dataUser.name
    const email = dataUser.email
    const password = dataUser.password

    const validateId = validator.isMongoId(userId)
    const validateName = !validator.isEmpty(validator.trim(name))
    const validateEmail = !validator.isEmpty(validator.trim(email))
    const validatePassword = !validator.isEmpty(validator.trim(name))

    try {
        if (!validateId) {
            throw new ContentError('Formato ID inválido. Inténtelo de nuevo')
        } else if (!validateName || !validateEmail || !validatePassword) {
            throw new ContentError('No se permite el envío de campos vacíos ni de espacios en blanco... Vuelva a intentarlo')
        }

        const user = await Usuario.findById(userId)

        if (!user) {
            throw new NotFoundError('Usuario no encontrado. Inténtelo de nuevo')
        }

        const match = await bcrypt.compare(password, user.password)

        if (match) {
            user.name = name
            user.email = email

            await user.save()
        } else {
            throw new CredentialsError('Credentiales incorrectas. Vuelva a intentarlo')
        }
    } catch(error) {
        if (error instanceof ContentError || error instanceof NotFoundError || error instanceof CredentialsError) {
            throw error
        }

        throw new SystemError(error.message)
    }
}