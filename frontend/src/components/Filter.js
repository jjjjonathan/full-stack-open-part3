import React from "react";

const Filter = ({ query, onChange }) => {
  return (
    <div>
      filter: <input value={query} onChange={onChange} />
    </div>
  );
};

export default Filter;
