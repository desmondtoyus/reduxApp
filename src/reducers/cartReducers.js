"use strict"
export function cartReducers(state = { cart: [] }, action) {
    switch (action.type) {

        case 'GET_CART':
         return {
             ...state,
             cart:action.payload,
             totalAmount: total(action.payload).amount,
             totalQty:total(action.payload).qty
         }
        case "ADD_TO_CART":

            return { cart: [...state.cart, ...action.payload], totalAmount: total(action.payload).amount, totalQty:total(action.payload).qty }

            break;
        case "UPDATE_CART":
           return {
                ...state,
                cart: action.payload,
                // return { cart: [...state.cart, ...cartUpdate] }
                totalAmount: total(action.payload).amount,
                totalQty: total(action.payload).qty
            }
            break;



        case "DELETE_CART_ITEM":
            // return { cart: [...state.cart, ...cartUpdate] }
            return {
                ...state,
                cart: action.payload,
                totalAmount: total(action.payload).amount,
                totalQty: total(action.payload).qty
            }
            break;
    }
    return state
}
// CALCULATE TOTAL

export function total(payloadArr) {
    const totalAmount = payloadArr.map(cartArr => {
        return cartArr.price * cartArr.quantity;
    }).reduce((a, b) => {
        return a + b;
    }, 0); // start summing from index 0

    const totalQty = payloadArr.map(qty=>{
        return qty.quantity;
    }).reduce((a,b)=>{
        return a + b;
    }, 0);

    return { amount: totalAmount.toFixed(2), qty:totalQty }
}
// HOW TO USE REDUCE METHOD IN JS
// var sum = [0,1,2,3].reduce(acc, val)
// result 0 + 1 = 1;
//1 + 2 = 3;
//3 + 3 = 6