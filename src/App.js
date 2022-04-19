import React, { useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

//Here we use Fetch API, it returns a promise, that is JS language feature
function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

 async function fetchMoviesHandler() {
  setIsLoading(true);
  setError(null);
  try {
    const responce = await fetch('https://swapi.dev/api/films/')
    if (!responce.ok) {
      throw new Error("Something is wrong")
    }

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
    catch (error){
      setError(error.message)
  }
  setIsLoading(false)
}
 
let content = <p>Found no movies.</p>;

  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;