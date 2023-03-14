import React, { createContext, useContext } from 'react'
import "./cart.css"
import Default from '../../../image/default.png';
import { useState, useReducer } from 'react';
import { useMutation, useQuery, useLazyQuery } from "@apollo/client";
import { ItemContext } from '../../../Contexts/Context';
import { toast } from "react-toastify";
import EmptyCart from './EmptyCart';
// import { Add_Bills } from '../../../Graphql/Bill';
import { Delete_Cart, Carts, getCart, update_Carts } from '../../../Graphql/Cart'
import { CHECKOUT, MULSUB, Subscription } from '../../../Graphql/Stripe.js';

const Cart = () => {
    const [deleteCart] = useMutation(Delete_Cart);
    // const [addBills] = useMutation(Add_Bills)
    const { cartSelectedId, cartSetSelectedId } = useContext(ItemContext);
    const { data, refetch } = useQuery(Carts);
    const UserData = JSON.parse(localStorage.getItem("UserData"))
    // const { data: badges } = useQuery(Badges
    //     , {
    //         variables: { userId: UserData?.id }
    //     }
    // )
    const styles = {
        preview: {
            display: "flex",
            flexDirection: "column",
        },
        image: { maxWidth: "50%", maxHeight: 50 },
    };
    const [bill, setBill] = useState({
        productId: "",
        name: "",
        weight: "",
        quantity: "",
        Dt_Mfg: "",
        Dt_Exp: "",
        price: "",
        image: "",
        totalPrice: ""
    })
    useQuery(getCart, {
        variables: { id: cartSelectedId }, onCompleted: (data) => setBill(data.getCarts)
    });
    // const { data: cartData } = useSubscription(CART_SUBSCRIPTION)
    // useEffect(() => {
    //     if (cartData && cartData.subscriptionData && cartData.subscriptionData.cartData.CartCreated) {
    //         refetch()
    //     }
    // }, [cartData]);
    const [updateCarts] = useMutation(update_Carts);
    const removeCart = (cartSelectedId) => {
        deleteCart({
            variables: {
                id: cartSelectedId
            }
        }).then(() => {
            refetch();
        })
        toast("deleted from cart")
    };
    const initialState = {
        count1: 1,
    };
    const reducer = (state, action) => {
        if (action.type === 'INCREMENT') {
            const incr = { ...state, [action.quantity]: state[action.quantity] + 1 }
            const count = bill.quantity + 1
            const total = bill.price * count
            updateCarts({
                variables: {
                    id: cartSelectedId,
                    quantity: count,
                    totalPrice: total
                }, refetchQueries: [
                    {
                        query: getCart
                    }
                ]
            })
            return incr
        }
        else if (action.type === 'DECREMENT') {
            const decr = {
                ...state,
                [action.quantity]: state[action.quantity] - 1
            }
            const count = bill.quantity - 1
            const total = bill.price * count
            if (count > 0) {
                updateCarts({
                    variables: {
                        id: cartSelectedId,
                        quantity: count,
                        totalPrice: total
                    }, refetchQueries: [
                        { query: getCart }
                    ]
                })
            } else {
                deleteCart({
                    variables: {
                        id: cartSelectedId
                    }
                }).then(() => {
                    refetch();
                })
            }
            return decr

        }
    };
    const useValue = () => useReducer(reducer, initialState);
    const Context = createContext(null);
    const useGlobalState = () => {
        const value = useContext(Context);
        if (value === null) throw new Error('Please add GlobalStateProvider');
        return value;
    };
    const GlobalStateProvider = ({ children }) => (
        <Context.Provider value={useValue()}>{children}</Context.Provider>
    );
    const Counter = ({ quantity, cart }) => {
        const [, dispatch] = useGlobalState();
        return (
            <>
                <div className="quantity" key={cart.id}>
                    {cart.quantity === 1 ?
                        <div className='quantity__minus' onClick={() => dispatch({ type: 'DECREMENT', quantity })} onChange={e => setBill({ ...bill, quantity: e.target.value })} ><i className="fa fa-trash" /></div>
                        : <div className="quantity__minus" onClick={() => dispatch({ type: 'DECREMENT', quantity })} onChange={e => setBill({ ...bill, quantity: e.target.value })}><span>-</span></div>
                    }
                    <input name="quantity" type="text" className="quantity__input" value={cart.quantity} onChange={e => setBill({ ...bill, quantity: e.target.value })} />
                    <div className="quantity__plus" onClick={() => dispatch({ type: 'INCREMENT', quantity })} onChange={e => setBill({ ...bill, quantity: e.target.value })}><span>+</span></div>
                </div>

            </>
        )
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
    // const { data: invoice } = useQuery(Invoice
    //     , {
    //         variables: { Stripe_Id: UserData?.Stripe_Id }
    //     });
    // console.log(invoice?.Invoice);
    // const BillInput = {
    //     userId: UserData?.id,
    // }
    const [startCheckout, { error, loading }] = useLazyQuery(CHECKOUT, {
        variables: { userId: UserData?.id, email: UserData?.email, Stripe_Id: UserData?.Stripe_Id },
        onCompleted: (queryData) => {
            // console.log(UserData?.id);
            let datas = JSON.parse(queryData.createCheckoutSession);
            let checkoutUrl = datas.url
            window.location.assign(checkoutUrl)
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
    const [startmulsubCheckout] = useLazyQuery(MULSUB, {
        variables: { userId: UserData?.id, email: UserData?.email, Stripe_Id: UserData?.Stripe_Id },
        onCompleted: (queryData) => {
            // console.log(UserData?.id);
            let datas = JSON.parse(queryData.createCheckoutSession);
            let checkoutUrl = datas.url
            window.location.assign(checkoutUrl)
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
    if (loading) return <div className='loader'>....Loading</div>;
    if (error) return `ERROR! ${error}`
    // const MultipleCheckout = () => {
    //     // console.log("MultipleCheckout");
    //     data?.Carts?.data.map(cart => {
    //         UserData?.id === cart.userId ? console.log(cart) : <></>
    //     })
    // }

    return (
        // <div className='cart'>
        //     <div className='cart-wrap'>
        <section className="shopping-cart dark">
            <div className="block-heading">
                <h2>Shopping Cart</h2>
                {/* <h1>{cartSelectedId}</h1> */}
            </div>
            <div className="content">
                <div className="row">
                    <div className="col-md-12 col-lg-8">
                        <div className="items">
                            {/* <ul className="responsive-table"> */}
                            {data?.Carts?.data.length === 0 ?
                                <>
                                    <EmptyCart />
                                </>
                                :
                                <>
                                    {data?.Carts?.data.map(cart => {
                                        return (
                                            <div key={cart.id}>
                                                {UserData?.id === cart.userId ?
                                                    <>
                                                        <ul className="responsive-table" key={cart.id}>
                                                            <li className="table-row" key={cart.id} data-id={cart.id} onClick={() => cartSetSelectedId(cart.id)}>
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
                                                                    <GlobalStateProvider>
                                                                        <Counter quantity="count1" cart={cart} />
                                                                    </GlobalStateProvider>
                                                                </div>
                                                                <div className='col col-1' data-label="Customer Name">
                                                                    <span>₹{cart.totalPrice}</span>
                                                                </div>
                                                                <div className='col col-1' data-label="Customer Name">
                                                                    <div className="icons">
                                                                        <i className="fa fa-trash" onClick={() => removeCart(cart.id)}></i>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                        </ul>

                                                    </> :
                                                    <>
                                                        {/* <EmptyCart /> */}
                                                    </>

                                                }

                                            </div>
                                        )
                                    }
                                    )
                                    }
                                </>
                            }
                        </div>

                    </div>
                    {/* <div className="col-md-12 col-lg-4">
                        <div className="summary">
                            <h3>Summary</h3>


                            <div className="summary-item"><span className="texts">Subtotal</span><span className="price">₹ {subtotal}</span></div>
                            <div className="summary-item"><span className="texts">Discount</span><span className="price">0 %</span></div>
                            <div className="summary-item"><span className="texts">Shipping</span><span className="price">₹ 0</span></div>
                            <div className="summary-item"><span className="texts">Total</span><span className="price">₹ {subtotal}</span></div>
                            <button type="button" className="btn btn-lg btn-block"><Link to="/review">Proceed to Buy ({badge} items)</Link></button>
                            <button type="button" className="btn btn-lg btn-block" onClick={() => clearCart()}>Clear all</button>
                        </div>
                    </div> */}
                    {/* {data?.Carts?.data.map(cart => {
                        return (
                            <>
                                {UserData?.id === cart.userId === null ? <></> : <> */}
                    <div className="col-md-12 col-lg-4">
                        <div className="summary">
                            <h3>Summary</h3>
                            <div className="summary-item"><span className="texts">Subtotal</span><span className="price">₹ {subtotal}</span></div>
                            <div className="summary-item"><span className="texts">Discount</span><span className="price">0 %</span></div>
                            <div className="summary-item"><span className="texts">Shipping</span><span className="price">₹ 0</span></div>
                            <div className="summary-item"><span className="texts">Total</span><span className="price">₹ {subtotal}</span></div>
                            <button type="button" className="btn btn-lg btn-block" onClick={() => startmulsubCheckout()}>Subscribe & save</button>
                            <button type="button" className="btn btn-lg btn-block" onClick={() => startCheckout()}>Proceed to Buy ({badge} items)</button>
                            <button type="button" className="btn btn-lg btn-block" onClick={() => clearCart()}>Clear all</button>
                        </div>
                    </div>
                    {/* </>}
                            </>)
                    })} */}

                </div>
            </div>
        </section>
    )
}

export default Cart