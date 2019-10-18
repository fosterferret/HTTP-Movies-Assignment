import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Header, Button, Form } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

const initialData = {
  title: "",
  director: "",
  metascore: 0,
  stars: []
};

const UpdateMovie = props => {
  const [movieToEdit, setMovieToEdit] = useState(initialData);
  const { match, movies } = props;

  useEffect(() => {
    axios
      .get(`http://localhost:5008/api/movies/${match.params.id}`)
      .then(res => setMovieToEdit(res.data))
      .catch(err => console.log(err.response));
  }, [match.params.id]);

  const onChangeHandler = event => {
    event.persist();
    setMovieToEdit({
      ...movieToEdit,
      [event.target.name]: event.target.value
    });
  };

  const handleStars = e => {
    const newStars = [...movieToEdit.stars];
    const starIndex = e.target.placeholder.slice(
      e.target.placeholder.length - 1
    ); 
    newStars[starIndex] = e.target.value;
    setMovieToEdit({ ...movieToEdit, stars: newStars });
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .put(`http://localhost:5008/api/movies/${match.params.id}`, movieToEdit)
      .then(res => {
        // setMovie(initialData);
        props.setMovies(res.data);
        props.history.push(`/movies/${movieToEdit.id}`);
      })
      .catch(err => console.log(err));
  };

  return (
    <Container text>
      <Header as="h2">Update Movie</Header>
      <Form onSubmit={handleSubmit}>
        <Form.Field>
          <label>Movie title</label>
          <input
            type="text"
            name="title"
            onChange={onChangeHandler}
            placeholder="title"
            value={movieToEdit.title}
          />
        </Form.Field>
        <Form.Field>
          <label>Director</label>
          <input
            type="text"
            name="director"
            onChange={onChangeHandler}
            placeholder="director"
            value={movieToEdit.director}
          />
        </Form.Field>
        <Form.Field>
          <label>Metascore</label>
          <input
            type="number"
            name="metascore"
            onChange={onChangeHandler}
            placeholder="metascore"
            value={movieToEdit.metascore}
          />
        </Form.Field>
        <Form.Field>
          <label>Actors</label>
          {movieToEdit.stars.map((star, i) => (
            <>
              <input
                key={i}
                onChange={handleStars}
                placeholder={`star-${i}`}
                name="star"
                value={star}
              />
              <br />
            </>
          ))}
        </Form.Field>

        <Button type="submit">Update Movie</Button>
      </Form>
    </Container>
  );
};

export default UpdateMovie;
