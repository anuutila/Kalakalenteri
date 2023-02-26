import React, { useEffect } from "react";
import { RiArrowDropRightLine, RiArrowDropLeftLine } from "react-icons/ri";

/**
 * A component for displaying the footer of the table.
 * The footer contains buttons for navigating between the table's pages.
 */
const TableFooter = ({ range, setPageNumber, pageNumber, slice }) => {

  // If the current page becomes empty, go to the previous page.
  useEffect(() => {
    if (slice.length < 1 && pageNumber !== 1) {
      setPageNumber(pageNumber - 1);
    }
  }, [slice, pageNumber, setPageNumber]);

  useEffect(() => {
    scrollToBottom();
  }, [pageNumber]);

  function scrollToBottom() {
    setTimeout(() => {
      document.documentElement.scrollTop = document.documentElement.scrollHeight;
    }, 0);
  }

  return (
    <div className="tableFooter">
      <button
        className="button paginationButton first arrow"
        disabled={pageNumber === 1}
        onClick={() => setPageNumber(pageNumber - 1)}
      >
        <RiArrowDropLeftLine size={48} className='arrowBack' />
      </button>

      {range.map((pNumber, index) => {
        const isActive = pageNumber === pNumber
        const isHidden = (
          (pNumber > 3 && pNumber !== range.length && pageNumber !== pNumber) ||
          (pNumber > 2 && pNumber !== 1 && pageNumber !== pNumber && pNumber !== range.length && pageNumber > 3)
        ) && pNumber !== range.length - 1 && !(pageNumber > range.length - 2 && pNumber === range.length - 2)
        const isDisabled = (
          (pageNumber < range.length - 2 && pNumber === range.length - 1 && range.length > 5) ||
          (pageNumber > 3 && pNumber === 2 && range.length > 5)
        )
        const label = ((pageNumber < range.length - 2 && pNumber === range.length - 1 && range.length > 5) || (pageNumber > 3 && pNumber === 2 && range.length > 5)) ? '...' : pNumber;

        return (
          <button
            key={index}
            className={`button paginationButton middle ${isActive ? 'activePaginationButton' : 'inactivePaginationButton'} ${isHidden ? 'hide' : ''}`}
            onClick={() => setPageNumber(pNumber)}
            disabled={isDisabled}
          >
            {label}
          </button>
        )
      })}

      <button
        className="button paginationButton last arrow"
        disabled={pageNumber === range.length}
        onClick={() => setPageNumber(pageNumber + 1)}
      >
        <RiArrowDropRightLine size={48} className='arrowForward' />
      </button>
    </div>
  )
}

export default TableFooter;