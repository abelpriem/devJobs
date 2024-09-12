import { errors } from 'com'
const { SystemError } = errors

export default function searchOffer(offerSearched) {
    const req = {
        method: 'GET',
        'Content-Type': 'application/json'
    }

    return fetch(`${import.meta.env.VITE_URL_API}/search-offer/${offerSearched}`, req)
        .catch(error => {throw new SystemError(error.message)})
        .then(res => {
            if (!res.ok) {
                return res.json()
                    .catch(error => {throw new SystemError(error.message)})
                    .then(body => {throw new errors[body.error](body.message)})
            }

            return res.json()
                .catch(error => {throw new SystemError(error.message)})
        })
}