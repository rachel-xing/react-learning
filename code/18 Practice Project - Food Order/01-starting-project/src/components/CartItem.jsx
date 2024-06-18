import { useContext } from "react";
import CartContext from "../store/CartContext.jsx";
import { currencyFormatter } from "../util/formatting.js";

export default function CartItem ({
    name,
    quantity,
    price,
    onIncrease,
    onDecrease,
}) {
    return <li className="cart-item">
        <p>{name} - {quantity} x {currencyFormatter.format(price)}</p>
        <p className="cart-item-actions">
            <button onClick={onIncrease}>+</button>
            <span>{quantity}</span>
            <button onClick={onDecrease}>-</button>
        </p>
    </li>;
}