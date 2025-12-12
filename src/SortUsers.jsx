import React from 'react';

const SortUsers = ({ onSort }) => {
  return (
    <button onClick={onSort}>
      Sort
    </button>
  );
};

export default SortUsers;