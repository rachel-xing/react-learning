import {useEffect, useRef} from "react";
import {useUserProgress} from "./UserProgressContext.jsx";
import {useCart} from "./CartContext.jsx";

function Cart() {
  const dialog = useRef();
  const {items, totalPrice, addItem, deleteItemById} = useCart();
  const {progress, hideCart, showCheckout} = useUserProgress();
  const isOpen = progress === "cart";

  useEffect(() => {
    const modal = dialog.current;
    if (isOpen) modal.showModal();
    return () => modal.close();
  }, [isOpen]);

	return (
    <dialog className="modal" ref={dialog} onClose={isOpen ? hideCart : null}>
      <h2>Your Cart</h2>
      <ul>
        {items.map(item =>
          <li key={item.id} className="cart-item">
            <p>{item.name} - {item.quantity} x ${item.price}</p>
            <p className="cart-item-actions">
              <button onClick={() => addItem(item)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => deleteItemById(item.id)}>+</button>
            </p>
          </li>
        )}
      </ul>
      <p className="cart-total">${totalPrice}</p>
      <p className="modal-actions">
        <button className="text-button" onClick={hideCart}>Close</button>
        {items.length > 0 && <button className="button" onClick={showCheckout}>Go to Checkout</button>}
      </p>
    </dialog>
  );
}

