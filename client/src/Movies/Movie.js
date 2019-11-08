import React, { useState } from "react";
import axios from "axios";
import MovieCard from "./MovieCard";

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
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => this.setState({ movie: res.data }))
      .catch(err => console.log(err.response));
  };

  saveMovie = () => {
    const addToSavedList = this.props.addToSavedList;
    addToSavedList(this.state.movie);
  };

  render() {
    if (!this.state.movie) {
      return <div>Loading movie information...</div>;
    }

    const [updateList, setUpdateList] = useState({
      id: [],
    })

    const handleDelete = (e, id) => {
      e.preventDefault()
      const list = updateList.find(list => list.id === id)

      if (window.confirm('Delete Movie from list?')) {
        setUpdateList(updateList.filter(list => list.id !== id))

        axios.delete(`/movies${id}`)
          .then(result => {
            console.log("Movie was deleted")
          })
          .catch(error => {
            console.log(error)
            setUpdateList([...updateList, list])
          })
      }
    }

    return (
      <>
      <div className="save-wrapper">
        <MovieCard movie={this.state.movie} />
        <div className="save-button" onClick={this.saveMovie}>
          Save
        </div>
          <div
            className="delete-button" onClick={(e) => handleDelete(e, list.id)}>
            Delete
        </div>
        />
      </div>
      </>
    );
  }
}
