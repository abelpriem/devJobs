import { errors } from 'com'
const { SystemError } = errors

export default function registerUser(name, email, password, repeatPassword) {
    const req = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password, repeatPassword })
    }

    return fetch(`${import.meta.env.VITE_URL_API}/users/create`, req)
        .catch(error => { throw new SystemError(error.message) })
        .then(res => {
            if (!res.ok) {
                return res.json()
                    .catch(error => { throw new SystemError(error.message)} )
                    .then(body => { throw new errors[body.error](body.message)} )
            }
        })
}