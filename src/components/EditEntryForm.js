import React from "react";
import { uniquePersons, uniqueLures, uniquePlaces } from "../utils/EntriesFunctions";

/**
 * A form component for editing an existing entry.
 */
const EditEntryForm = (props) => {
  return (
    <form className='editEntryForm'
      onSubmit={(event) => {
        event.preventDefault();
        if (props.editEntry() === false) {
          return;
        }
        props.closeModal();
      }}>
      <div>
        laji: <input
          list="fishSpecies"
          onChange={props.handleChange}
          value={props.editValues.editFish}
          name="editFish"
          required
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
        />
      </div>
      <div>
        viehe: <input
          list="lures"
          value={props.editValues.editLure}
          onChange={props.handleChange}
          name="editLure"
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
        />
      </div>
      <div>
        pvm: <input
          type="date"
          required
          value={props.editValues.editDate}
          onChange={props.handleChange}
          name="editDate"
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
        />
      </div>
      <div>
        saaja: <input
          list="persons"
          value={props.editValues.editPerson}
          onChange={props.handleChange}
          name="editPerson"
          required
        />
        <datalist id="persons">
          {uniquePersons(props.entries).map(person => <option key={person} value={person} />)}
        </datalist>
      </div>
      <div className="editEntryFormButtons">
        <button type="submit" className="button" id="submitEditButton">Hyväksy muutokset</button>
        <button type="button" className="button" id="cancelEditButton" onClick={props.closeModal}>Peruuta</button>
      </div>
    </form>
  )
}

export default EditEntryForm