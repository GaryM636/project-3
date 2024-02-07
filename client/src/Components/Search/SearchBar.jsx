import React, { useState } from 'react';

function SearchBar({ onSearch }) {
    const [searchTerm, setSearchTerm] = useState('');

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onSearch(searchTerm);
    };

    return (
        <form className='input' onSubmit={handleSubmit}>
            <input
                id='search'
                name='searchBar'
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={handleChange}
            />
            <button type="submit" className="btn fa-solid fa-magnifying-glass"></button>
        </form>
    );
}

export default SearchBar;