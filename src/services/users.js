import axios from 'axios'
const baseUrl = 'api/users'


/**
 * HTTP GET request to the backend to get all users
 */
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

/**
 * HTTP POST request to the backend to add a new user 
 */
const create = (newObject) => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

/**
 * HTTP DELETE request to the backend to delete a user with the given id
 */
const remove = (id) => {
  return axios.delete(`${baseUrl}/${id}`)
}

/**
 * HTTP PUT request to the backend to edit a user with the given id
 */
const edit = (id, editedEntry) => {
  const request = axios.put(`${baseUrl}/${id}`, editedEntry)
  return request.then(response => response.data)
}

/**
 * Combine all the functions into an object to be exported
 */
const userService = {
  getAll,
  create,
  remove,
  edit
}

export default userService