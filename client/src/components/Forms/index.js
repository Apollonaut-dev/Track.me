import React from 'react';
import './Forms.css';

function Form(props) {
  return (
    <form onSubmit={props.onSubmit} className={`form ${props.className ? props.className : ''}`}>
      {// TODO add validation messages to the top of form using state hooks
      /* <p class="form__validation-messages">
        {props.validationMessages.forEach(m => (<p>{m}<br /></p>))}
      </p> */}
      {props.children}
      <button className="btn btn-submit" type="submit">Submit</button>
    </form>
  );
}

export default Form;

// TODO relocate submission to this component
// export const submitToApi = (form, api, callback) => {
//   const { url, method, headers } = api;
//   return fetch(url, {
//     method,
//     headers,
//     body: api.data
//   })
//     .then(res => res.json());
// }

export const clearForm = form => {
  for (let i = 0; i < form.elements.length - 1; i++) {
    if (form.elements[i].type === 'checkbox') {
      form.elements[i].checked = false;
    } else {
      form.elements[i].value = '';
    }
    form.elements[i].classList.remove('invalid');
  }
};

export const getInputs = form => {
  const ret = {};
  for (let i = 0; i < form.elements.length - 1; i++) {
    if (form.elements[i].type === 'checkbox') {
      // TODO Why is the checkbox always submitting as if it were checked!?
      ret[form.elements[i].name] = form.elements[i].checked;
    } else {
      ret[form.elements[i].name] = form.elements[i].value;
    }
  }
  return ret;
};

export const validate = (form, fieldValidators) => {
  for (let i = 0; i < form.elements.length - 1; i++) {
    if (fieldValidators[form.elements[i].name] && !fieldValidators[form.elements[i].name]()) {
      form.elements[i].classList.add('invalid');
    } else {
      form.elements[i].classList.remove('invalid');
    }
  }
}