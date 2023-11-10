import { useState, useEffect } from 'react'
import { getFilteredRecipes, getRecipesForCarousel } from './services/RecipeServices'
import RecipeContainer from './containers/RecipeContainer'
import CustomerPrefererencesForm from './components/CustomerPreferencesForm'
import FilterForm from './components/FilterForm'
import Header from './components/Header'
import SearchResults from './components/SearchResults'
import { getUser, saveFavourite, deleteFavourite, addDiet, addIntolerance, removeDiet, removeIntolerance } from './services/UserServices'
import './style/App.css'
import './style/RecipeLists.css'
import './style/Search.css'

function App() {
    
  const loggedInUserId = '6546d35552a5c20ee3cc5e0a'

  const [carouselRecipes, setCarouselRecipes] = useState({})
  const [filteredResults, setFilteredResults] = useState({noFilters:'have yet been set'})
  const [searchResults, setSearchResults] = useState([])
  const [user, setUser] = useState({favourites:'',dietary_preference:[], intolerances:[]})

  useEffect(() => {
    getUser(loggedInUserId)
    .then((user) => setUser(user))
  }, [])

  useEffect(() => {
    let carouselRequests = ['', 'Vegetarian', 'Vegan', 'Thai']

    const newCarouselRecipes = carouselRequests.map((request) => {
      return getRecipesForCarousel(request, user.dietary_preference, user.intolerances)
    })
    Promise.all(newCarouselRecipes)
      .then(recipeArray => {
        const carouselRecipesObject = {
          random : recipeArray[0].results,
          vegetarian : recipeArray[1].results,
          vegan : recipeArray[2].results,
          thai : recipeArray[3].results
        }
        setCarouselRecipes(carouselRecipesObject)
      })
  }, [user])

  const getFilters = (newFilters) => {
    getFilteredRecipes(newFilters, user.dietary_preference, user.intolerances)
    .then((recipes) => {
      setFilteredResults(recipes.results)
    })
  }
  
  const newFavourite = (userId, recipeId) => {
    saveFavourite(userId, recipeId)
    .then(getUser(userId))
    .then((user) => setUser(user))  
  }

  const removeFavourite = (userId, recipeId) => {
    deleteFavourite(userId, recipeId)
    .then(getUser(userId))
    .then((user) => setUser(user))  
  }

  const setCustomerPreferences = (userId, newDietaryPreferences, newIntolerances) => {
    for (let diet of newDietaryPreferences) {
      if (user.dietary_preference.includes(diet)) {
        removeDiet(userId, diet)
      } else {
        addDiet(userId, diet)
      }
    }
    for (let intolerance of newIntolerances) {
      if (user.intolerances.includes(intolerance)) {
        removeIntolerance(userId, intolerance)
      } else {
        addIntolerance(userId, intolerance)
      }
    }
    getUser(userId)
    .then((user) => setUser(user))
  }
  
  return (  
    <>
      <div className="container">
        <Header setSearchResults={setSearchResults} />
        <CustomerPrefererencesForm user={user} setCustomerPreferences={setCustomerPreferences}/>        
        <FilterForm getFilters={getFilters}/>
      </div>

      { searchResults.length === 0 
      ?<RecipeContainer carouselRecipes={carouselRecipes} filteredResults={filteredResults} user={user} newFavourite={newFavourite} removeFavourite={removeFavourite}/>
      :<SearchResults recipes={searchResults} />
      }
    </>
  )
}

export default App