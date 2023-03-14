import React from 'react'
import { useQuery } from '@apollo/client';
import Default from '/Users/vishal/Documents/Dinkal/bakery/FE/src/image/default.png';
import { Bills } from '../../../Graphql/Bill';

const Order = () => {
  const { data } = useQuery(Bills)
  const styles = {
    preview: {
      display: "flex",
      flexDirection: "column",
    },
    image: { maxWidth: "50%", maxHeight: 50 },
  };
  return (
    <>
      {/* <Navba /> */}
      <div className="container">
        <div className="App-header">
          <ul className="responsive-table" key="">
            <li className="table-header">
              <div className="col col-1">Image</div>
              <div className="col col-1">Name</div>
              <div className="col col-1">User</div>
              <div className='col col-1'>Quantity</div>
              <div className="col col-1">Price</div>
            </li>
            {data?.Bills.map(bill => {
              return (
                <>
                  <ul className="responsive-table" key={bill.id}>
                    <li className="table-row">
                      <div className="col col-1">
                        {
                          bill.image ?
                            <img src={bill.image} style={styles.image} alt="img" />
                            :
                            <img src={Default} style={styles.image} alt="img" />
                        }
                      </div>
                      <div className="col col-1">
                        {bill.name}
                      </div>
                      <div className="col col-1">{bill.userId}</div>
                      <div className="col col-1">{bill.quantity}</div>
                      <div className="col col-1">{bill.Products_Price}</div>
                    </li>
                  </ul>
                </>
              )
            })}
          </ul>
        </div>
      </div>
    </>
  )
}

export default Order