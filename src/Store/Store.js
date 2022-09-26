import { configureStore } from "@reduxjs/toolkit"
import post from "./postSlice";
import cartReducer from "./cartReducer";
const store = configureStore({
    reducer:{
    post :post,
    cartReducer:cartReducer
}
});

export default store;
