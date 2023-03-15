import React from 'react'
import Navbar from '../../Navbar';
import { useLazyQuery } from '@apollo/client';
import {  MULSUB } from '../../../Graphql/Stripe';

const Subscription = () => {
  const UserData = JSON.parse(localStorage.getItem("UserData"))
  const [startCheckout, { error, loading }] = useLazyQuery(MULSUB, {
    variables: { userId: "640eb610e5f66f437c453cad", price: "price_1MlmSPSDBdFF0CALVTRkXodQ", Stripe_Id: 'cus_NW6E0Jpy04xIlZ' },
    onCompleted: (queryData) => {
      // console.log(UserData?.id);
      let datas = JSON.parse(queryData.testSubscription);
      let checkoutUrl = datas.url
      window.location.assign(checkoutUrl)
      // console.log(checkoutUrl);
      // {
      //     data?.Carts?.data.map(cart => {
      //         return (
      //             <>
      //                 {UserData?.id === cart.userId ?
      //                     deleteCart({
      //                         variables: {
      //                             id: cart.id
      //                         }
      //                     }).then(() => {
      //                         refetch();
      //                     })
      //                     :
      //                     <>

      //                     </>}
      //             </>
      //         )
      //     })
      // }


    }
  })
  return (
    <>
      <Navbar />
      <div className="columns">
        <ul className="price">
          <li className="header">Basic</li>
          <li className="grey">₹ 800.00 / month</li>
          <li>10GB Storage</li>
          <li>10 Emails</li>
          <li>10 Domains</li>
          <li>1GB Bandwidth</li>
          <li className="grey"><a href="#" className="button" onClick={() => startCheckout()}>Subscribe</a></li>
        </ul>
      </div>

      <div className="columns">
        <ul className="price">
          <li className="header" style={{ backgroundColor: "#04AA6D" }}>Pro</li>
          <li className="grey">₹ 24.99 / year</li>
          <li>25GB Storage</li>
          <li>25 Emails</li>
          <li>25 Domains</li>
          <li>2GB Bandwidth</li>
          <li className="grey"><a href="#" className="button">Sign Up</a></li>
        </ul>
      </div>

      <div className="columns">
        <ul className="price">
          <li className="header">Premium</li>
          <li className="grey">₹ 49.99 / year</li>
          <li>50GB Storage</li>
          <li>50 Emails</li>
          <li>50 Domains</li>
          <li>5GB Bandwidth</li>
          <li className="grey"><a href="#" className="button">Sign Up</a></li>
        </ul>
      </div>
    </>
  )
}

export default Subscription