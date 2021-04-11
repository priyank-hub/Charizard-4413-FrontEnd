import React from 'react';
import '../assets/signin.css';
import * as user from '../Services/user';
import ReactNotification from 'react-notifications-component';
import { store } from 'react-notifications-component';
import {Link} from 'react-router-dom';

class SignIn extends React.Component{
    constructor(props) {
        super(props);
        this.state = { email: "", password: "" };
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
        this.onSubmitSignIn(event);
    }

    onSubmitSignIn = async (event) => {
        event.preventDefault();
        const userD = {
            email: this.state.email,
            password: this.state.password,
        };

        const data = await user.signin(userD);
        console.log(data);
        if(data.status === 1){
            console.log('error');
            store.addNotification({
                title: "Error, cannot LogIn with this Email ID!",
                message: "Hit SignUp to Register!",
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
            console.log(data);
            store.addNotification({
                title: `${data.message}`,
                message: "Logging you in...",
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
            sessionStorage.setItem('signedin', 'true');
            if(this.props.location.state !== null){
                setTimeout(() => (window.location = "/shoppingcart"), 3000);    
            }
            else{
                setTimeout(() => (window.location = "/"), 3000);
            }
        }
    }

    render() {
        return (
            <div className="signup_form">
                <div className="app-container">
                    <ReactNotification />
                </div>
                <h2 style={{fontFamily: 'Roboto', marginBottom:'20px'}}>Sign In with your Email Id</h2>
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <div className="form-group">
                        <label> Email ID </label>
                        <input 
                            type="text"
                            name="email" 
                            className="form-control" 
                            onChange={this.handleChange.bind(this)}
                            placeholder="Enter your email"/>
                    </div>

                    <div className="form-group">
                        <label> Password </label>
                        <input 
                            type="password" 
                            name="password"
                            className="form-control" 
                            onChange={this.handleChange.bind(this)}
                            placeholder="Enter your password"/>
                    </div>
                    <div>
                        <input type="submit" value="Submit" className="button"/>
                    </div>
                </form>
                <br></br>
                <div style={{textAlign: 'center'}}>
                    <h5>Don't have an account? </h5>  
                        <Link to={{ pathname: '/signup', state: {return: 'signin'}}} style={{fontFamily:'Roboto', fontSize: '20px', color: 'rgb(22 123 197)'}}>
                             Register
                        </Link>
                    
                </div>
            </div>
        );
    }
}

export default SignIn;