import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import MovieCard from "./MovieCard";

export default function MovieList(props) {
  const [movies, setMovies] = useState([])

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => setMovies(res.data))
      .catch(err => console.log(err.response));
  }, [])


  const handleDelete = (e, id) => {
    e.preventDefault()
    const movie = movies.find(movie => movie.id === id)
    if (window.confirm("Delete this movie?"))
    setMovies(movies.filter(movie=> movie.id !== id))

    axios.delete(`http://localhost:5000/api/movies/${id}`)
      .then(result => {
        console.log(result)
      })
      .catch(error => {
        console.log(error)
      })
  }

    return (
      <div className="movie-list">
        {movies.map(movie => (
          <MovieDetails key={movie.id} movie={movie} handleDelete={handleDelete}/>
        ))}
      </div>
    );
}

function MovieDetails({ movie, handleDelete }) { 

  return (
    <>
    <Link to={`/movies/${movie.id}`}>
      <MovieCard movie={movie} />
    </Link>
      <div className="delete-button" onClick={(e) => handleDelete(e, movie.id)}>
        Delete
        </div>
        </>
  )
}
