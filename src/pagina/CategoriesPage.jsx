import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import FormCreateACat from '../components/FormCreateACat'

function CategoriesPage({catList, setCatList}) {
  const [pageRefresh, setPageRefresh] = useState(false)
  const [title, setTitle] = useState('')
  let navigate =  useNavigate()

  let newCatList = catList.filter(function (obj) {
      return obj.name.toLowerCase().includes(title)
  });

  const max = catList.reduce(function(prev, current) {
    return (prev.y > current.y) ? prev.id*1 : current.id*1
  })
  

  const DeleteCate = (id) => {
      const newCatList = catList.filter(cate => cate.id !== id)
      setCatList(newCatList)
  }
  const EditCate = (cate) => {
    navigate(`/categoryEditPage/${cate.id}`, {state: cate})
  }

  const DeleteProductFromGroup = (cateId, proId) => {  
     const CatSelected = catList.filter((c) => c.id === cateId)
     const ProductsInCat = CatSelected[0].products.filter(p => p.productId !== proId)
     setPageRefresh(true)
    return CatSelected[0].products = [...ProductsInCat]
    
  }
 
  function SortAToZ() {
    const SortCatList = catList.sort(function(a,b) { return a.name.localeCompare(b.name)})
    setCatList(SortCatList)
    setPageRefresh(true)
  }
  function SmallToLarge() {
    const SortCatList = catList.sort(function(a,b) { return a.id - b.id})
    setCatList(SortCatList)
    setPageRefresh(true)
  }
  function LargeToSmall() {
    const SortCatList = catList.sort(function(a,b) { return b.id - a.id})
    setCatList(SortCatList)
    setPageRefresh(true)
  }

 

  useEffect(() => {
    const donePageRefresh = false
    return () => {
      setPageRefresh(donePageRefresh)
    };
  }, [pageRefresh,catList]);

  return (
    <div className='CategoriesPage'> 

      <h1>Categories Page</h1> 

      <FormCreateACat max={max} setCatList={setCatList} catList={catList}/>

      <h3>Sorting - Search Category </h3>
      <button onClick={SortAToZ}>A/Z</button>
      <button onClick={SmallToLarge}>0/99</button>
      <button onClick={LargeToSmall}>99/0</button>
      <input type="text" placeholder='search category ...' onChange={(e) => setTitle(e.target.value)}/>
         
        
      {newCatList?.map((cate, i) => {
        let proAZA = cate.products
        const {id, name, omschrijving} = cate

        function ProAZSort() {
           proAZA = proAZA.sort(function(a,b) { return a.name.localeCompare(b.name)})
           setPageRefresh(true)
           return proAZA
        }
        function ProZASort() {
          proAZA = proAZA.sort(function(a,b) { return b.name.localeCompare(a.name)})
          setPageRefresh(true)
          return proAZA
  
        }
        return <div key={id+name}>
          <p>id: {id}</p>
          <h2>Category name: {name}</h2>
          <p>Category omschrijving: {omschrijving}</p>
    
          <h5>All products in {name} groep:</h5>
              {proAZA.length > 1 ? (<div>
                <button onClick={ProAZSort}>A/Z</button>
                <button onClick={ProZASort}>Z/A</button>
              </div>) : ''}
              
              {proAZA?.map((pro,i) => {
              return <div key={pro.name+i}>
                <p>id: {pro.productId} - name: {pro.name}
                  <span> <button onClick={() => DeleteProductFromGroup(cate.id, pro.productId)}> X </button> </span> 
                </p>
              </div>
              })}

          <button onClick={() => DeleteCate(id)}>Delete</button>
          <button onClick={() => EditCate(cate)}>Edit</button>
        </div>
      })}

    </div>
  )
}

export default React.memo(CategoriesPage) 