import apiKey from "./apiKey"
const baseUrl = 'https://api.spoonacular.com/recipes'

export const getRecipesForCarousel = (query, dietary_requirements, intolerances) => {
    let apiCall = ''
    query != '' ? apiCall = 'query=' + query : null
    dietary_requirements ? apiCall += `&diet=${dietary_requirements.join(',')}` : null
    intolerances ? apiCall += `&intolerances=${intolerances.join(',')}` : null

    return fetch(`${baseUrl}/complexSearch?${apiCall}&sort=random`, {
        headers:apiKey
    })
        .then(res => res.json())
}

export const getFilteredRecipes = (filters, dietary_requirements, intolerances) => {
    let apiCall = Object.values(filters).join('&')
    dietary_requirements ? apiCall += `&diet=${dietary_requirements.join(',')}` : null
    intolerances ? apiCall += `&intolerances=${intolerances.join(',')}` : null

    return fetch(`${baseUrl}/complexSearch?${apiCall}&sort=random&number=255`, {
        headers:apiKey
    })
        .then(res => res.json())
}