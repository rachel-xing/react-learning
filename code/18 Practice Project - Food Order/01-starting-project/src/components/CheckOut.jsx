import Modal from "./UI/Modal.jsx";
import { useContext } from "react";
import UserProgressContext from "../store/UserProgressContext.jsx";
import CartContext from "../store/CartContext.jsx";
import { currencyFormatter } from "../util/formatting.js";
import Input from "./UI/Input.jsx";
import { Button } from "./UI/Button.jsx";

export default function CheckOut () {
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);

    const cartTotalPrice = cartCtx.items.reduce(
        (accumulator, item) => item.price * item.quantity + accumulator, 0);

    function handleCloseCheckOut () {
        userProgressCtx.hideCheckOut();
    }

    function handleSubmit (event) {
        event.preventDefault();
        const fd = new FormData(event.target);
        const customerData = Object.fromEntries(fd.entries());

        async function sendData () {
            const response = await fetch("http://localhost:3000/orders", {
                method: 'POST',
                body: JSON.stringify({
                    order: {
                        items: cartCtx.items,
                        customer: customerData,
                    },
                }),
                headers: {
                    'Content-Type': "application/json",
                },
            });
        }

        sendData();

    }

    return <Modal open={userProgressCtx.progress === "checkout"}
                  onClose={userProgressCtx.progress === "checkout"
                      ? handleCloseCheckOut
                      : null}>
        <form onSubmit={handleSubmit}>
            <h2>CheckOut</h2>
            <p>Total Amount: {currencyFormatter.format(cartTotalPrice)} </p>
            <Input label="Full Name" type="text" id="name"/>
            <Input label="E-mail Address" type="email" id="email"/>
            <Input label="Street" type="text" id="street"/>
            <div className="control-row">
                <Input label="Postal Code" type="text" id="postal-code"/>
                <Input label="City" type="text" id="city"/>
            </div>

            <p className="modal-actions">
                <Button type="button" textOnly
                        onClick={handleCloseCheckOut}>Close</Button>
                <Button>Submit Order</Button>
            </p>
        </form>

    </Modal>;
}