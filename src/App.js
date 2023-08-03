import { React, useEffect, useState } from 'react'
import { FaUserAlt } from 'react-icons/fa';

import entryService from './services/entries'
import InputForm from './components/InputForm'
import EntryTable from './components/EntryTable'
import Statistics from './components/Statistics'
import TableUtilities from './components/TableUtilities'
import RadioGroup from './components/RadioGroup'
import { getCurrentDate, getInitialYear, geolocationAvailable, devLog, validateEntryInput, validateSignupInput } from './utils/utils'
import {
  sortByFish, sortByLength, sortByWeight, sortByLure, sortByPlace,
  sortByDate, sortByTime, sortByPerson, defaultSort
} from './utils/SortingUtils'
import userService from './services/users'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import SignInForm from './components/SignUpForm'

const App = () => {
  const initialNewValues = {
    newFish: '',
    newLength: '',
    newWeight: '',
    newLure: '',
    newPlace: '',
    newCoordinates: '',
    newDate: getCurrentDate(),
    newTime: '',
    newPerson: '',
  }
  const initialEditValues = {
    editFish: '',
    editLength: '',
    editWeight: '',
    editLure: '',
    editPlace: '',
    editCoordinates: '',
    editDate: '',
    editTime: '',
    editPerson: ''
  }
  const [allEntries, setAllEntries] = useState([])
  const [filteredEntries, setFilteredEntries] = useState([])
  const [newValues, setNewValues] = useState(initialNewValues)
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [editValues, setEditValues] = useState(initialEditValues)
  const [statsAreHidden, setStatsAreHidden] = useState(true)
  const [statsWindowAnimation, setStatsWindowAnimation] = useState(false)
  const [sortingIsHidden, setSortingIsHidden] = useState(true)
  const [radioGroupAnimation, setRadioGroupAnimation] = useState(false)
  const [newUsername, setNewUsername] = useState('') 
  const [newEmail, setNewEmail] = useState('') 
  const [newPassword, setNewPassword] = useState('') 
  const [newPasswordAgain, setNewPasswordAgain] = useState('')
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [privelege, setPrivelege] = useState(3) // 3 = not logged in, 2 = user, 1 = admin
  const [userManagementVisible, setUserManagementVisible] = useState(false)

  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitEditLoading, setSubmitEditLoading] = useState(false);
  const [entriesLoading, setEntriesLoading] = useState(false);

  /**
   * Fetch all entries from the backend and set them to the state when the component is mounted
   */
  useEffect(() => {
    devLog('did mount')
    setEntriesLoading(true)
    entryService
      .getAll()
      .then(response => {
        devLog('promise fulfilled')
        const sortedEntries = defaultSort(response)
        setAllEntries(sortedEntries)
        setStartDate(`${getInitialYear(sortedEntries)}-01-01`)
        setEndDate(`${getInitialYear(sortedEntries)}-12-31`)
      })
      .catch(error => {
        window.alert(error.response.data.error)
        console.error(error)
      })
      .finally(() => {
        setEntriesLoading(false)
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('KalapaivakirjaKayttaja')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      entryService.setToken(user.token)
    }
  }, [])

  /**
   * Filter the entries and set the filtered entries to the state if the user changes the date range
   */
  useEffect(() => {
    setFilteredEntries(filterEntriesByDateRange(allEntries))
    devLog('filtered entries updated')
  }, [startDate, endDate, allEntries])

  /**
   * Displays an error message in the console and in a window alert
   * @param {string} messageStart - The beginning of the error message
   * @returns {function} - A function that takes an error object as a parameter
   */
  const createErrorHandler = messageStart => error => {
    const errorMessage = error.response?.data?.error || error.toString()
    console.error(`${messageStart}${errorMessage}`)
    window.alert(`${messageStart}${errorMessage}`)
    throw error
  }

  /**
   * Sends a new entry to the backend based on the user inputted values in the form
   */
  const addEntry = (event) => {
    event.preventDefault()

    const entryObject = {
      fish: newValues.newFish.trim().toLowerCase(),
      date: newValues.newDate,
      length: newValues.newLength,
      weight: newValues.newWeight,
      lure: newValues.newLure.trim(),
      place: newValues.newPlace.trim(),
      coordinates: newValues.newCoordinates.trim(),
      time: newValues.newTime,
      person: (newValues.newPerson.charAt(0).toUpperCase() + newValues.newPerson.slice(1).toLowerCase()).trim()
    }

    const message = {
      entryObject: entryObject,
      user: user
    }

    // Validate the user inputted values
    const errorMessage = validateEntryInput(entryObject);
    const errorMessageStart = "Uuden saaliin lisäämisessä tapahtui virhe: "
    if (errorMessage) {
      console.error(`${errorMessageStart}${errorMessage}`)
      window.alert(`${errorMessageStart}${errorMessage}`)
      return
    }

    setSubmitLoading(true)
    entryService
      .create(message)
      .then(response => {
        devLog('entry added')
        devLog(response)
        setAllEntries(defaultSort(allEntries.concat(response)))
        // Reset the input fields
        setNewValues(initialNewValues)
        // Reset the geolocation checkbox
        document.getElementById("locationCheckbox").checked = false
      })
      .catch(error => {
        const errorMessage = error.response?.data?.error || error.toString()
        console.error(`${errorMessageStart}${errorMessage}`)
        window.alert(`${errorMessageStart}${errorMessage}`)
      })
      .finally(() => {
        setSubmitLoading(false)
      })
  }

  /**
   * Sends a request to the backend to delete an entry with the given id
   */
  const removeEntry = (id) => {
    return () => {
      const entry = allEntries.find(e => e.id === id)
      if (window.confirm(`Poistetaanko ${entry.fish}, jonka ${entry.person} nappasi ${entry.date}?`)) {
        entryService
          .remove(id, privelege)
          .then(response => {
            devLog('entry removed')
            devLog(response)
            setAllEntries(allEntries.filter(e => e.id !== id))
          })
          .catch(error => {
            const errorMessage = error.response?.data?.error || error.toString()
            const errorMessageStart = "Saaliin poistamisessa tapahtui virhe: "
            console.error(`${errorMessageStart}${errorMessage}`)
            window.alert(`${errorMessageStart}${errorMessage}`)
          })
      }
    }
  }

  /**
   * Sends a request to the backend to edit an entry with the given id
   * and updates the edited entry to the state
   */
  const editEntry = (id) => {
    return () => {
      const editedEntryObject = {
        fish: editValues.editFish.trim(),
        date: editValues.editDate,
        length: editValues.editLength,
        weight: editValues.editWeight,
        lure: editValues.editLure.trim(),
        place: editValues.editPlace.trim(),
        coordinates: editValues.editCoordinates.trim(),
        time: editValues.editTime,
        person: editValues.editPerson.trim()
      }

      // Validate the user inputted values
      const errorMessage = validateEntryInput(editedEntryObject);
      const errorMessageStart = "Saaliin muokkaamisessa tapahtui virhe: "
      if (errorMessage) {
        console.error(`${errorMessageStart}${errorMessage}`)
        window.alert(`${errorMessageStart}${errorMessage}`)
        return Promise.reject(new Error(errorMessage))
      }

      setSubmitEditLoading(true)

      return new Promise((resolve, reject) => {
        entryService
          .edit(id, editedEntryObject, privelege)
          .then(response => {
            devLog('entry edited')
            devLog(response)
            setAllEntries(allEntries.map(entry => entry.id === id ? response : entry))
            resolve(response)
          })
          .catch(error => {
            const errorMessage = error.response?.data?.error || error.toString()
            console.error(`${errorMessageStart}${errorMessage}`)
            window.alert(`${errorMessageStart}${errorMessage}`)
            reject(error)
          })
          .finally(() => {
            setSubmitEditLoading(false)
          })
      })
    }
  }

  /**
     * Sends a new user to the backend based on the user inputted values in the form
     */
  const addUser = (event) => {
    event.preventDefault()

    const userObject = {
      username: newUsername,
      email: newEmail,
      password: newPassword,
      passwordAgain: newPasswordAgain
    }

    // Validate the user inputted values
    const errorMessage = validateSignupInput(userObject);
    const errorMessageStart = "Uuden käyttäjän luomisessa tapahtui virhe: "
    if (errorMessage) {
      console.error(`${errorMessageStart}${errorMessage}`)
      window.alert(`${errorMessageStart}${errorMessage}`)
      return
    }

    userService
      .create(userObject)
      .then(response => {
        devLog('user added')
        devLog(response)
        setNewUsername('')
        setNewEmail('')
        setNewPassword('')
        setNewPasswordAgain('')
      })
      .catch(error => {
        const errorMessage = error.response?.data?.error || error.toString()
        console.error(`${errorMessageStart} ${errorMessage}`)
        window.alert(`${errorMessageStart} ${errorMessage}`)
      })
  }

  /**
   * Sends a login request to the backend based on the user inputted values in the form
   */
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'KalapaivakirjaKayttaja', JSON.stringify(user)
      ) 
      entryService.setToken(user.token)
      setUser(user)
      setPrivelege(user.privilege)
      setUsername('')
      setPassword('')
      toggleUserManagement()
    } catch (exception) {
      window.alert('Virheellinen käyttäjätunnus tai salasana')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('KalapaivakirjaKayttaja')
    setUser(null)
    setPrivelege(3)
  }

  const toggleUserManagement = () => {
    setUserManagementVisible(!userManagementVisible)
  }

  /**
   * Handles the input changes in the input fields of the InputForm component
   */
  const handleNewValuesChange = (event) => {
    setNewValues({ ...newValues, [event.target.name]: event.target.value })
  }

  /**
   * Handles the input changes in the input fields of the EditEntryForm component
   */
  const handleEditValuesChange = (event) => {
    setEditValues({ ...editValues, [event.target.name]: event.target.value })
  }

  /**
   * Handles the changes in the start date input field
   */
  const handleStartDateChange = (date) => {
    setStartDate(date)
  }

  /**
   * Handles the changes in the end date input field
   */
  const handleEndDateChange = (date) => {
    setEndDate(date)
  }

  /**
   * Filters the entries by the date range selected by the user
   * @param {Entry[]} entries - The entries to be filtered
   */
  const filterEntriesByDateRange = (entries) => {
    return entries.filter(entry =>
      entry.date.split('-').join('') >= startDate.split('-').join('') &&
      entry.date.split('-').join('') <= endDate.split('-').join(''))
  }

  /**
   * Initializes the input fields of the EditEntryForm component with the values of the entry
   * that is being edited
   * @param {Entry} entry - The entry that is being edited
   */
  const initializeStateForEdit = (entry) => {
    return () => {
      setEditValues({
        editFish: entry.fish,
        editDate: entry.date,
        editLength: entry.length,
        editWeight: entry.weight,
        editLure: entry.lure === '-' ? '' : entry.lure,
        editPlace: entry.place === '-' ? '' : entry.place,
        editCoordinates: entry.coordinates === '-' ? '' : entry.coordinates,
        editTime: entry.time,
        editPerson: entry.person
      })
    }
  }

  /**
   * Get the geolocation of the user and set the coordinates to the state
   */
  const getGeolocation = () => {
    const success = (position) => {
      devLog(position)
      setNewValues({
        ...newValues, newCoordinates:
          `${position.coords.latitude}, ${position.coords.longitude}`
      })
    }

    function error() {
      window.alert('Sijaintitietojen hakeminen epäonnistui.')
      document.getElementById("locationCheckbox").checked = false;
    }

    const options = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0
    }

    navigator.geolocation.getCurrentPosition(success, error, options)
  }

  /**
   * Set users geolocation to the state if the geolocation is available and the checkbox is checked
   * and remove it if the checkbox is unchecked
   */
  const togglelocationCheckbox = () => {
    if (!geolocationAvailable()) {
      return window.alert('Sijaintitiedot eivät ole saatavilla')
    }
    switch (document.getElementById("locationCheckbox").checked) {
      case true:
        getGeolocation()
        break
      case false:
        setNewValues({ ...newValues, newCoordinates: '' })
        break
      default:
        break
    }
  }

  /**
   * Handle showing and hiding the statistics
   */
  const toggleStatsHidden = () => {
    if (statsWindowAnimation) {
      setStatsWindowAnimation(false)
      // delay the hiding of the stats window to allow the animation to finish
      // TODO: make a better animation
      if (window.matchMedia("(max-width: 768px)").matches) {
        setTimeout(() => { setStatsAreHidden(true) }, 440)
      } else {
        setTimeout(() => { setStatsAreHidden(true) }, 440)
      }
      return
    }
    setStatsAreHidden(false)
    setStatsWindowAnimation(true)
  }

  /**
   * Handle showing and hiding the radio buttons for sorting the entries
   */
  const handleSortButtonClick = (event) => {
    setAllEntries(defaultSort([...allEntries]))
    if (radioGroupAnimation) {
      setRadioGroupAnimation(false)
      setTimeout(() => { setSortingIsHidden(true) }, 250)
      return
    }
    setSortingIsHidden(false)
    setRadioGroupAnimation(true)
  }

  /**
   * Sorts the entries by the given property
   */
  const sortEntries = (event) => {
    // Get the property to sort by from the value of the clicked radio button
    const sort = event.target.value
    switch (sort) {
      case 'FISH':
        setAllEntries(sortByFish([...allEntries]))
        break
      case 'DATE':
        setAllEntries(sortByDate([...allEntries]))
        break
      case 'LENGTH':
        setAllEntries(sortByLength([...allEntries]))
        break
      case 'WEIGHT':
        setAllEntries(sortByWeight([...allEntries]))
        break
      case 'LURE':
        setAllEntries(sortByLure([...allEntries]))
        break
      case 'PLACE':
        setAllEntries(sortByPlace([...allEntries]))
        break
      case 'TIME':
        setAllEntries(sortByTime([...allEntries]))
        break
      case 'PERSON':
        setAllEntries(sortByPerson([...allEntries]))
        break
      default:
        break
    }
  }

  return (
    devLog('render'),
    <>
      <div className="img"></div>
      <div className='content'>
        <div className='userIcon' onClick={toggleUserManagement}><FaUserAlt/></div>
        { userManagementVisible && <div className='userManagement'>
          {!user && <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />}
          {!user && <SignInForm
            username={newUsername}
            email={newEmail}
            password={newPassword}
            passwordAgain={newPasswordAgain}
            handleUsernameChange={({ target }) => setNewUsername(target.value)}
            handleEmailChange={({ target }) => setNewEmail(target.value)}
            handlePasswordChange={({ target }) => setNewPassword(target.value)}
            handlePasswordAgainChange={({ target }) => setNewPasswordAgain(target.value)}
            handleSubmit={addUser}
          />}
          {user && 
          <div className='loggedInContainer'>
            <p>{user.username} kirjautunut sisään</p>
            <button className='logoutButton' onClick={handleLogout}>Kirjaudu ulos</button>
          </div> }
        </div> }
        <div className='topShade-mobile'></div>
        <h1 className='title1'>KALAPÄIVÄKIRJA</h1>
        <h1 className='title1-mobile'>
          —KALA—<br />PÄIVÄKIRJA</h1>
        <div className='newEntryAndStatisticsContainer'>
          <div className='newEntryContainer'>
            <h2 className='title2'>UUSI SAALIS</h2>
            <InputForm
              newValues={newValues}
              entries={allEntries}
              addEntry={addEntry}
              handleChange={handleNewValuesChange}
              togglelocationCheckbox={togglelocationCheckbox}
              loading={submitLoading} />
          </div>
          <div className='statisticsContainer'>
            {!statsAreHidden &&
              <Statistics
                entries={filteredEntries}
                startDate={startDate}
                endDate={endDate}
                 /*statsWindowAnimation={statsWindowAnimation}*/ />}
          </div>
        </div>
        <div className='tableContainer'>
          <TableUtilities
            entries={allEntries}
            handleSortButtonClick={handleSortButtonClick}
            toggleStatsHidden={toggleStatsHidden}
            sortingIsHidden={sortingIsHidden}
            statsAreHidden={statsAreHidden}
            startDate={startDate}
            endDate={endDate}
            handleStartDateChange={handleStartDateChange}
            handleEndDateChange={handleEndDateChange} />
          {!sortingIsHidden && <RadioGroup
            sortEntries={sortEntries}
            radioGroupAnimation={radioGroupAnimation} />
          }
          <EntryTable
            entries={filteredEntries}
            rowsPerPage={50}
            removeEntry={removeEntry}
            editValues={editValues}
            editEntry={editEntry}
            initializeStateForEdit={initializeStateForEdit}
            handleChange={handleEditValuesChange}
            startDate={startDate}
            endDate={endDate}
            entriesLoading={entriesLoading}
            submitEditLoading={submitEditLoading} />
        </div>
        <footer>made with <span id='footerHeart' style={{ color: "#0096e7" }}>&#10084;</span> by Akseli</footer>

      </div>
    </>
  )
}

export default App
