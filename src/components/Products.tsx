import { appActions } from "../store/slice"
import { useAppDispatch, useAppSelector } from "../store/store"

export const Products = () => {
  const dispatch = useAppDispatch()

  const products = useAppSelector((state) => state.app.products)
  const loading = useAppSelector((state) => state.app.loading)

  const deleteHandler = (id: string) => {
    dispatch(appActions.deleteProduct(id))
  }

  if (!products.length) {
    return <h3>The list of products is empty</h3>
  }
  if (loading) {
    return (
      <div className="productsList">
        <span>Loading...</span>
      </div>
    )
  }
  return (
    <ul className="productsList">
      {products.map((product) => (
        <li key={product.id} className="product">
          <div className="productInfo">
            <span>Title:</span> {product.title}
          </div>
          <div className="productInfo">
            <span>Description:</span> {product.description}
          </div>
          <div className="productInfo">
            <span>Price:</span> {product.price}$
          </div>
          <button className="deleteBtn" onClick={() => deleteHandler(product.id)}>
            Удалить товар
          </button>
        </li>
      ))}
    </ul>
  )
}
