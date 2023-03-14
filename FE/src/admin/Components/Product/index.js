import React, { useState } from 'react'
import { ItemContext } from '../../../Contexts/Context'
// import { Carts, getProducts } from '../../../Graphql/Query.js'
import AddItem from './AddProducts'
import Item from './Products'
import { useQuery } from '@apollo/client';
// import { AuthContext } from '../../Contexts/authContext';
import { getProducts } from '../../../Graphql/Product'
import Navbar from '../../../user/Navbar';
const Home = () => {
  const [selectedId, setSelectedId] = useState(0)
  const [cartSelectedId, cartSetSelectedId] = useState(0)

  // const [cart, setCart] = useState({
  //     productId: "",
  //     name: "",
  //     weight: "",
  //     quantity: "",
  //     Dt_Mfg: "",
  //     Dt_Exp: "",
  //     price: "",
  //     image: "",
  //     totalPrice: ""
  //   })
  // console.log(cart)
  // useEffect(() => {
  //   setCart(data)
  // })
  const [, setProduct] = useState({
    userId: "",
    productId: "",
    name: "",
    weight: "",
    Dt_Mfg: "",
    Dt_Exp: "",
    price: "",
    image: ""
  });
  // console.log("ProductId::", cart.id);
  // console.log("CartId::", bill.productId);
  // if(product.id){
  //   console.log(product.id);
  // }

  // const { data: _ } = useQuery(getProducts, {
  //   variables: { id: cartSelectedId }, onCompleted: (data) => setProduct(data.getProduct)
  // });
  const { data: _ } = useQuery(getProducts, {
    variables: { id: cartSelectedId }, onCompleted: (data) => setProduct(data.getProduct)
  });

  // const selectedItem = data.findBy(item => item.id === product.id)

  // console.log(selectedItem);

  return (
    <>
      <Navbar />
      <ItemContext.Provider value={{ selectedId, setSelectedId, cartSelectedId, cartSetSelectedId }}>
        <AddItem />
        <Item />
      </ItemContext.Provider>
    </>
  )
}

export default Home
