import validator from 'validator'
import fs from 'fs/promises'
import { Vacante } from '../data/models.js'
import { errors } from 'com'
const { NotFoundError, ContentError, SystemError, DuplicityError } = errors

export default async function uploadCv(offerUrl, name, email, originalname, oldPath) {
    const validateUrl = !validator.isEmpty(validator.trim(offerUrl))
    const validateName = !validator.isEmpty(validator.trim(name))
    const validateEmail = validator.isEmail(validator.trim(email))
    const validateFileName = !validator.isEmpty(validator.trim(originalname))
    const validateOldPath = !validator.isEmpty(validator.trim(oldPath))

    let renameCompleted = false
    let newFileName = null

    try {
        if (!validateEmail) {
            throw new ContentError('Formato de email inválido. Inténtelo de nuevo')
        } else if (!validateUrl || !validateName || !validateFileName || !validateOldPath) {
            throw new ContentError('No se pueden enviar campos vacíos... Por favor, revíselo de nuevo')
        }

        const offerToAdd = await Vacante.findOne({ url: { $in: offerUrl } })

        if (!offerToAdd) {
            throw new NotFoundError('Oferta no encontrada. Inténtelo de nuevo')
        }

        if (!offerToAdd.candidates.some(candidate => candidate.email === email)) {
            newFileName = `${originalname}`

            await fs.rename(oldPath, `./uploads/curriculums/${newFileName}`)
            renameCompleted = true

            const newCandidate = { name, email, cv: newFileName }
            offerToAdd.candidates.push(newCandidate)

            await offerToAdd.save()
        } else {
            await fs.unlink(oldPath)
            throw new DuplicityError('Ya está inscrito en la oferta')
        }

    } catch (error) {
        if (error instanceof NotFoundError || error instanceof ContentError || error instanceof DuplicityError) {
            throw error
        }

        throw new SystemError(error.message)
    }
}
