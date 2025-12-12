import React from 'react';

const SortUsers = ({ onSort, sortDirection }) => {
  return (
    <button 
      onClick={onSort}
      className="btn btn-primary"
      style={{ minWidth: '100px' }}
    >
      <i className={`bi bi-sort-alpha-${sortDirection === 'asc' ? 'down' : 'up'}`}></i>
      {sortDirection === 'asc' ? ' А-Я' : ' Я-А'}
    </button>
  );
};

export default SortUsers;