import React from 'react';
import * as User from '../Services/user';
import * as cart from '../Services/cart';
import science from '../assets/science.png';
import enginerring from '../assets/engineering.png';
import fiction from '../assets/fiction.png';
import misc from '../assets/misc.png';
import { store } from 'react-notifications-component';
import { Link } from 'react-router-dom';

class Cart extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            items: JSON.parse(sessionStorage.getItem('currentCart')),
            currentUser: sessionStorage.getItem('currentUser'),
        };
    }

    chooseimg = (data) => {
        let img;
        switch(data.category){
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
        return img;
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

    removeBook = async (data) => {
        let v = JSON.parse(User.getUser());
        const { items } = this.state;
        const user = v;
        // console.log("unfiltered", items);
        let filteredArray = items.filter((items) => (items.bid !== data.bid || items.quantity !== data.quantity));
        // console.log("filtered", filteredArray);

        if (user != null){
            const dataRemove = {
                bid: data.bid,
                userId: user.userId
            }
            const removeItem = await cart.removeBook(dataRemove);
            if(removeItem.status === 0){
                store.addNotification({
                    title: `${removeItem.message}`,
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
                sessionStorage.setItem('currentCart', JSON.stringify(filteredArray));
                this.setState({items: filteredArray});
            }
            else {
                store.addNotification({
                    title: "Internal Server Error",
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
        else{
            store.addNotification({
                title: "Item removed from Cart",
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
            sessionStorage.setItem('currentCart', JSON.stringify(filteredArray));
            this.setState({items: filteredArray});
        }
        
    }

    computeTotal = () => {
        var sum = 0;
        const { items } = this.state;
        if (items != null){
            sum = items.map((data) => data.price).reduce((a,b) => a + b, 0);
        } 
        else{
            sum = 0;
        }   
        return sum;
    }

    render() {
        const user = sessionStorage.getItem('currentUser');
        const userJson = JSON.parse(user);
        
        const { items, currentUser } = this.state;
        let img;

        return (
            <>
                { currentUser ? (
                    <>
                        <div>
                            <h2 style={{fontFamily: 'Roboto', margin:'20px'}}>{userJson.firstName}'s Cart!</h2>
                            { items != null ? (
                                <>
                                    <div style={{overflowX: 'auto'}}>
                                        <table style={{textAlign: 'center', width: '90%', fontFamily: 'Roboto',  margin: 'auto'}}>
                                            <thead style={{fontSize: '20px'}}>
                                                <tr>
                                                    <th>BOOK IMAGE</th>
                                                    <th>TITLE</th>
                                                    <th>CATEGORY</th>
                                                    <th>QUANTITY</th>
                                                    <th>PRICE</th>
                                                    <th>REMOVE</th>
                                                </tr>
                                            </thead>
                                            <tbody style={{fontSize: '1.2rem'}}>
                                                { items.map((data) => (
                                                    <>
                                                        <tr style={{borderBottom: '1px solid grey'}} key={items.indexOf(data)}>
                                                            <td>
                                                                <img src={this.chooseimg(data)} alt="pop" style={{height: '100px', margin: '10px'}}/>
                                                            </td>
                                                            <td>{data.title}</td>
                                                            <td>{data.category}</td>
                                                            <td>{data.quantity}</td>
                                                            <td>${data.price}</td>
                                                            <td>
                                                            <button className='btn btn-primary' onClick={() => this.removeBook(data)} style={{marginLeft:'20px'}}>
                                                                Remove
                                                            </button>
                                                            </td>
                                                        </tr>
                                                    </>
                                                ))}
                                                <tr style={{fontSize: '20px', borderBottom: '1px solid grey'}}>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td><strong>TOTAL PRICE:</strong></td>
                                                    <td><strong>${this.computeTotal()}</strong></td>
                                                    <td>
                                                    <Link to={{ pathname: '/checkout', state: {cart: items, total: this.computeTotal()}}}>
                                                        <button className='btn btn-success' style={{margin:'20px'}}>
                                                            CHECKOUT
                                                        </button>
                                                    </Link>
                                                    </td>
                                                </tr> 
                                            </tbody>
                                        </table>
                                    </div>
                                    {/* <p>length > 0</p> */}   
                                </>
                            ) : (
                                <>
                                    <h4 style={{fontFamily: 'Roboto', margin:'20px'}}>No items in the cart currently!</h4>  
                                </>
                            ) }
                        </div>
                    </>
                ) : (
                    <>
                        <h2 style={{fontFamily: 'Roboto', margin:'20px'}}>Guest's Cart</h2>
                        <div>
                            { items != null ? (
                                <>
                                    <div style={{overflowX: 'auto'}}>
                                        <table style={{textAlign: 'center', width: '90%', fontFamily: 'Roboto',  margin: 'auto'}}>
                                            <thead style={{fontSize: '20px'}}>
                                                <tr>
                                                    <th>BOOK IMAGE</th>
                                                    <th>TITLE</th>
                                                    <th>CATEGORY</th>
                                                    <th>QUANTITY</th>
                                                    <th>PRICE</th>
                                                    <th>REMOVE</th>
                                                </tr>
                                            </thead>
                                            <tbody style={{fontSize: '1.2rem'}}>
                                                { items.map((data) => (
                                                    <>
                                                        <tr style={{borderBottom: '1px solid grey'}}>
                                                            <td>
                                                                <img src={this.chooseimg(data)} alt="pop" style={{height: '100px', margin: '10px'}}/>
                                                            </td>
                                                            <td>{data.title}</td>
                                                            <td>{data.category}</td>
                                                            <td>{data.quantity}</td>
                                                            <td>${data.price}</td>
                                                            <td>
                                                            <button className='btn btn-primary' onClick={() => this.removeBook(data)} style={{marginLeft:'20px'}}>
                                                                Remove
                                                            </button>
                                                            </td>
                                                        </tr>
                                                    </>
                                                ))}
                                                <tr style={{fontSize: '20px', borderBottom: '1px solid grey'}}>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td><strong>TOTAL PRICE:</strong></td>
                                                    <td><strong>${this.computeTotal()}</strong></td>
                                                    <td>
                                                        <Link to={{ pathname: '/signin', state: {return: 'shoppingcart'}}}>
                                                            <button className='btn btn-success' style={{margin:'20px'}}>
                                                                CHECKOUT
                                                            </button>
                                                        </Link>
                                                    </td>
                                                </tr> 
                                            </tbody>
                                        </table>
                                    </div>
                                    {/* <p>length > 0</p> */}
                                    
                                </>
                            ) : (
                                <>
                                    <h4 style={{fontFamily: 'Roboto', margin:'20px'}}>No items in the cart currently!</h4>  
                                </>
                            ) }
                        </div>
                    </>
                )}
            </>
        )
    }
}

export default Cart;