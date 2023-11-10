import React from 'react'
import SearchBar from './SearchBar'

const Header = ({ setSearchResults }) => {

    return (
        <>
        <header>
            <a href="/"><h1> RecipeFlix </h1></a>
            <nav>
                <ul>
                    <li>
                        <a href="/"></a>
                    </li>
                    <li>
                        <a href="/favourites"></a>
                    </li>
                </ul>
            </nav>
        </header>
        < SearchBar setSearchResults={setSearchResults} />
        </>
    )
}

export default Header