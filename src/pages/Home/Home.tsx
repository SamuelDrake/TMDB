import React, { useEffect, useState } from 'react';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import { MovieCard } from '../../components/MovieCard';
import { movies as mockMovies } from '../../constants/moviesMock';
import {
    IMovieResponse,
    getPopularMovies,
    getTopRated,
    getUpcoming,
} from '../../services';

const Home = () => {
    const [popularMovies, setPopularMovies] = useState<IMovieResponse[]>([]);
    const [topRatedMovies, setTopRatedMovies] = useState<IMovieResponse[]>([]);
    const [upcomingMovies, setUpcomingMovies] = useState<IMovieResponse[]>([]);
    const [loading, setLoading] = useState(true);

    const [sliderRef] = useKeenSlider({
        loop: true,
        mode: "free-snap",
        slides: {
            perView: 5,
            spacing: 10,
        },
    });

    useEffect(() => {
        const loadMovies = async () => {
            setLoading(true);
            const popular = await getPopularMovies();
            const topRated = await getTopRated();
            const upcoming = await getUpcoming();

            if (popular.data) setPopularMovies(popular.data.results);
            if (topRated.data) setTopRatedMovies(topRated.data.results);
            if (upcoming.data) setUpcomingMovies(upcoming.data.results);
            
            setLoading(false);
        };

        loadMovies();
    }, []);

    return (
        <div className='mar-4 container mx-auto px-4 bg-slate-900'>
            <h2 className="text-4xl font-bold text-center mb-8 text-rose-50">Recomendaciones</h2>
            <div ref={sliderRef} className="keen-slider">
                {mockMovies.map((movie) => (
                    <div key={movie.id} className="keen-slider__slide rounded-lg shadow-xl" style={{ minWidth: '300px' }}>
                        <MovieCard
                            movieId={movie.id}
                            posterPath={movie.poster_path}
                            title={movie.title}
                            voteAverage={movie.vote_average}
                            genreId={movie.genre_ids[0]}
                        />
                    </div>
                ))}
            </div>
            <h2 className="text-4xl font-bold text-center mb-8 mt-12 text-rose-50">Popular</h2>
            <div ref={sliderRef} className="keen-slider">
                {popularMovies.map((movie) => (
                    <div key={movie.id} className="keen-slider__slide rounded-lg shadow-xl" style={{ minWidth: '300px' }}>
                        <MovieCard
                            movieId={movie.id}
                            posterPath={movie.poster_path}
                            title={movie.title}
                            voteAverage={movie.vote_average}
                            genreId={movie.genre_ids[0]}
                        />
                    </div>
                ))}
            </div>
            <h2 className="text-4xl font-bold text-center mb-8 mt-12 text-rose-50">Top Rated</h2>
            <div ref={sliderRef} className="keen-slider">
                {topRatedMovies.map((movie) => (
                    <div key={movie.id} className="keen-slider__slide rounded-lg shadow-xl" style={{ minWidth: '300px' }}>
                        <MovieCard
                            movieId={movie.id}
                            posterPath={movie.poster_path}
                            title={movie.title}
                            voteAverage={movie.vote_average}
                            genreId={movie.genre_ids[0]}
                        />
                    </div>
                ))}
            </div>
            <h2 className="text-4xl font-bold text-center mb-8 mt-12 text-rose-50">Upcoming</h2>
            <div ref={sliderRef} className="keen-slider">
                {upcomingMovies.map((movie) => (
                    <div key={movie.id} className="keen-slider__slide rounded-lg shadow-xl" style={{ minWidth: '300px' }}>
                        <MovieCard
                            movieId={movie.id}
                            posterPath={movie.poster_path}
                            title={movie.title}
                            voteAverage={movie.vote_average}
                            genreId={movie.genre_ids[0]}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
