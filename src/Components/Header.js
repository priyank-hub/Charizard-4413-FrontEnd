import React from 'react';
import logo from '../assets/BookshopLogo.png';
import cart from '../assets/cart.png';
import profile from '../assets/user.png';
import { NavLink, BrowserRouter as Router, Route } from 'react-router-dom';
import { AnimatedSwitch, spring } from 'react-router-transition';
import '../assets/header.css';

import Welcome from './Welcome';
import SignIn from '../User/SignIn';
import SignUp from '../User/SignUp';
import Books from './Books';
import * as user from '../Services/user';

const signOut = () => {
    sessionStorage.removeItem('currentUser');
    if(sessionStorage.getItem('currentCart') !== null){
        sessionStorage.removeItem('currentCart');
        console.log("cart removed!");
    }
    setTimeout(() => (window.location = "/"), 1000);
}

// function mapStyles(styles) {
//     return {
//       opacity: styles.opacity,
//       transform: `scale(${styles.scale})`,
//     };
//   }

// const bounceTransition = {
//     // start in a transparent, upscaled state
//     atEnter: {
//       opacity: 0,
//       scale: 1.2,
//     },
//     // leave in a transparent, downscaled state
//     atLeave: {
//       opacity: bounce(0),
//       scale: bounce(0.8),
//     },
//     // and rest at an opaque, normally-scaled state
//     atActive: {
//       opacity: bounce(1),
//       scale: bounce(1),
//     },
// };

// function bounce(val) {
//     return spring(val, {
//       stiffness: 300,
//       damping: 30,
//     });
// }

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