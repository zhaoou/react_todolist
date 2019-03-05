
// const api = "https://jsonplaceholder.typicode.com"

const api = "http://localhost:8080"


// Generate a unique token for storing your bookshelf data on the backend server.
// let token = localStorage.token
// if (!token)
//     token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
    'Accept': 'application/json',
}

export const get = (id) =>
     fetch(`${api}/todo/${id}`, { headers })
        .then(res => res.json())

export const getAll = () =>
    fetch(`${api}/todo`, { headers })
        .then(res => res.json())

export const create = (todo) =>
    fetch(`${api}/todo`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(todo)
    }).then(res => res.json())

export const update = (todo) =>
    fetch(`${api}/todo`, {
        method: 'PUT',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(todo)
    }).then(res => res.json())


// export const del = (id) =>
//     fetch(`${api}/todo/delete/${id}`, { headers })
//         .then()

export const del = (id) => {
    fetch(`${api}/todo/delete/${id}`, {
        method: 'DELETE',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        }
    })
}