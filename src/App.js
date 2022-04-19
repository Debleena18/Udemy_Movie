import React, { useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

//Here we use Fetch API, it returns a promise, that is JS language feature
function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

 async function fetchMoviesHandler() {
  setIsLoading(true);
  const responce = await fetch('https://swapi.dev/api/films/')
  const data = await responce.json();
  
//Since in Backend i.e abouve link the names of few props are different so we need to transform names.
        const transformedMovies = data.results.map((movieData) => {
          return {
            id: movieData.episode_id,
            title: movieData.title,
            openingText: movieData.opening_crawl,
            releaseDate: movieData.release_date,
          };
        });
        setMovies(transformedMovies);
        setIsLoading(false);
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
        {!isLoading && movies.length === 0 && <p>Found no movies.</p>}
        {isLoading && <p>Loading...</p>}
      </section>
    </React.Fragment>
  );
}

export default App;