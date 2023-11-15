import React, { useContext, useEffect, useState } from 'react'
import './Header.css'
import { NavLink, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getFilteredProduct } from '../features/ProductList/productSlice'
import { QuarryContext } from '../Context/quarryContext'
import { getCartItems } from '../features/Cart/cartSlice'
import { getUser } from '../features/auth/authSlice'
function Header() {
    const dispatch = useDispatch()
    const {searchedQuarry, setSearchQuarry}=useContext(QuarryContext)
    // useEffect(() => {
    //     dispatch(getCartItems())
    //     // dispatch(getUser())
    //   }, [])
    const cartItems = useSelector(state => state.cart.cartItem)
    // console.log(cartItems)

    const[searchinp, setSearchInp]=useState('')
    function handleInputChange(e){
        let inp = e.target.value
        setSearchInp(inp)
        setSearchQuarry({...searchedQuarry, q:inp})
    }

    function submitInpQuarry(){
        
        // const searchedInpQuarry = {...searchedQuarry,q:searchinp}
        
        dispatch(getFilteredProduct({searchedQuarry})) // ei dispatch a searchedQuarry nam ta product list er dispatch and slice er action creater er same hote hobe
    }
    return (
        <div>
            <header className="header-top-strip py-2">
                <div className="container-xxl">
                    <div className="row">
                        <div className="col-md-6">
                            <p className='text-center text-white top-strip-p mb-0'>
                                Free Shipping Over 500Rs & Free Return
                            </p>
                        </div>
                        <div className="col-md-6">
                            <p className='text-center top-strip-p text-white mb-0'>
                                Helpline:
                                <a className='text-white' href="tel:+91 1800 8080 8080">1800 8080 8080</a>
                            </p>
                        </div>
                    </div>
                </div>
            </header>

            <header className="header-middle py-3">
                <div className="container">
                    <div className="row gap-md-0 gap-3">
                        <div className="col-md-3 d-flex justify-content-center align-items-center">
                            <Link>
                                <img className='  img-fluid logo' src="https://companieslogo.com/img/orig/AMZN_BIG.D-8fb0be81.png?t=1632523695" alt="logo" />
                            </Link>
                        </div>
                        <div className="col-md-5 d-flex align-items-center">
                            <div className="input-group my-1  d-flex align-items-center">
                                <input type="text" value={searchinp} onChange={handleInputChange} className=" rounded-s py-2 form-control" placeholder="Search Your Produst" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                                <span onClick={submitInpQuarry} className="input-group-text py-2" id="basic-addon2"><i className="fa-solid fa-magnifying-glass fa-xl"></i></span>
                            </div>
                        </div>
                        <div className="col-md-4 d-flex justify-content-around align-items-center">
                            <div>
                                <Link to='login' className='d-flex gap-2 justify-content-center align-items-center'>
                                    <i class="fa-regular text-white fa-user fa-xl"></i>
                                    <p className='text-white'>Login</p>
                                </Link>
                            </div>
                            <div>
                                <Link to='myorder' className='d-flex gap-2 justify-content-center align-items-center'>
                                <i class="fa-solid fa-box-archive fa-xl" style={{color: "#ffffff"}}></i>
                                    <p className='text-white'>Your Orders</p>
                                </Link>
                            </div>
                            <div className='cart'>
                                <Link to='cart' className='d-flex  gap-2 justify-content-center align-items-center'>
                                    <i class="fa-solid text-white fa-cart-shopping fa-xl"></i>
                                    <span class="badge rounded-pill text-bg-warning">{cartItems.length}</span>
                                </Link>
                            </div>

                        </div>
                    </div>
                </div>
            </header>

            <header className="header-bottom py-2">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="dropdown">
                                {/* <i class="fa-solid fa-sitemap fa-xl"></i> */}
                                <button id='shop-catagory' className="btn border-0 text-white  dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    SHOP CATEGORIES
                                </button>
                                <ul className="dropdown-menu bg-black ">
                                    <li><Link className="dropdown-item text-white" id='fs-3' to=''>Action</Link></li>
                                    <li><Link className="dropdown-item text-white" id='fs-3' to=''>Another action</Link></li>
                                    <li><Link className="dropdown-item text-white" id='fs-3' to=''>Something else here</Link></li>
                                </ul>
                            </div>
                        </div>
                        {/* <div className="col-2">
                       <span className='text-start'>|</span>
                       </div> */}
                        <div className="col-md-6 d-flex align-items-center justify-content-center">
                            <div className="nav-links d-flex gap-4">
                                <NavLink to='/' className={({ isActive }) => isActive ? 'link active' : 'link text-white'}>HOME</NavLink>
                                <NavLink to='store' className={({ isActive }) => isActive ? 'link active ' : 'link text-white '}>OUR STORE</NavLink>
                                <NavLink to='contact' className={({ isActive }) => isActive ? 'link  active ' : 'link text-white '}>CONTACT</NavLink>
                                <NavLink to='about' className={({ isActive }) => isActive ? 'link  active ' : 'link text-white'}>ABOUT</NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    )
}

export default Header