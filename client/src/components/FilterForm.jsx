import { useState, useRef, createElement } from "react"
import '../style/Accordion.css'

const FilterForm = ({getFilters}) => {

    const [accordionExpanded, setAccordionExpanded] = useState(false)

    const [cuisines, setCuisines] = useState([])
    const [types, setTypes] = useState([])
    const [keyIngredients, setKeyIngredients] = useState([])

    const contentElement = useRef()

    const handleCuisinesChange = (evt) => {
        let newCuisinesFilter

        if (evt.target.checked) {
            setCuisines([...cuisines, evt.target.value])

        } else {
            newCuisinesFilter = cuisines.filter((cuisine) => cuisine != evt.target.value)
            setCuisines(newCuisinesFilter)
        }
    }

    const handleTypesChange = (evt) => {
        let newTypesFilter

        if (evt.target.checked) {
            setTypes([...types, evt.target.value])

        } else {
            newTypesFilter = types.filter((type) => type != evt.target.value)
            setTypes(newTypesFilter)
        }
    }

    const handleKeyIngredientsChange = (evt) => {
        let newKeyIngredientsFilter

        if (evt.target.checked) {
            setKeyIngredients([...keyIngredients, evt.target.value])
        } else {
            newKeyIngredientsFilter = keyIngredients.filter((ingredient) => ingredient != evt.target.value)
            setKeyIngredients(newKeyIngredientsFilter)
        }
    }
        
    const onSubmit = (evt) => {
        evt.preventDefault()
        setAccordionExpanded(!accordionExpanded)
        const cuisineString = cuisines.join(',')
        const typeString = types.join(',')
        const ingredientString = keyIngredients.join(',')
        getFilters({
            cuisine:(cuisines.length > 0 ? `cuisine=${cuisineString}` : ''),
            type:(types.length > 0 ? `type=${typeString}` : ''),
            keyIngredients:(keyIngredients.length > 0 ? `includeIngredients=${ingredientString}` : '')
        })
    }

    const cuisineFilters = ['italian', 'french', 'spanish', 'greek', 'african', 'chinese', 'thai', 'vietnamese', 'korean', 'japanese', 'indian', 'mexican', 'caribbean', 'cajun', 'american']
    const typeFilters = ['main course', 'appetizer', 'dessert', 'side dish', 'breakfast']
    const ingredientFilters = ['chicken', 'beef', 'pork', 'lamb', 'tofu', 'eggplant', 'halloumi']
    
    // function generateFilters(options) {
    //     return options.map((option) => {
    //         return  <>
    //                     <input type="checkbox" name='option' value={option} onChange={
    //                         options==='cuisineFilters' ? {handleCuisinesChange} 
    //                         : options==='typeFilters' ? {handleTypesChange}
    //                         : options==='ingredientFilters' ? {handleKeyIngredientsChange} : null
    //                         }/>
    //                     <label htmlFor={option}>{option[0].toUpperCase()+option.slice(1)}</label><br/>
    //                 </>
    //     })
    // }

    const generateCuisineFilters = cuisineFilters.map((cuisine) => {
        return  <>
                    <input type="checkbox" name="cuisine" id={cuisine} value={cuisine} onChange={handleCuisinesChange}/>
                    <label htmlFor={cuisine}>{cuisine[0].toUpperCase()+cuisine.slice(1)}</label><br/>
                </>
    })

    const generateTypeFilters = typeFilters.map((type) => {
        return  <>
                    <input type="checkbox" name="type" id={type} value={type} onChange={handleTypesChange}/>
                    <label htmlFor={type}>{type[0].toUpperCase()+type.slice(1)}</label><br/>
                </>
    })

    const generateIngredientFilters = ingredientFilters.map((ingredient) => {
        return  <>
                    <input type="checkbox" name="ingredient" id={ingredient} value={ingredient} onChange={handleKeyIngredientsChange}/>
                    <label htmlFor={ingredient}>{ingredient[0].toUpperCase()+ingredient.slice(1)}</label><br/>
                </>
    })

    return (
        <div className={`accordion${accordionExpanded ? '-open' : ''}`}>

            <button className="button" onClick={() => setAccordionExpanded(!accordionExpanded)}>
                <h3>Filter</h3>
                <span className="control">{accordionExpanded ? '—' : '+'}</span>
            </button>

            <div ref={contentElement} className="accordion-wrapper" style={
                accordionExpanded
                    ? {height:contentElement.current.scrollHeight}
                    : {height:'0px'}   
            }>
                <form onSubmit={onSubmit} className="accordion-form">

                    <div className="filter-option-form">
                        <div className="filter-select">
                            <h3>Cuisine:</h3>
                            {generateCuisineFilters}
                        </div>
                        <div className="filter-select">
                            <h3>Meal type:</h3>
                            {generateTypeFilters}
                        </div>
                        <div className="filter-select">
                            <h3>Key Ingredients:</h3>
                            {generateIngredientFilters}                            
                        </div>
                    </div>
                    <input className="filter-submit-button" type="submit" value="Set Filters"/>
                    <br />
                </form>
            </div>
        </div>
    );
}
 
export default FilterForm;