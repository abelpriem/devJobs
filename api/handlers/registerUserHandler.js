import registerUser from '../logic/registerUser.js'
import { errors } from 'com'
const { ContentError, CredentialsError, DuplicityError } = errors

export default async (req, res) => {
    const { name, email, password, repeatPassword } = req.body

    try {
        await registerUser(name, email, password, repeatPassword)
        res.status(201).send()
    } catch(error)  {
        let status = 500

        if (error instanceof CredentialsError) {
            status = 406
        }

        if (error instanceof ContentError || error instanceof DuplicityError || error instanceof TypeError) {
            status = 409
        }

        res.status(status).json({ error: error.constructor.name, message: error.message })
    }
}