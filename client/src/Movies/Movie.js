import React from "react";
import axios from "axios";
import MovieCard from "./MovieCard";
import { Container, Header, Button, Form } from "semantic-ui-react";


export default class Movie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: null
    };
  }

  componentDidMount() {
    this.fetchMovie(this.props.match.params.id);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.match.params.id !== newProps.match.params.id) {
      this.fetchMovie(newProps.match.params.id);
    }
  }

  fetchMovie = id => {
    axios
      .get(`http://localhost:5008/api/movies/${id}`)
      .then(res => this.setState({ movie: res.data }))
      .catch(err => console.log(err.response));
  };

  saveMovie = () => {
    const addToSavedList = this.props.addToSavedList;
    addToSavedList(this.state.movie);
  };

  handleDelete = id => {
    axios
      .delete(`http://localhost:5008/api/movies/${id}`)
      .then(res => {
        this.props.setMovies(
          this.props.movies.filter(movie => movie.id !== res.data)
        );
        this.props.history.push(`/`);
      })
      .catch(err => console.log(err.response));
  };

  render() {
    if (!this.state.movie) {
      return <div>Loading movie information...</div>;
    }

    return (
      <div className="save-wrapper">
        <MovieCard movie={this.state.movie} />
        <Button
          onClick={() =>
            this.props.history.push(`/update-movies/${this.state.movie.id}`)
          }
        >
          Update Movie
        </Button>
        <Button
          className="button"
          onClick={() => this.handleDelete(this.state.movie.id)}
        >
          Delete Movie
        </Button>
        <Button className="button" onClick={this.saveMovie}>
          Save
        </Button>
      </div>
    );
  }
}
