import logoImg from "../assets/logo.jpg";
import { Button } from "./UI/Button.jsx";
import CartContext from "../store/CartContext.jsx";
import { useContext } from "react";
import UserProgressContext from "../store/UserProgressContext.jsx";

export default function Header () {
    const cartCtx = useContext(CartContext);
    const totalCartItems = cartCtx.items.reduce(
        (accumulator, item) => item.quantity + accumulator, 0);
    const userProgressCtx = useContext(UserProgressContext);

    function handleShowCart() {
        userProgressCtx.showCart();
    }

    return <header id="main-header">
        <div id="title">
            <img src={logoImg} alt="A restaurant"/>
            <h1>React Food</h1>
        </div>
        <nav>
            <Button textOnly onClick={handleShowCart}>Cart ({totalCartItems})</Button>
        </nav>

    </header>;

}