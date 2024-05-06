import React, { useEffect, useState } from 'react';
import { IMovieResponse } from '../../services/movies/types';
import { getNowPlayingMovies } from '../../services/movies/getNowPlayingMovies';
import { MovieCard } from '../../components/MovieCard';

const NowPlaying: React.FC = () => {
  const [movies, setMovies] = useState<IMovieResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMovies, setErrorMovies] = useState<boolean>(false);

  const getNowPlaying = async () => {
    await getNowPlayingMovies()
    .then((res) => {
      if (res && res.data) {
        console.log(res.data, "res");
        setMovies(res.data.results);
      }
    })
    .catch((err) => {
      console.log(err, "err");
    });
  setLoading(false);
};

useEffect(() => {
  setLoading(true);
  getNowPlaying();
}, []);
return (
  <div className='ml-5'>
    <h1 className='text-5xl font-bold'>Now Playing Movies</h1>
    {loading && <p>Loading...</p>}
    {errorMovies && <p>Something went wrong...</p>}
    <div className='grid grid-cols-5 flex space-y-2 mt-4'>
      {movies && movies.length > 0 && movies.map((movie) => (
        <MovieCard
          key={movie.id}
          title={movie.title}
          posterPath={movie.poster_path}
          voteAverage={movie.vote_average}
          movieId={movie.id}
          genreId={movie.genre_ids[0]} // Removed empty square brackets
          sinopsis={''}
          runtime={0}
          year={0}
        />
      ))}
    </div>
  </div>
);
}

export default NowPlaying;