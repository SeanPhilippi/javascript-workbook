import React, { Component } from 'react';
import './App.css';
import MovieItem from "./components/MovieItem";

class App extends Component {
  state = {
    movies: [],
  }
  componentDidMount() {
    fetch('http://www.omdbapi.com/?i=tt3896198&apikey=d5d74a24')
      // "res" result in json, unconverted from json
      .then(res => res.json())
      .then(data => {
        console.log(data.Actors)

        // const first20 = Title.slice(0, 20);
        // first20.forEach(id => {
        //   fetch('http://www.omdbapi.com/?apikey=d5d74a24&')
        //     .then(Title => Title.json())
        //     .then(Title => {
        //       this.setState({movies: [...this.state.stories, Title]})
        //     })
        // })
      })
  }

  renderMovies() {
    return this.state.movies.map((movie, key) => {
      return <MovieItem key={key} index={key} title={movie.Title}/>
    })
  }
  render() {
    return (
      <div className="Blog">
        {this.renderMovies()}
      </div>
    );
  }
}

export default App;
