import React, { useEffect, useState } from "react";
import Movie from "./components/Movie";
import "./index.css";

const FEATURED_API =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const SEARCH_API =
  "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getMovies(FEATURED_API);
  }, []);

  const getMovies = (API) => {
    fetch(API)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results);
      });
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();

    if (searchTerm) {
      getMovies(SEARCH_API + searchTerm);
      setSearchTerm("");
    }
  };

  const handleOnChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      <header>
        <form onSubmit={handleOnSubmit}>
          <input
            className="search"
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleOnChange}
          />
        </form>
      </header>
      <div className="movie-container">
        {movies.length > 0 &&
          movies.map((movie) => <Movie key={movie.id} {...movie} />)}
      </div>
      <footer>
        This project was coded by{" "}
        <a
          href="https://www.linkedin.com/in/jasmine-poole-421b101b7/"
          target="_blank"
          className="linkedIn"
          rel="noopener noreferrer"
        >
          Jasmine Poole
        </a>{" "}
        and is{" "}
        <a
          href="https://github.com/J2N8/movie-app"
          target="_blank"
          className="github"
          rel="noopener noreferrer"
        >
          open-sourced on GitHub
        </a>{" "}
        <a
          href="https://movieapp-reactjs-jp.netlify.app/"
          target="_blank"
          className="netlify"
          rel="noopener noreferrer"
        >
          hosted on Netlify
        </a>
      </footer>
    </div>
  );
}

export default App;
