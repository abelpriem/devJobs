import session from '../helpers/session.js'
import { errors } from 'com'
const { SystemError } = errors

export default function changeUserPassword(password, newPassword, repeatNewPassword) {
    const req = {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${session.token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password, newPassword, repeatNewPassword })
    }

    return fetch(`${import.meta.env.VITE_URL_API}/users/edit-password`, req)
        .catch(error => { throw new SystemError(error.message) })
        .then(res => {
            if (!res.ok) {
                return res.json()
                    .catch(error => { throw new SystemError(error.message) })
                    .then(body => { throw new errors[body.error](body.message) })
            } 
        })
}