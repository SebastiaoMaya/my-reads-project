import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from '../../BooksAPI';
import * as Constants from '../../constants';
import Book from '../book/Book';

export default class SearchBooks extends Component {
  state = {
    query: '',
    rawBooks: []
  };

  componentWillMount() {
    this.timer = null;
  }

  handleKeyDown = e => {
    if (e.keyCode === Constants.ENTER_KEY) {
      this.triggerChange();
    }
  };

  triggerChange = query => {
    if (query && query !== '') {
      BooksAPI.search(query, Constants.MAX_RESULTS).then(result => {
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
    this.timer = setTimeout(
      () => this.triggerChange(value),
      Constants.WAIT_INTERVAL
    );
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
              placeholder={Constants.SEARCH_PLACEHOLDER}
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
