import React, { Component } from 'react';
import * as Constants from '../../constants';

export default class BookshelfChanger extends Component {
  state = {
    value: ''
  };
  handleShelfChange = e => {
    const { book, onChangeBook } = this.props;
    const newShelf = e.target.value;
    this.setState({ value: newShelf });

    onChangeBook(book, newShelf);
  };
  componentDidMount() {
    const { book, getBookCategory } = this.props;
    this.setState({ value: getBookCategory(book) });
  }

  render() {
    const { value } = this.state;
    return (
      <div className='book-shelf-changer'>
        <select value={value} onChange={this.handleShelfChange}>
          <option value={Constants.MOVE} disabled>
            {Constants.MOVE_TO}
          </option>
          <option value={Constants.CURRENTLY_READING}>
            {Constants.CURRENTLY_READING_NAME}
          </option>
          <option value={Constants.WANT_TO_READ}>
            {Constants.WANT_TO_READ_NAME}
          </option>
          <option value={Constants.READ}>{Constants.READ_NAME}</option>
          <option value={Constants.NONE}>{Constants.NONE_NAME}</option>
        </select>
      </div>
    );
  }
}
