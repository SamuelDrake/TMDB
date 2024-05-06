import { useEffect, useState } from "react";
import { IMovieResponse, getTopRated } from "../../services";
import { MovieCard } from "../../components/MovieCard";

const TopRated: React.FC = () => {
    const [movies, setMovies] = useState<IMovieResponse[]>([]);
    const [loading, setLoading] = useState<boolean>(true);  // Should start as true to show loading initially
    const [errorMovies, setErrorMovies] = useState<string>("");

    const getTop = async () => {
        try {
            const res = await getTopRated();
            if (res && res.data) {
                console.log(res.data, "res");
                setMovies(res.data.results);
            }
        } catch (err) {
            console.error(err, "err");
            setErrorMovies("Failed to load top-rated movies.");
        }
        setLoading(false);
    };

    useEffect(() => {
        getTop();
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

export default TopRated;
