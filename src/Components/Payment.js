import React from 'react';
import * as user from '../Services/user';
import { store } from 'react-notifications-component';

class Payment extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            cardname: "",
            cardnumber: "",
            cardexpiry: "",
            cardcvv: "",
        };
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
        event.preventDefault();
        this.onSubmitPay(event);
    }

    onSubmitPay = async (event) => {
        event.preventDefault();
        const u = sessionStorage.getItem('currentUser')
        const t = JSON.parse(u);
        const paymentData = {
            userId: t.userId,
            name: this.state.cardname,
            number: this.state.cardnumber,
            expiry: this.state.cardexpiry,
            cvv: this.state.cardcvv
        }
        console.log("onSubmitPay called");
        const res = await user.submitOrder(paymentData);
        // const res = await axios.post('http://localhost:8080/order/confirmOrder', paymentData);
        console.log("res", res);
        if(res.status === 0){
            console.log("res", res);
            setTimeout(() => (window.location = "/"), 3000);
            sessionStorage.removeItem('currentCart');
            store.addNotification({
                title: `${res.message}`,
                message: "Thank you for your order!",
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
        else {
            store.addNotification({
                title:  "Credit Card Authorization Failed",
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

    render() {
        return (
            <>
                <h2 style={{fontFamily: 'Roboto', margin:'20px'}}>DUMMY PAYMENT PAGE</h2>
                <form onSubmit={this.handleSubmit.bind(this)} style={{margin: '20px'}}>
                    <div className="form-group">
                        <label> Name on the Card </label>
                        <input 
                            type="text"
                            name="cardname" 
                            className="form-control" 
                            onChange={this.handleChange.bind(this)}
                            placeholder="Enter the Name on your Card..."/>
                    </div>

                    <div className="form-group">
                        <label> 16-Digit Card Number (Exclude '-') </label>
                        <input 
                            type="text" 
                            name="cardnumber"
                            className="form-control" 
                            onChange={this.handleChange.bind(this)}
                            placeholder="Enter the card number..."/>
                    </div>

                    <div className="form-group">
                        <label> Card Expiry </label>
                        <input 
                            type="text" 
                            name="cardexpiry"
                            className="form-control" 
                            onChange={this.handleChange.bind(this)}
                            placeholder="MM/YY"/>
                    </div>

                    <div className="form-group">
                        <label> 3-Digit CVV </label>
                        <input 
                            type="text" 
                            name="cardcvv"
                            className="form-control" 
                            onChange={this.handleChange.bind(this)}
                            placeholder="Enter the CVV code..."/>
                    </div>
                    <div>
                        <input type="submit" value="Confirm Order" className="button"/>
                    </div>
                </form>
            </>
        );
    }
}
export default Payment;