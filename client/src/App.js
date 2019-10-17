import React, { useState, useEffect } from "react";
import { Route, Link } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import axios from 'axios';
import Movie from "./Movies/Movie";
import UpdateMovie from "./Movies/UpdateMovie";
import 'semantic-ui-css/semantic.min.css'

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movies, setMovies] = useState([]);

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };


  useEffect(() => {
    axios
      .get('http://localhost:5008/api/movies')
      .then(res => setMovies(res.data))
      .catch(error => console.log(error));
  }, []);

  return (
    <>
      <SavedList list={savedList} />

      <Link exact to='/update-movies'>
        <div className='button'>Add Movie</div>
      </Link>
      <Route
        exact
        path='/'
        render={props => {
          return <MovieList {...props} movies={movies} />;
        }}
      />
      <Route
        path='/movies/:id'
        render={props => {
          return (
            <Movie
              {...props}
              addToSavedList={addToSavedList}
              setMovies={setMovies}
              movies={movies}
            />
          );
        }}
      />
      <Route
        path= "/update-movies/:id"
        render={props => {
          return <UpdateMovie {...props} movies={movies} setMovies={setMovies} />;
        }}  
      />
    </>
  );
};

export default App;
