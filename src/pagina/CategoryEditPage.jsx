import React, {useState, useEffect} from 'react'
import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

function CategoryEditPage({catList, setCatList}) {
  const [cateEdit, setCateEdit] = useState('')
  const [cateNameEdit, setCateNameEdit] = useState('')
  const [cateDescriptionEdit, setCateDescriptionEdit] = useState('')

  let location = useLocation() 
  let navigate = useNavigate()

  const HandleEditCate = (e) => {
    e.preventDefault()
    const newEditedCate = {
      id: location.state.id,
      name: cateNameEdit === '' ? location.state.name : cateNameEdit,
      description: cateDescriptionEdit === '' ? location.state.description : cateDescriptionEdit,
      products: location.state.products
    }
    setCateEdit(newEditedCate)
    resetForm()

    const x = catList.filter(item => item.id !== location.state.id)
   
    setCatList([...x,  newEditedCate])
    navigate('/categories')
  }
  function resetForm() {
    setCateNameEdit('')
    setCateDescriptionEdit('')
  }
 


  useEffect(() => {
    if(location) {
      setCateEdit(location.state)
    } else {
      setCateEdit('')
    }
  }, [location]);

  return (
    <div>
      <h1>Category Edit Page</h1>
      <p>Category Id: {cateEdit?.id}</p>
      <form onSubmit={HandleEditCate} className="Category-Form">
              <label>Category Name</label>
              <input type="text" placeholder={cateEdit?.name} onChange={(e) => setCateNameEdit(e.target.value)} />
              <br />
              <label>Category description</label>
              <input type="text" placeholder={cateEdit?.description} onChange={(e) => setCateDescriptionEdit(e.target.value)} />
              <br />
              <p>All Product in this category</p>
              <ul>{location.state.products?.map((p,i) => 
                  <li key={p.productId+p.name+i}>{p.name}</li>
              )}</ul>
            
                <button type='submit'>Edit Category</button>
        </form>  
    </div>
  )
}

export default CategoryEditPage