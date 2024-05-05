import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { IDetailsResponse, getDetailsMovies } from "../../services";
import { IMAGE_SOURCE } from "../../constants/moviesMock";
import imdbLogo from '../../Pelisplus.jpeg';

const Show = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [movie, setMovie] = useState<IDetailsResponse | null>(null);
    const [isFavorite, setIsFavorite] = useState<boolean>(false);

    useEffect(() => {
        const movieId = id ? parseInt(id) : 0;
        if (movieId) {
            getDetailsMovies(movieId).then((res) => {
                if (res && res.data) {
                    setMovie(res.data);
                }
            });
        }

        // Verificar si la película está en favoritos al cargar el componente
        const favs = JSON.parse(localStorage.getItem('favorites') || '[]');
        setIsFavorite(favs.includes(id));
    }, [id]);

    const handleFavoriteToggle = () => {
        let favs = JSON.parse(localStorage.getItem('favorites') || '[]');
        const index = favs.indexOf(id);
        if (index > -1) {
            favs.splice(index, 1);  // Remove favorite
        } else {
            favs.push(id);  // Add favorite
        }
        localStorage.setItem('favorites', JSON.stringify(favs));
        setIsFavorite(!isFavorite);
    };

    const handleIMDBClick = () => {
        const searchUrl = `https://ww3.pelisplus.to/search/${encodeURIComponent(movie?.original_title ?? '')}`;
        window.open(searchUrl, '_blank');
    };

    return (
        <div className="bg-slate-900 min-h-screen text-white flex items-center justify-center p-10">
            <div className="shadow-2xl rounded-3xl overflow-hidden flex flex-col md:flex-row">
                <img className="w-full md:w-96" src={IMAGE_SOURCE + movie?.poster_path} alt="Movie Poster" />
                <div className="p-6 flex flex-col justify-between">
                    <div>
                        <p className="text-3xl font-bold mb-4">{movie?.title} ({movie?.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'})</p>
                        <p>{movie?.overview}</p>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                        <button onClick={handleIMDBClick} className="flex items-center">
                            <img src={imdbLogo} alt="IMDB Logo" className="w-24 h-24 cursor-pointer" />
                        </button>
                        <div>
                            <button className="bg-blue-800 hover:bg-blue-700 rounded-lg px-4 py-2 mr-2" onClick={() => navigate(-1)}>
                                Ir atrás
                            </button>
                            {isFavorite ? (
                                <button className="bg-red-500 hover:bg-red-400 rounded-lg px-4 py-2" onClick={handleFavoriteToggle}>
                                    Remove Favorite
                                </button>
                            ) : (
                                <button className="bg-green-500 hover:bg-green-400 rounded-lg px-4 py-2" onClick={handleFavoriteToggle}>
                                    Add Favorite
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Show;
