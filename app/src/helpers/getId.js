export default function getId() {
    const cookies = document.cookie.split('; ');
    const idCookie = cookies.find(cookie => cookie.startsWith('_id='));
    return idCookie ? idCookie.split('=')[1] : null;
}