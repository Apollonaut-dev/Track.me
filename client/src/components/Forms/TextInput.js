import React from 'react';

function TextInput(props) {
  const { label, name, classNames, required, type } = props;
  console.log(required);
  if (!name) {
    throw new Error('no input name given');
  }
  return (
    <div className={`form-group ${classNames ? classNames : ''}`}> 
      <label htmlFor={`id-${name}`}>{label}</label>
      <input name={name} id={`id-${name}`} type={type} required={required ? true : false} />
    </div>
  );
}

export default TextInput;