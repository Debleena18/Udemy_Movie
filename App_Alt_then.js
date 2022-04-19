import React, { useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

//Here we use Fetch API
function App() {
  const [movies, setMovies] = useState([]);

  function fetchMoviesHandler() {
    fetch('https://swapi.dev/api/films/')
      .then((response) => {
        return response.json();
      })
      
//Since in Backend i.e abouve link the names of few props are different so we need to transform names.
      .then((data) => {
        const transformedMovies = data.results.map((movieData) => {
          return {
            id: movieData.episode_id,
            title: movieData.title,
            openingText: movieData.opening_crawl,
            releaseDate: movieData.release_date,
          };
        });
        setMovies(transformedMovies);
      });
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        <MoviesList movies={movies} />
      </section>
    </React.Fragment>
  );
}

export default App;