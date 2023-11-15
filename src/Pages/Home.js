import React from 'react'
import ProductList from '../features/ProductList/ProductList'
function Home() {
  return (
    <>
      <section className="home-wrapper-1">
        {/* <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="main-banner-content">
                <img src="https://market-web.netlify.app/images/main-banner-1.jpg" alt="" />
              </div>
            </div>
            <div className="col-md-6"></div>
          </div>
        </div> */}
        <ProductList />

      </section>
    </>
  )
}

export default Home