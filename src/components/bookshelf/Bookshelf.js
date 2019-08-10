import React, { Component } from 'react';
import Book from '../book/Book';

export default class Bookshelf extends Component {
  render() {
    const { bookshelf } = this.props;

    return (
      <div className='bookshelf'>
        <h2 className='bookshelf-title'>{bookshelf.title}</h2>
        <div className='bookshelf-books'>
          <ol className='books-grid'>
            {bookshelf.books.map(book => (
              <Book key={book.id} book={book} />
            ))}
          </ol>
        </div>
      </div>
    );
  }
}
