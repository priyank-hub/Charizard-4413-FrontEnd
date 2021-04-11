import React from 'react';
import { Modal } from 'react-bootstrap';
import * as User from '../Services/user';

class Admin extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            show: false,
            report: "",
            reportJSON: [],
            toptenSold: []
        }
    }

    generateReport = async () => {
        const user = sessionStorage.getItem('currentUser');
        const t = JSON.parse(user);
        const rev = await User.generateReport(t.userId);
        this.setState({
            show: true, 
            report: "Generate Report of Books Sold",
            reportJSON: [...rev]
        });
    }

    toptenBooks = async () => {
        const user = sessionStorage.getItem('currentUser');
        const t = JSON.parse(user);
        const rev = await User.getTopTen(t.userId);
        console.log(rev);

        this.setState({
            show: true,
            report: "Top 10 Books Users Love!",
            toptenSold: [...rev]
        });
    }

    handleShow = async () => {
        // const rev = await Book.getReviews(this.props.book.bid);
        // console.log(rev);
        this.setState({
            // reviews: [...this.state.reviews, ...rev],
            show: true
        });
    }

    handleClose = () => {
        this.setState({
            show: false
        });
    }

    render() {
        return (
            <>
                <div style={{ margin:'20px'}}>
                    <h2 style={{fontFamily: 'Roboto'}}>Administrator Controls</h2>

                    <button className='btn btn-success' onClick={() => this.generateReport()}>
                        Generate Report
                    </button>
                    <br></br><br></br>
                    <button className='btn btn-success' onClick={() => this.toptenBooks()}>
                        Top 10 Books Sold
                    </button>
                </div>

                <Modal show={this.state.show} onHide={this.handleClose} style={{top: '70px'}}>
                    <Modal.Header closeButton>
                        <h3 style={{fontFamily: 'Roboto'}}>{this.state.report}</h3>
                    </Modal.Header>
                    <Modal.Body>
                        { (this.state.report === "Generate Report of Books Sold") ? (
                            <>
                                <table style={{textAlign: 'center', width: '90%', fontFamily: 'Roboto',  margin: 'auto', overflow: 'scroll'}}>
                                    <thead style={{fontSize: '15px'}}>
                                        <tr>
                                            <th>BOOK ID</th>
                                            <th>TITLE</th>
                                            <th>PRICE *</th>
                                            <th>QUANTITY</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.reportJSON.map((data) => (
                                            <>
                                            <tr style={{borderBottom: '1px solid grey'}} key={this.state.reportJSON.indexOf(data)}>
                                                    <td>{data.bid}</td>
                                                    <td>{data.title}</td>
                                                    <td>${data.price}</td>
                                                    <td>{data.quantity}</td>      
                                                </tr> 
                                            </>
                                        ))}
                                    </tbody>
                                </table>
                                <br></br>
                                <h6>* The price shown here is for one single book.</h6>
                            </>
                        ) : (
                            <>
                                <table style={{textAlign: 'center', width: '90%', fontFamily: 'Roboto',  margin: 'auto'}}>
                                    <thead style={{fontSize: '15px'}}>
                                        <tr>
                                            <th>BOOK ID</th>
                                            <th>TITLE</th>
                                            <th>PRICE *</th>
                                            <th>QUANTITY</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.toptenSold.map((data) => (
                                            <>
                                            <tr style={{borderBottom: '1px solid grey'}} key={this.state.reportJSON.indexOf(data)}>
                                                    <td>{data.bid}</td>
                                                    <td>{data.title}</td>
                                                    <td>${data.price}</td>
                                                    <td>{data.quantity}</td>      
                                                </tr> 
                                            </>
                                        ))}
                                    </tbody>
                                </table>
                                <br></br>
                                <h6>* The price shown here is for one single book.</h6>
                            </>
                        )}
                    </Modal.Body>
                    <Modal.Footer>
                        
                        
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}

export default Admin;