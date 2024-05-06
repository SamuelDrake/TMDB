import { useEffect, useState } from "react";
import { IDetailsResponse, getDetailsMovies } from "../../services";
import { MovieCard } from "../../components/MovieCard";

const Favorites = () => {
    const [loading, setLoading] = useState(true);
    const [shows, setShows] = useState<IDetailsResponse[]>([]);

    useEffect(() => {
        const favorites = localStorage.getItem("favorites") || "[]";
        const favoritesArray = JSON.parse(favorites);

        const runGetFavorites = async () => {
            if (favoritesArray.length) {
                const newShows = await Promise.all(
                    favoritesArray.map(async (favoriteId: number) => {
                        try {
                            const res = await getDetailsMovies(favoriteId);
                            return res && res.data ? res.data : undefined;
                        } catch (err) {
                            console.error(err);
                            return undefined;
                        }
                    })
                );
                setShows(newShows.filter((show): show is IDetailsResponse => show !== undefined));
            }
            setLoading(false);
        };

        runGetFavorites();
    }, []);

    return (
        <div className="bg-slate-900 min-h-screen w-full flex flex-row flex-wrap justify-center items-start p-4">
            {loading ? (
                <div className="text-white text-xl">Loading...</div>
            ) : shows.length > 0 ? (
                shows.map((movie: IDetailsResponse) => (
                    <MovieCard
                        key={movie.id}
                        movieId={movie.id}
                        posterPath={movie.poster_path}
                        title={movie.title}
                        voteAverage={movie.vote_average}
                        genreId={movie.genres[0].id}
                    />
                ))
            ) : (
                <div className="text-white text-xl">No favorites added yet.</div>
            )}
        </div>
    );
}

export default Favorites;
