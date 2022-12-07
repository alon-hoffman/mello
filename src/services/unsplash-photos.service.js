import {createApi} from 'unsplash-js'



export const unsplashPhotosService = {
    getPhoto,
    
}

const ACCESS_KEY='BRK6j-FXov7NV0kG6nXHoRbbZaeFvhwO-AgPQFU7cp0'
async function getPhoto() {
    const api=createApi({accessKey:ACCESS_KEY})
     const res=await api.search.getPhotos({query:'locations'})
    //  console.log(`res.response.results = `, res.response.results)
    return res.response.results
   
}

