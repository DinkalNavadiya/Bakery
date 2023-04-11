import React, { useState } from 'react';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { carouselStyle } from '../../../user/Components/Cart/style';
const Carousel = ({ products }) => {
  const array1 = products?.image;
  var image = []
  Array.prototype.forEach.call(array1, myFunction => {
    image.push(myFunction.toString())
  });
  console.log(image);
  return (
    <div key={products.id}>
      <OwlCarousel className='owl-theme' loop={array1 === 0 ? false : array1.length} items={1} margin={2} nav>
        {
          image?.map((data, i) => {
            return (
              <div key={data} className='items' >
                <h4>{i}</h4>
                <img src={data} style={carouselStyle.image} />
              </div>

            )
          })
        }
      </OwlCarousel >
    </div >)
}
export default Carousel