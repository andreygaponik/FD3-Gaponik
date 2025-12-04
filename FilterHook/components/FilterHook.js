import React, { useReducer } from 'react';
import List from './List';
import Controls from './Controls';

const initialState = {
  arrayOfStrings: [],
  originalArrayOfStrings: [],
  inputValue: '',
  checkboxIsChecked: false,
};

const ACTIONS = {
  RESET: 'RESET',
  SORT: 'SORT',
  SEARCH: 'SEARCH',
};

const getFilteredFromQuery = (originalArrayOfStrings, inputValue) => {
  return originalArrayOfStrings.filter((string) =>
    string.toLowerCase().includes(inputValue.toLowerCase()),
  );
};

const appReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.RESET: {
      return {
        ...initialState,
        arrayOfStrings: action.payload,
        originalArrayOfStrings: action.payload,
      };
    }

    case ACTIONS.SORT: {
      const isChecked = action.payload;

      let sortedArray;

      if (isChecked) {
        sortedArray = [...state.arrayOfStrings].sort();
      } else {
        sortedArray = getFilteredFromQuery(state.originalArrayOfStrings, state.inputValue);
      }

      return {
        ...state,
        checkboxIsChecked: isChecked,
        arrayOfStrings: sortedArray,
      };
    }

    case ACTIONS.SEARCH: {
      return {
        ...state,
        inputValue: action.payload,
        arrayOfStrings: getFilteredFromQuery(state.originalArrayOfStrings, action.payload),
      };
    }

    default:
      return state;
  }
};

const FilterHook = (props) => {
  console.log('FilterHook RENDERED');

  const [state, dispatch] = useReducer(appReducer, {
    ...initialState,
    arrayOfStrings: props.arrayOfStrings,
    originalArrayOfStrings: props.arrayOfStrings,
  });

  const handleReset = (event) => {
    event.preventDefault();

    dispatch({ type: 'RESET', payload: props.arrayOfStrings });
  };

  const handleSortToggle = (event) => {
    dispatch({ type: 'SORT', payload: event.target.checked });
  };

  const handleSearchAndFilterChange = (event) => {
    dispatch({ type: 'SEARCH', payload: event.target.value });
  };

  return (
    <div className="filter-bx">
      <Controls
        handleReset={handleReset}
        handleSortToggle={handleSortToggle}
        checkboxIsChecked={state.checkboxIsChecked}
        inputValue={state.inputValue}
        handleSearchAndFilterChange={handleSearchAndFilterChange}
      />
      <List arrayOfStrings={state.arrayOfStrings} />
    </div>
  );
};

export default FilterHook;
