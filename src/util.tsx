import {apiUrl} from './api'

export const getBorderColor = (visible: boolean) => {
    return visible ? '#CCC' : 'transparent'
}

export const getImageDimensions = (src: string) => {
    return new Promise<{width: number; height: number}>((resolve, reject) => {
        const image = new Image()
        image.onload = () => {
            resolve({width: image.width, height: image.height})
        }
        image.onerror = (error) => {
            reject(error)
        }
        image.src = src
    })
}

export const getRandomImage = () => {
    const id = Date.now();
    const params = new URLSearchParams();
    params.set("seed", `${id}`);
    return {src: apiUrl('forrest', params), id}
}
