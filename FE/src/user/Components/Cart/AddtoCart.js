import React from 'react'
import "./cart.css"
import Default from '../../../image/default.png';
import { useState } from 'react';
import { useMutation, useQuery, useLazyQuery } from "@apollo/client";
import { toast } from "react-toastify";
import { Delete_Cart, Carts, update_Carts } from '../../../Graphql/Cart'
import { CHECKOUT } from '../../../Graphql/Stripe.js';
import { styles } from './style';
import Navbar from '../../Navbar';
import cartImage from '../../../image/cart.png'
import { Link } from 'react-router-dom';

const Cart = () => {
    const [deleteCart] = useMutation(Delete_Cart);
    const [cart, setCart] = useState([])
    const UserData = JSON.parse(localStorage.getItem("UserData"))
    const { data, refetch, error , loading } = useQuery(Carts, {
        variables: { userId: UserData?.id }, onCompleted:
            (data) =>
                setCart(data?.Carts?.Item),
    });
    const [updateCarts] = useMutation(update_Carts);
    const removeCart = (cart) => {
        deleteCart({
            variables: {
                id: cart.id
            }
        }).then(() => {
            refetch();
        })
        toast("deleted from cart")

    };
    let subtotal = 0;
    let badge = 0
    // eslint-disable-next-line
    data?.Carts?.data.map(cart => {
        UserData?.id === cart.userId ?
            subtotal += cart.totalPrice
            : <></>
        UserData?.id === cart.userId ?
            badge += cart.quantity
            : <></>
    }
    )

    const clearCart = () => {
        // eslint-disable-next-line
        data?.Carts?.data.map(cart => {
            UserData?.id === cart.userId ?
                deleteCart({
                    variables: {
                        id: cart.id
                    }
                }).then(() => {
                    refetch();
                })
                :
                <></>
        })
    }
    const [startCheckout] = useLazyQuery(CHECKOUT, {
        variables: { userId: UserData?.id, email: UserData?.email, Stripe_Id: UserData?.Stripe_Id },
        onCompleted: (queryData) => {
            let checkoutData = JSON.parse(queryData.createCheckoutSession);
            console.log(checkoutData);
            let checkoutUrl = checkoutData.url
            window.location.assign(checkoutUrl)
        }
    })
    // const startCheckout = () => {
    //     console.log("Stripe");
    // }
    const increment = (cart) => {
        const count = cart.quantity + 1
        const total = cart.price * count
        console.log(cart.id);
        if (cart.id !== 0) {
            // debugger
            updateCarts({
                variables: {
                    id: cart.id,
                    quantity: count,
                    totalPrice: total
                }
            }).then(() => {
                refetch();
            })
        }
    }
    const decrement = (cart) => {
        if (cart.quantity > 1) {
            const count = cart.quantity - 1
            const total = cart.price * count
            console.log(count);
            if (cart.id !== 0) {
                updateCarts({
                    variables: {
                        id: cart.id,
                        quantity: count,
                        totalPrice: total
                    }
                }).then(() => {
                    refetch();
                })
            }
        }
    }
    if (error) return `ERROR! ${error}`
    if (loading) return <div className='loader'></div>;
    return (
        <>
            <Navbar />
            <section className="shopping-cart dark">
                <div className="block-heading">
                    <h2>Shopping Cart</h2>
                </div>
                <div className="content">
                    <div className="row">
                        <div className="col-md-12 col-lg-8">
                            <div className="items">
                                {(cart.length === 0) ?
                                    <>
                                        <div className='container-fluid  mt-100'>
                                            <div className='col-md-12'>
                                                <div className="cardss">
                                                    <div className="card-body cardss">
                                                        <img src={cartImage} width="130" height="130" className="img-fluid mb-4 mr-3" alt='' />
                                                        <h1><strong>Your Cart is Empty</strong></h1>
                                                        <h4>Add something to make me happy :)</h4>
                                                        <Link to="/" className="btn btn-primary cart-btn-transform m-3">continue shopping</Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                    :
                                    <>
                                        {
                                            cart.map(cart => {
                                                return (
                                                    <>
                                                        <ul className="responsive-table" key={cart.id}>
                                                            <li className="table-row" key={cart.id} data-id={cart.id}>
                                                                <div className="col col-1">
                                                                    {
                                                                        cart.image ?
                                                                            <img src={cart.image} style={styles.image} alt="img" />
                                                                            :
                                                                            <img src={Default} style={styles.image} alt="img" />
                                                                    }
                                                                </div>
                                                                <div className='col col-1' data-label="Customer Name">
                                                                    <div className="product-name">
                                                                        <p>{cart.name}</p>
                                                                        <div className="product-info">
                                                                            <div>Price: <span className="value">{cart.price}</span></div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className='col col-1' data-label="Customer Name">
                                                                    <div className="quantity" key={cart.id}>
                                                                        <div className="quantity__minus" onClick={() => decrement(cart)}><span>-</span></div>
                                                                        <input name="quantity" type="text" className="quantity__input" value={cart.quantity} />
                                                                        <div className="quantity__plus" onClick={() => increment(cart)}><span>+</span></div>
                                                                    </div>
                                                                </div>
                                                                <div className='col col-1' data-label="Customer Name">
                                                                    <span>₹{cart.totalPrice}</span>
                                                                </div>
                                                                <div className='col col-1' data-label="Customer Name">
                                                                    <div className="icons">
                                                                        <i className="fa fa-trash" onClick={() => removeCart(cart)}></i>
                                                                    </div>
                                                                </div>

                                                            </li>
                                                        </ul>
                                                    </>
                                                )
                                            })
                                        }
                                    </>
                                }
                            </div>
                        </div>
                        <div className="col-md-12 col-lg-4">
                            {(cart.length === 0) ? <></> : <>
                                <div className="summary">
                                    <h3>Summary</h3>
                                    <div className="summary-item"><span className="texts">Subtotal</span><span className="price">₹ {subtotal}</span></div>
                                    <div className="summary-item"><span className="texts">Discount</span><span className="price">0 %</span></div>
                                    <div className="summary-item"><span className="texts">Shipping</span><span className="price">₹ 0</span></div>
                                    <div className="summary-item"><span className="texts">Total</span><span className="price">₹ {subtotal}</span></div>
                                    <button type="button" className="btn btn-lg btn-block" onClick={() => startCheckout()}>Proceed to Buy ({badge} items)</button>
                                    <button type="button" className="btn btn-lg btn-block" onClick={() => clearCart()}>Clear all</button>
                                </div>
                            </>}
                        </div>

                    </div>
                </div >
            </section >
        </>
    )
}

export default Cart