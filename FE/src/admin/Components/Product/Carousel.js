import React, { useState } from 'react'
import { getProducts } from '../../../Graphql/Product';
import { useQuery } from '@apollo/client';

const Carousel = ({ selectedId }) => {
  const [products, setProducts] = useState({
    userId: "",
    productId: "",
    name: "",
    weight: "",
    quantity: "",
    Dt_Mfg: "",
    Dt_Exp: "",
    price: "",
    image: ""
  });
  const data = useQuery(getProducts
    , {
      variables: { id: selectedId }, onCompleted:
        (data) => setProducts(data.getProduct)
    }
  );
  console.log(data?.data?.getProduct?.image);
  return (
    <>
      <section className="carousel-default">
        <div id="carousel-default" className="carousel slide" data-ride="carousel">
          <div className="carousel-inner" role="listbox">
            {/* {data?.data?.getProduct?.image.map(image => {
              return (
                <> */}
                  <div className="item">
                    <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/158072/guitar.jpg" alt="First slide" />
                    <div className="carousel-caption">
                      <h3>A woman with a camera</h3>
                      <p>She is probably taking a picture</p>
                    </div>
                  </div>
                  {/* <div className="item">
                    <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/158072/spiderweb.jpg" alt="Second slide" />
                    <div className="carousel-caption">
                      <h3>Down came the rain</h3>
                      <p>And washed the spider out</p>
                    </div>
                  </div>
                  <div className="item active">
                    <img src="https://cdn.pixabay.com/photo/2016/12/27/21/03/lone-tree-1934897__480.jpg" alt="Third slide" />
                    <div className="carousel-caption">
                      <h3>Making love</h3>
                      <p>She is probably taking a picture</p>
                    </div>
                  </div> */}
                {/* </>
              )
            })} */}
          </div>
          <a className="left carousel-control" href="#carousel-default" role="button" data-slide="prev">
            <span className="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
            <span className="sr-only">Previous</span>
          </a>
          <a className="right carousel-control" href="#carousel-default" role="button" data-slide="next">
            <span className="glyphicon glyphicon-chevron-right" aria-hidden="true" style={{ overFlow: "hidden" }}></span>
            <span className="sr-only">Next</span>
          </a>
        </div>
      </section >


      <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
      <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    </>
  )
}

export default Carousel