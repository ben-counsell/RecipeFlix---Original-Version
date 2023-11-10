
const SearchResults = ({recipes}) => {

    const recipeDisplay = recipes.filter((recipe => recipe.title)

    )

    return (
        <>
        <h2 className="search-results-header"> Results </h2> 
            {recipeDisplay.map(recipe => {
                return (
                    <div className="search-results" key={recipe.id}>
                        <h3 className="search-results-title">{recipe.title}</h3>
                        <img className="search-results-img" src={recipe.image} alt={`Picture for ${recipe.title}`}/>
                    </div>
                )})}
        </>
    )
 
}


export default SearchResults