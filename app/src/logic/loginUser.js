import session from '../helpers/session.js'
import { errors } from 'com'
const { SystemError } = errors

export default function loginUser(email, password) {
    const req = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    }

    return fetch(`${import.meta.env.VITE_URL_API}/users/auth`, req)
        .catch(error => { throw new SystemError(error.message) })
        .then(res => {
            if (!res.ok) {
                return res.json()
                    .catch(error => { throw new SystemError(error.message)} )
                    .then(body => { throw new errors[body.error](body.message)} )
            }

            return res.json()
                .catch(error => { throw new SystemError(error.message) })
                .then(res => {
                    session.sessionUserId = res.userId
                    session.token = res.token
                    session.username = res.username
                })
        })
}