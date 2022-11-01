import React, {useRef} from 'react'

function FormCreateACat({max, setCatList}) {
 
  const formEl = useRef();
  const CreateACat = (e) => {
    e.preventDefault()
    const formInputs = [...formEl.current.elements].filter(
      element => element.type === "text")
      
    const newProduct = formInputs.reduce(
      (acc, input) => {
        return {
          ...acc,
          [input.name]: input.value,
          "products": [

          ]
        };
      },
      { 
        id: max+1,
      }
    );
    setCatList(prevCatList => [...prevCatList, newProduct]);
  }

  return (
    <div className='FormCreateACat'>  
      <form ref={formEl} onSubmit={CreateACat} className="Category">
            <h1>Create a category</h1>
            <label htmlFor="name-input">Name</label>
            <input id="name-input" name="name" />
            <label htmlFor="description-input">description</label>
            <input id="description-input" name="description" />
            <button type='submit'>Create a category</button>
        </form>  
  </div>
  )
}

export default FormCreateACat