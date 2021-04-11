import React from 'react';
import science from '../assets/science.png';
import enginerring from '../assets/engineering.png';
import fiction from '../assets/fiction.png';
import misc from '../assets/misc.png';
import { Link } from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap';
import * as Book from '../Services/book';
import * as User from '../Services/user';
import * as Cart from '../Services/cart';
import ReactNotification from 'react-notifications-component';
import { store } from 'react-notifications-component';
import BeautyStars from 'beauty-stars';

import '../assets/books.css';

class BookView extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            show: false,
            review: '',
            rating: 0,
            quantity: 1,
            reviews: []
        };
    }

    handleShow = async () => {
        const rev = await Book.getReviews(this.props.book.bid);
        console.log(rev);
        this.setState({
            reviews: [...this.state.reviews, ...rev],
            show: true
        });
    }

    handleClose = () => {
        this.setState({
            show: false
        });
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        this.onSubmitReview(event);
    }

    onSubmitReview = async (event) => {
        console.log("review: ", this.state.review);

        if (User.getUser()){
            const user = sessionStorage.getItem('currentUser');
            console.log("user id: ", JSON.parse(user).userId);
            const rev = {
                bid: this.props.book.bid,
                userId: JSON.parse(user).userId,
                stars: this.state.rating,
                message: this.state.review
            }
            const res = await Book.addReview(rev);
            console.log(res.message);
            if(res.status === 0){
                store.addNotification({
                    title: "Review Submitted Sucessfuly!",
                    message: "Thank you for your feedback.",
                    type: "success",
                    insert: "top",
                    container: "top-right",
                    animationIn: ["animate__animated", "animate__fadeIn"],
                    animationOut: ["animate__animated", "animate__fadeOut"],
                    dismiss: {
                    duration: 3000,
                    onScreen: true
                    }
                });
            }
        }
        else{
            console.log("user not logged in!");
            store.addNotification({
                title: "Error, User not Logged In!",
                message: "Please Login and try again.",
                type: "danger",
                insert: "top",
                container: "top-right",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                  duration: 3000,
                  onScreen: true
                }
            });
        }
    }

    addToCart = async (book) => {
        let currentCart = sessionStorage.getItem('currentCart');
        if (currentCart != "undefined" && currentCart != null) {
            let obj = { ...book, quantity: this.state.quantity, price: (book.price * this.state.quantity)};
            let sessionCart = sessionStorage.getItem('currentCart');
            let cc = JSON.parse(sessionCart);
                
            currentCart = [ ...cc, obj ];
        }
        else{
            let obj = {...book, quantity: this.state.quantity, price: (book.price * this.state.quantity)};
            currentCart = [obj];
            console.log("currentCart:", currentCart);
        }
        
        if(User.getUser() != null){
            const user = sessionStorage.getItem('currentUser');
            const cartItem = {
                userId: JSON.parse(user).userId,
                bid: book.bid,
                quantity: this.state.quantity,
                price: book.price * this.state.quantity
            }
            
            const addSingle = await Cart.addSingleBook(cartItem);
            console.log("addSIngle", addSingle);
            if(addSingle.status === 0){
                store.addNotification({
                    title: `${addSingle.message}`,
                    message: "Continue Shopping!",
                    type: "success",
                    insert: "top",
                    container: "top-right",
                    animationIn: ["animate__animated", "animate__fadeIn"],
                    animationOut: ["animate__animated", "animate__fadeOut"],
                    dismiss: {
                    duration: 3000,
                    onScreen: true
                    }
                });
                
                sessionStorage.setItem("currentCart", JSON.stringify(currentCart));
            }
            else{
                store.addNotification({
                    title: `${addSingle.message}`,
                    message: "Something went wrong!",
                    type: "danger",
                    insert: "top",
                    container: "top-right",
                    animationIn: ["animate__animated", "animate__fadeIn"],
                    animationOut: ["animate__animated", "animate__fadeOut"],
                    dismiss: {
                    duration: 3000,
                    onScreen: true
                    }
                });
            }
        }
        else {
            console.log("user not logged in!");
            sessionStorage.setItem('currentCart', JSON.stringify(currentCart));
            store.addNotification({
                title: "Item added to your cart",
                message: "Continue Shopping!",
                type: "success",
                insert: "top",
                container: "top-right",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                duration: 3000,
                onScreen: true
                }
            });
        }
    }

    render() {
        let img;
        switch(this.props.book.category){
            case 'Science':
                img = science;
                break;

            case 'Engineering':
                img = enginerring;
                break;

            case 'Fiction':
                img = fiction;
                break;
            default:
                img = misc;
        }
        return (
            <>
                <div className='book_cont'>
                    <div className="body_book">
                        <img className="body_book_img" src={img} alt="cart" />
                        <div className="body_book_content">
                            <h3 className="">{this.props.book.title}</h3>
                            <p>Category: {this.props.book.category} </p>
                            <p>Quantity:   
                                <input
                                    name="quantity"
                                    defaultValue="1" 
                                    onChange={this.handleChange.bind(this)}
                                    type="number" 
                                    step="1"/>
                            </p>
                            <Button onClick={() => this.addToCart(this.props.book)} className="btn btn-primary">To Cart</Button>
                            <Button variant="primary" onClick={this.handleShow} style={{marginLeft:'20px'}}>
                                View Details
                            </Button>
                        </div>
                    </div>
                </div>
                <hr></hr>

                <Modal show={this.state.show} onHide={this.handleClose} style={{top: '70px'}}>
                    <Modal.Header closeButton>
                        <img style={{height: '70px'}} src={img} alt="cart" />
                        <Modal.Title>{this.props.book.title}</Modal.Title>
                    </Modal.Header>
                    <form onSubmit={this.handleSubmit.bind(this)}>
                        <Modal.Body>
                            <p><strong>By </strong>{this.props.book.author}</p>
                            <p><strong>Price: </strong> ${this.props.book.price}</p>
                            <p><strong>Ratings: </strong>
                            <BeautyStars
                                value={this.props.book.rating}
                                maxStars={5}
                                size='36px'
                            />
                            </p>
                            <p><strong>Book ID: </strong>{this.props.book.bid}</p>     
                            <div>
                                <textarea 
                                    name="review" 
                                    className="form-control" 
                                    onChange={this.handleChange.bind(this)}
                                    style={{borderRadius: '5px'}}
                                    placeholder="Enter your Review..."/>
                            </div> 
                            <div style={{marginTop: '10px'}}>
                                <input
                                    name="rating" 
                                    type="number" 
                                    step="1" 
                                    style={{outline: 'none', width: '100%'}}
                                    onChange={this.handleChange.bind(this)}
                                    placeholder="Enter rating from 1-5"/>
                            </div> 
                            <br></br>
                            
                            <input type="submit" value="Leave a Review" className="btn btn-primary"/>
                            
                            <h5 style={{marginTop: '20px'}}>User Reviews</h5>
                            <div style={{overflow: 'scroll', height: '200px'}}>
                                <ul>
                                    {this.state.reviews.map((data) => (
                                        <>
                                            <div style={{background: '#8080807d'}}>
                                                <li style={{listStyleType:'none'}}>
                                                    <span style={{fontFamily: 'Roboto', fontSize: '15px'}}>Rating: {data.stars}</span>
                                                    <p style={{padding: '10px'}}>{data.message}</p>
                                                </li>
                                            </div>
                                        </>
                                    ))}
                                </ul>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            
                            
                        </Modal.Footer>
                    </form>
                </Modal>
            </>
        );
    }
}

export default BookView;