import React, { useState } from 'react';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { carouselStyle } from '../../../user/Components/Cart/style';
const Carousel = ({ products }) => {
  const array1 = products?.image;
  console.log(array1);
  // const [image, setImage] = useState('')
  var image = []
  Array.prototype.forEach.call(array1, myFunction => {
    console.log(myFunction.toString())
    // setImage(myFunction.toString())
    image.push(myFunction.toString())
  });
  console.log(image);
  return (
    <div key={products.id}>
      <OwlCarousel className='owl-theme' loop={array1.length} items={1} margin={2} nav>
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
        {/* {Array.prototype.forEach.call(array1, myFunction => {
            // console.log(myFunction)
            return (
              <>
                <img src={myFunction[1]} style={carouselStyle.image} alt="" />
              </>
            )
          })} */}
        {/* <h4>1</h4>
          <img src={array1[1]} style={carouselStyle.image} />
        <div className='items' >
          <h4>2</h4>
          <img src={array1[0]} style={carouselStyle.image} />
        </div> */}
      </OwlCarousel >
    </div >)
}
export default Carousel