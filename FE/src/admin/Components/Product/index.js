import React, { useState } from 'react'
import { ItemContext } from '../../../Contexts/Context'
import AddItem from './AddProducts'
import Item from './Products'
import { useQuery } from '@apollo/client';
import { getProducts } from '../../../Graphql/Product'
import Navbar from '../../../user/Navbar';
const Home = () => {
  const [selectedId, setSelectedId] = useState(0)
  const [cartSelectedId, cartSetSelectedId] = useState(0)
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
  const { data: _ } = useQuery(getProducts, {
    variables: { id: cartSelectedId }, onCompleted: (data) => setProduct(data.getProduct)
  });

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
