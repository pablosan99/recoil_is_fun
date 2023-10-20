
type RequestOptions = {
    queryParams?: URLSearchParams
    method?: 'GET' | 'POST'
    body?: object | string
}

export const apiUrl = (category: string, queryParams?: URLSearchParams) => {
    let url = `https://api.api-ninjas.com/v1/randomimage?category=${category}`
    return url
}

export const callApi = async (category: string, options?: RequestOptions) => {
    const {queryParams, body, method} = options || {}
    const url = apiUrl(category, queryParams)

    let bodyString = body
    if (typeof bodyString === 'object') {
        bodyString = JSON.stringify(body)
    }

    return fetch(url, {body: bodyString, method}).then((res) => res.json())
}
