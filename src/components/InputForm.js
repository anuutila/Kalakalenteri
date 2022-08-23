import React from "react";
import { uniqueLures, uniquePersons, uniquePlaces } from "../utils/EntriesFunctions";

const InputForm = (props) => {
  return (
    <div className='formContainer'>
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
          pituus: <input
            type="number"
            placeholder="cm"
            step="0.1"
            min="0"
            max="999"
            value={props.state.newLength}
            onChange={props.handleLengthChange}
          />
        </div>
        <div>
          paino: <input
            type="number"
            placeholder="kg"
            step="0.01"
            min="0"
            max="999"
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
            {uniqueLures(props.entries).map(lure => <option key={lure} value={lure} />)}
          </datalist>
        </div>
        <div>
          paikka: <input
            list = "places"
            value={props.state.newPlace}
            onChange={props.handlePlaceChange}
          />
          <datalist id="places">
            {uniquePlaces(props.entries).map(place => <option key={place} value={place} />)}
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
          aika: <input
            type="time"
            //step="600" ei ilmeisesti toimi uusimmassa chromessa
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
            {uniquePersons(props.entries).map(person => <option key={person} value={person} />)}
          </datalist>
        </div>
        <div>
          <label htmlFor="locationCheckbox">käytä GPS-sijaintia</label>
          <input id="locationCheckbox" name="locationCheckbox" type="checkbox" onChange={props.togglelocationCheckbox}></input>
        </div>
        <div>
          <button type="submit" className="button" id="submitButton">lisää saalis</button>
        </div>
      </form>
    </div>
  )
}

export default InputForm