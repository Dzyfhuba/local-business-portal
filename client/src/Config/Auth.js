const user_raw = localStorage.getItem('user')
const Auth = {
    getUser: () => {
        if (user_raw === 'undefined') return null
        return JSON.parse(user_raw)
    },
    setUser: (json) => {
        localStorage.setItem('user', JSON.stringify(json))
    }
}

export default Auth