import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateMovie = (props) => {

    const initialValues = {
        title: "",
        director: "",
        metascore: "",
        stars: ""
    }

    const [values, setValues] = useState(initialValues)

    const onChangeHandler = (e) => {
        return setValues({...values, [e.target.name]:e.target.value});
    }

    useEffect(() => {
        setValues({...values,...props.movies.filter(el => el.id == props.match.params.id)[0]});
    },[props.movies, props.match])

    const handleSubmit = e => {
        e.preventDefault();
        axios
            .put(`http://localhost:5008/api/movies/${values.id}`, values)
            .then(res => {
                props.history.push(`/movies/${values.id}`);
                console.log(res);
            })
            .catch(err => console.log(err));
    };

    return(
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name='title'
                onChange={onChangeHandler}
                value={values.title}
                placeholder='title'
                
            />

            <input
                type="text"
                name='director'
                placeholder='director'
                onChange={onChangeHandler}
                value={values.director}
            />
            <input
                type="text"
                name='metascore'
                placeholder='metascore'
                onChange={onChangeHandler}
                value={values.metascore}
            />
            <input
                type="text"
                name='actors'
                placeholder='actors'
                onChange={onChangeHandler}
                value={Array.from(values.stars).join(", ")}
            />
            <button type='submit'>Submit</button>
        </form>
    )
}

export default UpdateMovie;