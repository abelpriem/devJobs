import searchOffer from '../logic/searchOffer.js'
import { errors } from 'com'
const { NotFoundError, ContentError } = errors

export default async (req, res) => {
    const { offerSearched } = req.params

    try {
        const searched = await searchOffer(offerSearched)
        res.status(200).json(searched)
    } catch(error) {
        let status = 500

        if (error instanceof NotFoundError) {
            status = 404
        }

        if (error instanceof ContentError || error instanceof TypeError) {
            status = 409
        }

        res.status(status).json({ error: error.constructor.name, message: error.message })
    }
}