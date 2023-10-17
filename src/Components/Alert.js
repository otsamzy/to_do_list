import React, { useEffect } from "react";
const Alert = ({ mgs, type, displayAlert, Items }) => {
  useEffect(() => {
    const timeOut = setTimeout(() => {
      displayAlert();
    }, 3000);
    return () => {
      clearTimeout(timeOut);
    };
  }, [Items, displayAlert]);
  return <p className={`alert_${type}`}>{mgs}</p>;
};

export default Alert;
