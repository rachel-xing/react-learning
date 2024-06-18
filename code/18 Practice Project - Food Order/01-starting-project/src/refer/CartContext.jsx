import {createContext, useContext, useReducer} from "react";

const CartContext = createContext();

function cartReducer(state, action) {
	switch (action.type) {
		case "ADD":
			return addItem(state, action);
		case "DELETE":
			return deleteItemById(state, action);
		case "CLEAR":
			return {...state, items: []};
		default:
			return state;
	}
}

function addItem(state, action) {
	const id = state.items.findIndex(item => item.id === action.item.id);
	const updatedItems = [...state.items];
	if (id === -1) updatedItems.push({...action.item, quantity: 1});
	else updatedItems[id] = {...updatedItems[id], quantity: updatedItems[id].quantity + 1};
	return {...state, items: updatedItems};
}

function deleteItemById(state, action) {
	const id = state.items.findIndex(item => item.id === action.id);
	const updatedItems = [...state.items];
	if (updatedItems[id].quantity === 1) updatedItems.splice(id, 1);
	else updatedItems[id] = {...updatedItems[id], quantity: updatedItems[id].quantity - 1};
	return {...state, items: updatedItems};
}

function CartContextProvider({children}) {
	const [cart, dispatch] = useReducer(cartReducer, { items: [] });

	const value = {
		items: cart.items,
		addItem: item => dispatch({ type: "ADD", item }),
		deleteItemById: id => dispatch( { type: "DELETE", id }),
		clearCart: () => dispatch({ type: "CLEAR" }),
		totalAmount: cart.items.reduce((acc, item) => acc + item.quantity, 0),
		totalPrice: cart.items.reduce((acc, item) => acc + item.quantity * item.price, 0)
	};

	return (
		<CartContext.Provider value={value}>
			{children}
		</CartContext.Provider>
	);
}
