import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


const IMG_API = "https://image.tmdb.org/t/p/w500/";

function MovieDetails() {
    const { id } = useParams(); // Get the movie ID from the URL
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [cast, setCast] = useState([]);

    useEffect(() => {
        setLoading(true);
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=YOUR_API_KEY`)
            .then((response) => response.json())
            .then((data) => {
                setMovie(data); // Set the detailed movie data
                return fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=YOUR_API_KEY`);
            })
            .then((response) => response.json())
            .then((data) => {
                setCast(data.cast.slice(0, 5)); // Get top 5 cast members
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching movie details:", error);
                setLoading(false);
            });
    }, [id]); // Fetch movie details when the ID changes

    if (loading) return <p>Loading...</p>;
    if (!movie) return <p>Movie not found</p>;

    return (
        <div className="movie-details">
            <h1>{movie.title}</h1>
            <img src={IMG_API + movie.poster_path} alt={movie.title} />
            <p>{movie.overview}</p>
            <p><strong>Release Date:</strong> {movie.release_date}</p>
            <p><strong>Rating:</strong> {movie.vote_average}/10</p>
            <p><strong>Genres:</strong> {movie.genres.map(genre => genre.name).join(", ")}</p>
            <p><strong>Duration:</strong> {movie.runtime} minutes</p>
            <p><strong>Cast:</strong> {cast.map(actor => actor.name).join(", ")}</p>
        </div>
    );
}

export default MovieDetails;
