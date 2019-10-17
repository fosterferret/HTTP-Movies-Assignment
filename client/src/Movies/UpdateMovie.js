import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Header, Button, Form } from "semantic-ui-react";

const initialData = {
  title: "",
  director: "",
  metascore: 0,
  stars: ""
};

const UpdateMovie = props => {
  const [movie, setMovie] = useState(initialData);
  const { match } = props;

  useEffect(() => {
    axios
      .get(`http://localhost:5008/api/movies/${match.params.id}`)
      .then(res => setMovie(res.data))
      .catch(err => console.log(err.response));
  }, [match.params.id]);

  const onChangeHandler = event => {
    event.persist();
    setMovie({
      ...movie,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .put(`http://localhost:5008/api/movies/${match.params.id}`, movie)
      .then(res => {
        setMovie(initialData);
        props.updateMovies(res.data);
        props.history.push("/");
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
            value={movie.title}
          />
        </Form.Field>
        <Form.Field>
          <label>Director</label>
          <input
            type="text"
            name="director"
            onChange={onChangeHandler}
            placeholder="director"
            value={movie.director}
          />
        </Form.Field>
        <Form.Field>
          <label>Metascore</label>
          <input
            type="number"
            name="metascore"
            onChange={onChangeHandler}
            placeholder="metascore"
            value={movie.metascore}
          />
        </Form.Field>
        <Form.Field>
          <label>Actors</label>
          <input
            type="text"
            name="stars"
            onChange={onChangeHandler}
            placeholder="stars"
            value={Array.from(movie.stars).join(", ")}
          />
        </Form.Field>

        <Button type="submit">Update Movie</Button>
      </Form>
    </Container>
  );
};

export default UpdateMovie;
