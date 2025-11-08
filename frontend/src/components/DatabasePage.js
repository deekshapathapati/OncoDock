import React, { useEffect, useState, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import './databasestyles.css';

const DatabasePage = () => {
  const [data, setData] = useState([]);
  const [suggestions, setSuggestions] = useState([]); // State for suggestions
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState(''); // State to keep track of search term
  const [showTable, setShowTable] = useState(false); // New state to control table visibility
  const [debounceTimer, setDebounceTimer] = useState(null); // Timer for debouncing

  useEffect(() => {
    // Dynamically include the Bootstrap CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css';
    document.head.appendChild(link);

    // Cleanup: Remove the link when the component is unmounted
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Current data for the current page
  const currentData = data.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  // Generate pagination buttons dynamically, but only show a limited set
  const paginationButtons = [];
  const pageLimit = 5; // Number of page numbers to show at once
  let startPage = Math.max(1, currentPage - Math.floor(pageLimit / 2));
  let endPage = Math.min(totalPages, startPage + pageLimit - 1);

  // Adjust startPage if it's too far back
  if (endPage - startPage < pageLimit - 1) {
    startPage = Math.max(1, endPage - pageLimit + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    paginationButtons.push(
      <li key={i} className={`page-item ${i === currentPage ? 'active' : ''}`}>
        <a className="page-link" href="#" onClick={() => handlePageChange(i)}>
          {i}
        </a>
      </li>
    );
  }

  // Handle next page
  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Handle previous page
  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Function to handle search and fetch data from the search endpoint
  const searchTable = async (event) => {
    const query = event.target.value;
    setSearchTerm(query); // Update search term state
    // If the search box is empty, clear the suggestions and data
    if (!query) {
      setSuggestions([]);
      setData([]);
      return;
    }
    if (debounceTimer) {
      clearTimeout(debounceTimer); // Clear the previous debounce timer
    }

    // Set a new debounce timer
    const newTimer = setTimeout(async () => {

        // Fetch spelling suggestions from the database
        try {
          const suggestionResponse = await fetch(`http://localhost:8081/oncodock/suggestions?query=${query}`);
          const suggestionsData = await suggestionResponse.json();
          setSuggestions(suggestionsData.slice(0, 10)); // Only show 10 suggestions
        } catch (error) {
          console.error('Error fetching suggestions:', error);

      }
    }, 500); // Debounce for 500ms after the user stops typing

    setDebounceTimer(newTimer); // Save the new timer ID
  };

  // Function to handle selection of suggestion
  const handleSuggestionClick = async (suggestion) => {
    setSearchTerm(suggestion); // Set the clicked suggestion as the search term
    setSuggestions([]); // Clear suggestions after selection

    // Perform the search with the selected suggestion
    try {
    const response = await fetch(`http://localhost:8081/oncodock/search?searchTerm=${suggestion}`);
    const searchData = await response.json();
    setData(searchData);
    setTotalPages(Math.ceil(searchData.length / rowsPerPage));
    setCurrentPage(1); // Reset to the first page after search

    setShowTable(true); // Show the table after data is fetched
    } catch (error) {
      console.error('Error fetching search data:', error);
    }
  };
  // Scroll to top whenever the table is populated (data is updated)
  useLayoutEffect(() => {
    if (data.length > 0) {
      setTimeout(() => {
        window.scrollTo(0, 0); // Scroll to the top of the page
      }, 100); 
    }
  }, [data]); // Trigger when 'data' is updated


  return (
    <div className="container">
      <h1 className="text-center my-4">Protein-Ligand Interaction Database</h1>

      <div className="suggestions-container mb-4">
        <input
          type="text"
          id="searchInput"
          className="form-control"
          placeholder="Search for any keyword..."
          value={searchTerm} // Controlled input field
          onChange={searchTable} // Trigger search on input change
        />

        {/* Display suggestions below the search input */}
        {suggestions.length > 0 && (
          <ul className="list-group suggestions-list mt-2">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                className="list-group-item"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="text-end my-3">
        <button className="btn btn-custom" onClick={downloadCSV}>
          Download CSV
        </button>
      </div>

      {/* Only show the table if searchTerm is true */}
      {data.length > 0 && (
        <>
          <div className="table-container mt-4">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Protein ID (HGNC)</th>
                  <th>Protein Name</th>
                  <th>Ligand Name (BindingDB/ChEMBL)</th>
                  <th>Canonical SMILES</th>
                  <th>Binding Affinity (kcal/mol)</th>
                  <th>Interaction Effect (PDB/STRING)</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={index}>
                    <td>{item.protein_id}</td>
                    <td>{item.proteinName}</td>
                    <td>{item.ligandName}</td>
                    <td>{item.smiles}</td>
                    <td>{item.binding_score}</td>
                    <td>{item.ic50}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination controls */}
          <nav>
            <ul className="pagination justify-content-center">
              {/* Previous Button: Show only if not on the first page */}
              {currentPage > 1 && (
                <li className="page-item">
                  <a className="page-link" href="#" onClick={handlePrev}>
                    &laquo;
                  </a>
                </li>
              )}

              {/* Page Numbers */}
              {paginationButtons}

              {/* Next Button: Show only if not on the last page */}
              {currentPage < totalPages && (
                <li className="page-item">
                  <a className="page-link" href="#" onClick={handleNext}>
                    &raquo;
                  </a>
                </li>
              )}
            </ul>
          </nav>
        </>
      )}

          <div className="text-center mt-4">
                <a href="/afterlogin" className="btn btn-custom">Back to Home</a>
                <a href="/database" className="btn btn-custom mx-2">Go to Database Search</a>
            </div>
    </div>
  );

  // Function to download CSV
  function downloadCSV() {
    // Implement your download CSV logic here
  }
};

export default DatabasePage;
