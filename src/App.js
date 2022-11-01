import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import CategoriesPage from './pagina/CategoriesPage'
import CategoryEditPage from './pagina/CategoryEditPage'
import ErrorPage from './pagina/ErrorPage'
import ProductDetailPage from './pagina/ProductDetailPage'
import ProductEditPage from './pagina/ProductEditPage'
import ProductsPage from './pagina/ProductsPage'
import Products from './products.json'
import ProductGroupsData from './productGroups.json'

function App() {
  const [productList, setProductList] = useState(Products)
  const [catList, setCatList] = useState(ProductGroupsData)

  return (
    <div className="App">
      <div>
        <Navbar />
      </div>

      <div>
        <Routes>
          <Route
            path="/"
            element={
              <ProductsPage
                productList={productList}
                setProductList={setProductList}
                catList={catList}
                setCatList={setCatList}
              />
            }
          />
          <Route
            path="/productDetail/:id"
            element={
              <ProductDetailPage
                productList={productList}
                setProductList={setProductList}
                catList={catList}
                setCatList={setCatList}
              />
            }
          />
          <Route
            path="/productEditPage/:id"
            element={
              <ProductEditPage
                productList={productList}
                setProductList={setProductList}
              />
            }
          />

          <Route
            path="/categories"
            element={
              <CategoriesPage catList={catList} setCatList={setCatList} />
            }
          />
          <Route
            path="/categoryEditPage/:id"
            element={
              <CategoryEditPage catList={catList} setCatList={setCatList} />
            }
          />

          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
    </div>
  )
}

export default React.memo(App)
