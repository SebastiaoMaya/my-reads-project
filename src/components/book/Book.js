import React from 'react';
import * as Constants from '../../constants';
import Author from '../author/Author';
import BookshelfChanger from '../bookshelf-changer/BookshelfChanger';

export default function Book(props) {
  const { book, onChangeBook, getBookCategory } = props;
  const bookImageUrl = book.imageLinks
    ? book.imageLinks.thumbnail
    : Constants.IMAGE_NOT_AVAILABLE;

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
            book.authors.map(author => <Author author={author} key={author} />)}
        </div>
      </div>
    </li>
  );
}
