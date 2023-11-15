import React from 'react'
import './Footer.css'
import { Link } from 'react-router-dom'
function Footer() {
  return (
    <>
      <footer className='py-3'>
        <div className="container">
          <div className="row">
            <div className="col-md-5 d-flex align-items-center gap-2">
              <i className="fa-brands fa-telegram fa-2xl" style={{ color: "#ffffff" }}></i>
              <h3 className='text-white'>Sign Up For Letest News</h3>
            </div>
            <div className="col-md-7">
              <div className="input-group my-1 d-flex align-items-center" >
                <input id='footer-userEmail' type="text" className="form-control" placeholder="Your Email" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                <button className='btn subscribe-btn'>Subscribe</button>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <footer className='py-3'>
        <div className="container">
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-5 py-4 my-4">
            <div className="col mb-3">
              
            </div>

            <div className="col mb-3">

            </div>

            <div className="col mb-3">
              <h5 className='text-white'>Section</h5>
              <ul className="nav flex-column">
                <li className="nav-item mb-2"><Link to='' className="nav-link p-0 text-white">Home</Link></li>
                <li className="nav-item mb-2"><Link to='' className="nav-link p-0 text-white">Features</Link></li>
                <li className="nav-item mb-2"><Link to='' className="nav-link p-0 text-white">Pricing</Link></li>
                <li className="nav-item mb-2"><Link to='' className="nav-link p-0 text-white">FAQs</Link></li>
                <li className="nav-item mb-2"><Link to='' className="nav-link p-0 text-white">About</Link></li>
              </ul>
            </div>

            <div className="col mb-3">
              <h5 className='text-white'>Section</h5>
              <ul className="nav flex-column">
                <li className="nav-item mb-2"><Link href="#" className="nav-link p-0 text-white">Home</Link></li>
                <li className="nav-item mb-2"><Link href="#" className="nav-link p-0 text-white">Features</Link></li>
                <li className="nav-item mb-2"><Link href="#" className="nav-link p-0 text-white">Pricing</Link></li>
                <li className="nav-item mb-2"><Link href="#" className="nav-link p-0 text-white">FAQs</Link></li>
                <li className="nav-item mb-2"><Link href="#" className="nav-link p-0 text-white">About</Link></li>
              </ul>
            </div>

            <div className="col mb-3">
              <h5 className='text-white'>Section</h5>
              <ul className="nav flex-column">
                <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-white">Home</a></li>
                <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-white">Features</a></li>
                <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-white">Pricing</a></li>
                <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-white">FAQs</a></li>
                <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-white">About</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>

      <footer className='py-3'>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <p className='text-center text-white'>&copy; {new Date().getFullYear()}, Powered by Developer</p>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer