import React, { useState } from "react";

import "./SearchForm.css";

import SearchResults from "./SearchResults";

import { searchGifs } from "./api";

const SearchForm = () => {
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);

  const performQuery = async () => {
    try {
      setError(false);
      const result = await searchGifs({
        rating: "pg-13",
        q: query,
      });
      if (result) {
        setImages(result.data);
      }
    } catch (e) {
      console.log(e);
    } finally {
      console.log("Query has completed");
    }
  };

  return (
    <div className="SearchForm">
      <p>Enter a search term:</p>

      <input
        name="query"
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
      />

      <div className="ButtonBar">
        <button disabled={!query} onClick={performQuery}>
          Search Giphy!
        </button>
      </div>

      {error && <div className="error">{error}</div>}

      <SearchResults results={images} />
    </div>
  );
};

export default SearchForm;
