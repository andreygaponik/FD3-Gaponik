import React from 'react';

import './Filter.css';

class Filter extends React.Component {
  getInitialState = () => {
    return {
      arrayOfStrings: this.props.arrayOfStrings,
      inputValue: '',
      checkboxIsChecked: false,
    };
  };

  state = this.getInitialState();

  getFilteredFromQuery = (inputValue) => {
    return this.props.arrayOfStrings.filter((string) =>
      string.toLowerCase().includes(inputValue.toLowerCase()),
    );
  };

  handleSearchAndFilterChange = (event) => {
    this.setState({
      inputValue: event.target.value,
      arrayOfStrings: this.getFilteredFromQuery(event.target.value),
    });
  };

  handleSortToggle = (event) => {
    const isChecked = event.target.checked;

    this.setState((prevState) => {
      let sortedArray;

      if (isChecked) {
        sortedArray = [...prevState.arrayOfStrings].sort();
      } else {
        sortedArray = this.getFilteredFromQuery(prevState.inputValue);
      }

      return {
        checkboxIsChecked: isChecked,
        arrayOfStrings: sortedArray,
      };
    });
  };

  handleReset = (event) => {
    event.preventDefault();

    this.setState(this.getInitialState());
  };

  render() {
    return (
      <div className="filter-bx">
        <form className="filter-controls" onSubmit={this.handleReset}>
          <input
            type="checkbox"
            checked={this.state.checkboxIsChecked}
            onChange={this.handleSortToggle}
          />
          <input
            type="text"
            value={this.state.inputValue}
            onChange={this.handleSearchAndFilterChange}
          />
          <button>Сброс</button>
        </form>
        <ul className="filter-list">
          {this.state.arrayOfStrings.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Filter;
