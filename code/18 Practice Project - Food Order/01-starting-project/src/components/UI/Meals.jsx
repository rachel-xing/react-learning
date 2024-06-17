import {useEffect, useState} from "react";
import {fetchAvailableMeals} from "../../http.js";
import MealItem from "./MealItem.jsx";
export default function Meals() {
    const [availableMeals, setAvailableMeals] = useState([]);
    const [isFetching, setIsFetching] = useState(false);

    useEffect(() => {
            async function fetchMeals() {
                setIsFetching(true);
                const response = await fetch("http://localhost:3000/meals");

                if (!response.ok) {
                    throw new Error("Failed to  fetch meals");
                }

                const meals = await response.json();
                setAvailableMeals(meals);
            }

            fetchMeals();
            setIsFetching(false);

        }, []
    )

    console.log(availableMeals)

    return (
        <ul id="meals">
            {isFetching && <p>Fetching data...</p>}
            {availableMeals.map(meal =>
                <MealItem key={meal.id} meal={meal}/>
            )}
        </ul>
    );


}