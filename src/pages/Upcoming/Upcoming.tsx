import { useEffect, useState } from "react";
import { IMovieResponse, getUpcoming } from "../../services";
import { MovieCard } from "../../components/MovieCard";

const Upcoming: React.FC = () => {
    const [movies, setMovies] = useState<IMovieResponse[]>([]);
    const [loading, setLoading] = useState<boolean>(true);  // Set initial loading state to true
    const [errorMovies, setErrorMovies] = useState<string>("");  // Use string to provide error messages

    const getUp = async () => {
        try {
            const res = await getUpcoming();
            if (res && res.data) {
                console.log(res.data, "res");
                setMovies(res.data.results);
            }
        } catch (err) {
            console.error(err, "err");
            setErrorMovies("Failed to load upcoming movies.");  // Provide a meaningful error message
        }
        setLoading(false);
    };

    useEffect(() => {
        getUp();
    }, []);

    if (loading) return <div className="text-white text-xl p-4 bg-slate-900 min-h-screen flex justify-center items-center">Loading...</div>;
    if (errorMovies) return <div className="text-white text-xl p-4 bg-slate-900 min-h-screen flex justify-center items-center">Error: {errorMovies}</div>;

    return (
        <div className="bg-slate-900 min-h-screen w-full flex flex-row flex-wrap justify-center items-start p-4">
            {movies.map((movie) => (
                <MovieCard
                    key={movie.id}
                    movieId={movie.id}
                    posterPath={movie.poster_path}
                    title={movie.title}
                    voteAverage={movie.vote_average}
                    genreId={movie.genre_ids[0]}
                />
            ))}
        </div>
    );
};

export default Upcoming;
