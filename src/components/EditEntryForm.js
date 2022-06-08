import React from "react";

const EditEntryForm = (props) => {
  const uniqueLures = [...new Set(props.state.entries.map(e => e.lure))].filter(lure => lure !== '-')
  const uniquePlaces = [...new Set(props.state.entries.map(e => e.place))].filter(place => place !== '-')
  const uniquePersons = [...new Set(props.state.entries.map(e => e.person))]

  return (
    <form className='editEntryForm' onSubmit={(event) => {
        event.preventDefault();
        props.editEntry(); 
        props.closeModal();}} >
      <div>
        laji: <input 
          list="fishSpecies"
          value={props.state.editFish}
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
          value={props.state.editDate}
          onChange={props.handleDateChange}
        />
      </div>
      <div>
        pituus: <input 
          type="number"
          placeholder="cm"
          step="0.1"
          min="0"
          value={props.state.editLength}
          onChange={props.handleLengthChange}
        />
      </div>
      <div>
        paino: <input 
          type="number"
          placeholder="kg"
          step="0.01"
          min="0"
          value={props.state.editWeight}
          onChange={props.handleWeightChange}
        />
      </div>
      <div>
        viehe: <input 
          list="lures"
          value={props.state.editLure}
          onChange={props.handleLureChange}
        />
        <datalist id="lures">
          {uniqueLures.map(lure => <option key={lure} value={lure} />)}
        </datalist>
      </div>
      <div>
        paikka: <input 
          list = "places"
          value={props.state.editPlace}
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
          value={props.state.editTime}
          onChange={props.handleTimeChange}
        />
      </div>
      <div>
        saaja: <input 
          list="persons"
          value={props.state.editPerson}
          onChange={props.handlePersonChange}
        />
        <datalist id="persons">
          {uniquePersons.map(person => <option key={person} value={person} />)}
        </datalist>
      </div>
      <div>
        <button type="submit" className="button" id="submitEditButton">hyväksy muutokset</button>
        <button className="button" id="cancelEditButton" onClick={props.closeModal}>Peruuta</button>
      </div>
    </form>
  )
}

export default EditEntryForm