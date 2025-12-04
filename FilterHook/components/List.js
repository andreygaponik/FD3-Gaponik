import React from 'react';

const List = (props) => {
  console.log('List RENDERED');
  return (
    <ul className="filter-list">
      {props.arrayOfStrings.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
};

export default React.memo(List);
