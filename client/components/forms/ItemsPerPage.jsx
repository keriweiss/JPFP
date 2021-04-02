import React, { useState } from 'react';

const ItemsPerPage = (props) => {
  const [viewPage, setViewPage] = useState(props.itemsPerPage);

  return (
    <span id='pagesView'>
      <span id='view'>
        {props.pool.length} {props.item} | View
      </span>
      {props.viewOptions.map((option) => (
        <span
          className={
            option[1] === viewPage ? 'current viewOption' : 'viewOption'
          }
          key={option}
          onClick={() => {
            props.setItemsPerPage(option[1]);
            setViewPage(option[1]);
            props.setCurrentPage(1);
          }}
        >
          {option[0]}
        </span>
      ))}
    </span>
  );
};

export default ItemsPerPage;
