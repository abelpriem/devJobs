import retrieveOneOffer from '../logic/retrieveOneOffer.js'
import { errors } from 'com'
const { NotFoundError } = errors

export default async (req, res) => {
    const { offerUrl } = req.params

    try {
        const { offer, author } = await retrieveOneOffer(offerUrl)
        res.status(200).json({offer, author})

    } catch(error) {
        let status = 500

        if (error instanceof NotFoundError) {
            status = 404
        }
        
        if (error instanceof TypeError) {
            status = 409
        } 

        res.status(status).json({ error: error.constructor.name, message: error.message })
    }
}