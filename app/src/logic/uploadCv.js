import { errors } from 'com'
const { SystemError } = errors

export default function uploadCv(offerUrl, name, email, cv) {
    const formData = new FormData()
    formData.append('cv', cv)
    formData.append('name', name)
    formData.append('email', email)

    const req = {
        method: 'POST',
        body: formData
    }

    return fetch(`${import.meta.env.VITE_URL_API}/upload/cv/${offerUrl}`, req)
        .catch(error => { throw new SystemError(error.message) })
        .then(res => {
            if (!res.ok) {
                return res.json()
                    .catch(error => { throw new SystemError(error.message) })
                    .then(body => { throw new errors[body.error](body.message) })
            }
        })
}