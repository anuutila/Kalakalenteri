import { React, useEffect, useState } from 'react'

import entryService from './services/entries'
import InputForm from './components/InputForm'
import EntryTable from './components/EntryTable'
import Statistics from './components/Statistics'
import TableUtilities from './components/TableUtilities'
import RadioGroup from './components/RadioGroup'
import { getCurrentDate, getInitialYear, geolocationAvailable } from './utils/helpers'
import {
  sortByFish, sortByLength, sortByWeight, sortByLure, sortByPlace,
  sortByDate, sortByTime, sortByPerson, defaultSort
} from './utils/SortingUtils'

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

  /**
   * Fetch all entries from the backend and set them to the state when the component is mounted
   */
  useEffect(() => {
    console.log('did mount')

    entryService
      .getAll()
      .then(response => {
        console.log('promise fulfilled')
        const sortedEntries = defaultSort(response)
        setAllEntries(sortedEntries)
        setStartDate(`${getInitialYear(sortedEntries)}-01-01`)
        setEndDate(`${getInitialYear(sortedEntries)}-12-31`)
      })
      .catch(error => {
        console.log('fail')
      })
  }, [])

  useEffect(() => {
    setFilteredEntries(filterEntriesByDateRange(allEntries))
    console.log('filtered entries updated')
  }, [startDate, endDate, allEntries])

  /**
   * Sends a new entry to the backend based on the values in the state
   */
  const addEntry = (event) => {
    event.preventDefault()

    // Frontend input validation
    if (!newValues.newFish || !newValues.newDate || !newValues.newPerson) {
      return window.alert('kalalaji, päivämäärä tai saajan nimi puuttuu')
    }

    const entryObject = {
      fish: newValues.newFish,
      date: newValues.newDate,
      length: newValues.newLength,
      weight: newValues.newWeight,
      lure: newValues.newLure,
      place: newValues.newPlace,
      coordinates: newValues.newCoordinates,
      time: newValues.newTime,
      person: newValues.newPerson
    }

    entryService
      .create(entryObject)
      .then(response => {
        console.log('entry added')
        setAllEntries(defaultSort(allEntries.concat(response)))
        // Reset the input fields
        setNewValues(initialNewValues)
        // Reset the geolocation checkbox
        document.getElementById("locationCheckbox").checked = false;
      })
      .catch(error => {
        console.log('fail')
      })
  }

  /**
   * Sends a request to the backend to delete an entry with the given id
   */
  const removeEntry = (id) => {
    return () => {
      const entry = allEntries.find(e => e.id === id)
      // Ask for confirmation before deleting
      if (window.confirm(`Poistetaanko ${entry.fish}, jonka ${entry.person} nappasi ${entry.date}?`)) {
        entryService
          .remove(id)
          .then(response => {
            console.log('entry removed')
            setAllEntries(allEntries.filter(e => e.id !== id))
          })
          .catch(error => {
            console.log(error)
            alert("Poisto epäonnistui.")
          })
      }

    }
  }

  /**
   * Sends a request to the backend to edit an entry with the given id
   * and sets the edited entry to the state
   */
  const editEntry = (id) => {
    return () => {
      const editedEntry = {
        fish: editValues.editFish,
        date: editValues.editDate,
        length: editValues.editLength,
        weight: editValues.editWeight,
        lure: editValues.editLure,
        place: editValues.editPlace,
        coordinates: editValues.editCoordinates,
        time: editValues.editTime,
        person: editValues.editPerson
      }

      entryService
        .edit(id, editedEntry)
        .then(response => {
          console.log('entry edited')
          setAllEntries(allEntries.map(entry => entry.id === id ? response : entry))
        })
        .catch(error => {
          console.log(error)
          // Show an error message from the backend if the edit fails
          if (error.response) {
            const errorMessage = error.response.data.error
            console.log(errorMessage)
            alert(`Muokkaus epäonnistui\n${errorMessage}`)
          }
        })
    }
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
      console.log(position)
      setNewValues({
        ...newValues, newCoordinates:
          `${position.coords.latitude}, ${position.coords.longitude}`
      })
    }

    function error() {
      alert('Sijaintitietojen hakeminen epäonnistui.')
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
   * TODO: comment
   */
  const toggleStatsHidden = () => {
    if (statsWindowAnimation) {
      setStatsWindowAnimation(false)
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
   * TODO: comment, tarkista toiminta
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
      console.log('render'),
      <>
        <div className="img"></div>
        <div className='content'>
          <div className='topShade'></div>
          <div className='topShade2'></div>
          <h1 className='title1'>KALAPÄIVÄKIRJA</h1>
          <h1 className='title1-mobile'>
          —KALA—<br />PÄIVÄKIRJA
          </h1>
          <div className='newEntryAndStatisticsContainer'>
            <div className='newEntryContainer'>
              <h2 className='title2'>UUSI SAALIS</h2>
              <InputForm
                newValues={newValues}
                entries={allEntries}
                addEntry={addEntry}
                handleChange={handleNewValuesChange}
                togglelocationCheckbox={togglelocationCheckbox} />
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
              handleEndDateChange={handleEndDateChange}/> 
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
              endDate={endDate} /> 
          </div>
          <footer>made with <span id='footerHeart' style={{ color: "#0096e7" }}>&#10084;</span> by Akseli</footer>

        </div>
      </>
    )
  }

  export default App
