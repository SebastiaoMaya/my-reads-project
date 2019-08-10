import PropTypes from 'prop-types';
import React from 'react';
import { IoIosCheckmark, IoIosClose } from 'react-icons/io';

export default function BulkChange(props) {
  const { bulkStatusChange, bulkModeActive } = props;
  return (
    <div>
      <button
        className='bulk-change'
        disabled={bulkModeActive}
        onClick={bulkStatusChange}
      >
        Bulk change
      </button>
      {bulkModeActive && (
        <div>
          <button
            className='bulk-change bulk-change-icon'
            onClick={bulkStatusChange}
          >
            <IoIosCheckmark />
          </button>
          <button
            className='bulk-change bulk-change-icon'
            onClick={bulkStatusChange}
          >
            <IoIosClose />
          </button>
        </div>
      )}
    </div>
  );
}

BulkChange.propTypes = {
  bulkStatusChange: PropTypes.func.isRequired,
  bulkModeActive: PropTypes.bool.isRequired
};
