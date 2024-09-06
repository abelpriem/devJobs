import retrieveOffers from '../logic/retrieveOffers.js'
import { errors } from 'com'
const { NotFoundError } = errors

export default async (req, res) => {
    try {
        const offers = await retrieveOffers()
        res.status(200).json(offers)

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