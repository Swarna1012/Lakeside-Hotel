import React from 'react'

const RoomPaginator = ({currentPage, totalPages, onPageChange}) => {
  const pageNumbers = Array.from({length : totalPages}, (_,i) => i+1)
  return (
    <nav>
      <ul>
        {pageNumbers.map((pageNumber) => (
          <li
            key={pageNumber}
            className={`page-item ${currentPage === pageNumber ? "active" : ""}`}>
              <button onClick={() => onPageChange(pageNumber)}>
                {pageNumber}
              </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default RoomPaginator