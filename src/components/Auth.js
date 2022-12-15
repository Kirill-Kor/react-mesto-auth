export const BASE_URL = 'https://auth.nomoreparties.co';

export const register = ({ userEmail, userPassword }) => {
    return fetch(`${BASE_URL}/signup`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({email: userEmail, password: userPassword})
    })
        .then(response => response.ok ? response.json() : Promise.reject(`Ошибка ${response.status}`))
}

export const login = ({userEmail, userPassword}) => {
    return fetch(`${BASE_URL}/signin`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({email: userEmail, password: userPassword})
    })
        .then(response => response.ok ? response.json() : Promise.reject(`Ошибка ${response.status}`))
}

export const checkTokenValidity = () => {
    return fetch(`${BASE_URL}/users/me`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization" : `Bearer ${localStorage.getItem('jwt')}`
        },
    })
        .then(response => response.ok ? response.json() : Promise.reject(`Ошибка ${response.status}`))
}