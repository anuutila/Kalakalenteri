import React from 'react';
import entryService from './services/entries'
import InputForm from './components/InputForm';
import EntryTable from './components/EntryTable';
import Statistics from './components/Statistics';
import axios from 'axios';


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
      newTime: '',
      newPerson: '',
      statsAreHidden: true,
      sortingIsHidden: true,
      editFish: '',
      editDate: '',
      editLength: '',
      editWeight: '',
      editLure: '',
      editPlace: '',
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
        this.setState({ entries: response.sort(function(a,b) {
          a = a.time.split(':').join('');
          b = b.time.split(':').join('');
          return a.localeCompare(b);})
        .sort(function(a,b) {
          a = a.date.split('-').join('');
          b = b.date.split('-').join('');
          return a.localeCompare(b);}) })
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
      time: this.state.newTime,
      person: this.state.newPerson
    }

    entryService
      .create(entryObject)
      .then(response => {
        console.log(response)
        console.log('entry added')
        this.setState({
          entries: this.state.entries.concat(response),
          newFish: '',
          newDate: '',
          newLength: '',
          newWeight: '',
          newLure: '',
          newPlace: '',
          newTime: '',
          newPerson: ''
        })
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
      console.log(`editEntry ${id}`)
      const baseUrl = 'api/entries'
      /*const entry = this.state.entries.find(e => e.id === id)*/
      const editedEntry = {
        fish: this.state.editFish,
        date: this.state.editDate,
        length: this.state.editLength,
        weight: this.state.editWeight,
        lure: this.state.editLure,
        place: this.state.editPlace,
        time: this.state.editTime,
        person: this.state.editPerson
      }

      axios
        .put(`${baseUrl}/${id}`, editedEntry)
        .then(response => {
          console.log('entry edited')
          this.setState({
            entries: this.state.entries.map(entry => entry.id === id ? response.data : entry)
            /*editFish: '',
            editDate: '',
            editLength: '',
            editWeight: '',
            editLure: '',
            editPlace: '',
            editTime: '',
            editPerson: '',*/
          })
        })
        .catch(error => {
          console.log(error)
          alert("Muokkaus epäonnistui.")
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
        editLure: entry.lure,
        editPlace: entry.place,
        editTime: entry.time,
        editPerson: entry.person
      })
    }  
  }

  toggleStatsHidden() {
    this.setState({
      statsAreHidden: !this.state.statsAreHidden
    })
  }

  handleSortButtonClick(event) {
    this.setState({
      sortingIsHidden: !this.state.sortingIsHidden,
      entries: this.state.entries.sort(function(a,b) {
        a = a.time.split(':').join('');
        b = b.time.split(':').join('');
        return a.localeCompare(b);})
        
      .sort(function(a,b) {
        a = a.date.split('-').join('');
        b = b.date.split('-').join('');
        return a.localeCompare(b);})
    })
  }  

  sortEntries(event) {
    if (event.target.value === 'FISH') {
      this.setState({ entries: this.state.entries.sort((a, b) => a.fish.localeCompare(b.fish)) })
    }

    if (event.target.value === 'DATE') {
      this.setState({ entries: this.state.entries.sort(function(a,b) {
        a = a.date.split('-').join('');
        b = b.date.split('-').join('');
        console.log(a)
        return a.localeCompare(b);
        })
      })
    }

    if (event.target.value === 'LENGTH') {
      this.setState({ entries: this.state.entries.sort((a, b) => {
        if (a.length === "-") {
          return 1
        }
        if (b.length === "-") {
          return -1
        }
        return b.length - a.length;}) 
      })  
    }

    if (event.target.value === 'WEIGHT') {
      this.setState({ entries: this.state.entries.sort((a, b) => {
        if (a.weight === "-") {
          return 1
        }
        if (b.weight === "-") {
          return -1
        }
        return b.weight - a.weight;}) 
      })  
    }

    if (event.target.value === 'LURE') {
      this.setState({ entries: this.state.entries.sort((a, b) => {
        if (a.lure === "-") {
          return 1
        }
        if (b.lure === "-") {
          return -1
        }
        return a.lure.localeCompare(b.lure)}) 
      })  
    }
  
    if (event.target.value === 'PLACE') {
      this.setState({ entries: this.state.entries.sort((a, b) => {
        if (a.place === "-") {
          return 1
        }
        if (b.place === "-") {
          return -1
        }
        return a.place.localeCompare(b.place)}) 
      })  
    }

    if (event.target.value === 'TIME') {
      this.setState({ entries: this.state.entries.sort(function(a,b) {
        a = a.time.split(':').join('');
        b = b.time.split(':').join('');
        console.log(a)
        return a.localeCompare(b);
        })
      })
    }

    if (event.target.value === 'PERSON') {
      this.setState({ entries: this.state.entries.sort((a, b) => a.person.localeCompare(b.person)) })
    }
    
  }

  /*defaultSort() {
    console.log('default sort')
    console.log(this.state.entries)
    this.setState({ entries: this.state.entries.sort(function(a,b) {
      a = a.time.split(':').join('');
      b = b.time.split(':').join('');
      return a.localeCompare(b);})
      
    .sort(function(a,b) {
      a = a.date.split('-').join('');
      b = b.date.split('-').join('');
      return a.localeCompare(b);})
      
    })
  }*/

  render() {
    console.log('render')
    return (
      <div className='rootDiv1'>
        
        <div className='topShade'> </div>
        <h1 className='title' id='title1'>KALAKALENTERI</h1>
        <div className='newEntryContainer'>
          <h2>UUSI SAALIS</h2>
          <div className='formContainer'>
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
            />
          </div>
        </div>
        <div>
          {!this.state.statsAreHidden && <Statistics entries={this.state.entries} />}
        </div>
        <div className='tableContainer'>
          <div className='statAndSortButtonContainer'>
            <div>
              <button className='button' id='showSortingButton' onClick={
                this.handleSortButtonClick.bind(this)}>
                {this.state.sortingIsHidden ? 'järjestä taulu' : 'palauta oletusjärjestys'}
              </button>
              <button className='button' id='showStatsButton' onClick={this.toggleStatsHidden.bind(this)}>
                {this.state.statsAreHidden ? 'näytä tilastot' : 'piilota tilastot'}
              </button>
            </div>
          </div>  
          <div className='radioGroupContainer'>
            {!this.state.sortingIsHidden && 
            <div className='radioGroupContainer2' onChange={this.sortEntries.bind(this)}>
              <label className='radioContainer'>laji
                <input type="radio" value="FISH" name="sortBy"/>
                <span className="checkmark"></span>
              </label>
              <label className='radioContainer'>pvm.
                <input type="radio" value="DATE" name="sortBy"/>
                <span className="checkmark"></span>
              </label>
              <label className='radioContainer'>pituus
                <input type="radio" value="LENGTH" name="sortBy"/>
                <span className="checkmark"></span>
              </label>
              <label className='radioContainer'>paino
                <input type="radio" value="WEIGHT" name="sortBy"/>
                <span className="checkmark"></span>
              </label>
              <label className='radioContainer'>viehe
                <input type="radio" value="LURE" name="sortBy"/>
                <span className="checkmark"></span>
              </label>
              <label className='radioContainer'>paikka
                <input type="radio" value="PLACE" name="sortBy"/>
                <span className="checkmark"></span>
              </label>
              <label className='radioContainer'>aika
                <input type="radio" value="TIME" name="sortBy"/>
                <span className="checkmark"></span>
              </label>
              <label className='radioContainer'>saaja
                <input type="radio" value="PERSON" name="sortBy"/>
                <span className="checkmark"></span>
              </label>
            </div>
            }
          </div>
          
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
            handleEditTimeChange={this.handleEditTimeChange}
            handleEditPersonChange={this.handleEditPersonChange}
          />
        </div>
        
      </div>
    )
  }
}

export default App
