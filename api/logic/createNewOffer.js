import validator from 'validator'
import { Vacante } from '../data/models.js'
import { errors } from 'com'
const { SystemError, NotFoundError, ContentError } = errors

export default async function createNewOffer(userId, title,company,location,salary,contract,description,selectedSkills) {
    const validateId = validator.isMongoId(userId)
    const validateTitle = !validator.isEmpty(validator.trim(title))
    const validateCompany = !validator.isEmpty(validator.trim(company))
    const validateLocation = !validator.isEmpty(validator.trim(location))
    const validateSalary = !validator.isEmpty(validator.trim(salary))
    const validateContract = !validator.isEmpty(validator.trim(contract))
    const validateDescription = !validator.isEmpty(validator.trim(description))
    const validateSkills = Array.isArray(selectedSkills)
   
    try {
        if(!validateTitle || !validateCompany || !validateLocation || !validateSalary || !validateContract || !validateDescription || !validateSkills) {
            throw new ContentError('No se pueden enviar campos vacíos... Por favor, revíselo de nuevo')
        } else if (!validateId) {
            throw new ContentError('Formato ID inválido. Inténtelo de nuevo')
        }

        const urlTitle = title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '')

        const urlDefine = `${urlTitle}-${Math.random().toString(32).substring(2)}`
        const vacante = await Vacante.create({ title,company,location,salary,contract,description, skills: selectedSkills, url: urlDefine, author: userId})

        await vacante.save()
    } catch(error) {
        if (error instanceof NotFoundError || error instanceof ContentError) {
            throw error
        }

        throw new SystemError(error.message)
    }
}