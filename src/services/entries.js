import axios from 'axios'
const baseUrl = 'api/entries'


/**
 * HTTP GET request to the backend to get all entries
 */
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

/**
 * HTTP POST request to the backend to add a new entry 
 */
const create = (newObject) => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

/**
 * HTTP DELETE request to the backend to delete an entry with the given id
 */
const remove = (id) => {
  return axios.delete(`${baseUrl}/${id}`)
}

/**
 * HTTP PUT request to the backend to edit an entry with the given id
 */
const edit = (id, editedEntry) => {
  const request = axios.put(`${baseUrl}/${id}`, editedEntry)
  return request.then(response => response.data)
}

/**
 * Combine all the functions into an object to be exported
 */
const entryService = {
  getAll,
  create,
  remove,
  edit
}

export default entryService