const Auth = {
    getUser: () => {
        const user_raw = localStorage.getItem('user')
        if (user_raw === 'undefined') return null
        return JSON.parse(user_raw)
    },
    setUser: (json) => {
        localStorage.setItem('user', JSON.stringify(json))
    },
    getRole: () => {
        const user_raw = localStorage.getItem('user')
        if (!user_raw) return null
        return JSON.parse(user_raw).role
    },
    setToken: (token) => {
        localStorage.setItem('token', token)
    },
    getToken: () => {
        const token = localStorage.getItem('token')
        if (token === 'undefined') return null
        return token

    },
    reset: () => {
        localStorage.clear()
        localStorage.setItem('user', JSON.stringify({ user: 'guest' }))
    }
}

export default Auth