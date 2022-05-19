import axios from 'axios'
const baseUrl = 'http://localhost:3001/entries'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject)
  console.log(request)
  return request.then(response => response.data)
}

const remove = (id) => {
  return axios.delete(`${baseUrl}/${id}`)
}

export default {getAll, create, remove}