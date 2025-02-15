import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MovieList from "./MovieList";
import MovieDetails from "./MovieDetails"; // Import the MovieDetails component

function App() {
  return (
    <Router>
      <Routes>
        {/* Route to display the movie list */}
        <Route path="/" element={<MovieList />} />

        {/* Route to display the movie details */}
        <Route path="/movie/:id" element={<MovieDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
