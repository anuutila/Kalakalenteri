
import { useState, useEffect } from "react";

/**
 * Calculates how many pages the table should have according to the number of entries 
 * and the number of rows we want to display per page and returns an array containing
 * the page numbers.
 * @param {Entry[]} entries - An array of entries.
 * @param {number} rowsPerPage - The number of rows to display per page.
 * @returns {number[]} An array of page numbers.
 */
const calculateRange = (entries, rowsPerPage) => {
  const range = []
  const num = Math.ceil(entries.length / rowsPerPage)
  for (let i = 1; i <= num; i++) {
    range.push(i)
  }
  return range
}

/**
 * Returns a slice of the entries array according to the current page and the number of rows per page.
 * @param {Entry[]} entries - An array of entries.
 * @param {number} pageNumber - The current page.
 * @param {number} rowsPerPage - The number of rows to display per page.
 */
const sliceEntries = (entries, pageNumber, rowsPerPage) => {
  return entries.slice((pageNumber - 1) * rowsPerPage, pageNumber * rowsPerPage)
}

/**
 * A custom hook for handling table pagination.
 * @param {Entry[]} entries - An array of entries.
 * @param {number} pageNumber - The current page.
 * @param {number} rowsPerPage - The number of rows to display per page.
 */
const useTable = (entries, pageNumber, rowsPerPage) => {
  const [tableRange, setTableRange] = useState([]);
  const [slice, setSlice] = useState([]);

  useEffect(() => {
    const range = calculateRange(entries, rowsPerPage);
    setTableRange([...range]);

    const slice = sliceEntries(entries, pageNumber, rowsPerPage);
    setSlice([...slice]);
  }, [entries, setTableRange, pageNumber, setSlice, rowsPerPage]);

  return { slice, range: tableRange };
}

export default useTable;