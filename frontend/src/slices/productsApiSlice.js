import { PRODUCTS_URL } from "../constants.js"
import { apiSlice } from "./apiSlice.js"

export const productSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({
        url: PRODUCTS_URL
      }),
      keepUnusedDataFor: 5
    }),
    getProductsById: builder.query({
      query: (id) => ({
        url: `${PRODUCTS_URL}/${id}`
      }),
      keepUnusedDataFor: 5
    })
  })
})

export const { useGetProductsQuery, useGetProductsByIdQuery } = productSlice
