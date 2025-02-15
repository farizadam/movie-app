import { useEffect, useState } from "react";
import axios from "axios";
import CardElement from "./CardElement";

function MovieList() {
  const [movies, setMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);  // To store popular movies
  const [searchQuery, setSearchQuery] = useState("");  // State for search query
  const [loading, setLoading] = useState(false);

  // Fetching movies based on a search query
  const fetchMovies = (query) => {
    setLoading(true);
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=9c0ca86479176e7cf2161cb6d93dfb45&query=${query}`
      )
      .then((response) => {
        setMovies(response.data.results);  // Set search results
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
        setLoading(false);
      });
  };

  // Fetch popular movies on initial load
  useEffect(() => {
    setLoading(true);
    axios
      .get(
        "https://api.themoviedb.org/3/movie/popular?api_key=9c0ca86479176e7cf2161cb6d93dfb45"
      )
      .then((response) => {
        setPopularMovies(response.data.results);  // Set popular movies
        setMovies(response.data.results);  // Initially display popular movies
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching popular movies:", error);
        setLoading(false);
      });
  }, []);

  // Handle the search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle form submission for search
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      fetchMovies(searchQuery);  // Fetch search results if the query is not empty
    } else {
      setMovies(popularMovies);  // Show popular movies again if the search is empty
    }
  };

  return (
    <div className="movie-list">
      {/* Search Input */}
      <form onChange={handleSearchSubmit}>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search for movies..."
        />
        <button type="submit">Search</button>
      </form>

      {/* Movie Grid */}
      <div className="movies-grid">
        {loading ? (
          <p>Loading...</p>
        ) : movies.length > 0 ? (
          movies.map((movie) => <CardElement key={movie.id} movie={movie} />)
        ) : (
          <p>No movies found.</p>
        )}
      </div>
    </div>
  );
}

export default MovieList;
