import React, {useState, useEffect} from 'react'
import { useLocation } from 'react-router-dom'
import { MultiSelect } from "react-multi-select-component";

function ProductDetailPage({catList}) {
  const [productDetail, setProductDetail] = useState('')
  const [selected, setSelected] = useState([])

  let location = useLocation() 

  const options = catList.map((item) => {
    return {
      value: item.name, label: item.name
    }
  })

  useEffect(() => {
    if(location) {
      setProductDetail(location.state)
    } else {
      setProductDetail('')
    }
  }, [location]);

  return (
    <div>
      <h1>Product Detail</h1>
      <p>Product Name: {productDetail.pName}</p>
      <p>select a category</p>
    
      <MultiSelect
        options={options}
        value={selected}
        onChange={setSelected}
        labelledBy="Select"
      />
    
    </div>
  )
}

export default ProductDetailPage