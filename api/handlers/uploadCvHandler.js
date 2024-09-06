import uploadCv from '../logic/uploadCv.js'
import { errors } from 'com'
const { NotFoundError, ContentError, DuplicityError } = errors

export default async (req, res) => {
    const { name, email } = req.body
    const { offerUrl } = req.params

    const cv = req.file
    const { originalname, path } = cv
    const oldPath = path

    try {
        await uploadCv(offerUrl, name, email, originalname, oldPath)
        res.status(200).send()
    } catch(error) {
        let status = 500

        if (error instanceof NotFoundError) {
            status = 404
        }

        if (error instanceof ContentError || error instanceof TypeError || error instanceof DuplicityError) {
            status = 409
        }

        res.status(status).json({ error: error.constructor.name, message: error.message })
    }
}