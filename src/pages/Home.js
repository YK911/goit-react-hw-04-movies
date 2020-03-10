import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Home extends Component {
  state = {
    movies: [],
  };

  async componentDidMount() {
    const data = await axios(
      `${process.env.REACT_APP_BASE_URL}trending/movie/week?api_key=${process.env.REACT_APP_API_KEY}`
    );
    await this.setState({
      movies: data.data.results,
    });
  }

  render() {
    const { movies} = this.state;
    return (
      <>
        <h2>Trending today</h2>
        <ul>
          {movies.map(movie => (
            <li key={movie.id}>
              <Link
                to={{
                  pathname: `/:movie/${movie.id}`,
                  state: { from: this.props.location }
                }}
              >
                {movie.title || movie.name}
              </Link>
            </li>
          ))}
        </ul>
      </>
    );
  }
}

export default Home;
