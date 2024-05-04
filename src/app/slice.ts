import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import { Product } from "../types"

type CounterState = {
  products: Product[]
  loading: boolean
  error: string | null
}

const initialState: CounterState = {
  products: JSON.parse(localStorage.getItem("productsListFromLC") || "[]"),
  loading: false,
  error: null,
}

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setState: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
  },
})

export const appActions = appSlice.actions

export default appSlice.reducer
