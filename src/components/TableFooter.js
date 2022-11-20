import React, { useEffect } from "react";

/**
 * A component for displaying the footer of the table.
 * The footer contains buttons for navigating between the table's pages.
 */
const TableFooter = ({ range, setPageNumber, pageNumber, slice }) => {
  useEffect(() => {
    if (slice.length < 1 && pageNumber !== 1) {
      setPageNumber(pageNumber - 1);
    }
  }, [slice, pageNumber, setPageNumber]);
  return (
    <>
      {range.map((pNumber, index) => (
        <button 
          key={index}
          // Set button style according to its position in the footer.
          className={`button ${
            pageNumber === pNumber ? 'activePaginationButton' : 'inactivePaginationButton'
          }${(range.length === 2 && pNumber === 1) ? ' first' : ''}
          ${(range.length === 2 && pNumber === 2) ? ' last' : ''}
          ${(range.length > 2 && pNumber === 1) ? ' first' : ''}
          ${(range.length > 2 && pNumber > 1 && pNumber < range.length) ? ' middle' : ''}
          ${(range.length > 2 && pNumber === range.length) ? ' last' : ''}`}
          onClick={() => setPageNumber(pNumber)}
        >
          {pNumber}
        </button>
      ))}
    </>
  );
};

export default TableFooter;