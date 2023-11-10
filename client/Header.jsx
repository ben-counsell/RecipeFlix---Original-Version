import React from 'react'
import SearchBar from './SearchBar'

const Header = () => {

    return (
        <>
        <header>
            <h1> Recipe Book </h1>
            <nav>
                <ul>
                    <li>
                        <a href="/">Home</a>
                    </li>
                    <li>
                        <a href="/favourites">Favourites</a>
                    </li>
                </ul>
            </nav>
        </header>
        < SearchBar />
        </>
    )
}

export default Header