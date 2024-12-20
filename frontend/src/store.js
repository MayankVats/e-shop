import { configureStore } from "@reduxjs/toolkit"
import { apiSlice } from "./slices/apiSlice.js"
import cartSliceReducer from "./slices/CartSlice.js"

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    cart: cartSliceReducer
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(apiSlice.middleware)
  },
  devTools: true
})

export default store
