import React from 'react'
import { ItemContext } from '../../../Contexts/Context'
import Cart from './Cart';
import { useState } from 'react';
import AddCart from './AddCart';

const Carts = () => {
  const [cartSelectedId, cartSetSelectedId] = useState(0);

  return (
    <>
      <ItemContext.Provider value={{ cartSelectedId, cartSetSelectedId}}>
        <Cart />
        <AddCart/>
      </ItemContext.Provider>
    </>
  )
}

export default Carts