import React, { useContext } from 'react'
// import { Bills, Invoice } from '../../../Graphql/Query'
import { useQuery } from '@apollo/client';
import { Bills } from '../../../Graphql/Bill';
// import { ItemContext } from '../../../Contexts/Context';
import Navbar from '../../Navbar';

const Bill = () => {
  const { data } = useQuery(Bills)
  const UserData = JSON.parse(localStorage.getItem("UserData"))
  // const { cartSelectedId, cartSetSelectedId } = useContext(ItemContext);

  const styles = {
    preview: {
      display: "flex",
      flexDirection: "column",
    },
    image: { maxWidth: "50%", maxHeight: 50 },
  };

  // }
  return (
    <>
      <Navbar />
      <div className='contain'>
        <div className="row">
          <div className="col-75">
            <ul className="responsive-table">
              <li className="table-header">
                <div className='col col-1'>customerId</div>
                <div className='col col-1'>paymentid</div>
                <div className="col col-2">subtotal</div>
                <div className='col col-2'>total</div>
                <div className='col col-2'>status</div>
              </li>
              {/* <li className=''> */}
              {data?.Bills.map(bill => {
                return (
                  <>
                    <ul className="responsive-table">
                      <li className="table-row">
                        <div className='col col-2'>{bill.customerId}</div>
                        <div className='col col-2'>{bill.paymentIntentId}</div>
                        <div className='col col-2'>{bill.subtotal}</div>
                        <div className='col col-2'>{bill.total}</div>
                        <div className='col col-2'>{bill.payment_status}</div>

                      </li>
                    </ul>
                  </>
                )
              })}
              {/* {data?.Bills.map(bill => {
                return (
                  <>
                    {/* {UserData?.id === bill.userId ? */}
              {/* <li className="table-row" key={bill.id}>
                        <div className='col col-2'><i style={{ fontSize: "24px" }} className="fa" onClick={() => Seen(bill)}>&#xf06e;</i></div>
                        <div className='col col-2'><i style={{ fontSize: "24px" }} className="fa" onClick={() => Download(bill)}>&#xf0ed;</i></div>
                        <div className="col col-2">{bill.customerId}</div>
                        <div className='col col-2'>{bill.paymentIntentId}</div> */}
              {/* <div className='col col-2'>{bill.total}</div> */}
              {/* </li> */}
              {/* : <></> */}
              {/* }
                  </>
                )
              })} */}
            </ul>
            {/* <i style={{ fontSize: "24px" }} className="fa">&#xf073; */}
            {/* <input type='date' placeholder="Manufacture Date" /> */}
            {/* </i> */}
          </div>
        </div>

      </div>
    </>
  )
}

export default Bill