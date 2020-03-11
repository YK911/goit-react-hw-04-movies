import React, { Component, Suspense, lazy } from "react";
import { Link, Route, Switch } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/spinner/Spinner";
import styles from "./pages.module.css";

const LazyCast = lazy(() =>
  import(/* webpackChunkName: "cast-page" */ "./Cast" )
);

const LazyReviews = lazy(() =>
  import(/* webpackChunkName: "reviews-page" */ "./Reviews" )
);

const getContentType = value => {
  return value ? value : "movie";
};

class MoviePage extends Component {
  state = {
    data: [],
    contentType: getContentType(this.props.location.state.from.contentType),
    prevLocation: ""
  };

  async componentDidMount() {
    const { match } = this.props;
    const { contentType } = this.state;
    const data = await axios.get(
      `${process.env.REACT_APP_BASE_URL}${contentType}/${match.params.id}?api_key=${process.env.REACT_APP_API_KEY}`
    );
    this.setState({
      data: data.data,
      prevLocation: this.props.location.state.from
    });
  }

  handleClick = () => {
    const { prevLocation } = this.state;
    const { history } = this.props;
    if (prevLocation) {
      history.push(prevLocation);
    } else {
      history.push("/");
    }
  };

  render() {
    const { data, contentType } = this.state;
    if (contentType !== "person") {
      return (
        <div>
          <div className={styles.detailsPage}>
            <div>
              <button onClick={this.handleClick} className={styles.backBtn}>
                Go Back
              </button>
              <img
                className={styles.poster}
                src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
                alt={data.title}
              />
            </div>
            <div className={styles.detailsInfo}>
              <h3>{data.title || data.name}</h3>
              <p>User score: {Math.round(data.vote_average * 10)}%</p>
              <h4>Overview</h4>
              <p>{data.overview}</p>
              <h4>Genres</h4>
              {data.genres &&
                data.genres.map(item => (
                  <span key={item.id}>{item.name} </span>
                ))}
            </div>
          </div>
          <div>
            <p>Additional Information</p>
            <ul>
              <li>
                <Link
                  to={{
                    pathname: `/${contentType}/${data.id}/cast`,
                    state: contentType
                  }}
                >
                  Cast
                </Link>
              </li>
              <li>
                <Link
                  to={{
                    pathname: `/${contentType}/${data.id}/reviews`,
                    state: contentType
                  }}
                >
                  Reviews
                </Link>
              </li>
            </ul>
            <Suspense fallback={<Spinner />}>
              <Switch>
                <Route path={`/${contentType}/:id/cast`} component={LazyCast} />
                <Route
                  path={`/${contentType}/:id/reviews`}
                  component={LazyReviews}
                />
              </Switch>
            </Suspense>
          </div>
        </div>
      );
    } else {
      const birthTime = Date.parse(data.birthday);
      const birthFullDate = new Date(birthTime);
      const month = birthFullDate.getMonth();
      const date = birthFullDate.getDate();
      const year = birthFullDate.getFullYear();
      const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ];
      const age = Math.floor((Date.now() - birthTime) / 31536000000);
      const deathYear = new Date(Date.parse(data.deathday)).getFullYear();
      return (
        <>
          <div className={styles.detailsPage}>
            <div>
              <button onClick={this.handleClick} className={styles.backBtn}>
                Go Back
              </button>
              <img
                className={styles.poster}
                src={`https://image.tmdb.org/t/p/w500${data.profile_path}`}
                alt={data.title}
              />
            </div>
            <div className={styles.detailsInfo}>
              <h3>{data.name}</h3>
              <p>
                <b>Born:</b> {monthNames[month]} {date}, {year}{" "}
                {deathYear ? (
                  <span>- {deathYear}</span>
                ) : (
                  <span>({age} years)</span>
                )}
              </p>
              <p className={styles.detailsPara}>{data.biography}</p>
            </div>
          </div>
        </>
      );
    }
  }
}

export default MoviePage;
