import axios from 'axios'
const baseUrl = 'api/entries'

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

const edit = (id, editedEntry) => {
  const request = axios.put(`${baseUrl}/${id}`, editedEntry)
  return request.then(response => response.data)
}

const entryService = {
  getAll,
  create,
  remove,
  edit
}

export default entryService