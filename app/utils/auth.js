
export function getToken() {
    if (typeof window !== 'undefined') {
        return localStorage.getItem('token');
    }
    return null;
}
export function getRole() {
    if (typeof window !== 'undefined') {
        return localStorage.getItem('role');
    }
    return null;
}
