import React, { Component } from 'react';
import Author from '../author/Author';
import BookshelfChanger from '../bookshelf-changer/BookshelfChanger';

export default class Book extends Component {
  /* bookAction = ()=>{
    const { book, isRawBook } = this.props;
    
    isRawBook ?
  }  */

  render() {
    const { book, isRawBook } = this.props;

    return (
      <li>
        <div className='book'>
          <div className='book-top'>
            <div
              className='book-cover'
              style={{
                width: 128,
                height: 193,
                backgroundImage: `url(${book.imageLinks.thumbnail})`
              }}
            />
            {!isRawBook && <BookshelfChanger book={book} />}
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
