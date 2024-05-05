import { clsx } from "clsx"
import { SubmitHandler, useForm } from "react-hook-form"
import { appActions } from "../store/slice"
import { useAppDispatch } from "../store/store"
import { Inputs } from "../types"

export const Header = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>({ mode: "onSubmit" })

  const dispatch = useAppDispatch()

  const onSubmit: SubmitHandler<Inputs> = ({ description, price, title }) => {
    const id = Date.now().toString()
    const newProducts = { description, title, id, price }
    dispatch(appActions.addProduct(newProducts))
    reset()
  }

  return (
    <header className="headerContainer">
      <h1>Fantastic shop !</h1>

      <form className="formContainer" onSubmit={handleSubmit(onSubmit)}>
        <div className="inputWrapper">
          <label htmlFor="title">Title</label>
          <input
            className={clsx("input", errors.title && "error")}
            id="title"
            {...register("title", { required: true, maxLength: 8 })}
          />
          {errors.title && <div className="error">Title is required, max length 8 </div>}
        </div>

        <div className="inputWrapper">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            className={clsx("textarea", errors.description && "error")}
            {...register("description", { required: true, maxLength: 150 })}
          />
          {errors.description && <div className="error">Description is required, max length 150</div>}
        </div>

        <div className="inputWrapper">
          <label htmlFor="price">Price</label>
          <input
            className={clsx("input", errors.title && "error")}
            id="price"
            {...register("price", {
              required: true,
              pattern: {
                value: /^\d+$/,
                message: "Price is required and must be a number",
              },
            })}
          />
          {errors.price && <div className="error">{errors.price.message}</div>}
        </div>

        <button type="submit" className="submitBtn">
          Добавить товар
        </button>
      </form>
    </header>
  )
}
