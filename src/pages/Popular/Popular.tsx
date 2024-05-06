import { useEffect, useState } from "react";
import { IMovieResponse, getPopularMovies } from "../../services";
import { MovieCard } from "../../components/MovieCard";

const Popular: React.FC = () => {
    const [movies, setMovies] = useState<IMovieResponse[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [errorMovies, setErrorMovies] = useState<string>("");

    const getPopular = async () => {
        const result = await getPopularMovies();
        if (result.error) {
            setErrorMovies(result.error);
            setLoading(false);
            return;
        }
        setMovies(result.data.results);
        setLoading(false);
    };

    useEffect(() => {
        getPopular();
    }, []);

    if (loading) return <div className="text-white text-xl p-4 bg-slate-900 min-h-screen flex justify-center items-center">Loading...</div>;
    if (errorMovies) return <div className="text-white text-xl p-4 bg-slate-900 min-h-screen flex justify-center items-center">Error: {errorMovies}</div>;

    return (
        <div className="bg-slate-900 min-h-screen w-full flex flex-row flex-wrap justify-center items-start p-4">
            {movies.map((movie, index) => (
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

export default Popular;
