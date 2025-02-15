import { useNavigate } from "react-router-dom";

function CardElement({ movie }) {
  const navigate = useNavigate();

  const handleMoreInfoClick = () => {
    navigate(`/movie/${movie.id}`);
  };

  return (
    <div className="card-container">
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
      />
      <h1 className="card-title">{movie.title}</h1>
      <p className="card-rating">Rating: {movie.vote_average}/10</p>
      
      {/* Button to navigate to movie details page */}
      <button onClick={handleMoreInfoClick} className="info-button">
        More Info
      </button>
    </div>
  );
}

export default CardElement;
