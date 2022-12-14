
type RequestOptions = {
    queryParams?: URLSearchParams
    method?: 'GET' | 'POST'
    body?: object | string
}

export const apiUrl = (lambda: string, queryParams?: URLSearchParams) => {
    let url = `https://f10adraov8.execute-api.us-east-1.amazonaws.com/dev/${lambda}`
    if (queryParams) url += '?' + queryParams.toString()

    return url
}

export const callApi = (lambda: string, options?: RequestOptions) => {
    const {queryParams, body, method} = options || {}
    const url = apiUrl(lambda, queryParams)

    let bodyString = body
    if (typeof bodyString === 'object') {
        bodyString = JSON.stringify(body)
    }

    return fetch(url, {body: bodyString, method}).then((res) => res.json())
}
