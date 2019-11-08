import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UpdateList(props) {
    const [updatedList, setUpdatedList] = useState({
        id: [],
        title: '', 
        director: '',
        metascore: [],
        stars: '',
    })

    useEffect(() => {
        axios.get(`http://localhost:5000/api/movies/${props.match.params.id}`)
        .then((result) => {
            setUpdatedList(result.data)
        })
        .catch((error) => {
            console.log(error)
        })
    }, [props.match.params.id])

    const handleChange = (e) => {
        setUpdatedList({
            ...updatedList, 
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault() 

        axios.put(`/update-movie/:id${updatedList}`, updatedList)
            .then((result) => {
                props.history.push('/movies')
            })
            .catch((error) => {
                console.log(error)
            })
        }

    return (
        <div>
            <h3>Update Movie List</h3>
            <form onSubmit={handleSubmit}>
                <input type='text' name='name' placeholder='Movie Title' value={updatedList.name} onChange={handleChange} />
            </form>
            <button type='submit'>Update</button>
        </div>
    )
}

export default UpdateList