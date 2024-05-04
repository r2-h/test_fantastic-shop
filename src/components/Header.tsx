import { clsx } from "clsx"
import { SubmitHandler, useForm } from "react-hook-form"
import { appActions } from "../app/slice"
import { Inputs } from "../types"
import { useAppSelector, useAppDispatch } from "../app/store"

export const Header = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>({ mode: "onSubmit" })

  const products = useAppSelector((state) => state.app.products)
  const dispatch = useAppDispatch()

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const id = Date.now().toString()
    const newProducts = [{ description: data.description, title: data.title, id }, ...products]
    dispatch(appActions.setState(newProducts))
    localStorage.setItem("productsListFromLC", JSON.stringify(newProducts))
    reset()
  }

  return (
    <header className="headerContainer">
      <h1>Fantastic shop !</h1>

      <form className="formContainer" onSubmit={handleSubmit(onSubmit)}>
        <div className="wrapper">
          <div className="input">
            <label htmlFor="title">Title</label>
            <input
              className={clsx(errors.title && "error")}
              id="title"
              {...register("title", { required: true, maxLength: 8 })}
            />
            {errors.title && <div className="error">Title is required, max length 8 </div>}
          </div>

          <button type="submit">Add a product</button>
        </div>

        <div className="input">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            className={clsx("textarea", errors.description && "error")}
            {...register("description", { required: true, maxLength: 150 })}
          />
          {errors.description && <div className="error">Description is required, max length 150</div>}
        </div>
      </form>
    </header>
  )
}
