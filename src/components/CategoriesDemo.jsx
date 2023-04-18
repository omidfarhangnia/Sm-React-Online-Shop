import React from 'react'

const CategoriesDemo = ({ categoryName, categoryData}) => {
    console.log(categoryData)
  return (
    <div>
      <h1>{categoryName}</h1>
      <div className='bg-green-500 m-6'>
        {/* {categoryData?.map(item => <li>{item}</li>)} */}
      </div>
    </div>
  )
}

export default CategoriesDemo
