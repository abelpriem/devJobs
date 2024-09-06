import bcrypt from 'bcrypt'
import { Usuario } from '../data/models.js'
import validator from 'validator'
import { errors } from 'com'
const { SystemError, ContentError, NotFoundError, CredentialsError } = errors

export default async function changeUserData(userId, password, newPassword, repeatNewPassword) {
    const validateId = validator.isMongoId(userId)
    const validatePassword = !validator.isEmpty(validator.trim(password))
    const validateNewPassword = !validator.isEmpty(validator.trim(newPassword))
    const validateRepeatNewPassword = !validator.isEmpty(validator.trim(repeatNewPassword))

    try {
        if (!validateId) {
            throw new ContentError('Formato ID inválido. Inténtelo de nuevo')
        } else if (!validatePassword || !validateNewPassword || !validateRepeatNewPassword) {
            throw new ContentError('No se permite el envío de campos vacíos ni de espacios en blanco... Vuelva a intentarlo')
        }

        const user = await Usuario.findById(userId)

        if (!user) {
            throw new NotFoundError('Usuario no encontrado. Inténtelo de nuevo')
        }

        const match = await bcrypt.compare(password, user.password)

        if (match && newPassword === repeatNewPassword) {
            const hash = await bcrypt.hash(newPassword, 5)
            user.password = hash

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