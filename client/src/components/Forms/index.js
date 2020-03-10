import React from 'react';
import './Forms.css';

function Form(props) {
  return (
    <form onSubmit={props.onSubmit} className={`form ${props.className ? props.className : ''}`}>
      {props.children}
      <button className="btn btn-submit" type="submit">Submit</button>
    </form>
  );
}

export default Form;
export const clearForm = form => {
  for (let i = 0; i < form.elements.length - 1; i++) {
    form.elements[i].value = '';
    form.elements[i].classList.remove('invalid');
  }
};

export const getInputs = form => {
  const ret = {};
  for (let i = 0; i < form.elements.length - 1; i++) {
    ret[form.elements[i].name] = form.elements[i].value;
  }
  return ret;
};

export const validate = (form, fieldValidators) => {
  console.log(form.elements.length);
  console.log(fieldValidators);
  for (let i = 0; i < form.elements.length - 1; i++) {
    console.log(form.elements[i]);
    if (fieldValidators[form.elements[i].name] && !fieldValidators[form.elements[i].name]()) {
      form.elements[i].classList.add('invalid');
    } else {
      form.elements[i].classList.remove('invalid');
    }
  }
}