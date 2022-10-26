import React, { useState } from "react"

import useTable from "../../hooks/useTable"
import Entry from "./Entry"
import TableFooter from "./TableFooter"

const EntryTable = ({ entries, removeEntry, editEntry, editValues,
  initializeStateForEdit, handleChange, rowsPerPage }) => {

  const [page, setPage] = useState(1)
  const { slice, range } = useTable(entries, page, rowsPerPage)

  return (
    <>
      <table className="entries">
        <thead>
          <tr>
            <th>laji</th>
            <th>pituus cm</th>
            <th>paino kg</th>
            <th>viehe</th>
            <th>paikka</th>
            <th>pvm.</th>
            <th>aika</th>
            <th>saaja</th>
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
        {range.length > 1 && <TableFooter range={range} slice={slice} setPage={setPage} page={page}/>}
      </div>
    </>
  )
}

export default EntryTable