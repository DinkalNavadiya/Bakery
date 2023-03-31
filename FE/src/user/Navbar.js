import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { useQuery } from '@apollo/client';
import { AuthContext } from '../Contexts/authContext';
import { Badges } from '../Graphql/Cart';
// import Google from './Components/User/Google';

const Navbar = () => {
  const { logout } = useContext(AuthContext);
  let navigate = useNavigate()
  const onLogout = () => {
    logout();
    navigate('/');
  }
  // const [quantityId, setQuantityId] = useState(0);
  const [load, setLoad] = useState(false);
  const UserData = JSON.parse(localStorage.getItem("UserData"))
  const [totalCart, setTotalCart] = useState('')
  const { data: badge } = useQuery(Badges
    , {
      variables: { userId: UserData?.id }, onCompleted: () => setTotalCart(badge?.Badge?.count)
    },
  )
  const cart = () => {
    // addEventListener('click', console.log("Click"))
    setLoad(true);
    setTimeout(() => {
      setLoad(false)
    }, 10)
    navigate('/cart')
  }
  if (load) return <div className='loader'></div>;

  return (
    <>
      <div key="">
        <nav className="navbar">
          <div className="container-fluid">
            <div className="navbar-header">
              <div className="navbar-brand">🍞 Bakery</div>
            </div>
            <ul className="nav navbar-nav">
              <li><Link to="/">Home</Link></li>
              <li><Link>About</Link></li>
              {UserData?.role === "admin" || UserData?.role === "superAdmin" ? <li><Link to="/order">Orders</Link></li> : <li><Link to="/bill">Order</Link></li>}
              {UserData?.role === "admin" || UserData?.role === "superAdmin" ? <li><Link to="/user">Account</Link></li> : null}
            </ul>
            <ul className="nav navbar-nav">
              {UserData === null ?
                <>
                  <li className='right'>
                    <Link to="/login"> <button className="btn btn-outline-success m-1" type="submit">Login</button></Link>
                  </li>
                  <li>
                    <Link to="/register"><button className="btn btn-outline-success m-1" type="submit">Signup</button></Link>
                  </li>
                </>
                :
                <>
                  <input className="cart-btn" type="checkbox" />
                  <label className="cart-btn">
                    <a href='#'><i className="fa fa-shopping-cart" onClick={() => cart()}></i></a>
                    {totalCart >= 1 ? <span className='badge badge-warning' id='lblCartCount'>{totalCart}</span> : <></>}
                  </label>
                  <input className="prf-btn" type="checkbox" />
                  <label htmlFor="prf-btn">
                    <Link to="/profile">
                      <i className="fa fa-user-circle" />
                    </Link>
                  </label>
                  <button className='btn btn-outline-success' type='submit' onClick={onLogout}>
                    Logout
                  </button>
                </>
                // :

              }
            </ul>
          </div>
        </nav>
      </div>
    </>
  )
}

export default Navbar
