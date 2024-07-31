
import React from 'react';

const FormattedDate = ({ date }) => {
  const formatDate = (rawDate) => {
    const d = new Date(rawDate);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return <span>{formatDate(date)}</span>;
};

export default FormattedDate;
