import axios from 'axios'
const baseUrl = 'api/entries'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

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
const create = (message) => {
  const config = {
    headers: { Authorization: token },
  }
  const request = axios.post(baseUrl, message, config)
  return request.then(response => response.data)
}

/**
 * HTTP DELETE request to the backend to delete an entry with the given id
 */
const remove = (id, userPrivilege) => {
  const config = {
    headers: { Authorization: token },
  }
  return axios.delete(`${baseUrl}/${id}?userPrivilege=${userPrivilege}`, config)
}

/**
 * HTTP PUT request to the backend to edit an entry with the given id
 */
const edit = (id, editedEntry, userPrivilege) => {
  const config = {
    headers: { Authorization: token },
  }
  const request = axios.put(`${baseUrl}/${id}?userPrivilege=${userPrivilege}`, editedEntry, config)
  return request.then(response => response.data)
}

/**
 * Combine all the functions into an object to be exported
 */
const entryService = {
  getAll,
  create,
  remove,
  edit,
  setToken 
}

export default entryService