import session from '../helpers/session.js'
import { errors } from 'com'
const { SystemError } = errors

export default function deleteOffer(offerUrl) {
    const req = {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${session.token}`,
            'Content-Type': 'application/json'
        }
    }

    return fetch(`${import.meta.env.VITE_URL_API}/offer/${offerUrl}`, req)
        .catch(error => { throw new SystemError(error.message)})
        .then(res => {
            if (!res.ok) {
                return res.json()
                    .catch(error => { throw new SystemError(error.message) })
                    .then(body => { throw new errors[body.error](body.message) })
            }
        })
}