import React from "react";
import { CgSpinner } from 'react-icons/cg';
import { uniquePersons, uniqueLures, uniquePlaces } from "../utils/EntriesFunctions";

/**
 * A form component for editing an existing entry.
 */
const EditEntryForm = (props) => {
  return (
    <form className='editEntryForm'
      onSubmit={async (event) => {
        event.preventDefault();
        try {
          await props.editEntry();
          props.closeModal();
        } catch (error) {
          console.error(error);
        }
      }}>
      <div>
        laji: <input
          list="fishSpecies"
          onChange={props.handleChange}
          value={props.editValues.editFish}
          name="editFish"
          required
          disabled={props.loading}
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
          value={props.editValues.editLength}
          onChange={props.handleChange}
          name="editLength"
          disabled={props.loading}
        />
      </div>
      <div>
        paino: <input
          type="number"
          placeholder="kg"
          step="0.01"
          min="0"
          max="999"
          value={props.editValues.editWeight}
          onChange={props.handleChange}
          name="editWeight"
          disabled={props.loading}
        />
      </div>
      <div>
        viehe: <input
          list="lures"
          value={props.editValues.editLure}
          onChange={props.handleChange}
          name="editLure"
          disabled={props.loading}
        />
        <datalist id="lures">
          {uniqueLures(props.entries).map(lure => <option key={lure} value={lure} />)}
        </datalist>
      </div>
      <div>
        paikka: <input
          list="places"
          value={props.editValues.editPlace}
          onChange={props.handleChange}
          name="editPlace"
          disabled={props.loading}
        />
        <datalist id="places">
          {uniquePlaces(props.entries).map(place => <option key={place} value={place} />)}
        </datalist>
      </div>
      <div>
        sijainti: <input
          placeholder="xx.xxxx, yy.yyyy"
          value={props.editValues.editCoordinates}
          onChange={props.handleChange}
          name="editCoordinates"
          disabled={props.loading}
        />
      </div>
      <div>
        pvm: <input
          type="date"
          required
          value={props.editValues.editDate}
          onChange={props.handleChange}
          name="editDate"
          disabled={props.loading}
        />
      </div>
      <div>
        aika: <input
          type="time"
          //step="600" ei ilmeisesti toimi uusimmassa chromessa
          required
          value={props.editValues.editTime}
          onChange={props.handleChange}
          name="editTime"
          disabled={props.loading}
        />
      </div>
      <div>
        saaja: <input
          list="persons"
          value={props.editValues.editPerson}
          onChange={props.handleChange}
          name="editPerson"
          required
          disabled={props.loading}
        />
        <datalist id="persons">
          {uniquePersons(props.entries).map(person => <option key={person} value={person} />)}
        </datalist>
      </div>
      <div className="editEntryFormButtons">
        <button type="submit" className="button" id="submitEditButton" disabled={props.loading}>
          <div className="submitContainer">
            <div className="spinnerContainer">
              {props.loading && <CgSpinner className='spinner' />}
            </div>
            <span className={`submitEditButtonText ${props.loading ? 'hidden' : ''}`}>Hyväksy muutokset</span>
          </div>
        </button>
        <button type="button" className="button" id="cancelEditButton" onClick={props.closeModal}>Peruuta</button>
      </div>
    </form>
  )
}

export default EditEntryForm