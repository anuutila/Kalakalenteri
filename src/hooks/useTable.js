
import { useState, useEffect } from "react";

const calculateRange = (entries, rowsPerPage) => {
  const range = []
  const num = Math.ceil(entries.length / rowsPerPage)
  for (let i = 1; i <= num; i++) {
    range.push(i)
  }
  return range
}

const sliceEntries = (entries, pageNumber, rowsPerPage) => {
  return entries.slice((pageNumber - 1) * rowsPerPage, pageNumber * rowsPerPage)
}

const useTable = (entries, page, rowsPerPage) => {
  const [tableRange, setTableRange] = useState([]);
  const [slice, setSlice] = useState([]);

  useEffect(() => {
    const range = calculateRange(entries, rowsPerPage);
    setTableRange([...range]);

    const slice = sliceEntries(entries, page, rowsPerPage);
    setSlice([...slice]);
  }, [entries, setTableRange, page, setSlice]);

  return { slice, range: tableRange };
}

export default useTable;