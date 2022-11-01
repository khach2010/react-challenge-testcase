export const Product = ({productId, name, description, price}) => {
  return (
    <div className='product'>
    <h3>Product Name: {name}</h3>
    <p>ProductId: {productId}</p>
    <p>Description: {description}</p>
    <p>Price: {price}</p>
  </div>
    )
}
