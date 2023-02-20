import React, { useState } from "react"

import useTable from "../hooks/useTable"
import Entry from "./Entry"
import TableFooter from "./TableFooter"
import { formatDate } from "../utils/utils";

/**
 * A component for displaying a table of entries.
 */
const EntryTable = ({ entries, removeEntry, editEntry, editValues,
  initializeStateForEdit, handleChange, rowsPerPage, startDate, endDate, entriesLoading, submitEditLoading }) => {

  const [pageNumber, setPageNumber] = useState(1)
  const { slice, range } = useTable(entries, pageNumber, rowsPerPage)

  function renderEntriesOrMessage() {
    const numColumns = 9
    const noEntriesMessage = (
      <tr>
        <td className='EntriesMessage' colSpan={numColumns}>
          Ei merkattuja saaliita aikavälillä {formatDate(startDate)}–{formatDate(endDate)}
        </td>
      </tr>
    )
    const loadingMessage = (
      <tr>
        <td className='EntriesMessage' colSpan={numColumns}>
          Ladataan...
        </td>
      </tr>
    )
    if (entriesLoading) {
      return loadingMessage;
    } else if (slice.length > 0) {
      return slice.map(entry => (
        <Entry
          key={entry.id}
          entry={entry}
          entries={entries}
          removeEntry={removeEntry(entry.id)}
          editValues={editValues}
          editEntry={editEntry(entry.id)}
          initializeStateForEdit={initializeStateForEdit(entry)}
          handleChange={handleChange}
          loading={submitEditLoading}
        />
      ));
    } else {
      return noEntriesMessage;
    }
  }

  return (
    <>
      <table className="entries">
        <thead>
          <tr>
            <th>laji</th>
            <th>pituus<br />cm</th>
            <th>paino<br />kg</th>
            <th>viehe</th>
            <th>paikka</th>
            <th>pvm.</th>
            <th>aika</th>
            <th>saaja</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {renderEntriesOrMessage()}
        </tbody>
      </table>
      <div className='tableFooter'>
        {range.length > 1 && <TableFooter range={range} slice={slice} setPageNumber={setPageNumber} pageNumber={pageNumber} />}
      </div>
    </>
  )
}

export default EntryTable