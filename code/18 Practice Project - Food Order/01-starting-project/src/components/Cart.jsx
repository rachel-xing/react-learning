import Modal from "./UI/Modal.jsx";
import { useContext } from "react";
import CartContext from "../store/CartContext.jsx";
import UserProgressContext from "../store/UserProgressContext.jsx";
import { currencyFormatter } from "../util/formatting.js";
import { Button } from "./UI/Button.jsx";
import CartItem from "./CartItem.jsx";

export default function Cart () {
    const {items, totalPrice, addItem, deleteItemById} = useContext(
        CartContext);
    const {progress, hideCart, showCheckOut} = useContext(UserProgressContext);

    return <Modal
        className="cart"
        open={progress === "cart"}
        onClose={progress === "cart" ? hideCart : null}>
        <h2>Your Cart</h2>
        <ul>
            {items.map(item =>
                <li className="cart-item" key={item.id}>
                    <p>{item.name} - {item.quantity} x {currencyFormatter.format(item.price)}</p>
                    <p className="cart-item-actions">
                        <button onClick={() => addItem(item)}>+</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => deleteItemById(item.id)}>-
                        </button>
                    </p>
                </li>)}
        </ul>
        <p className="cart-total">{currencyFormatter.format(totalPrice)}</p>
        <p className="modal-actions">
            <Button textOnly onClick={hideCart}>Close</Button>
            {items.length > 0 && <Button onClick={showCheckOut}>Go to Checkout</Button>}
        </p>
    </Modal>;
}