import { React, useEffect, useState } from 'react';

import entryService from './services/entries'
import InputForm from './components/InputForm';
import EntryTable from './components/EntryTable';
import Statistics from './components/Statistics';
import StatsAndSortButtons from './components/StatsAndSortButtons';
import RadioGroup from './components/RadioGroup';
import { getDefaultDate, geolocationAvailable } from './utils/helpers';
import {
  sortByFish, sortByLength, sortByWeight, sortByLure, sortByPlace,
  sortByDate, sortByTime, sortByPerson, defaultSort
} from './utils/SortingUtils';

const App = () => {
  const initialNewValues = {
    newFish: '',
    newLength: '',
    newWeight: '',
    newLure: '',
    newPlace: '',
    newCoordinates: '',
    newDate: getDefaultDate(),
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
  const [entries, setEntries] = useState([])
  const [newValues, setNewValues] = useState(initialNewValues)
  const [editValues, setEditValues] = useState(initialEditValues)
  const [statsAreHidden, setStatsAreHidden] = useState(true)
  const [statsWindowAnimation, setStatsWindowAnimation] = useState(false)
  const [sortingIsHidden, setSortingIsHidden] = useState(true)
  const [radioGroupAnimation, setRadioGroupAnimation] = useState(false)

  useEffect(() => {
    console.log('did mount')
    
    entryService
      .getAll()
      .then(response => {
        console.log('promise fulfilled')
        setEntries(defaultSort(response))
      })
      .catch(error => {
        console.log('fail')
      })
  }, [])

  const addEntry = (event) => {
    event.preventDefault()

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
        setEntries(defaultSort(entries.concat(response)))
        setNewValues(initialNewValues)
        document.getElementById("locationCheckbox").checked = false;
      })
      .catch(error => {
        console.log('fail')
      })
  }

  const removeEntry = (id) => {
    return () => {
      const entry = entries.find(e => e.id === id)

      if (window.confirm(`Poistetaanko ${entry.fish}, jonka ${entry.person} nappasi ${entry.date}?`)) {
        entryService
          .remove(id)
          .then(response => {
            console.log('entry removed')
            setEntries(entries.filter(e => e.id !== id))
          })
          .catch(error => {
            console.log(error)
            alert("Poisto epäonnistui.")
          })
      }

    }
  }

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
          setEntries(entries.map(entry => entry.id === id ? response : entry))
        })
        .catch(error => {
          console.log(error)
          if (error.response) {
            const errorMessage = error.response.data.error
            console.log(errorMessage)
            alert(`Muokkaus epäonnistui\n${errorMessage}`)
          }
        })
    }
  }

  const handleNewValuesChange = (event) => {
    setNewValues({ ...newValues, [event.target.name]: event.target.value })
  }
  
  const handleEditValuesChange = (event) => {
    setEditValues({ ...editValues, [event.target.name]: event.target.value })
  }

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

  const getGeolocation = () => {
    const success = (position) => {
      console.log(position)
      setNewValues({ ...newValues, newCoordinates: 
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

  const handleSortButtonClick = (event) => {
    setEntries(defaultSort(entries))
    if (radioGroupAnimation) {
      setRadioGroupAnimation(false)
      setTimeout(() => { setSortingIsHidden(true) }, 250)
      return
    }
    setSortingIsHidden(false)
    setRadioGroupAnimation(true)
  }

  const sortEntries = (event) => {
    const sort = event.target.value
    switch (sort) {
      case 'FISH':
        setEntries(sortByFish([...entries]))
        break
      case 'DATE':
        setEntries(sortByDate([...entries]))
        break
      case 'LENGTH':
        setEntries(sortByLength([...entries]))
        break
      case 'WEIGHT':
        setEntries(sortByWeight([...entries]))
        break
      case 'LURE':
        setEntries(sortByLure([...entries]))
        break
      case 'PLACE':
        setEntries(sortByPlace([...entries]))
        break
      case 'TIME':
        setEntries(sortByTime([...entries]))
        break
      case 'PERSON':
        setEntries(sortByPerson([...entries]))
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
          <h1 className='title1'>KALAPÄIVÄKIRJA</h1>
          <h1 className='title1-mobile'>
            KALA<br/>PÄIVÄKIRJA
          </h1>
          <div className='newEntryAndStatisticsContainer'>
            <div className='newEntryContainer'>
              <h2 className='title2'>UUSI SAALIS</h2>
              <InputForm
                newValues={newValues}
                entries={entries}
                addEntry={addEntry}
                handleChange={handleNewValuesChange}
                togglelocationCheckbox={togglelocationCheckbox} />
            </div>
            <div className='statisticsContainer' id='statisticsContainer'>
              {!statsAreHidden &&
                <Statistics entries={entries} /*statsWindowAnimation={statsWindowAnimation}*/ />}
            </div>
          </div>
          <div className='tableContainer'>
            <StatsAndSortButtons
              handleSortButtonClick={handleSortButtonClick}
              toggleStatsHidden={toggleStatsHidden}
              sortingIsHidden={sortingIsHidden}
              statsAreHidden={statsAreHidden} />
            {!sortingIsHidden && <RadioGroup
              sortEntries={sortEntries}
              radioGroupAnimation={radioGroupAnimation} />}
            <EntryTable
              entries={entries}
              removeEntry={removeEntry}
              editValues={editValues}
              editEntry={editEntry}
              initializeStateForEdit={initializeStateForEdit}
              handleChange={handleEditValuesChange} />
          </div>
          <footer>made with <span id='footerHeart' style={{ color: "#0096e7" }}>&#10084;</span> by Akseli</footer>

        </div>
      </>
    
  )
}

export default App
