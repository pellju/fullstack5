import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

let token = null

const setToken = (userToken) => {
  token = `bearer ${userToken}`
}

const addBlog = async (newBlog) => {
  const requiredHeaders =  {headers: {Authorization: token}}
  const response = await axios.post(baseUrl, newBlog, requiredHeaders)
  return response.data
}

export default { getAll, setToken, addBlog }