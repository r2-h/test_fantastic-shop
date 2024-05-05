import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import { Product } from "../types"
import productsList from "../db/db.json"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { fetchProducts } from "../api/fetchProducts"

type appState = {
  products: Product[]
  loading: boolean
  error: string | null
}

const initialState: appState = {
  products: JSON.parse(localStorage.getItem("productsListFromLC") || JSON.stringify(productsList)),
  loading: false,
  error: null,
}

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
    deleteProduct: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter((product) => product.id !== action.payload)
    },
    addProduct: (state, action: PayloadAction<Product>) => {
      state.products.unshift(action.payload)
    },
  },
})

export const loadProducts = createAsyncThunk("app/loadProducts", async (_, { dispatch }) => {
  dispatch(appActions.setLoading(true))
  const products = await fetchProducts()
  dispatch(appActions.setLoading(false))
  return products
})

export const appActions = appSlice.actions

export default appSlice.reducer
