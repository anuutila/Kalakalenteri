import React, { useState } from "react"

import useTable from "../hooks/useTable"
import Entry from "./Entry"
import TableFooter from "./TableFooter"

/**
 * A component for displaying a table of entries.
 */
const EntryTable = ({ entries, removeEntry, editEntry, editValues,
  initializeStateForEdit, handleChange, rowsPerPage }) => {

  const [pageNumber, setPageNumber] = useState(1)
  const { slice, range } = useTable(entries, pageNumber, rowsPerPage)

  return (
    <>
      <table className="entries">
        <thead>
          <tr>
            <th>laji</th>
            <th>pituus<br/>cm</th>
            <th>paino<br/>kg</th>
            <th>viehe</th>
            <th>paikka</th>
            <th>pvm.</th>
            <th>aika</th>
            <th>saaja</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {slice.map(entry =>
            <Entry
              key={entry.id}
              entry={entry}
              entries={entries}
              removeEntry={removeEntry(entry.id)}
              editValues={editValues}
              editEntry={editEntry(entry.id)}
              initializeStateForEdit={initializeStateForEdit(entry)}
              handleChange={handleChange}
            />
          )}
        </tbody>
      </table>
      <div className='tableFooter'>
        {range.length > 1 && <TableFooter range={range} slice={slice} setPageNumber={setPageNumber} pageNumber={pageNumber}/>}
      </div>
    </>
  )
}

export default EntryTable