import React from 'react';

import entryService from './services/entries'
import InputForm from './components/InputForm';
import EntryTable from './components/EntryTable';
import Statistics from './components/Statistics';
import StatsAndSortButtons from './components/StatsAndSortButtons';
import RadioGroup from './components/RadioGroup';
import BarChart from './components/BarChart';
import BarChartMobile from './components/BarChartMobile';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      entries: [],
      newFish: '',
      newDate: '',
      newLength: '',
      newWeight: '',
      newLure: '',
      newPlace: '',
      newCoordinates: '',
      newTime: '',
      newPerson: '',
      statsAreHidden: true,
      statsWindowAnimation: false,
      sortingIsHidden: true,
      radioGroupAnimation: false,
      editFish: '',
      editDate: '',
      editLength: '',
      editWeight: '',
      editLure: '',
      editPlace: '',
      editCoordinates: '',
      editTime: '',
      editPerson: '',
    }
    console.log('constructor')
  }

  componentDidMount() {
    console.log('did mount')
    
    entryService
      .getAll()
      .then(response => {
        console.log('promise fulfilled')
        this.setState({ entries: this.defaultSort(response)})
      })
      .catch(error => {
        console.log('fail')
      })
  }

  addEntry = (event) => {
    event.preventDefault()

    if (!this.state.newFish || !this.state.newDate || !this.state.newPerson) {
      return window.alert('kalalaji, päivämäärä tai saajan nimi puuttuu')
    }

    const entryObject = {
      fish: this.state.newFish,
      date: this.state.newDate,
      length: this.state.newLength,
      weight: this.state.newWeight,
      lure: this.state.newLure,
      place: this.state.newPlace,
      coordinates: this.state.newCoordinates,
      time: this.state.newTime,
      person: this.state.newPerson
    }

    entryService
      .create(entryObject)
      .then(response => {
        console.log('entry added')
        this.setState({
          entries: this.defaultSort(this.state.entries.concat(response)),
          newFish: '',
          newDate: '',
          newLength: '',
          newWeight: '',
          newLure: '',
          newPlace: '',
          newTime: '',
          newPerson: '',
          newCoordinates: '',
        })
        document.getElementById("locationCheckbox").checked = false;
      })
    .catch(error => {
      console.log('fail')
    })
  }

  removeEntry = (id) => {
    return () => {
      const entry = this.state.entries.find(e => e.id === id)
      
      if (window.confirm(`Poistetaanko ${entry.fish}, jonka ${entry.person} nappasi ${entry.date}?`)) {
        entryService
          .remove(id)
          .then(response => {
            console.log('entry removed')
            this.setState({ 
              entries: this.state.entries.filter(e => e.id !== id) 
            })
          })
          .catch(error => {
            console.log(error)
            alert("Poisto epäonnistui.")
          })
      }

    }
  }

  editEntry = (id) => {
    return () => {
      const editedEntry = {
        fish: this.state.editFish,
        date: this.state.editDate,
        length: this.state.editLength,
        weight: this.state.editWeight,
        lure: this.state.editLure,
        place: this.state.editPlace,
        coordinates: this.state.editCoordinates,
        time: this.state.editTime,
        person: this.state.editPerson
      }

      entryService
        .edit(id, editedEntry)
        .then(response => {
          console.log('entry edited')
          this.setState({
            entries: this.state.entries.map(entry => entry.id === id ? response : entry)
          })
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

  handleFishChange = (event) => {
    this.setState({ newFish: event.target.value })
  }

  handleDateChange = (event) => {
    this.setState({ newDate: event.target.value })
  }

  handleLengthChange = (event) => {
    this.setState({ newLength: event.target.value })
  }

  handleWeightChange = (event) => {
    this.setState({ newWeight: event.target.value })
  }

  handleLureChange = (event) => {
    this.setState({ newLure: event.target.value })
  }

  handlePlaceChange = (event) => {
    this.setState({ newPlace: event.target.value })
  }

  handleCoordinatesChange = (event) => {
    this.setState({ newCoordinates: event.target.value })
  }

  handleTimeChange = (event) => {
    this.setState({ newTime: event.target.value })
  }

  handlePersonChange = (event) => {
    this.setState({ newPerson: event.target.value })
  }



  handleEditFishChange = (event) => {
    this.setState({ editFish: event.target.value })
  }

  handleEditDateChange = (event) => {
    this.setState({ editDate: event.target.value })
  }

  handleEditLengthChange = (event) => {
    this.setState({ editLength: event.target.value })
  }

  handleEditWeightChange = (event) => {
    this.setState({ editWeight: event.target.value })
  }

  handleEditLureChange = (event) => {
    this.setState({ editLure: event.target.value })
  }

  handleEditPlaceChange = (event) => {
    this.setState({ editPlace: event.target.value })
  }

  handleEditCoordinatesChange = (event) => {
    this.setState({ editCoordinates: event.target.value })
  }

  handleEditTimeChange = (event) => {
    this.setState({ editTime: event.target.value })
  }

  handleEditPersonChange = (event) => {
    this.setState({ editPerson: event.target.value })
  }

  initializeStateForEdit = (entry) => {
    return () => {
      this.setState({ 
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

  getGeolocation() {
      const success = (position) => {
        console.log(position)
        this.setState({ 
          newCoordinates: `${position.coords.latitude}, ${position.coords.longitude}`})
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

  geolocationAvailable = () => {
    if ("geolocation" in navigator) {
      return true
    } else {
      return false
    }
  }
    
  togglelocationCheckbox = () => {
    if (!this.geolocationAvailable) {
      return window.alert('Sijaintitiedot eivät ole saatavilla')
    }
    switch (document.getElementById("locationCheckbox").checked) {
      case true:
        this.getGeolocation()
        break
      case false:
        this.setState({ newCoordinates: ''})
        break
      default:
        break
    }
  }  

  toggleStatsHidden() {
    if (this.state.statsWindowAnimation) {
      this.setState({ statsWindowAnimation: false })
      if (window.matchMedia("(max-width: 768px)").matches) {
      setTimeout(() => {this.setState({ statsAreHidden: true })}, 440)
      } else {
      setTimeout(() => {this.setState({ statsAreHidden: true })}, 440)
      }
      return
    }
    this.setState({ 
      statsAreHidden: false,
      statsWindowAnimation: true  })
  }

  handleSortButtonClick(event) {
    this.setState({ entries: this.defaultSort(this.state.entries) })
    if (this.state.radioGroupAnimation) {
      this.setState({ radioGroupAnimation: false })
      setTimeout(() => {this.setState({ sortingIsHidden: true })}, 250)
      return
    }
    this.setState({ 
      sortingIsHidden: false,
      radioGroupAnimation: true
    })
  }  

  sortEntries(event) {
    const sort = event.target.value
    switch (sort) {
      case 'FISH':
        this.setState({ entries: this.sortByFish(this.state.entries) })
        break
      case 'DATE':
        this.setState({ entries: this.sortByDate(this.state.entries) })
        break
      case 'LENGTH':
        this.setState({ entries: this.sortByLength(this.state.entries) })
        break
      case 'WEIGHT':
        this.setState({ entries: this.sortByWeight(this.state.entries) })
        break
      case 'LURE':
        this.setState({ entries: this.sortByLure(this.state.entries) })
        break
      case 'PLACE':
        this.setState({ entries: this.sortByPlace(this.state.entries) })
        break
      case 'TIME':
        this.setState({ entries: this.sortByTime(this.state.entries) })
        break
      case 'PERSON':
        this.setState({ entries: this.sortByPerson(this.state.entries) })
        break
      default:
        break
    }
  }

  sortByFish(entries) {
    return entries.sort((a, b) => a.fish.localeCompare(b.fish))
  }

  sortByDate(entries) {
    entries.sort(function(a,b) {
      a = a.date.split('-').join('')
      b = b.date.split('-').join('')
      return a.localeCompare(b)
    })
    return entries
  }

  sortByLength(entries) {
    entries.sort((a, b) => {
      if (a.length === "-") {
        return 1
      }
      if (b.length === "-") {
        return -1
      }
      return b.length - a.length
    }) 
    return entries
  }

  sortByWeight(entries) {
    entries.sort((a, b) => {
      if (a.weight === "-") {
        return 1
      }
      if (b.weight === "-") {
        return -1
      }
      return b.weight - a.weight
    }) 
    return entries
  }

  sortByLure(entries) {
    entries.sort((a, b) => {
      if (a.lure === "-") {
        return 1
      }
      if (b.lure === "-") {
        return -1
      }
      return a.lure.localeCompare(b.lure)
    }) 
    return entries
  }

  sortByPlace(entries) {
    entries.sort((a, b) => {
      if (a.place === "-") {
        return 1
      }
      if (b.place === "-") {
        return -1
      }
      return a.place.localeCompare(b.place)
    }) 
    return entries  
  }

  sortByTime(entries) {
    entries.sort(function(a,b) {
      a = a.time.split(':').join('')
      b = b.time.split(':').join('')
      return a.localeCompare(b)
    })
    return entries
  }

  sortByPerson(entries) {
    return entries.sort((a, b) => a.person.localeCompare(b.person))
  }

  defaultSort(entries) {
    return this.sortByDate(this.sortByTime(entries)).reverse()
  }


  render() {
    console.log('render')
    return (
      <div className='rootDiv'>
        <div className='img'></div>
        <div className='topShade'></div>
        <h1 className='title1'>KALAPÄIVÄKIRJA</h1>
        <div className='title1-mobile'>
            <span id='title1-mobile-row1'>KALA</span>
            <span id='title1-mobile-row2'>PÄIVÄKIRJA</span>
        </div>
        <div className='newEntryAndStatisticsContainer'>
          <div className='newEntryContainer'>
            <h2 className='title2'>UUSI SAALIS</h2>
            <InputForm
              state={this.state}
              addEntry={this.addEntry}
              handleFishChange={this.handleFishChange}
              handleDateChange={this.handleDateChange}
              handleLengthChange={this.handleLengthChange}
              handleWeightChange={this.handleWeightChange}
              handleLureChange={this.handleLureChange}
              handlePlaceChange={this.handlePlaceChange}
              handleTimeChange={this.handleTimeChange}
              handlePersonChange={this.handlePersonChange}
              togglelocationCheckbox={this.togglelocationCheckbox} />
          </div>
          {!this.state.statsAreHidden &&
            <Statistics entries={this.state.entries} statsWindowAnimation={this.state.statsWindowAnimation}/> }
          {!this.state.statsAreHidden &&<BarChart entries={this.state.entries} statsWindowAnimation={this.state.statsWindowAnimation}/>}
          {!this.state.statsAreHidden &&<BarChartMobile entries={this.state.entries} statsWindowAnimation={this.state.statsWindowAnimation}/>}
        </div>
        
        
        <div className='tableContainer' /*style={{marginTop:`${this.state.statsAreHidden ? 10 : 1}rem`}}*/>
          <StatsAndSortButtons
            handleSortButtonClick={this.handleSortButtonClick.bind(this)}
            toggleStatsHidden={this.toggleStatsHidden.bind(this)}
            sortingIsHidden={this.state.sortingIsHidden}
            statsAreHidden={this.state.statsAreHidden} />
          {!this.state.sortingIsHidden && <RadioGroup
            sortEntries={this.sortEntries.bind(this)}
            radioGroupAnimation={this.state.radioGroupAnimation} />}
          <EntryTable
            entries={this.state.entries}
            removeEntry={this.removeEntry}
            state={this.state}
            editEntry={this.editEntry}
            initializeStateForEdit={this.initializeStateForEdit}
            handleEditFishChange={this.handleEditFishChange}
            handleEditDateChange={this.handleEditDateChange}
            handleEditLengthChange={this.handleEditLengthChange}
            handleEditWeightChange={this.handleEditWeightChange}
            handleEditLureChange={this.handleEditLureChange}
            handleEditPlaceChange={this.handleEditPlaceChange}
            handleEditCoordinatesChange={this.handleEditCoordinatesChange}
            handleEditTimeChange={this.handleEditTimeChange}
            handleEditPersonChange={this.handleEditPersonChange} />
        </div>
        <footer>made with <span id='footerHeart' style={{color:"#0096e7"}}>&#10084;</span> by Akseli</footer>
      
      </div>
    )
  }
}

export default App
