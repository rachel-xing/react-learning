import Modal from "./UI/Modal.jsx";
import { useContext } from "react";
import CartContext from "../store/CartContext.jsx";
import { currencyFormatter } from "../util/formatting.js";
import { Button } from "./UI/Button.jsx";
import UserProgressContext from "../store/UserProgressContext.jsx";

export default function Cart () {
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);

    const cartTotalPrice = cartCtx.items.reduce(
        (accumulator, item) => item.price * item.quantity + accumulator, 0);

    function handleCloseCart () {
        userProgressCtx.hideCart();
    }

    function handleShowCheckOut() {
        userProgressCtx.showCheckOut();
    }

    return <Modal className="cart" open={userProgressCtx.progress === "cart"}>
        <h2>Your Cart</h2>
        <ul>
            {cartCtx.items.map(item =>
                <li key={item.id}>
                    {item.name} - {item.quantity}
                </li>)}
        </ul>
        <p className="cart-total">{currencyFormatter.format(cartTotalPrice)}</p>
        <p className="modal-actions">
            <Button textOnly onClick={handleCloseCart} >Close</Button>
            <Button onClick={handleShowCheckOut}>Go to Checkout</Button>
        </p>
    </Modal>;
}