import Modal from "./UI/Modal.jsx";
import { useContext } from "react";
import UserProgressContext from "../store/UserProgressContext.jsx";
import CartContext from "../store/CartContext.jsx";
import { currencyFormatter } from "../util/formatting.js";
import Input from "./UI/Input.jsx";
import { Button } from "./UI/Button.jsx";
import useHttp from "../http.js";

const config = {
    method: "POST",
    headers: {"Content-Type": "application/json"},
};

export default function CheckOut () {
    const {items, clearCart, totalPrice} = useContext(CartContext);
    const {progress, hideCheckOut} = useContext(UserProgressContext);
    const {data, sendRequest, clearData} = useHttp("http://localhost:3000/orders", config);

    function handleCloseCheckOut () {
        hideCheckOut();
    }

    function handleSubmit (event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const customerData = Object.fromEntries(formData.entries());
        const requestBody = JSON.stringify({
            order: {
                items,
                customer: customerData,
            },
        });

        sendRequest(requestBody);
        event.target.reset();

    }

    function handleFinish () {
        hideCheckOut();
        clearCart();
        clearData();

    }

    return <Modal open={progress === "checkout"}
                  onClose={progress === "checkout" ? handleCloseCheckOut : null}>
        <form onSubmit={handleSubmit}>
            <h2>CheckOut</h2>
            <p>Total Amount: {currencyFormatter.format(totalPrice)} </p>
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
        {data && <button className="button" onClick={handleFinish}>Success,
            OK</button>}

    </Modal>;
}