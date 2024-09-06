import { errors } from 'com'
const { SystemError } = errors

// RETRIEVE AN OFFER
export default function retrieveOneOffer(offerUrl) {
    const req = {
        method: 'GET'
    }

    return fetch(`${import.meta.env.VITE_URL_API}/offers/${offerUrl}`, req)
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