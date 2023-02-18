import React from "react";
import { uniqueLures, uniquePersons, uniquePlaces } from "../utils/EntriesFunctions";

/**
 * A form component for adding a new entry.
 */
const InputForm = ({ entries, addEntry, newValues, handleChange, togglelocationCheckbox}) => {
  return (
    <div className='formContainer'>
      <form onSubmit={addEntry} className='entryForm'>
        <div>
          laji: <input
            list="fishSpecies"
            value={newValues.newFish}
            type="text"
            required
            onChange={handleChange}
            name="newFish"
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
            value={newValues.newLength}
            onChange={handleChange}
            name="newLength"
          />
        </div>
        <div>
          paino: <input
            type="number"
            placeholder="kg"
            step="0.01"
            min="0"
            max="999"
            value={newValues.newWeight}
            onChange={handleChange}
            name="newWeight"
          />
        </div>
        <div>
          viehe: <input
            list="lures"
            type="text"
            value={newValues.newLure}
            onChange={handleChange}
            name="newLure"
          />
          <datalist id="lures">
            {uniqueLures(entries).map(lure => <option key={lure} value={lure} />)}
          </datalist>
        </div>
        <div>
          paikka: <input
            list = "places"
            type="text"
            value={newValues.newPlace}
            onChange={handleChange}
            name="newPlace"
          />
          <datalist id="places">
            {uniquePlaces(entries).map(place => <option key={place} value={place} />)}
          </datalist>
        </div>
        <div>
          pvm: <input
            type="date"
            required
            value={newValues.newDate}
            onChange={handleChange}
            name="newDate"
          />
        </div>
        <div>
          aika: <input
            type="time"
            //step="600" ei ilmeisesti toimi uusimmassa chromessa
            required
            value={newValues.newTime}
            onChange={handleChange}
            name="newTime"
          />
        </div>
        <div>
          saaja: <input
            list="persons"
            type="text"
            required
            value={newValues.newPerson}
            onChange={handleChange}
            name="newPerson"
          />
          <datalist id="persons">
            {uniquePersons(entries).map(person => <option key={person} value={person} />)}
          </datalist>
        </div>
        <div>
          <label htmlFor="locationCheckbox" id="locationCheckboxLabel">GPS-sijainti</label>
          <input id="locationCheckbox" name="locationCheckbox" type="checkbox" onChange={togglelocationCheckbox}></input>
        </div>
        <div>
          <button type="submit" className="button" id="submitButton">Lisää saalis</button>
        </div>
      </form>
    </div>
  )
}

export default InputForm