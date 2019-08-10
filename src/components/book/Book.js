import React, { Component } from 'react';
import Author from '../author/Author';
import BookshelfChanger from '../bookshelf-changer/BookshelfChanger';

export default class Book extends Component {
  render() {
    const { book, onChangeBook, getBookCategory } = this.props;
    const bookImageUrl = book.imageLinks
      ? book.imageLinks.thumbnail
      : '../../images/img_not_available.png';
    return (
      <li>
        <div className='book'>
          <div className='book-top'>
            <div
              className='book-cover'
              style={{
                width: 128,
                height: 193,
                backgroundImage: `url(${bookImageUrl})`
              }}
            />
            <BookshelfChanger
              book={book}
              onChangeBook={onChangeBook}
              getBookCategory={getBookCategory}
            />
          </div>
          <div className='book-title'>{book.title}</div>
          <div id='authors'>
            {book.authors &&
              book.authors.map(author => (
                <Author author={author} key={author} />
              ))}
          </div>
        </div>
      </li>
    );
  }
}
