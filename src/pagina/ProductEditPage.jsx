import React, {useState, useEffect} from 'react'
import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

function ProductEditPage({productList, setProductList}) {
  const [productEdit, setProductEdit] = useState('')
  const [productNameEdit, setProductNameEdit] = useState('')
  const [productDescriptionEdit, setProductDescriptionEdit] = useState('')
  const [productPriceEdit, setProductPriceEdit] = useState('')

  let location = useLocation() 
  let navigate = useNavigate()

  const HandleEditProduct = (e) => {
    e.preventDefault()
    const newEditedProduct = {
      productId: location.state.productId,
      name: productNameEdit === '' ? location.state.name : productNameEdit,
      description: productDescriptionEdit === '' ? location.state.description : productDescriptionEdit,
      price: productPriceEdit === '' ? location.state.price : productPriceEdit,
    }

    setProductEdit(newEditedProduct)
    setProductNameEdit('')
    setProductDescriptionEdit('')
    setProductPriceEdit('')

    const x = productList.filter(item => item.productId !== location.state.productId)
    setProductList([...x,  newEditedProduct])
    navigate('/')
  }
 
  useEffect(() => {
    if(location) {
      setProductEdit(location.state)
    } else {
      setProductEdit('')
    }
  }, [location]);

  return (
    <div>
      <h3>ProductEditPage</h3>
      <p>ProductId: {productEdit?.productId}</p>
        <form onSubmit={HandleEditProduct} className="Product">
              <label>Product Name</label>
              <input type="text" placeholder={productEdit?.name} onChange={(e) => setProductNameEdit(e.target.value)} />
              <br />
              <label>Product description </label>
              <input type="text" placeholder={productEdit?.description} onChange={(e) => setProductDescriptionEdit(e.target.value)} />
              <br />
              <label>Price: </label>
              <input type="text" placeholder={productEdit?.price} onChange={(e) => setProductPriceEdit(e.target.value)} />
              <br />
                <button type='submit'>Edit Product</button>
        </form>  
    </div>
  )
}

export default ProductEditPage