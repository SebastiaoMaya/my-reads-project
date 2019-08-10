import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from '../../BooksAPI';
import Book from '../book/Book';

const WAIT_INTERVAL = 1000;
const ENTER_KEY = 13;
const MAX_RESULTS = 20;

export default class SearchBooks extends Component {
  state = {
    query: '',
    rawBooks: []
  };

  componentWillMount() {
    this.timer = null;
  }

  handleKeyDown = e => {
    if (e.keyCode === ENTER_KEY) {
      this.triggerChange();
    }
  };

  triggerChange = query => {
    if (query && query !== '') {
      BooksAPI.search(query, MAX_RESULTS).then(result => {
        if (!result.error) {
          this.setState({ rawBooks: result });
        }
      });
    } else {
      this.setState({ rawBooks: [] });
    }
  };

  handleQueryChange = e => {
    clearTimeout(this.timer);
    const value = e.target.value;
    this.setState({ query: value });
    this.timer = setTimeout(() => this.triggerChange(value), WAIT_INTERVAL);
  };

  render() {
    const { query, rawBooks } = this.state;
    const { onChangeBook, getBookCategory } = this.props;
    return (
      <div className='search-books'>
        <div className='search-books-bar'>
          <Link to='/' className='close-search'>
            Close
          </Link>

          <div className='search-books-input-wrapper'>
            <input
              type='text'
              placeholder='Search by title or author'
              value={query}
              onChange={this.handleQueryChange}
              onKeyDown={this.handleKeyDown}
            />
          </div>
        </div>
        <div className='search-books-results'>
          <ol className='books-grid'>
            {rawBooks.map(rawBook => (
              <Book
                book={rawBook}
                key={rawBook.id}
                onChangeBook={onChangeBook}
                getBookCategory={getBookCategory}
              />
            ))}
          </ol>
        </div>
      </div>
    );
  }
}
