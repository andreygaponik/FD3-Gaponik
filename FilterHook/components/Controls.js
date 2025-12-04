import React from 'react';

const Controls = (props) => {
  console.log('Controls RENDERED');

  return (
    <form className="filter-controls" onSubmit={props.handleReset}>
      <input type="checkbox" checked={props.checkboxIsChecked} onChange={props.handleSortToggle} />
      <input type="text" value={props.inputValue} onChange={props.handleSearchAndFilterChange} />
      <button>Сброс</button>
    </form>
  );
};

export default Controls;
