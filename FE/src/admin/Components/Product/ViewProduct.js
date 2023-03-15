import React, { useState } from 'react'
import { getProducts } from '../../../Graphql/Product';
import { useQuery } from '@apollo/client';

const ViewProduct = ({ products, styles }) => {

  return (
    <>
      <div className='prf'>
        <div className='prf-wrap'>
          <div id="wrap">
            <div id="columns" className="columns_4">
              <figure>
                <><img src={products.image} alt="" style={styles.image} /></>
                <figcaption>{products.name}</figcaption>
                <div className="btn-group">
                  <button className="btn btn-secondary btn-sm dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Small button
                  </button>
                  <div className="dropdown-menu">
                    bvhjsvhdfs
                  </div>
                </div>
                <span className="price">₹{products.price}</span>
                <a className="button" href="#">Buy Now</a>
              </figure>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ViewProduct