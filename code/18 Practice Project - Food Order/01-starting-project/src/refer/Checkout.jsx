import {useEffect, useRef} from "react";
import {useUserProgress} from "./UserProgressContext.jsx";
import {useHttp} from "./useHttp.js";
import {useCart} from "./CartContext.jsx";

function Input({id, children, ...props}) {
	return (
		<p className="control">
			<label htmlFor={id}>{children}</label>
      <input id={id} name={id} {...props}/>
		</p>
	);
}



function Checkout() {
	const dialog = useRef();
	const {items, totalPrice, clearCart} = useCart();
	const {progress, hideCheckout} = useUserProgress();
	const isOpen = progress === "checkout";
	const {data, sendRequest, clearData} = useHttp("http://localhost:3000/orders", {
		method: "POST", headers: {"Content-Type": "application/json"}
	});

	useEffect(() => {
		const modal = dialog.current;
		if (isOpen) modal.showModal();
		return () => modal.close();
	}, [isOpen]);

	function handleSubmit(event) {
		event.preventDefault();
		const formData = new FormData(event.target);
		const customer = Object.fromEntries(formData.entries());
		const request = JSON.stringify({order: {items, customer}});
		sendRequest(request);
	}

	function handleFinish() {
		hideCheckout();
		clearCart();
		clearData();
	}

	return (
		<dialog ref={dialog} className="modal" onClose={data ? handleFinish : hideCheckout}>
			<h2>Checkout</h2>
			<p>TotalAmount: ${totalPrice}</p>
			{!data &&
				<form onSubmit={handleSubmit}>
					<Input type="text" id="name">Full Name</Input>
					<Input type="email" id="email">E-Mail Address</Input>
					<Input type="text" id="street">Street</Input>
					<Input type="text" id="postal-code">Postal Code</Input>
					<Input type="text" id="city">City</Input>
					<p className="modal-actions">
						<button className="text-button" type="button" onClick={hideCheckout}>Close</button>
						<button className="button">Submit Order</button>
					</p>
				</form>
			}
			{data && <button className="button" onClick={handleFinish}>Success, OK</button>}
		</dialog>
	);
}

