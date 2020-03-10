import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import queryString from 'query-string';

class Movies extends Component {
  state = {
    searchValue: '',
    movies: []
  };

  async componentDidMount() {
    const urlSeachValue = queryString.parse(this.props.location.search);
    if (Object.keys(urlSeachValue).length !== 0) {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}search/movie?query=${urlSeachValue.query}&api_key=${process.env.REACT_APP_API_KEY}&page=1`
      );
      this.setState({
        searchValue: urlSeachValue.query,
        movies: response.data.results
      });
    }
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.getMovies();
    this.props.history.push({
      ...this.props.location,
      search: `query=${this.state.searchValue}`
    });

    this.setState({
      searchValue: ''
    });
  };

  getMovies = async () => {
    const { searchValue } = this.state;
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}search/movie?query=${searchValue}&api_key=${process.env.REACT_APP_API_KEY}&page=1`
    );
    if (response.data.results.length !== 0) {
      this.setState({
        movies: response.data.results
      });
    } else {
      alert(
        "Woops... ( ._.) looks like this page doesn't exist. Please check your spelling."
      );
    }
  };

  render() {
    const { searchValue, movies } = this.state;
    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <input
            name='searchValue'
            value={searchValue}
            onChange={this.handleChange}
            type='text'
            placeholder='Search movies'
          />
          <button type='submit'>Search</button>
        </form>
        {movies.length !== 0 && (
          <ul>
            {movies.map(movie => (
              <li key={movie.id}>
                <Link
                  to={{
                    pathname: `/movie/${movie.id}`,
                    state: { from: this.props.location }
                  }}
                >
                  {movie.title || movie.name}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </>
    );
  }
}

export default Movies;
