import React, { useState } from 'react';
import List from './List';
import Controls from './Controls';

const FilterHook = (props) => {
  const [arrayOfStrings, setArrayOfStrings] = useState(props.arrayOfStrings);
  const [checkboxIsChecked, setCheckboxIsChecked] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const getFilteredFromQuery = (inputValue) => {
    return props.arrayOfStrings.filter((string) =>
      string.toLowerCase().includes(inputValue.toLowerCase()),
    );
  };

  const handleSortToggle = (event) => {
    const isChecked = event.target.checked;

    setCheckboxIsChecked(isChecked);

    setArrayOfStrings((prevState) => {
      let sortedArray;

      if (isChecked) {
        sortedArray = [...prevState].sort();
      } else {
        sortedArray = getFilteredFromQuery(inputValue);
      }

      return sortedArray;
    });
  };

  const handleSearchAndFilterChange = (event) => {
    setInputValue(event.target.value);
    setArrayOfStrings(getFilteredFromQuery(event.target.value));
  };

  const handleReset = (event) => {
    event.preventDefault();

    setArrayOfStrings(props.arrayOfStrings);
    setCheckboxIsChecked(false);
    setInputValue('');
  };

  return (
    <div className="filter-bx">
      <Controls
        checkboxIsChecked={checkboxIsChecked}
        handleSortToggle={handleSortToggle}
        inputValue={inputValue}
        handleSearchAndFilterChange={handleSearchAndFilterChange}
        handleReset={handleReset}
      />
      <List arrayOfStrings={arrayOfStrings} />
    </div>
  );
};

export default React.memo(FilterHook);
