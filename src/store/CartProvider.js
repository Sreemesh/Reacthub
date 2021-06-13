import { useReducer } from "react";
import CartContext from "./cart-context"

const initCart = {
    items:[],
    total: 0
}
const cartReducer = (state,action) =>{
    if(action.type === 'ADD'){
        const newAmount = state.total + action.item.price * action.item.amount;
        
        const checkIndex = state.items.findIndex(item => item.id === action.item.id);
        const checkItem = state.items[checkIndex];
        let updatedItems;

        if(checkItem){
            const updatedItem = {
                ...checkItem,
                amount: checkItem.amount + action.item.amount
            };
            updatedItems = [...state.items];
            updatedItems[checkIndex] = updatedItem;
        }else{
            updatedItems = state.items.concat(action.item);
        }

        return {
            items: updatedItems,
            total: newAmount
        };
    }
    if(action.type === 'REM'){        
        const checkIndex = state.items.findIndex(item => item.id === action.id);
        const checkItem = state.items[checkIndex];
        const newAmount = state.total - checkItem.price;
        let updatedItems;       
        if(checkItem.amount === 1){
            updatedItems = state.items.filter(item => item.id !== action.id);
        }else{
            const updatedItem = {...checkItem, amount: checkItem.amount -1};
            updatedItems = [...state.items];
            updatedItems[checkIndex] = updatedItem;
        }
        return {
            items: updatedItems,
            total: newAmount
        };
    }
    return initCart;
}
const CartProvider = props => {
    const [cartState, cartDispatch] = useReducer(cartReducer, initCart);

    const addItemToCart = item => {
        cartDispatch({type: 'ADD', item: item})
    };

    const removeItemFromCart = id => {
        cartDispatch({type: 'REM', id: id})

    };

    const cartContext = {
        items:cartState.items,
        total: cartState.total,
        addItem: addItemToCart,
        removeItem: removeItemFromCart,
    }
    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    )
}

export default CartProvider;
