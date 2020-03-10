import React from 'react';
import './Page.css';

import Form, { clearForm, getInputs, validate } from '../components/Forms';
import TextInput from '../components/Forms/TextInput';

function SignUp(props) {
  return (
    <section className="page">
      <h1 className="page__header">Sign Up!</h1>
      <Form onSubmit={signupRequest}>
        <TextInput label="First name" name="first_name" type="text" required></TextInput>
        <TextInput label="Last name" name="last_name" type="text" required></TextInput>
        <TextInput label="Email" name="email" type="email" required></TextInput>
        <TextInput label="Password" name="password" type="password" required ></TextInput>
        <TextInput label="Confirm password" name="password_confirmation" type="password" required></TextInput>
      </Form>
    </section>
  );
}

const signupRequest = async (e) => {
  if (e) e.preventDefault();
  e.persist();
  const form = e.target;
  const inputs = getInputs(form);
  try {
    const response = await fetch('http://localhost:5000/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs)
    });
    console.log(response);
    const resData = await response.json();
    console.log('response from api\n', resData);
    if (resData.message === 'validation failed') {
      const validators = {};
      resData.data.forEach(err => {
        validators[err.param] = () => false
      });

      validate(form, validators);
    } else {
      clearForm(form);
    }
  } catch (rejection) {

  }
}

export default SignUp;