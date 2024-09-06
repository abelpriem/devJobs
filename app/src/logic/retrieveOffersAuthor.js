import {errors} from 'com'
import session from '../helpers/session.js'
const { SystemError } = errors

// RETRIEVE ALL OFFERS
export default function retrieveOffersAuthor() {
    const req = {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${session.token}`
        }
    }

    return fetch(`${import.meta.env.VITE_URL_API}/offers`, req)
        .catch(error => { throw new SystemError(error.message) })
        .then(res => {
            if (!res.ok) {
                return res.json()
                    .catch(error => {throw new SystemError(error.message)} )
                    .then(body => {throw new errors[body.error](body.message)} )
            }

            return res.json()
                .catch(error => { throw new SystemError(error.message) })
        })
}