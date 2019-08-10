import React from 'react';
import Book from '../book/Book';

export default function Bookshelf(props) {
  const { bookshelf, onChangeBook, getBookCategory } = props;

  return (
    <div className='bookshelf'>
      <h2 className='bookshelf-title'>{bookshelf.title}</h2>
      <div className='bookshelf-books'>
        <ol className='books-grid'>
          {bookshelf.books.map(book => (
            <Book
              key={book.id}
              book={book}
              onChangeBook={onChangeBook}
              getBookCategory={getBookCategory}
            />
          ))}
        </ol>
      </div>
    </div>
  );
}
