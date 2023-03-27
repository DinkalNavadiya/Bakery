import React, { useState } from 'react'
import { billStyle } from '../Cart/style'

const Product = ({ bill }) => {
  // const [data, setData] = useState('')

  // console.log(data);
  return (
    <>
      {/* {bill?.Product.map(data => { */}
      <tr>
        <td>name</td>
        <td>quantity</td>
        <td>price</td>
        <td>totalPrice</td>
        <td>image</td>
      </tr>
      {
        bill?.Product.map(data => {
          return (
            <>
              <tr>
                <td>{data.name}</td>
                <td>{data.quantity}</td>
                <td>{data.price}</td>
                <td>{data.totalPrice}</td>
                <td><img src={data.image} style={billStyle.image} /></td>
              </tr>
            </>
          )
        })
      }

      {/* })} */}
    </>
  )
}

export default Product