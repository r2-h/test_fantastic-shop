import { useEffect } from "react"
import "./App.css"
import { Header } from "./components/Header"
import { Products } from "./components/Products"
import { appActions, loadProducts } from "./store/slice"
import { useAppDispatch, useAppSelector } from "./store/store"

function App() {
  const dispatch = useAppDispatch()

  const products = useAppSelector((state) => state.app.products)
  const error = useAppSelector((state) => state.app.error)

  useEffect(() => {
    try {
      dispatch(loadProducts())
      localStorage.setItem("productsListFromLC", JSON.stringify(products))
    } catch (error) {
      dispatch(appActions.setError(String(error)))
    }
  }, [dispatch, products])

  if (error) {
    return <div>Some error ocurred</div>
  }

  return (
    <>
      <Header />
      <Products />
    </>
  )
}

export default App
