import React from 'react'
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div>
      <ul>
        <li><Link to={'/categories'}>All Categories</Link></li>
        <li><Link to={'/'}>All Products</Link></li>
      </ul>
    </div>
  )
}

export default Navbar