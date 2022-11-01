import React, {useRef} from 'react'

function FormCreateAProduct({max, setProductList}) {
  const formEl = useRef();
  const createAProduct = (e) => {
    e.preventDefault()
    const formInputs = [...formEl.current.elements].filter(
      element => element.type === "text")
      
    const newProduct = formInputs.reduce(
      (acc, input) => {
        return {
          ...acc,
          [input.name]: input.value
        };
      },
      { productId: max+1}
    );
    setProductList(prevProductList => [...prevProductList, newProduct]);
  }
 
  return (
    <div className='FormCreateAProduct'>
        <form ref={formEl} onSubmit={createAProduct} className="Product">
            <h1>Create Product</h1>
            <label htmlFor="name-input">Name</label>
            <input id="name-input" name="name" />
            <label htmlFor="description-input">description</label>
            <input id="description-input" name="description" />
            <label htmlFor="price-input">Price</label>
            <input id="price-input" name="price" />
            <button type='submit'>Create a product</button>
        </form>  

    </div>
  )
}

export default FormCreateAProduct