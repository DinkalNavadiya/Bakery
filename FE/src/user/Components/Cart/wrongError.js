import React from 'react'
// import { useNavigate } from 'react-router-dom';

const WrongError = () => {
  // const navigate = useNavigate()
  // const page = () => {
  //   navigate("/")
  // }
  return (
    <>
      <section className="page_404">
        <div className="container">
          <div className="row">
            <div className="col-sm-12 ">
              <div className="col-sm-10 col-sm-offset-1  text-center">
                <div className="four_zero_four_bg">
                  <h1 className="text-center">500</h1>
                </div>
                <div className="contant_box_404">
                  <h3 className="h2">
                    Something went Wrong!!
                  </h3>
                  <p>Check the connection!</p>
                  {/* <p>{error}</p> */}
                  {/* <button className='link_404'>Go to home</button> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default WrongError