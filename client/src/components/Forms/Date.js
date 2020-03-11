import React from 'react';

function Date(props) {
  const { label, name, required } = props;
  return (
    <div className="form-group">
      <label htmlFor={`id-${name}`}>{label}</label>
      <input id={`id-${name}`} name={name} type="date" required={required ? true : false} />
    </div>
  );
}

export default Date;