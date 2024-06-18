import { createContext, useReducer, useState } from 'react';

const CartContext = createContext({
    items: [],
    addItem: (item) => {},
    deleteItemById: (id) => {},
    clearCart: ()=> {},
    totalAmount: '',
    totalPrice: '',

});

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


export function CartContextProvider ({children}) {
    const [cart, dispatchCartAction] = useReducer(cartReducer, {items: []});
    const value = {
        items: cart.items,
        addItem: item => dispatchCartAction({type: "ADD", item}),
        deleteItemById: id => ispatchCartAction({type: "DELETE", item}),
        clearCart: ()=> dispatchCartAction({type: "CLEAR"}),
        totalAmount: cart.items.reduce((acc, item) => acc + item.quantity, 0),
        totalPrice: cart.items.reduce((acc, item) => acc + item.quantity * item.price, 0)
    };

    return <CartContext.Provider
        value={value}>{children}</CartContext.Provider>;
}

export default CartContext;