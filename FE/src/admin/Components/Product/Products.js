import { useMutation, useQuery } from '@apollo/client';
import moment from 'moment';
import React, { useContext, useState } from 'react'
import { ItemContext } from '../../../Contexts/Context';
import Default from '../../../image/default.png'
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import WrongError from '../../../user/Components/Cart/wrongError';
import Subscriptions from '../../../image/subscription.png'
import { Products, getProducts, Delete_Product } from '../../../Graphql/Product';
import ViewProduct from './ViewProduct';
import { styles } from '../../../user/Components/Cart/style';
import AddCart from '../../../user/Components/Cart/AddCart';
const Item = () => {

  // debugger
  const { selectedId, setSelectedId } = useContext(ItemContext);
  const { cartSelectedId, cartSetSelectedId } = useContext(ItemContext);

  const [deleteProducts] = useMutation(Delete_Product);
  const UserData = JSON.parse(localStorage.getItem("UserData"))
  const pageSize = 5
  const [page, setPage] = useState(1)
  const { loading, error, data, refetch } = useQuery(Products, {
    variables: { page: page, limit: pageSize, offset: page * pageSize }
  });

  let navigate = useNavigate()
  const Confirm = () => {
    toast("Login to add product in cart")
    navigate("/login");
  }

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

  const { data: getData } = useQuery(getProducts, {
    variables: { id: cartSelectedId }, onCompleted: (data) => setProducts(data.getProduct)
  });
  console.log(cartSelectedId);
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
  if (error) return <WrongError />
  if (loading) return <div className='loader'></div>;


  return (
    <div className="container" key="">
      {UserData ? <h1>Welcome {UserData?.name}</h1> : <h1>Welcome To Bakery</h1>}

      <div className="App-header">
        <input type="text" placeholder='Search....' style={{ height: "35px", width: "550px", margin: "10px", marginLeft: "250px" }} onChange={e => setSearchInput(e.target.value)} value={searchInput} />
        <ul className="responsive-table">
          <li className="table-header">
            {/* Math.random().toString(36).substr(2, 9) */}
            <div className="col col-1">Image</div>
            <div className="col col-1">Name</div>
            <div className="col col-1">Weight</div>
            <div className="col col-1">Mdate.</div>
            <div className="col col-1">Edt.</div>
            <div className="col col-1">Price</div>
            <div className='col col-1'>Action</div>
          </li>
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
                    {UserData === null ?
                      <>
                        <i className='fa fa-shopping-cart' onClick={() => Confirm()} />
                      </> : <>
                        {UserData?.role === "admin" || UserData?.role === "superAdmin" ?
                          <>
                            <i className="fa fa-trash" onClick={() => removeItem(product.id)}></i>
                            <i className="fa fa-edit" onClick={() => setSelectedId(product.id)}></i>
                          </>
                          :
                          <>
                            <input className="cart-btn" type="checkbox" id="cart-btn" name="cart-btn" />
                            <label htmlFor="cart-btn">
                              <i className='fa fa-shopping-cart' onClick={() => cartSetSelectedId(product.id)}></i>
                              <i className="uil uil-expand-arrows"></i>
                            </label>
                            <AddCart products={products} cartSelectedId={cartSelectedId} getData={getData} />
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
