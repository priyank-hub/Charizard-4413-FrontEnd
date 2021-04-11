import React from 'react';
import * as user from '../Services/user';
import science from '../assets/science.png';
import enginerring from '../assets/engineering.png';
import fiction from '../assets/fiction.png';
import misc from '../assets/misc.png';
import { Link } from 'react-router-dom';

class CheckOut extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            shipToaddress: {},
            user: sessionStorage.getItem('currentUser'),
            cart: sessionStorage.getItem('currentCart')
        };
    }

    async componentDidMount() {
        if(this.state.user != null){
            var t = JSON.parse(this.state.user);
            const address = await user.getAddress(t.userId);
            console.log("address", address);
            this.setState({ shipToaddress: address });
        }
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

    computeTotal = () => {
        var sum = 0;
        const r = JSON.parse(this.state.cart);
        const items = r;
        if (items != null){
            sum = items.map((data) => data.price).reduce((a,b) => a + b, 0);
        } 
        else{
            sum = 0;
        }   
        return sum;
    }

    render() {
        const shippingAddress = this.state.shipToaddress;
        const r = JSON.parse(this.state.cart);
        console.log("checkout cart", r);
        const cart = r;
        return (
            <>
                <h2 style={{fontFamily: 'Roboto', margin:'20px'}}>CHECKOUT PAGE</h2>
                <div style={{fontFamily: 'Roboto', margin: '20px'}}>
                    <h3>Default Billing and Shipping Details </h3> <br></br>
                    <div>
                        <p>Street Name: {shippingAddress.streetName}</p>
                        <p>Zip Code: {shippingAddress.zip}</p>
                        <p>Province: {shippingAddress.province}</p>
                        <p>Country: {shippingAddress.country}</p>
                        <p>Phone: {shippingAddress.phone}</p>
                    </div>

                    <br></br>
                    <h3>Items to CheckOut</h3> <br></br>
                    <div>
                        {(cart != null) ? (
                            <>
                                <table style={{textAlign: 'center', width: '90%', fontFamily: 'Roboto',  margin: 'auto'}}>
                                    <thead style={{fontSize: '20px'}}>
                                        <tr>
                                            <th>BOOK IMAGE</th>
                                            <th>TITLE</th>
                                            <th>CATEGORY</th>
                                            <th>QUANTITY</th>
                                            <th>PRICE</th>
                                        
                                        </tr>
                                    </thead>
                                    <tbody style={{fontSize: '1.2rem'}}>
                                        { cart.map((data) => (
                                            <>
                                                <tr style={{borderBottom: '1px solid grey'}} key={cart.indexOf(data)}>
                                                    <td>
                                                        <img src={this.chooseimg(data)} alt="pop" style={{height: '100px', margin: '10px'}}/>
                                                    </td>
                                                    <td>{data.title}</td>
                                                    <td>{data.category}</td>
                                                    <td>{data.quantity}</td>
                                                    <td>${data.price}</td>      
                                                </tr>
                                            </>
                                        ))}
                                        <tr style={{fontSize: '20px', borderBottom: '1px solid grey'}}>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td><strong>TOTAL PRICE:</strong></td>
                                            <td><strong>${this.computeTotal()}</strong></td>
                                            <td></td>
                                        </tr> 
                                    </tbody>
                                </table>
                            </>
                        ) : (
                            <>
                                <h4 style={{fontFamily: 'Roboto', margin:'20px'}}>No items in the cart currently!</h4>
                            </>
                        ) }
                            
                    </div>
                    
                    <Link to={{pathname: "/payment", state: {currentUser: this.state.user}}}>
                        <button className='btn btn-success' style={{margin:'20px'}}>
                            CONFIRMED ORDER, TAKE ME TO PAYMENT PAGE
                        </button>
                    </Link>
                    {/* <Payment /> */}
                </div>
            </>
        );
    }
}

export default CheckOut;