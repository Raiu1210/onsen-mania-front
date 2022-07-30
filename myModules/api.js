import axios from 'axios'

// dev
export let baseURL = 'http://localhost:8000'

// prod
// let baseURL = 'http://localhost:8000'

export const axiosInstance = axios.create({
  baseURL: baseURL
})

// create instance with jwt token
export function createInstanceWithJWT(jwt) {
  const instance = axios.create({baseURL: baseURL})
  instance.interceptors.request.use(config => {
    config.headers = {
      'Authorization' :'Bearer ' + jwt
    }
    return config
  })

  console.log("hey jwt instance is created")
  return instance
}
