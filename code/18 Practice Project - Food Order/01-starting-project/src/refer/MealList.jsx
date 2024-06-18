import {useHttp} from "./useHttp.js";
import {useCart} from "./CartContext.jsx";

const config = {};

function MealList() {
	const {addItem} = useCart();
	const {data} = useHttp("http://localhost:3000/meals", config, []);

	return (
		<ul id="meals">
			{data.map(meal =>
				<li key={meal.id} className="meal-item">
					<img src={`http://localhost:3000/${meal.image}`} alt=""/>
					<h2>{meal.name}</h2>
					<p className="meal-item-price">${meal.price}</p>
					<p className="meal-item-description">{meal.description}</p>
					<p className="meal-item-actions">
						<button className="button" onClick={() => addItem(meal)}>
							Add to Cart
						</button>
					</p>
				</li>
			)}
		</ul>
	);
}

