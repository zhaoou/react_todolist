

const api = "http://localhost:8080"


const headers = {
    'Accept': 'application/json',
}

export const get = (id) =>
     fetch(`${api}/todo/${id}`, { headers })
        .then(res => res.json())

export const getAll = (email) =>
    fetch(`${api}/todo?user_email=${email}`, { headers })
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


export const update = (todo) => {
    console.log(">>>",todo);
    fetch(`${api}/todo/${todo.id}`, {
        method: 'PUT',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(todo)
    }).then(res => res.json())
}


export const remove = (id) => {
    fetch(`${api}/todo/delete/${id}`, {
        method: 'DELETE',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        }
    })
}
