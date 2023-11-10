import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/themes/splide-default.min.css';
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react';
import apiKey from '../services/apiKey';








const Carousel = ({ recipes, title }) => {



  const [recipeId, setRecipeId] = useState(null)
  const [recipeDeets, setRecipeDeets] = useState(null)

  const fetchDeets = async () => {
    const data = await fetch(`https://api.spoonacular.com/recipes/${recipeId}/information`, {
      headers: apiKey
    })
    const recipeData = await data.json()
    setRecipeDeets(recipeData)
  }

  useEffect(() => {
    fetchDeets()
  }, [recipeId])

  const handleHover = (id) => {
    setRecipeId(id);
  };




  const Carousel = recipes.map((recipe) => (


    <SplideSlide key={recipe.id}>
      <Link onMouseEnter={() => handleHover(recipe.id)} to={"/recipe/" + recipe.id}>
        <h3 className="recipe-card-recipe-name"> {recipe.title}</h3>
        <div className="recipe-card">
          <img className='card-img' src={recipe.image} alt={`Picture for ${recipe.title}`} />
          <div className='card-body'>
            <br /><br /><br /><br />
            <div className='deet-text'>
              <h4>Cooking Time {recipeDeets ? recipeDeets.readyInMinutes : null}mins</h4>
              <h4>Serves {recipeDeets ? recipeDeets.servings : null}</h4>
              <h4>{recipeDeets ? (recipeDeets.vegetarian ? "Vegetarian"  : "") : null}</h4>
              <h4>{recipeDeets ? (recipeDeets.vegan ? "Vegan" : "") : null}</h4>
              <h4>{recipeDeets ? (recipeDeets.dairyFree ? "Dairy Free" : "") : null}</h4>
              <h4>{recipeDeets ? (recipeDeets.glutenFree ? "Gluten Free" : "") : null}</h4>
            </div>

          </div>
        </div>
      </Link>
    </SplideSlide>
  ));

  return (
    <div>
      <h3 className='carousel-title'>{title}</h3>
      <div className='carousel'>
        <Splide options={{ type: 'loop', perPage: 4, pagination: false, drag: 'free', gap: '5rem' }}>
          {Carousel}
        </Splide>
      </div>
    </div>
  );
};

export default Carousel;