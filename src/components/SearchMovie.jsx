import React, { useState } from 'react';
import axios from 'axios';

const URL = 'http://www.omdbapi.com/?i=tt3896198&apikey=92965034';

function SearchBar({ onSearch }) 
{
  const [keyword, setKeyword] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => 
  {
    setKeyword(e.target.value);
  };

  const handleSearch = async () => 
  {
    if (keyword.trim() === '') 
    {
      return;
    }
    setIsLoading(true);
    try 
    {
      const response = await axios.get(`${URL}&s=${keyword}`);
      setSearchResults(response.data.Search || []);
    } 
    catch (error) 
    {
      console.error('Error searching for movies:', error);
      setSearchResults([]);
    } 
    finally 
    {
      setIsLoading(false);
    }
  };
  const style = {
    backgroundColor: 'beige',
    color: 'black',
    marginBottom: '10px',
    textAlign: 'center',
  };
  const movieflxstyle = {
    display: 'flex',
    backgroundColor: 'beige',
    color: 'black',
    padding: '10px',
    textAlign: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  };
  return (
    <div className="search-bar" style={style}>
      <input
        type="text"
        placeholder="Search for a movie..."
        value={keyword}
        onChange={handleInputChange}
      />
      <button onClick={handleSearch} disabled={isLoading}>
        {isLoading ? 'Searching...' : 'Search'}
      </button>
      {isLoading && <p>Loading...</p>}
      <div className="search-results" style={movieflxstyle}>
        {searchResults.map((movie) => (
          <div key={movie.imdbID} className="search-result">
            <img src={movie.Poster} alt={movie.Title} />
            <p>{movie.Title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchBar;
