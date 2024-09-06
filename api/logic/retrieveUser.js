import validator from 'validator'
import { Usuario } from '../data/models.js'
import { errors } from 'com'
const { SystemError, NotFoundError, ContentError } = errors

export default async function restrieveUser(userId) {
    const validateId = validator.isMongoId(userId)

    try {
        if (!validateId) {
            throw new ContentError('Formato ID inválido. Inténtelo de nuevo')
        }

        const user = await Usuario.findById(userId).lean()

        if (!user) {
            throw new NotFoundError('Usuario no encontrado. Por favor, inténtelo de nuevo')
        }

        const finalUser = {
            name: user.name,
            email: user.email,
            id: user._id
        }

        return finalUser
    } catch(error) {
        if (error instanceof NotFoundError || error instanceof ContentError) {
            throw error
        }

        throw new SystemError(error.message)
    }
}