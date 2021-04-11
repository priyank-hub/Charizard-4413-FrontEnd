import React from 'react';
import logo from '../assets/BookshopLogo.png';
import cart from '../assets/cart.png';
import { NavLink } from 'react-router-dom';
import '../assets/header.css';

import * as user from '../Services/user';

const Header = () => {
    const sessUser = user.isSignedIn();
    const us = sessionStorage.getItem('currentUser');
    const tr = JSON.parse(us);
    // console.log(tr);
    return (
        <>
            <div className="d-flex flex-column flex-md-row align-items-center p-2 px-md-4  bg-white border-bottom shadow-sm header fonts">
                    <h2 className="my-0 mr-md-auto font-weight-normal logo">
                        <NavLink
                            activeClassName="is-active"
                            to="/">
                            <img className="mb-4 col-20" src={logo} alt="logo" />
                        </NavLink>
                    </h2>
                    <nav className="my-2 my-md-0 mr-md-3">
                        <h5 className="mr-4">
                            <NavLink
                                exact={true}
                                activeClassName="is-active"
                                className="p-2 fonts"
                                to="/">
                                Home
                            </NavLink>
                        </h5>
                        <h5 className="mr-4">
                            <NavLink activeClassName="is-active" className="p-2 fonts" to="/books">
                                Browse Books
                            </NavLink>
                        </h5>
                        
                        { sessUser ? (
                            <>
                                <h5 className="mr-4">
                                <NavLink activeClassName="is-active" className="p-2 fonts" to="/signout">
                                        SignOut
                                    </NavLink>
                                </h5>
                                
                            </>
                        ):(
                            <>
                                <h5 className="mr-4">
                                    <NavLink activeClassName="is-active" className="p-2 fonts" to="/signin">
                                        SignIn
                                    </NavLink>
                                </h5>
                                <h5 className="mr-4">
                                    <NavLink activeClassName="is-active" className="p-2 fonts" to="/signup">
                                        SignUp
                                    </NavLink>
                                </h5>
                            </>
                        )              
                        }

                        <h5 className="mr-4">
                            <NavLink activeClassName="is-active" className="p-2 fonts" to="/shoppingcart">
                                My C<img className="cart" src={cart} alt="cart" /> rt
                            </NavLink>
                        </h5>

                        <h5 className="mr-4">
                            <NavLink activeClassName="is-active" className="p-2 fonts" to="/checkout">
                               CheckOut
                            </NavLink>
                        </h5>

                        { us ? (
                            <>
                                { (tr.userType === 1) ? (
                                    <>
                                        <h5 className="mr-4">
                                            <NavLink activeClassName="is-active" className="p-2 fonts" to="/admin">
                                                Admin Controls
                                            </NavLink>
                                        </h5>
                                    </>
                                ) : (
                                    <>
                                    </>
                                ) }
                            </>
                        ) : (
                            <>
                            </>
                        )}
                    </nav>
            </div>
            {/* <>
                <AnimatedSwitch
                    atEnter={bounceTransition.atEnter}
                    atLeave={bounceTransition.atLeave}
                    atActive={bounceTransition.atActive}
                    mapStyles={mapStyles}
                    className="qwerty"
                >
                    <Route exact path="/" component={Welcome} />
                    <Route path="/signin" component={SignIn} />
                    <Route path="/signup" component={SignUp} />
                    <Route path="/books" component={Books} />
                </AnimatedSwitch>
            </> */}
        </>
    );
}

export default Header;