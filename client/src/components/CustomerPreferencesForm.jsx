import { useState, useRef, useEffect } from "react"
import '../style/Accordion.css'

const CustomerPrefererencesForm = ({ user, setCustomerPreferences }) => {

    const [accordionExpanded, setAccordionExpanded] = useState(false)
    const [dietaryPreferences, setDietaryPreferences] = useState([])
    const [intolerances, setIntolerances] = useState([])

    useEffect(() => {
        if (user.dietary_preference) {
        setDietaryPreferences(user.dietary_preference)
        setIntolerances(user.intolerances)
        }
    }, [user])

    const contentElement = useRef()

    const handleDietaryPreferenceChange = (evt) => {
        let newDietaryPreferences

        if (evt.target.checked) {
            setDietaryPreferences([...dietaryPreferences, evt.target.value])

        } else {
            newDietaryPreferences = dietaryPreferences.filter((preference) => preference != evt.target.value)
            setDietaryPreferences(newDietaryPreferences)
        }
    }

    const handleIntoleranceChange = (evt) => {
        let newIntolerances

        if (evt.target.checked) {
            setIntolerances([...intolerances, evt.target.value])

        } else {
            newIntolerances = intolerances.filter((intolerance) => intolerance != evt.target.value)
            setIntolerances(newIntolerances)
        }
    }

    const onSubmit = (evt) => {
        evt.preventDefault()
        setAccordionExpanded(!accordionExpanded)
        setCustomerPreferences(user._id, dietaryPreferences, intolerances)
    }

    const dietFilters = ['gluten free', 'ketogenic', 'vegetarian', 'vegan']
    const intoleranceFilters = ['dairy', 'egg', 'gluten', 'grain', 'peanut', 'seafood', 'sesame', 'shellfish', 'soy', 'sulfite', 'tree nut', 'wheat']
    
    const generateDietFilters = dietFilters.map((diet) => {
        return  <>
                    <input type="checkbox" name="diet" id={diet} value={diet} onChange={handleDietaryPreferenceChange} 
                    // defaultChecked={user.dietary_preference.includes(diet)}
                    />
                    <label htmlFor={diet}>{diet[0].toUpperCase()+diet.slice(1)}</label><br/>
                </>
    })

    const generateIntoleranceFilters = intoleranceFilters.map((intolerance) => {
        return  <>
                    <input type="checkbox" name="intolerance" id={intolerance} value={intolerance} onChange={handleIntoleranceChange} 
                    // defaultChecked={user.intolerances.includes(intolerance)}
                    />
                    <label htmlFor={intolerance}>{intolerance[0].toUpperCase()+intolerance.slice(1)}</label><br/>
                </>
    })

    return (
        <div className={`accordion${accordionExpanded ? '-open' : ''}`}>
        
            <button className="button" onClick={() => setAccordionExpanded(!accordionExpanded)}>
                <h3>Customer settings</h3>
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
                             <h3>Dietary requirements:</h3>
                            {generateDietFilters}
                        </div>
                        <div className="filter-select">
                            <h3>Intolerances:</h3>
                            {generateIntoleranceFilters}
                        </div>
                    </div>
                    <input className="filter-submit-button" type="submit" value="Set preferences"/>
                    <br />
                </form>
            </div>
        </div>
    );
}
 
export default CustomerPrefererencesForm;