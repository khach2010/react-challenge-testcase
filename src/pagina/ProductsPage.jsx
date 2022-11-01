import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import FormCreateAProduct from '../components/FormCreateAProduct'
import { Product } from '../components/Product'


function ProductsPage({productList, setProductList, catList}) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };
  let navigate = useNavigate()

  const max = productList.reduce(function(prev, current) {
    return (prev.y > current.y) ? prev.productId*1 : current.productId*1
  })
  
  const DeletePro = (productId) => {
    const newProList  = productList.filter(item => item.productId !== productId)
    setProductList(newProList)
  }
  const EditPro = (item) => {
    navigate(`/productEditPage/${item.productId}`, {state: item})
  }
  const ProductDetails = (item) => {
    navigate(`/productDetail/${item.productId}`, {state: item})
  }
  const handleSelect = (id, item) => {
    // add product to Category Group
      // 1  // select Category that want to update 
      // 2  // check if product is already exist in this category or not with IDCatTest 
      // 3 // (!== -1 => product already exist in this category => return catList , and do nothing)
      // 4  // when product not in this category update selected category  products array with new added item
    const CatSelected = catList.filter((c) => c.id === id)
    const IDCatTest = CatSelected[0]?.products.findIndex(el => el.productId === item.productId)
    if(IDCatTest !== -1) {
     return catList
    }
   return CatSelected[0].products = [...CatSelected[0]?.products, item]
  }
  
       
  return (
    <div>
      <h1>Products Page</h1>
       
       <FormCreateAProduct max={max} setProductList={setProductList} /> 

        {productList.map((item,i) => {
          return <div key={item.productId+item.name}>
               <Product {...item}></Product>

                <button onClick={() => ProductDetails(item)}>Details</button>
                <button onClick={() => DeletePro(item.productId)}>Delete</button>
                <button onClick={() => EditPro(item)}>Edit</button>
      
                <button onClick={handleOpen}>Select a category</button>
                  {open 
                    ? <div>
                        <ul>{
                          catList.map((cat,i) => (
                          <li key={cat.id+1} onClick={() => handleSelect(cat.id, item)}>{cat.name}</li>))
                          }</ul>
                      </div> 
                    : ''
                  }
          </div>  
         
        })}

    </div>
  )
}

export default React.memo(ProductsPage)