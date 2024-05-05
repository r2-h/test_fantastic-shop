import productsList from "../db/db.json"
import { Product } from "../types"

export const fetchProducts = (): Promise<Product[]> => {
  return new Promise((resolve) => {
    const dataFromLC = localStorage.getItem("productsListFromLC")
    setTimeout(() => {
      if (dataFromLC) {
        resolve(JSON.parse(dataFromLC))
      } else {
        localStorage.setItem("productsListFromLC", JSON.stringify(productsList))
        resolve(productsList)
      }
    }, 1500)
  })
}
