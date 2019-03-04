
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

// export const update = (book, shelf) =>
//     fetch(`${api}/books/${book.id}`, {
//         method: 'PUT',
//         headers: {
//             ...headers,
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ shelf })
//     }).then(res => res.json())
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
