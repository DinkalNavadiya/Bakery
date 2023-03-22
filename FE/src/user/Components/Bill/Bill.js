import React from 'react'
// import { Bills, Invoice } from '../../../Graphql/Query'
import { useQuery } from '@apollo/client';
import { Bills } from '../../../Graphql/Bill';
// import { ItemContext } from '../../../Contexts/Context';
import Navbar from '../../Navbar';

const Bill = () => {
  const { data } = useQuery(Bills)
  const UserData = JSON.parse(localStorage.getItem("UserData"))

  return (
    <>
      <Navbar />
      <div className='contain'>
        <div className="row">
          <div className="col-75">
            <ul className="responsive-table">
              <li className="table-header">
                <div className='col col-2'>paymentid</div>
                <div className='col col-2'>SubscriptionId</div>
                <div className="col col-2">subtotal</div>
                <div className='col col-2'>total</div>
                <div className='col col-2'>status</div>
              </li>
              {/* <li className=''> */}
              {data?.Bills.map(bill => {
                return (
                  <>
                    {UserData?.Stripe_Id === bill.customerId ?
                      <>
                        <ul className="responsive-table">
                          <li className="table-row">
                            <div className='col col-2'>
                              {bill.paymentIntentId === null ? <h1> - </h1> : bill.paymentIntentId}
                            </div>
                            <div className='col col-2'>
                              {bill.subscriptionId === null ? <h1> - </h1> : bill.subscriptionId}
                              </div>
                            <div className='col col-2'>{bill.subtotal}</div>
                            <div className='col col-2'>{bill.total}</div>
                            <div className='col col-2'>{bill.payment_status}</div>
                          </li>
                        </ul>
                      </> : <></>}
                  </>
                )
              })}
            </ul>
          </div>
        </div>

      </div>
    </>
  )
}

export default Bill