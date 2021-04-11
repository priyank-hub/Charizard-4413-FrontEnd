import React from 'react';
import ReactNotification from 'react-notifications-component';
import { store } from 'react-notifications-component';
import science from '../assets/science.png';
import enginerring from '../assets/engineering.png';
import fiction from '../assets/fiction.png';
import misc from '../assets/misc.png';
import { Button, Modal } from 'react-bootstrap';
import BeautyStars from 'beauty-stars';

class CartItemsView extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            show: false,
        };
    }

    handleShow = () => {
        this.setState({
            show: true
        });
    }

    handleClose = () => {
        this.setState({
            show: false
        });
    }

    removeBook = () => {

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

        
        return(
            <>
                <div className='book_cont'>
                    <div className="app-container">
                        <ReactNotification />
                    </div>
                    <div className="body_book">
                        <img className="body_book_img" src={img} alt="cart" />
                        <div className="body_book_content">
                            <h3 className="">{this.props.book.title}</h3>
                            <p>Category: {this.props.book.category} </p>
                            <p>Quantity: {this.props.book.quantity}</p>
                            <p>Price: {this.props.book.price}</p>
                            <Button variant="primary" onClick={this.handleShow} style={{marginLeft:'0px'}}>
                                View Details
                            </Button>

                            <Button variant="primary" onClick={this.removeBook} style={{marginLeft:'20px'}}>
                                Remove
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
                        
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary">
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}

export default CartItemsView;