import { createSlice } from "@reduxjs/toolkit"

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : {}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload

      const existItem = state.cartItems.find((d) => d._id === item._id)

      if (existItem) {
        state.cartItems = state.cartItems.map((d) =>
          d._id === existItem._id ? item : d
        )
      } else {
        state.cartItems = [...state.cartItems, item]
      }
    }
  }
})

export default cartSlice.reducer
