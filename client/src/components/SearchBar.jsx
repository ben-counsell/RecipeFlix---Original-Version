import React, { useState, useEffect } from "react";
import apiKey from "../services/apiKey";
const baseURL = 'https://api.spoonacular.com/recipes'

const SearchBar = ({ setSearchResults }) => {
    const [searchTerm, setSearchTerm] = useState("")
    
    const fetchData = (value) => {
        fetch(`${baseURL}/complexSearch?query=${searchTerm}&number=100`, {headers:apiKey})
        .then(response => response.json())
        .then(data => data.results)
        .then(results => setSearchResults(results))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchData(searchTerm)
    }

    const handleChange = (value) => {
        setSearchTerm(value)
    }

    return (
        <div className="search-bar">
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Search for recipe..." value={searchTerm} onChange={e => handleChange(e.target.value)}/>
                <button type="submit"><i className="fa fa-search"></i></button>
            </form>
        </div>
    )

}

export default SearchBar