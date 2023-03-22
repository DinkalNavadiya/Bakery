import React, { useState, useContext } from 'react'
// import { getProducts } from '../../../Graphql/Product';
// import { useQuery } from '@apollo/client';
import { useLazyQuery, useQuery } from '@apollo/client';
import { Subscription } from '../../../Graphql/Stripe';
import { styles } from '../../../user/Components/Cart/style';
import { getProducts } from '../../../Graphql/Product';
import { ItemContext } from '../../../Contexts/Context';

const ViewProduct = ({ selectedId }) => {
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
  const data = useQuery(getProducts
    , {
      variables: { id: selectedId }, onCompleted:
        (data) => setProducts(data.getProduct)
    }
  );
  const [stripeId, setStripeId] = useState('')
  const UserData = JSON.parse(localStorage.getItem("UserData"))

  // console.log(stripeId);
  const log = (event) => {
    // console.log(event.target.value);
    const selectedOption = data?.data?.getProduct?.Stripe_priceId.find(x => x.time === event.target.value);
    // console.log('====selectedOption', selectedOption.priceId)
    setStripeId(selectedOption.priceId)
  }
  // console.log(stripeId);
  const [startSubscribeCheckout] = useLazyQuery(Subscription, {
    variables: { userID: UserData?.id, price: stripeId, Stripe_Id: UserData?.Stripe_Id },
    onCompleted: (queryData) => {
      let data = JSON.parse(queryData.Subscription);
      let checkoutUrl = data.url
      window.location.assign(checkoutUrl)
    }
  })
  return (
    <>
      <div className='prf'>
        <div className='prf-wrap'>
          <div id="wrap">
            <div id="columns" className="columns_4" style={{ overflow: "hidden" }}>
              <figure>
                <><img src={products.image} alt="" style={styles.image} /></>
                <figcaption>{products.name}</figcaption>
                <select name="language" id="language" className='select' onChange={(e) => log(e)}>
                  {data?.data?.getProduct?.Stripe_priceId.map(price => {
                    return (
                      <>
                        {price.time === null ?
                          <option>Select value</option>
                          :
                          <option>{price.time}</option>
                        }

                      </>
                    )
                  })}
                </select>
                <br /><br />
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