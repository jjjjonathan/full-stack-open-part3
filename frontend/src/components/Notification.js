import React from "react";

const Notification = ({ message, isError }) => {
  let style;
  if (isError) {
    style = { color: "Red" };
  } else {
    style = { color: "Green" };
  }

  return (
    <div style={style}>
      <p>{message}</p>
    </div>
  );
};

export default Notification;
