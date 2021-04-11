import React from 'react';
import * as book from '../Services/book';
import science from '../assets/science.png';
import engg from '../assets/engineering.png';
import fiction from '../assets/fiction.png';
import misc from '../assets/misc.png';
import '../assets/books.css';
import BookView from './BookView';

class Books extends React.Component {
    
    state = { 
        booksArray: [],
        categories: [],
        category: 'All',
        searchArray: [],
        search: ""
    };

    async componentDidMount() {
        const categories = await book.getAllCategory();
        this.setState({ 
            categories: categories 
        });
        const allBooks = await book.getAllBooks();
        
        this.setState({
            booksArray: allBooks
        });
    }

    handleChange = (event) => {
        event.preventDefault();
        this.setState({
            search: event.target.value
        });
        this.setState({
            searchArray: this.state.booksArray.filter(name => name.title.toLowerCase().includes(this.state.search.toLowerCase()))
        });
        this.setState({
            category: 'All'
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log(this.state.search);
        console.log(this.state.searchArray);
    }

    handleClick(cat) {
        this.setState({
            category: cat
        });
        this.onClickHandler(cat);
    }

    onClickHandler = async (category) => {
        console.log(category);
        await book.getBooksByCategory(category);
    }

    renderSwitch(param) {
        let img;
        switch(param) {
            case 'Science':
                img = science;
                break;

            case 'Engineering':
                img = engg;
                break;

            case 'Fiction':
                img = fiction;
                break;

            default:
                img = misc;
                break;
        }
        return img;
      }

    render() {
        const {booksArray, categories } = this.state;
        
        return (
            <>
                <h2 style={{fontFamily: 'Roboto', marginBottom:'20px', marginTop:'20px', marginLeft: '20px'}}>Book Categories</h2>
                <div>
                    <ul className='categories'>
                        {categories.map((data, index) => (
                            <li className="li" key={data} style={{listStyleType: 'none'}} onClick={() => this.handleClick(data)}> 
                                <div className='catt'>
                                    <img style={{height:'150px', margin: '0px 40px'}} src={this.renderSwitch(data)} alt="cart" />
                                    <h3 style={{padding: '15px', fontFamily: 'Roboto'}}>{data}</h3>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div style={{textAlign: 'center'}}>
                        <form onSubmit={this.handleSubmit.bind(this)}>
                            <div className='form-group'>
                                <input 
                                    type="text" 
                                    placeholder='Enter the title of the Book...' 
                                    name='search' 
                                    style={{marginRight: '15px', width: '270px', height: '38px', outline: 'none'}}
                                    onChange={this.handleChange.bind(this)}>
                                </input>
                                <input 
                                    type='submit' 
                                    value='Book Search' 
                                    className='button' 
                                    style={{width: '150px'}}>

                                </input>
                            </div>
                        </form>
                    </div>

                    {/* render list books */}
                    <h2 style={{fontFamily: 'Roboto', marginBottom:'20px', marginTop:'20px', marginLeft: '20px'}}>Books List</h2>
                    <div>
                       { this.state.category === 'All' ? (
                           this.state.searchArray.map((data) => (
                               <div key={booksArray.indexOf(data)}>
                                   <BookView book={data}/>
                                </div>
                           ))
                       ) : (
                           booksArray.filter((book) => (
                               book.category === this.state.category
                           )).map((data) => (
                            
                            <div key={booksArray.indexOf(data)}>
                                <BookView book={data} />
                            </div>
                           ))
                       )}
                    </div>
                </div>
            </>
        );
    }
}
export default Books;