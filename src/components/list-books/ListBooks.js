import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Bookshelf from '../bookshelf/Bookshelf';

export default class ListBooks extends Component {
  renderBookshelves = bookshelves => {
    const allBookshelves = [];
    const { onChangeBook, getBookCategory } = this.props;

    for (const key in bookshelves) {
      if (bookshelves.hasOwnProperty(key)) {
        allBookshelves.push(
          <Bookshelf
            key={key}
            bookshelf={bookshelves[key]}
            onChangeBook={onChangeBook}
            getBookCategory={getBookCategory}
          />
        );
      }
    }
    return allBookshelves;
  };
  render() {
    const { bookshelves } = this.props;
    return (
      <div className='list-books'>
        <div className='list-books-title'>
          <h1>MyReads</h1>
        </div>
        <div className='list-books-content'>
          <div>{this.renderBookshelves(bookshelves)}</div>
        </div>
        <div className='open-search'>
          <Link to='/search'>Add a book</Link>
        </div>
      </div>
    );
  }
}
