import React, { useState } from 'react'
import { useLazyQuery, useQuery } from '@apollo/client';
import { Subscription } from '../../../Graphql/Stripe';
import { styles } from '../../../user/Components/Cart/style';
import { getProducts } from '../../../Graphql/Product';
import Carousels from './Carousel';

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

  // console.log(products);
  const log = (event) => {
    const selectedOption = data?.data?.getProduct?.Stripe_priceId.find(x => x.time === event.target.value);
    setStripeId(selectedOption.priceId)
  }
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
          <div id="wrap" >
            <div id="columns" className="columns_4" style={{ overflow: "hidden" }}>
              <figure key={products.id}>
                <>
                  {/* <img src={products.image} alt="" style={styles.image} /> */}
                  {/* UncontrolledExample */}
                  <Carousels products={products}/>
                  
                </>
                <figcaption>{products.name}</figcaption>
                <select name="language" id="language" className='select' onChange={(e) => log(e)}>
                  {
                    data?.data?.getProduct?.Stripe_priceId.map(price => {
                      return (
                        <>
                          {price.time === null ?
                            <option>Select value</option>
                            :
                            <option>{price.time}</option>
                          }

                        </>
                      )
                    })
                  }
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
      </div >
    </>
  )
}

export default ViewProduct
// import React from 'react'

// const ViewProduct = () => {
//   return (
//     <>
//       <div className='prf'>
//         <div className='prf-wrap'>
//           <div id="wrap">
//             <div id="columns" className="columns_4">
//               <figure>
//                 <><img src={products.image} alt="" style={styles.image} /></>
//                 <figcaption>{products.name}</figcaption>
//                 {/* <select name="language" id="language" className='select'>
//                   <option value="Daily">Daily</option>
//                   <option value="Weekly">Weekly</option>
//                   <option value="Every 3 month">Every 3 month</option>
//                   <option value="Yearly">Yearly</option>
//                   <option value="Monthly">Monthly</option>
//                 </select><br /><br /> */}
//                 <select name="language" id="language" className='select' onChange={(e) => log(e)}>
//                   {data?.data?.getProduct?.Stripe_priceId.map(price => {
//                     return (
//                       <>
//                         {price.time === null ?
//                           <option>Select value</option>
//                           :
//                           <option>{price.time}</option>
//                         }

//                       </>
//                     )
//                   })}
//                 </select>
//                 <br /><br />
//                 <span className="price">₹{products.price}</span>
//                 <br /><br /><br />
//                 <button className='button' onClick={() => startSubscribeCheckout()}>Buy Now</button>
//               </figure>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   )
// }

// export default ViewProduct