import React, { useEffect, useState } from 'react';
import List from './List';
import Controls from './Controls';

const FilterHook = (props) => {
  const [originalArrayofStrings, setoriginalArrayofStrings] = useState(props.arrayOfStrings);
  const [displayedArrayOfStrings, setDisplayedArrayOfStrings] = useState(props.arrayOfStrings);
  const [checkboxIsChecked, setCheckboxIsChecked] = useState(false);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    console.log('---USE EFFECT---');

    let result = originalArrayofStrings.filter((string) =>
      string.toLowerCase().includes(inputValue.toLowerCase()),
    );

    if (checkboxIsChecked) {
      result = [...result].sort();
    }

    setDisplayedArrayOfStrings(result);
  }, [originalArrayofStrings, checkboxIsChecked, inputValue]);

  const handleSortToggle = (value) => {
    setCheckboxIsChecked(value);
  };

  const handleSearchAndFilterChange = (value) => {
    setInputValue(value);
  };

  const handleReset = (event) => {
    event.preventDefault();

    setDisplayedArrayOfStrings(originalArrayofStrings);
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
      <List arrayOfStrings={displayedArrayOfStrings} />
    </div>
  );
};

export default React.memo(FilterHook);
