import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

 export const fetchProducts = createAsyncThunk('products/fetchProducts', 
    async()=>{
    const res = await fetch('https://dummyjson.com/products');
    const data =  await res.json();
    return data.products;
 }
);

 const productSlice = createSlice({ 
    name: 'products',
    initialState:{
        items: [],
        status: 'idle',
        error: null,  
    },
    reducers:{},
    extraReducers: builder=>{
        builder.addCase(fetchProducts.pending, state=>{
            state.status = 'loading';
            state.error = null;
        })
        .addCase(fetchProducts.fulfilled, (state,action)=>{
            state.status = 'succeeded',
            state.items = action.payload;
        })
        .addCase(fetchProducts.rejected, (state,action)=>{
            state.status = 'failed',
            state.error = action.error.message;
        });
    }
 });
  export default productSlice.reducer;