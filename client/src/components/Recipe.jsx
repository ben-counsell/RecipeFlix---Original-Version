import apiKey from "../services/apiKey";
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom'
import { BsHeartFill, BsHeart } from 'react-icons/bs'
import { TiTick } from 'react-icons/ti'
import { RxCross2 } from 'react-icons/rx'

import "../style/Recipe.css"

const Recipe = ({ user, newFavourite, removeFavourite }) => {

    let params = useParams()
    const [recipeDetails, setRecipeDetails] = useState()
    const [activeButton, setActiveButton] = useState("Summary")
    const [isFavourite, setIsFavourite] = useState(false)

    const fetchRecipe = async () => {
        const data = await fetch(`https://api.spoonacular.com/recipes/${params.id}/information`, {
            headers: apiKey
        })
        const recipeData = await data.json()
        setRecipeDetails(recipeData)
    }

    const handleClick = () => {
        !isFavourite ? newFavourite(user._id, params.id) : removeFavourite(user._id, params.id)
        setIsFavourite(isFavourite ? false : true);
    };

    useEffect(() => {
        fetchRecipe()
    }, [params.name])

    useEffect(() => {
        if (user.favourites && user.favourites.includes(params.id)) {
            setIsFavourite(true)
        }
    }, [user])

    if (!recipeDetails) {
        return (
            <div>
                <p>Awaiting recipe details...</p>
            </div>
        );
    }


    const favouriteIcon = isFavourite ? <><BsHeartFill onClick={handleClick} size="50" className="heart-full" /> Favourited! </>
        : <><BsHeart onClick={handleClick} size="50" className="heart-empty" /> Add to Your Favourites </>

    return (
        <>
            <div className="recipe-detail"> 
                <div className="left-column"><h2>{recipeDetails.title}</h2>
                    <p>Cooking Time: {recipeDetails.readyInMinutes} minutes</p>
                    {favouriteIcon} <br />
                    <img className="recipe-image" src={recipeDetails.image} alt={`Picture for ${recipeDetails.title}`}/>
                    <p>Dairy Free {recipeDetails.dairyFree ? <TiTick/> : <RxCross2/>}</p>
                    <p>Gluten Free {recipeDetails.glutenFree ? <TiTick/> : <RxCross2/>}</p>
                    <p>Vegan {recipeDetails.vegan ? <TiTick/> : <RxCross2/>}</p>
                    <p>Vegetarian {recipeDetails.vegetarian ? <TiTick/> : <RxCross2/>}</p>
                </div>
                <div className="right-column">
                    <button onClick={() => setActiveButton('Summary')} className={activeButton === 'Summary' ? 'recipe-button' : 'active'}>Summary</button>
                    <button onClick={() => setActiveButton('Ingredients/Method')} className={activeButton === 'Ingredients/Method' ? 'recipe-button' : 'active'}>Ingredients/Method</button>
                    {activeButton === 'Summary' && (
                    <div className="recipe-summary"> <p dangerouslySetInnerHTML={{ __html: recipeDetails.summary }}></p></div>
                    )}
                    {activeButton === 'Ingredients/Method' && (
                        <>
                            <div className="recipe-instructions">
                                <ul>{recipeDetails.extendedIngredients.map((ingredient) => {
                                    return <li key={ingredient.id}>{ingredient.original}</li>
                                })}</ul><br />
                                <p dangerouslySetInnerHTML={{ __html: recipeDetails.instructions }}></p>
                                
                            </div>
                        </>
                    )}
                </div>
            </div>


        </>
    );
}

export default Recipe;