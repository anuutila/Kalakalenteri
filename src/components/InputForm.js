import React from "react";

const InputForm = (props) => {
  return (
    <form onSubmit={props.addEntry} className='entryForm'>
      <div>
        laji: <input 
          value={props.state.newFish}
          onChange={props.handleFishChange}
        />
      </div>
      <div>
        pvm: <input 
          value={props.state.newDate}
          onChange={props.handleDateChange}
        />
      </div>
      <div>
        pituus: <input 
          value={props.state.newLength}
          onChange={props.handleLengthChange}
        />
      </div>
      <div>
        paino: <input 
          value={props.state.newWeight}
          onChange={props.handleWeightChange}
        />
      </div>
      <div>
        viehe: <input 
          value={props.state.newLure}
          onChange={props.handleLureChange}
        />
      </div>
      <div>
        paikka: <input 
          value={props.state.newPlace}
          onChange={props.handlePlaceChange}
        />
      </div>
      <div>
        aika: <input 
          value={props.state.newTime}
          onChange={props.handleTimeChange}
        />
      </div>
      <div>
        saaja: <input 
          value={props.state.newPerson}
          onChange={props.handlePersonChange}
        />
      </div>
      <div>
        <button type="submit" className="button" id="submitButton">lisää saalis</button>
      </div>
    </form>
  )
}

export default InputForm