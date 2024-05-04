import { Product } from "../types"

type Props = {
  products: Product[]
  loading: boolean
  deleteHandler: (id: string) => void
}

export const Products = ({ products, loading, deleteHandler }: Props) => {
  return products.length ? (
    <div className="productsContainer">
      <ul className="productsList">
        {loading
          ? new Array(5).fill(null).map((_, i) => (
              <li className="product" key={i}>
                <span>Loading...</span>
              </li>
            ))
          : products.map((product) => (
              <li key={product.id} className="product">
                <span>Title: {product.title}</span>
                <span>Description: {product.description}</span>
                <button onClick={() => deleteHandler(product.id)}>Delete</button>
              </li>
            ))}
      </ul>
    </div>
  ) : (
    <h3>The list of products is empty</h3>
  )
}
