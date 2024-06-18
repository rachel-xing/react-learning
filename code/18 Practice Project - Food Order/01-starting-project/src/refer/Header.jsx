import logo from "../assets/logo.jpg";
import {useCart} from "./CartContext.jsx";
import {useUserProgress} from "./UserProgressContext.jsx";

function Header() {
	const {totalAmount} = useCart();
	const {showCart} = useUserProgress();

	return (
		<header id="main-header">
			<div id="title">
				<img src={logo} alt=""/>
				<h1>React Meal</h1>
			</div>
			<button className="text-button" onClick={showCart}>
				Cart ({totalAmount})
			</button>
		</header>
	);
}
