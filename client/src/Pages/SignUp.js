import React from 'react';
import './Page.css';

import Form, { clearForm, getInputs, validate } from '../components/Forms';
import TextInput from '../components/Forms/TextInput';
import Selector from '../components/Forms/Selector';
import Date from '../components/Forms/Date';
import TOSCheckbox from '../components/Forms/TOSCheckbox';

function SignUp(props) {
  const options = [
    { value: 'M', label: 'Male'},
    { value: 'F', label: 'Female'}
  ];
  return (
    <section className="page">
      <h1 className="page__header">Sign Up!</h1>
      <Form onSubmit={signupRequest}>
        <TextInput label="Name" name="name" type="text" required></TextInput>
        <Selector label="Sex" name="sex" options={options} required></Selector>
        <Date label="Date of Birth" name="birthdate" ></Date>
        <TextInput label="Email" name="email" type="email" required></TextInput>
        <TextInput label="Password" name="password" type="password" required ></TextInput>
        <TextInput label="Confirm password" name="password_confirmation" type="password" required></TextInput>
        <TOSCheckbox termsLink="#" name="tos_agreement"></TOSCheckbox>
      </Form>
    </section>
  );
}

const signupRequest = async (e) => {
  if (e) e.preventDefault();
  e.persist();
  const form = e.target;
  const inputs = getInputs(form);
  console.log(inputs);
  try {
    const response = await fetch('http://localhost:5000/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs)
    });
    const resData = await response.json();
    console.log('response from api\n', resData);
    if (resData.message === 'validation failed') {
      const validators = {};
      resData.data.forEach(err => {
        validators[err.param] = () => false
        if (err.param === 'password') {
          validators['password_confirmation'] = () => false;
        }
      });

      validate(form, validators);
    } else {
      clearForm(form);
    }
  } catch (rejection) {

  }
}

export default SignUp;