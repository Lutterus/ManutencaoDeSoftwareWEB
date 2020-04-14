import axios from 'axios'

export default () => {
  return axios.create({
    baseURL: (process.env.NODE_ENV === 'production') ? `` : `http://localhost:3000/`,
    withCredentials: true
  })
}