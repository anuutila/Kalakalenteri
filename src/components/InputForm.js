import React from "react";
import { CgSpinner } from 'react-icons/cg';
import { BiLoaderAlt } from 'react-icons/bi';
import { uniqueLures, uniquePersons, uniquePlaces } from "../utils/EntriesFunctions";

/**
 * A form component for adding a new entry.
 */
const InputForm = ({ entries, addEntry, newValues, handleChange, togglelocationCheckbox, loading }) => {
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
            disabled={loading}
          />
          <datalist id="fishSpecies">
            <option value="hauki" />
            <option value="kuha" />
            <option value="ahven" />
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
            disabled={loading}
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
            disabled={loading}
          />
        </div>
        <div>
          viehe: <input
            list="lures"
            type="text"
            value={newValues.newLure}
            onChange={handleChange}
            name="newLure"
            disabled={loading}
          />
          <datalist id="lures">
            {uniqueLures(entries).map(lure => <option key={lure} value={lure} />)}
          </datalist>
        </div>
        <div>
          paikka: <input
            list="places"
            type="text"
            value={newValues.newPlace}
            onChange={handleChange}
            name="newPlace"
            disabled={loading}
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
            disabled={loading}
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
            disabled={loading}
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
            disabled={loading}
          />
          <datalist id="persons">
            {uniquePersons(entries).map(person => <option key={person} value={person} />)}
          </datalist>
        </div>
        <div>
          <label htmlFor="locationCheckbox" id="locationCheckboxLabel">GPS-sijainti</label>
          <input id="locationCheckbox" name="locationCheckbox" type="checkbox" onChange={togglelocationCheckbox} disabled={loading}></input>
        </div>
        <div>
          <button type="submit" className="button" id="submitButton" disabled={loading}>
            <div className="submitContainer">
              <div className="spinnerContainer">
                {loading && <CgSpinner className='spinner'/>}
              </div>
              <span className={`submitButtonText ${loading ? 'hidden' : ''}`}>Lisää saalis</span>
            </div>
          </button>
        </div>
      </form>
    </div>
  )
}

export default InputForm