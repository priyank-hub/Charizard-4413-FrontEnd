import React from 'react';
import Header from './Components/Header';
import Footer from './Components/Footer';
import './App.css';
import Cart from './Components/Cart';
import Welcome from './Components/Welcome';
import SignIn from './User/SignIn';
import Books from './Components/Books';
import SignUp from './User/SignUp';
import CheckOut from './Components/Checkout';
import Payment from './Components/Payment';
import Admin from './User/Admin';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import { AnimatedSwitch, spring } from 'react-router-transition';
import ReactNotification from 'react-notifications-component';

const signOut = () => {
  sessionStorage.removeItem('currentUser');
  if(sessionStorage.getItem('currentCart') !== "undefined"){
    sessionStorage.removeItem('currentCart');
  }
  if(sessionStorage.getItem('signedin') !== "undefined"){
    sessionStorage.removeItem('signedin');
  }
  setTimeout(() => (window.location = "/"), 1000);
}

function mapStyles(styles) {
  return {
    opacity: styles.opacity,
    transform: `scale(${styles.scale})`,
  };
}

const bounceTransition = {
  // start in a transparent, upscaled state
  atEnter: {
    opacity: 0,
    scale: 1.2,
  },
  // leave in a transparent, downscaled state
  atLeave: {
    opacity: bounce(0),
    scale: bounce(0.8),
  },
  // and rest at an opaque, normally-scaled state
  atActive: {
    opacity: bounce(1),
    scale: bounce(1),
  },
};

function bounce(val) {
  return spring(val, {
    stiffness: 300,
    damping: 30,
  });
}

function App() {
  return (
    <>
      <Router>
        <Header />
          <div className="app__container">
          <div className="app-container">
              <ReactNotification />
          </div>
            <AnimatedSwitch
                      atEnter={bounceTransition.atEnter}
                      atLeave={bounceTransition.atLeave}
                      atActive={bounceTransition.atActive}
                      mapStyles={mapStyles}
                      className="qwerty"
              >
                  <Route exact path="/" component={Welcome} />
                  <Route path="/admin" component={Admin}/>
                  <Route path="/signin" component={SignIn} />
                  <Route path="/signup" component={SignUp} />
                  <Route path="/books" component={Books} />
                  <Route path="/shoppingcart" component={Cart} />
                  <Route path="/checkout" component={CheckOut}/>
                  <Route path="/payment" component={Payment}/>
                  <Route path="/signout" component={signOut}/>
              </AnimatedSwitch>
          </div>
        <Footer />
      </Router>
    </>
  );
}

export default App;
