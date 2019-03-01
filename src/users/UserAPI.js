
const api = "https://jsonplaceholder.typicode.com"




// Generate a unique token for storing your bookshelf data on the backend server.
// let token = localStorage.token
// if (!token)
//     token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
    'Accept': 'application/json',
}

export const get = (userId) =>
     fetch(`${api}/users/${userId}`, { headers })
        .then(res => res.json())

export const getAll = () =>
    fetch(`${api}/users`, { headers })
        .then(res => res.json())

export const create = (user) =>
    fetch(`${api}/users/`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ user })
    }).then(res => res.json())
//
// export const search = (query) =>
//     fetch(`${api}/search`, {
//         method: 'POST',
//         headers: {
//             ...headers,
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ query })
//     }).then(res => res.json())
//         .then(data => data.books)
