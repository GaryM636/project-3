class AuthService {
    login(token) {
        localStorage.setItem('token', token);
        window.location.assign('/')
    }
}


export default new AuthService();