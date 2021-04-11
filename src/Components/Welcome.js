import React from 'react';
import '../assets/welcome.css';
import bookstoreimg from '../assets/book-shop.png';
import books from '../assets/books.png';
import line from '../assets/line.gif';

function Welcome() {
    return (
        <div className="main__container">
            <div className="main__heading">
                <div className="first_line">
                    <div className="span">
                        <span>Mom & Pop </span>
                        <img src={line} alt="line-style"></img>
                    </div>
                    <p style={{marginLeft: '20px'}}>Book Store</p>
                </div>
            </div>
            <div className="mainlogo">
                <img src={bookstoreimg} alt="book-shop" />
                <img src={books} alt="book-shop" />
            </div>
            <p className="second_line">by Brick and Mortar Company</p>
        </div>
    );
}

export default Welcome;