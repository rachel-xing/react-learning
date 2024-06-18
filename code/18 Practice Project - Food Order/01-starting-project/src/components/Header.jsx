import logoImg from "../assets/logo.jpg";
import { Button } from "./UI/Button.jsx";
import { useContext } from "react";
import CartContext from "../store/CartContext.jsx";
import UserProgressContext from "../store/UserProgressContext.jsx";

export default function Header () {
    const {totalAmount} = useContext(CartContext);
    const {showCart} = useContext(UserProgressContext);

    return <header id="main-header">
        <div id="title">
            <img src={logoImg} alt="A restaurant"/>
            <h1>React Food</h1>
        </div>
        <Button textOnly onClick={showCart}>Cart ({totalAmount})</Button>
    </header>;
}