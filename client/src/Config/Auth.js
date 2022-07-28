const user_raw = localStorage.getItem('user')
const Auth = {
    getUser: () => {
        if (user_raw === 'undefined') return null
        return JSON.parse(user_raw)
    },
    setUser: (json) => {
        localStorage.setItem('user', JSON.stringify(json))
    },
    setToken: (token) => {
        localStorage.setItem('token', token)
    },
    getToken: () => {
        const token = localStorage.getItem('token')
        return token
        
    }
}

export default Auth