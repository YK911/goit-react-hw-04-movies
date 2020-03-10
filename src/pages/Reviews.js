import React, { Component } from 'react';
import axios from 'axios';

class Reviews extends Component {
  state = {
    reviews: [],
    contentType: this.props.location.state
  };

  async componentDidMount() {
    const { contentType } = this.state;
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}${contentType}/${this.props.match.params.id}/reviews?api_key=${process.env.REACT_APP_API_KEY}&page=1`
    );
    this.setState({
      reviews: response.data.results
    });
  }

  render() {
    const { reviews } = this.state;
    return reviews.length === 0 ? (
      <p>
        We don't have any reviews for this movie
      </p>
    ) : (
      <ul>
        {reviews.map(review => (
          <li key={review.id}>
            <h4>{review.author}</h4>
            <p>{review.content}</p>
          </li>
        ))}
      </ul>
    );
  }
}

export default Reviews;
