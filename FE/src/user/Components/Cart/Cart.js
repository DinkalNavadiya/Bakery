import React from 'react'
import { ItemContext } from '../../../Contexts/Context'
import Cart from './AddtoCart';
import { useState } from 'react';

const Carts = () => {
  const [cartSelectedId, cartSetSelectedId] = useState(0);

  return (
    <>
      <ItemContext.Provider value={{ cartSelectedId, cartSetSelectedId}}>
        <Cart />
      </ItemContext.Provider>
    </>
  )
}

export default Carts