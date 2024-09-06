import session from '../helpers/session.js'
import { errors } from 'com'
const { SystemError } = errors

// EDIT OFFER
export default function editOffer(offerUrl, updatedOffer) {
    const req = {
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${session.token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ updatedOffer })
    }

    return fetch(`${import.meta.env.VITE_URL_API}/offers/edit/${offerUrl}`, req)
        .catch(error => {throw new SystemError(error.message)})
        .then(res => {
            if (!res.ok) {
                return res.json()
                    .catch(error => {throw new SystemError(error.message)} )
                    .then(body => {throw new errors[body.error](body.message)} )
            }
        })
}