import React, { useState } from 'react'
// import { getProducts } from '../../../Graphql/Product';
// import { useQuery } from '@apollo/client';
import { useLazyQuery, useQuery } from '@apollo/client';
import { Subscription } from '../../../Graphql/Stripe';
import styles from '../../../user/Components/Cart/style';
import { getProducts } from '../../../Graphql/Product';

const ViewProduct = ({ UserData , selectedId }) => {
  const [products, setProducts] = useState({
    userId: "",
    productId: "",
    name: "",
    weight: "",
    quantity: "",
    Dt_Mfg: "",
    Dt_Exp: "",
    price: "",
    image: ""
  });
  const _ = useQuery(getProducts
    , {
      variables: { id: selectedId }, onCompleted:
      (data) => setProducts(data.getProduct)
    }
    );
    const [startSubscribeCheckout] = useLazyQuery(Subscription, {
      variables: { userID: UserData?.id, price: products.Stripe_priceId, Stripe_Id: UserData?.Stripe_Id },
      onCompleted: (queryData) => {
        let data = JSON.parse(queryData.Subscription);
        console.log(data.url);
        let checkoutUrl = data.url
        window.location.assign(checkoutUrl)
      }
    })
  return (
    <>
      <div className='prf'>
        <div className='prf-wrap'>
          <div id="wrap">
            <div id="columns" className="columns_4">
              <figure>
                <><img src={products.image} alt="" style={styles.image} /></>
                <figcaption>{products.name}</figcaption>
                <select name="language" id="language" className='select'>
                  <option value="Daily">Daily</option>
                  <option value="Weekly">Weekly</option>
                  <option value="Every 3 month">Every 3 month</option>
                  <option value="Yearly">Yearly</option>
                  <option value="Monthly">Monthly</option>
                  {/* <option value="java" selected>Java</option> */}
                </select><br /><br />
                <span className="price">₹{products.price}</span>
                <br /><br /><br />
                <button className='button' onClick={() => startSubscribeCheckout()}>Buy Now</button>
              </figure>
              {/* </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ViewProduct