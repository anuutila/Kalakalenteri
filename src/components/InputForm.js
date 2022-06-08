import React from "react";

const InputForm = (props) => {
  const uniqueLures = [...new Set(props.state.entries.map(e => e.lure))].filter(lure => lure !== '-')
  const uniquePlaces = [...new Set(props.state.entries.map(e => e.place))].filter(place => place !== '-')
  const uniquePersons = [...new Set(props.state.entries.map(e => e.person))]

  return (
    <form onSubmit={props.addEntry} className='entryForm'>
      <div>
        laji: <input 
          list="fishSpecies"
          value={props.state.newFish}
          onChange={props.handleFishChange}
        />
        <datalist id="fishSpecies">
          <option value="hauki"/>
          <option value="kuha"/>
          <option value="ahven"/>
        </datalist>
      </div>
      <div>
        pvm: <input
          type="date" 
          required
          value={props.state.newDate}
          onChange={props.handleDateChange}
        />
      </div>
      <div>
        pituus: <input 
          type="number"
          placeholder="cm"
          value={props.state.newLength}
          onChange={props.handleLengthChange}
        />
      </div>
      <div>
        paino: <input 
          type="number"
          placeholder="kg"
          min="0"
          value={props.state.newWeight}
          onChange={props.handleWeightChange}
        />
      </div>
      <div>
        viehe: <input 
          list="lures"
          value={props.state.newLure}
          onChange={props.handleLureChange}
        />
        <datalist id="lures">
          {uniqueLures.map(lure => <option key={lure} value={lure} />)}
        </datalist>
      </div>
      <div>
        paikka: <input 
          list = "places"
          value={props.state.newPlace}
          onChange={props.handlePlaceChange}
        />
        <datalist id="places">
          {uniquePlaces.map(place => <option key={place} value={place} />)}
        </datalist>
      </div>
      <div>
        aika: <input 
          type="time"
          step="600" //ei ilmeisesti toimi uusimmassa chromessa
          required
          value={props.state.newTime}
          onChange={props.handleTimeChange}
        />
      </div>
      <div>
        saaja: <input 
          list="persons"
          value={props.state.newPerson}
          onChange={props.handlePersonChange}
        />
        <datalist id="persons">
          {uniquePersons.map(person => <option key={person} value={person} />)}
        </datalist>
      </div>
      <div>
        <button type="submit" className="button" id="submitButton">lisää saalis</button>
      </div>
    </form>
  )
}

export default InputForm