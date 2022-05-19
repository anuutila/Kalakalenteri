import React from "react"

const EntryList = ({ entries, removeEntry }) => {
  return (
    <table className="entries">
      <colgroup>
          <col span="8" className="dataaa"></col>
      </colgroup>
      <thead>
        <tr>
          <th>laji</th>
          <th>pvm.</th>
          <th>pituus cm</th>
          <th>paino kg</th>
          <th>viehe</th>
          <th>paikka</th>
          <th>aika</th>
          <th>saaja</th>
        </tr>
      </thead>
      <tbody>
        {entries.map(entry => 
          <Entry 
            key={entry.id} 
            entry={entry} 
            removeEntry={removeEntry(entry.id)}
          />
        )}
      </tbody>
    </table>
  )
}

const Entry = ({ entry, removeEntry }) => {
  return (
  <tr>
    <td>{entry.fish}</td>
    <td>{entry.date}</td>
    <td>{entry.length}</td>
    <td>{entry.weight}</td>
    <td>{entry.lure}</td>
    <td>{entry.place}</td>
    <td>{entry.time}</td>
    <td>{entry.person}</td>
    <td ><button className="deleteButton" onClick={removeEntry}>poista</button></td>
  </tr>
  )
}

export default EntryList