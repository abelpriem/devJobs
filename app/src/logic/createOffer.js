import session from '../helpers/session.js'
import { errors } from 'com'
const { SystemError } = errors

// CREATE NEW OFFER
export default function createOffer(title,company,location,salary,contract,description,selectedSkills) {
    const req = {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${session.token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ title,company,location,salary,contract,description,selectedSkills })
    }

    return fetch(`${import.meta.env.VITE_URL_API}/offers/create`, req)
        .catch(error => { throw new SystemError(error.message) })
        .then(res => {
            if (!res.ok) {
                return res.json()
                    .catch(error => {throw new SystemError(error.message)} )
                    .then(body => {throw new errors[body.error](body.message)} )
            }
        })
}