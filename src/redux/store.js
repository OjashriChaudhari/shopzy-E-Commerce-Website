import { configureStore } from "@reduxjs/toolkit";
import cartReducer from './cartSlice';
import themeReducer from './themeSlice';
import productReducer from './productSlice';
import authReducer from './authSlice';

export const store = configureStore({
    reducer:{
        cart: cartReducer,
        theme: themeReducer,
        products: productReducer,
        auth: authReducer,
    },
});