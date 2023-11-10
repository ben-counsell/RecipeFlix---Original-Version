import Home from "../components/Home"
import Recipe from "../components/Recipe"
import {Route, Routes, BrowserRouter} from "react-router-dom"

function RecipeContainer({carouselRecipes, filteredResults, user, newFavourite, removeFavourite}) {

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home carouselRecipes={carouselRecipes} filteredResults={filteredResults}/>}/>
                    <Route path="/recipe/:id" element={<Recipe user={user} newFavourite={newFavourite} removeFavourite={removeFavourite}/>}/>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default RecipeContainer