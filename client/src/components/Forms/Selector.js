import React from 'react';

function Selector(props) {
  const { label, name, required, options } = props;
  let i = 0;
  return (
    <div className="form-group">
      <label htmlFor={`id-${name}`}>{label}</label>
      <select id={`id-${name}`} name={name} required={required ? true : false}>
        {options.map(o => (
          <option key={i++} value={o.value}>{o.label}</option>
        ))}
      </select>
    </div>
  );
}

export default Selector;