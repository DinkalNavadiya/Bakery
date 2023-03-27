import React from 'react'
import { Bills } from '../../../Graphql/Bill';
import Navbar from '../../Navbar';
import "./Bill.css"
import { useQuery } from '@apollo/client';
import Product from './Product';
const Bill = () => {
  const { data } = useQuery(Bills);
  const UserData = JSON.parse(localStorage.getItem("UserData"))

  const Seen = (bill) => {
    window.location.assign(bill.invoice_url);
  }
  const download = (bill) => {
    window.location.assign(bill.invoice_pdf);
  }
  return (
    <>
      <Navbar />
      <div className='bodys'>
        <div className="container-xl">
          <div className="table-responsive">
            <div className="table-wrapper">
              <div className="table-title">
                <div className="row">
                  <div className="col-sm-5">
                    <h2>Invoice <b>Management</b></h2>
                  </div>
                </div>
              </div>
              <table className="table table-striped table-hover">
                <thead>
                  <tr>
                    <th></th>
                    {/* <th>Name</th> */}
                    <th>Invoice No.</th>
                    <th>Product</th>
                    {/* <th>Date Created</th>
                    <th>Role</th> */}
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.Bills.map(bill => {
                    return (
                      <>
                        {
                          UserData?.Stripe_Id === bill.customerId ?
                            <>
                              <tr>
                                <td></td>
                                {/* <td>{bill.product.name}</td> */}
                                <td><a href="">{bill.InvoiceNumber}</a></td>
                                <td>
                                  <Product bill={bill} />
                                  {/* <tr></tr> */}
                                  {/* {bill.product.map(data => {
                                    return(
                                      <>
                                      </>
                                    )
                                  })} */}
                                </td>
                                {/* <td>04/10/2013</td>
                                <td>Admin</td> */}
                                <td>{bill.payment_status}</td>
                                <td>
                                  <a href="#" className="settings" title="Settings" data-toggle="tooltip">
                                    <i className="material-icons download" onClick={() => download(bill)}>&#xf090;</i>
                                  </a>
                                  <a href="#" className="delete" title="Delete" data-toggle="tooltip">
                                    <i className="material-icons remove_red_eye" onClick={() => Seen(bill)}>&#xe417;</i>
                                  </a>
                                </td>
                              </tr>
                            </>
                            :
                            <></>
                        }
                      </>
                    )
                  }
                  )
                  }
                </tbody>
              </table>
              {/* <div className="clearfix">
              <div className="hint-text">Showing <b>5</b> out of <b>25</b> entries</div>
              <ul className="pagination">
                <li className="page-item disabled"><a href="#">Previous</a></li>
                <li className="page-item"><a href="#" className="page-link">1</a></li>
                <li className="page-item"><a href="#" className="page-link">2</a></li>
                <li className="page-item active"><a href="#" className="page-link">3</a></li>
                <li className="page-item"><a href="#" className="page-link">4</a></li>
                <li className="page-item"><a href="#" className="page-link">5</a></li>
                <li className="page-item"><a href="#" className="page-link">Next</a></li>
              </ul>
            </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Bill
