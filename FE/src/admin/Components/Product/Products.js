import { useMutation, useQuery } from '@apollo/client';
import moment from 'moment';
import React, { useContext, useState } from 'react'
import { ItemContext } from '../../../Contexts/Context';
import Default from '../../../image/default.png'
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import WrongError from '../../../user/Components/Cart/wrongError';
import Subscriptions from '../../../image/subscription.png'
import { Products, Delete_Product } from '../../../Graphql/Product';
import { styles } from '../../../user/Components/Cart/style';
import { Add_Cart } from '../../../Graphql/Cart';
import ViewProduct from './ViewProduct';
const Item = () => {

  // debugger
  const { selectedId, setSelectedId } = useContext(ItemContext);
  const [deleteProducts] = useMutation(Delete_Product);
  const UserData = JSON.parse(localStorage.getItem("UserData"))
  const pageSize = 5
  const [page, setPage] = useState(1)
  const { loading, error, data, refetch } = useQuery(Products, {
    variables: { page: page, limit: pageSize, offset: page * pageSize }
  });
  // console.log(loading);
  let navigate = useNavigate()
  const Confirm = () => {
    toast("Login to add product in cart")
    navigate("/login");
  }
  const removeItem = (id, stripe_Id) => {
    deleteProducts({
      variables: {
        id: id,
        stripe_Id: stripe_Id
      }
    }).then(() => {
      refetch();
    })
    toast.error('🦄 deleted');
  }

  const [searchInput, setSearchInput] = useState("");
  const [addCarts] = useMutation(Add_Cart)

  const [load, setLoad] = useState(false);
  var elements = document.getElementsByClassName("table-row");
  // Declare a loop variable
  var i;

  // List View
  const listView = () => {
    for (i = 0; i < elements.length; i++) {
      elements[i].style.width = "100%";
      elements[i].style.display = "flex";
      elements[i].style.padding = "25px 30px"
      elements[i].style.marginBottom = "25px"
    }
  }

  // Grid View
  const gridView = () => {
    for (i = 0; i < elements.length; i++) {
      elements[i].style.width = "30%";
      elements[i].style.display = "inline-block"
      elements[i].style.padding = "20px"
      elements[i].style.margin = "10px"
    }
  }
  const Submit = (product) => {
    // debugger
    if (product.id) {
      setLoad(true);
      let cartInput = {
        customerId: UserData?.Stripe_Id,
        userId: UserData?.id,
        productId: product.id,
        name: product.name,
        weight: product.weight,
        quantity: product.quantity,
        price: product.price,
        totalPrice: product.totalPrice,
        image: product.image,
        Stripe_Id: product.Stripe_Id,
        // Stripe_priceId: product.Stripe_priceId 
      }
      addCarts({
        variables: {
          cartInput: cartInput
        }
      }).then(() => {
        refetch();
        setTimeout(() => {
          setLoad(false)
          setSelectedId(0)
        }, 10)
      }).catch(err => {
        setLoad(false)
      })
      toast('🦄 added');
    }
  }
  if (error) return <WrongError />
  if (loading || load) return <div className='loader'></div>;
  return (
    <div className="container" key="">
      <h1>{selectedId}</h1>
      {UserData ? <h1>Welcome {UserData?.name}</h1> : <h1>Welcome To Bakery</h1>}
      <div className="App-header">
        <input type="text" placeholder='Search....' style={{ height: "35px", width: "550px", margin: "10px", marginLeft: "250px" }} onChange={e => setSearchInput(e.target.value)} defaultValue={searchInput} />
        <button className='btn btn-outline-success m-1 active' style={{ margin: "10px" }} onClick={() => listView()}><i className="fa fa-bars" ></i></button>
        <button className='btn btn-outline-success m-10' style={{ margin: "10px" }} onClick={() => gridView()} ><i className="fa fa-th-large" ></i></button>
        <ul className="responsive-table">
          {data?.Products?.data.filter(prd => prd.name.toLowerCase().includes(searchInput)).map(product => {
            return (
              <li className="table-row" key={product.id} >
                <div className="col col-1" data-label="Customer Name">
                  {product.image === "" ?
                    <><img src={Default} alt="" style={styles.image} /></> :
                    <><img src={product.image} alt="" style={styles.image} /></>
                  }
                </div>
                <div className="col col-1" data-label="Customer Name">{product.name}</div>
                <div className="col col-1" data-label="Customer Name">{product.weight}</div>
                <div className="col col-1" data-label="Amount">{moment(product.Dt_Mfg).format("YYYY MM DD")}</div>
                <div className="col col-1" data-label="Payment Status">{moment(product.Dt_Exp).format("YYYY MM DD")}</div>
                <div className="col col-1" data-label="Customer Name">{product.price}</div>
                <div className='col col-1'>
                  <div className='icons'>
                    {(UserData === null) ?
                      <>
                        <i className='fa fa-shopping-cart' onClick={() => Confirm()} />
                      </> : <>
                        {((UserData?.role === "admin") || (UserData?.role === "superAdmin")) ?
                          <>
                            <i className="fa fa-trash" onClick={() => removeItem(product.id)}></i>
                            <i className="fa fa-edit" onClick={() => setSelectedId(product.id)}></i>
                          </>
                          :
                          <>
                            <i className='fa fa-shopping-cart' onClick={() => Submit(product)}></i>
                            <input className="prf-btn" type="checkbox" id="prf-btn" name="prf-btn" />
                            <label htmlFor="prf-btn">
                              <img src={Subscriptions} alt="" style={{ width: "27px", marginLeft: "10px" }} onClick={() => setSelectedId(product.id)} />
                              <i className="uil uil-expand-arrows"></i>
                            </label>
                              <ViewProduct selectedId={selectedId} />
                          </>
                        }
                      </>
                    }
                  </div>
                </div>
              </li>
            )
          }
          )
          }
        </ul>
        {data?.Products?.count <= pageSize ? <></> :
          <>
            <div className='page-btn'>
              <button disabled={page === 1} onClick={() => setPage((prev) => prev - 1)} className='btn btn-outline-success'>Pervious</button>
              <span>Page No : {page} </span>
              <button disabled={page === Math.floor((data?.Products?.count + pageSize - 1) / pageSize)} onClick={() => setPage((prev) => prev + 1)} className='btn btn-outline-success'>Next</button>
            </div>
          </>
        }
      </div>
    </div>

  )
}
export default Item
