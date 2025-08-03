import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems: [],
    cartCount: 0,
    totalPrice : 0,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers:{
        addToCart:(state, action)=>{
            const existingItem = state.cartItems.find(item => item.id === action.payload.id);
            if(existingItem){ //if product already exit in cart, increasequantity
                existingItem.quantity += 1;
            }else{ //add new product with quantity
                state.cartItems.push({...action.payload, quantity:1});
                state.cartCount +=1;
            }
            cartSlice.caseReducers.totalPrice(state);
        },


        increaseQuantity:(state,action)=>{
            const item = state.cartItems.find(item=> item.id === action.payload)
            if(item){
                item.quantity += 1
            }
            cartSlice.caseReducers.totalPrice(state);
        },

        decreaseQuantity : (state, action)=>{
            const itemIndex = state.cartItems.findIndex(item=> item.id === action.payload);
            if(itemIndex !== -1){
                if(state.cartItems[itemIndex].quantity > 1){
                    state.cartItems[itemIndex].quantity -=1;    
                }else{
                    state.cartItems.splice(itemIndex,1);
                    state.cartCount -= 1;
                }
                cartSlice.caseReducers.totalPrice(state);
            }
        },
        removeItem: (state, action)=>{
            const item = state.cartItems.find(item=> item.id === action.payload)
            if(item){
                state.cartCount -= item.quantity;
                state.cartItems = state.cartItems.filter(item=> item.id !== action.payload);
                state.cartCount -= 1;
            }
            cartSlice.caseReducers.totalPrice(state);
            cartSlice.caseReducers.calculateCartCount(state);
        },
        clearCart: (state)=>{
            state.cartItems = [];
            state.cartCount = 0;
            state.totalPrice = 0;
        },
        totalPrice: (state) =>{
            let sum=0 ;
            state.cartItems.forEach((item)=>{
                let price = parseFloat(item.prodRs.replace(/[^\d.]/g, ""));
                sum = sum + price * item.quantity;
        });
        // console.log(sum)
        state.totalPrice = sum; 
        },

        calculateCartCount: (state)=>{
            let count = 0;
            state.cartItems.forEach(item=>{
                count += item.quantity;
            });
            state.cartCount = count;
        }
    }
})

export const {addToCart,
    increaseQuantity,
    decreaseQuantity,
    removeItem,
    clearCart,
    totalPrice,
} = cartSlice.actions;

export default cartSlice.reducer;