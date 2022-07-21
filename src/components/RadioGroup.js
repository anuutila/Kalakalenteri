import react from "react"

const RadioGroup = ({ sortEntries, radioGroupAnimation }) => {
  return (
  <div className={`radioGroupContainer${radioGroupAnimation ? ' appear' : ' disappear'}`}> 
    <div className={`radioGroupContainer2${radioGroupAnimation ? ' appear' : ' disappear'}`} onChange={sortEntries}>
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
  </div>
  )
}

export default RadioGroup