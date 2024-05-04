import { useEffect } from "react"
import "./App.css"
import { appActions } from "./app/slice"
import { useAppDispatch, useAppSelector } from "./app/store"
import { Header } from "./components/Header"
import { Products } from "./components/Products"
import productsList from "./db/db.json"
import { Product } from "./types"

function App() {
  const dispatch = useAppDispatch()

  const products = useAppSelector((state) => state.app.products)
  const error = useAppSelector((state) => state.app.error)
  const loading = useAppSelector((state) => state.app.loading)

  const deleteHandler = (id: string) => {
    const filteredProducts = products.filter((product) => product.id !== id)
    dispatch(appActions.setState(filteredProducts))
    localStorage.setItem("productsListFromLC", JSON.stringify(filteredProducts))
  }

  const getDataFromLC = () => {
    return new Promise<Product[]>((resolve) => {
      const dataFromLC = localStorage.getItem("productsListFromLC")
      dispatch(appActions.setLoading(true))
      setTimeout(() => {
        if (dataFromLC) {
          const productsListFromLC = JSON.parse(dataFromLC)
          resolve(productsListFromLC)
          dispatch(appActions.setLoading(false))
        } else {
          localStorage.setItem("productsListFromLC", JSON.stringify(productsList))
          resolve(productsList)
          dispatch(appActions.setLoading(false))
        }
      }, 1500)
    })
  }

  useEffect(() => {
    const fetchData = async () => {
      dispatch(appActions.setState(await getDataFromLC()))
    }

    try {
      fetchData()
    } catch (error) {
      dispatch(appActions.setError(String(error)))
    }
  }, [])

  if (error) {
    return <div>Some error ocurred</div>
  }

  return (
    <>
      <Header />
      <Products deleteHandler={deleteHandler} products={products} loading={loading} />
    </>
  )
}

export default App
