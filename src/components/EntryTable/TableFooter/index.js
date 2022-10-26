import React, { useEffect } from "react";

const TableFooter = ({ range, setPage, page, slice }) => {
  useEffect(() => {
    if (slice.length < 1 && page !== 1) {
      setPage(page - 1);
    }
  }, [slice, page, setPage]);
  return (
    <>
      {range.map((pageNumber, index) => (
        <button 
          key={index}
          className={`button ${
            page === pageNumber ? 'activePaginationButton' : 'inactivePaginationButton'
          }`}
          onClick={() => setPage(pageNumber)}
        >
          {pageNumber}
        </button>
      ))}
    </>
  );
};

export default TableFooter;