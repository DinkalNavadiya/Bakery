import React, { useState } from 'react'
import './cart.css'
import moment from 'moment';
import { Add_Cart } from '../../../Graphql/Cart';
import { useMutation } from '@apollo/client';
import { useQuery } from '@apollo/client';
import { Products } from '../../../Graphql/Product';
import { toast } from "react-toastify";

const AddCart = ({ products, cartSelectedId, getData }) => {
  const [addCarts] = useMutation(Add_Cart)
  const UserData = JSON.parse(localStorage.getItem("UserData"))
  const { refetch } = useQuery(Products)
  const [price, setPrice] = useState('')
  const log = (e) => {
    e.preventDefault()
    // console.log(product.Stripe_priceId);
    {
      products.Stripe_priceId.map(price => {
        <>
          {price.time === null ?
            // console.log(price) 
            setPrice(price.priceId)
            :
            <></>
          }
        </>
      })
    }
  }
  const Submit = () => {
    if (cartSelectedId === 0) {
    } else if (UserData === null) {
      console.log("Empty");
    } else {
      let cartInput = {
        userId: UserData?.id,
        productId: cartSelectedId,
        name: products.name,
        weight: products.weight,
        quantity: products.quantity,
        price: products.price,
        totalPrice: products.totalPrice,
        image: products.image,
        Stripe_Id: products.Stripe_Id,
        Stripe_priceId: price
      }
      console.log("submit", cartInput);

      addCarts({
        variables: {
          cartInput: cartInput
        }
      }).then(() => {
        refetch();
      })
      toast('🦄 added');
      window.location.reload();
    }
  }
  return (
    <>
      <div className='cart'>
        <div className='cart-wrap'>
          <div className='body'>
            <div className="CartContainer">
              <div className="Header">
              </div>
              <form className="Cart-Items" onSubmit={(e) => log(e)} >
                <div className="image-box">
                  <img src={products.image} style={{ height: "120px" }} />
                </div>
                <div className="about">
                  <h1 className="titless">{products.name}</h1>
                  {/* <img src="images/veg.png" style={{ height: "30px" }} /> */}
                </div>
                <div className="prices">
                  <div className="amount">₹ {products.price}</div>
                  <br />
                  <div className="save">Mfg: <u>{moment(products.Dt_Mfg).format("YYYY-MM-DD")}</u></div>
                  <br />
                  <div className="save">Exp: <u>{moment(products.Dt_Exp).format("YYYY-MM-DD")}</u></div>

                  <button className="button" onClick={(e) => Submit(e)}>Add to Cart</button>
                </div>
              </form>


            </div>
          </div >
        </div >
      </div >
    </>
  )
}

export default AddCart