// import React, { useContext } from 'react'
// import { ItemContext } from '../../../Contexts/Context';

// const AddCart = ({ product }) => {
//   const { cartSetSelectedId } = useContext(ItemContext);

//   return (
//     // <div>AddCart</div>

//     <>
//       <button><i className='fa fa-shopping-cart' onClick={() => cartSetSelectedId(product.id)}></i></button>
//     </>
//   )
// }

// export default AddCart


import React from 'react'
import Default from '../../../image/default.png'
import styles from './style'
import './cart.css'
import moment from 'moment'

const AddCart = ({ product }) => {
  return (
    <>
      <div className='cart'>
        <div className='cart-wrap'>
          <main className="containers">
            <div className="left-column">
              {/* <img data-image="black" src="images/black.png" alt="" />
              <img data-image="blue" src="images/blue.png" alt="" /> */}
              <img data-image="red" className="active" src={product.image} alt="" />
            </div>


            <div className="right-column">

              <div className="product-description">
                <span>🍞 Bakery</span>
                <h1>{product.name}</h1>
                <p>
                  Weight:: {product.weight}
                </p>
                <p>
                  Mfg:: {moment(product.Dt_Mfg).format("YYYY-MM-DD")}
                  &&
                  Exp:: {moment(product.Dt_Exp).format("YYYY-MM-DD")}
                </p>
                <p>
                  
                </p>
              </div>

              <div className="product-configuration">

                {/* <div className="product-color">
                  <span>Color</span>

                  <div className="color-choose">
                    <div>
                      <input data-image="red" type="radio" id="red" name="color" value="red" checked />
                      <label for="red"><span></span></label>
                    </div>
                    <div>
                      <input data-image="blue" type="radio" id="blue" name="color" value="blue" />
                      <label for="blue"><span></span></label>
                    </div>
                    <div>
                      <input data-image="black" type="radio" id="black" name="color" value="black" />
                      <label for="black"><span></span></label>
                    </div>
                  </div>

                </div> */}

                {/* <div className="cable-config">
                  <span>Cable configuration</span>

                  <div className="cable-choose">
                    <button>Straight</button>
                    <button>Coiled</button>
                    <button>Long-coiled</button>
                  </div>

                  <a href="#">How to configurate your headphones</a>
                </div> */}
              </div>

              <div className="product-price">
                <span>148$</span>
                <a href="#" className="cart-btn">Add to cart</a>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  )
}

export default AddCart