export default function getToken() {
    const cookies = document.cookie.split('; ')
    const tokenCookie = cookies.find(cookie => cookie.startsWith('_token='))
    return tokenCookie ? tokenCookie.split('=')[1] : null
}