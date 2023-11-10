const baseUrl = "http://localhost:9000/api/users"

export const getUser = (userId) => {
    return fetch(`${baseUrl}/${userId}`)
    .then(res => res.json())
}

export const saveFavourite = (userId, recipeId) => {
    return fetch(`${baseUrl}/favourite/${userId}/${recipeId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' }
    })
    .then(res => res.json())
}

export const deleteFavourite = (userId, recipeId) => {
    return fetch(`${baseUrl}/favourite/${userId}/${recipeId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    })
    .then(res => res.json())
}

export const addDiet = (userId, diet) => {
    return fetch(`${baseUrl}/diet/${userId}/${diet}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' }
})
.then(res => res.json())
}

export const addIntolerance = (userId, intolerance) => {
    return fetch(`${baseUrl}/intolerance/${userId}/${intolerance}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' }
})
.then(res => res.json())
}

export const removeDiet = (userId, diet) => {
    return fetch(`${baseUrl}/diet/${userId}/${diet}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' }
})
.then(res => res.json())
}

export const removeIntolerance = (userId, intolerance) => {
    return fetch(`${baseUrl}/intolerance/${userId}/${intolerance}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' }
})
.then(res => res.json())
}