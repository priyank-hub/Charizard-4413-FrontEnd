import React from 'react';
import '../assets/signin.css';
import 'react-notifications-component/dist/theme.css'
import 'animate.css/animate.min.css';
// import Joi from 'joi';
import * as user from '../Services/user';
import ReactNotification from 'react-notifications-component';
import { store } from 'react-notifications-component';


class SignUp extends React.Component{
    constructor(props) {
        super(props);
        this.state = { firstName: "", lastName: "", email: "", password: "", streetName: "", 
                        province: "", country: "", zip: "", phone: "", userId: "", isAdmin: false};
    }

    // schema = {
    //     email: Joi.string().required().email({ tlds: { allow: false } }).label('Email'),
    //     password: Joi.string().required().min(5).label('Password'),
    //     firstname: Joi.string().required().label('FirstName'),
    //     lastname: Joi.string().required().label('LastName'),
    // };

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    handleCheckBox(event) {
        this.setState({
            isAdmin: !this.state.isAdmin
        });
        // console.log(this.state.isAdmin);
    }

    handleSubmit(event) {
        this.onSubmitSignUp(event);
    }

    onSubmitSignUp = async (event) => {
        event.preventDefault();
        const userT = (this.state.isAdmin) ? 1 : 0;
        const userD = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            password: this.state.password,
            userType: userT
        };

        const data = await user.signup(userD);
        if(data.status === 1){
            console.log('error');
            store.addNotification({
                title: "Error, cannot SignUp with this Email ID!",
                message: "Try another one or Sign In if you already registered before!",
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
        else {
            store.addNotification({
                title: "Greeeat! Registration has been successful",
                message: "Sign In with those credantials!",
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
            //store the currentUser data into current browser session.
            sessionStorage.setItem('currentUser', JSON.stringify(data));
            setTimeout(() => (window.location = "/signin"), 3000);
            this.onSubmitaddAddress(event);
        }
    }

    onSubmitaddAddress = async (event) => {
        var t = JSON.parse(sessionStorage.getItem('currentUser'));
        const addAddressD = {
            addressId: t.user_id,
            streetName: this.state.streetName,
            province: this.state.province,
            country: this.state.country,
            zip: this.state.zip,
            phone: this.state.phone
        }

        const addAddressres = await user.addAddress(addAddressD);
        if (addAddressres.status === 0){
            store.addNotification({
                title: `${addAddressres.message}`,
                message: "SignIn with Email Id",
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
        return (
            <div className="signup_form">
                <div className="app-container">
                    <ReactNotification />
                </div>
                <h2 style={{fontFamily: 'Roboto', marginBottom:'20px'}}>Register with Us!</h2>
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <div className="form-group">
                        <label> FirstName </label>
                        <input 
                            type="text" 
                            name="firstName" 
                            onChange={this.handleChange.bind(this)}
                            className="form-control" 
                            placeholder="Enter your first name"/>
                    </div>

                    <div className="form-group">
                        <label> LastName </label>
                        <input 
                            type="text" 
                            name="lastName"
                            onChange={this.handleChange.bind(this)} 
                            className="form-control" 
                            placeholder="Enter your last name"/>
                    </div>

                    <div className="form-group">
                        <label> Email ID </label>
                        <input 
                            type="text" 
                            name="email" 
                            onChange={this.handleChange.bind(this)}
                            className="form-control" 
                            placeholder="Enter your email"/>
                    </div>

                    <div className="form-group">
                        <label> Password </label>
                        <input 
                            type="password" 
                            name="password"
                            onChange={this.handleChange.bind(this)} 
                            className="form-control" 
                            placeholder="Enter your password"/>
                    </div>

                    {/* <div className="form-group">
                        <input 
                            type="checkbox" 
                            name="isAdmin"
                            onChange={this.handleCheckBox.bind(this)} 
                            className="form-check-input"
                            style={{marginLeft: '0px'}} 
                            />
                            <label style={{marginLeft: '20px'}}>Are You Administrator? </label>
                    </div> */}

                    <h2 style={{fontFamily: 'Roboto', marginTop:'20px'}}>Default Billing and Shipping Address</h2>
                    <div className="form-group">
                        <label> Street </label>
                        <input 
                            type="text" 
                            name="streetName"
                            onChange={this.handleChange.bind(this)} 
                            className="form-control" 
                            placeholder="Enter the street name.."/>
                    </div>

                    <div className="form-group">
                        <label> Province </label>
                        <input 
                            type="text" 
                            name="province"
                            onChange={this.handleChange.bind(this)} 
                            className="form-control" 
                            placeholder="Enter the province you live in"/>
                    </div>

                    <div className="form-group">
                        <label> Country </label>
                        <input 
                            type="text" 
                            name="country"
                            onChange={this.handleChange.bind(this)} 
                            className="form-control" 
                            placeholder="Enter the country you live in..."/>
                    </div>

                    <div className="form-group">
                        <label> Zip </label>
                        <input 
                            type="text" 
                            name="zip"
                            onChange={this.handleChange.bind(this)} 
                            className="form-control" 
                            placeholder="Enter the zip code..."/>
                    </div>

                    <div className="form-group">
                        <label> Phone Number </label>
                        <input 
                            type="text" 
                            name="phone"
                            onChange={this.handleChange.bind(this)} 
                            className="form-control" 
                            placeholder="Enter the phone number..."/>
                    </div>
                    <div>
                        <input type="submit" value="Submit" className="button"/>
                    </div>
                </form>
            </div>
        );
    }
}

export default SignUp;