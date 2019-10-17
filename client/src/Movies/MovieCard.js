import React from 'react';


const MovieCard = props => {
  debugger
  const { title, director, metascore, stars } = props.movie;
  return (
    <div className="movie-card">
      <h2>{title}</h2>
      <div className="movie-director">
        Director: <em>{director}</em>
      </div>
      <div className="movie-metascore">
        Metascore: <strong>{metascore}</strong>
      </div>
      <h3>Actors</h3>
      {stars &&
        stars.map(star => (
          <div key={star} className='movie-star'>
            <p>{star}</p>
          </div>
        ))}
    </div>
  );
};

export default MovieCard;
