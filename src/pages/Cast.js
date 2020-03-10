import React, { Component } from "react";
import axios from "axios";
import styles from "./pages.module.css";

class Cast extends Component {
  state = {
    actors: [],
    contentType: this.props.location.state
  };

  async componentDidMount() {
    const { contentType } = this.state;
    const data = await axios.get(
      `${process.env.REACT_APP_BASE_URL}${contentType}/${this.props.match.params.id}/credits?api_key=${process.env.REACT_APP_API_KEY}`
    );

    this.setState({
      actors: data.data.cast
    });
  }

  render() {
    const { actors } = this.state;
    return (
      <ul className={styles.actorList}>
        {actors.map(
          actor =>
            actor.profile_path && (
              <li key={actor.id} className={styles.actorListItem}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                  alt=""
                  className={styles.actorImage}
                />
                <p>{actor.name}</p>
              </li>
            )
        )}
      </ul>
    );
  }
}

export default Cast;
