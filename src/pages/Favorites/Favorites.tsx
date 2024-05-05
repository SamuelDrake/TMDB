import { useEffect, useState } from "react";
import { IDetailsResponse, getDetailsMovies } from "../../services";
import { MovieCard } from "../../components/MovieCard";

const Favorites = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [shows, setShows] = useState<IDetailsResponse[]>([]);
    const favorites: string = localStorage.getItem("favorites") || "";

    const runGetFavorites = async () => {
        if (favorites.length) {
            const favoritesArray = JSON.parse(favorites);
            const newShows = await Promise.all(
                favoritesArray.map(async (favoriteId: number) => {
                    return getDetailsMovies(favoriteId)
                        .then((res) => {
                            if (res && res.data) {
                                return res.data;
                            }
                        }).catch((err) => {
                            console.log(err, "err");
                        });
                })
            );
            setShows(newShows);
            setLoading(false);
        }
    };

    useEffect(() => {
        setLoading(true);
        runGetFavorites();
    }, [])
    return (
        <div className="w-screen flex flex-row flex-wrap justify-center items-start m-2 bg-slate-900">
            {loading && <div> Loading... </div>}
            {shows.map((movie: IDetailsResponse) => (
                                <MovieCard
                                    key={movie.id}
                                    movieId={movie.id}
                                    posterPath={movie.poster_path}
                                    title={movie.title}
                                    voteAverage={movie.vote_average}
                                    genreId={movie.genres[0].id}
                                />
                            ))}
        </div>
    );
}

export default Favorites;