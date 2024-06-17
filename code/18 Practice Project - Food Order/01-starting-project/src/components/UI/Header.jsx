import logoImg from "../../assets/logo.jpg";
import { Button } from "./Button.jsx";
import CartContext from "../../store/CartContext.jsx";
import { useContext } from "react";

export default function Header () {
    const cartCtx = useContext(CartContext);

    return <header id="main-header">
        <div id="title">
            <img src={logoImg} alt="A restaurant"/>
            <h1>React Food</h1>
        </div>
        <nav>
            <Button textOnly>Cart ({cartCtx.items.length})</Button>
        </nav>

    </header>;

}