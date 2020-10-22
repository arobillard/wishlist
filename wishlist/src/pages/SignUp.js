import React from 'react';
import InputNotched from '../components/forms/InputNotched';
import Button from '../components/buttons/Button';
import { Link } from 'react-router-dom';

const SignUp = () => {

  const signUp = async (e) => {
    e.preventDefault();
    const newUser = {
      email: e.currentTarget.email.value,
      fName: e.currentTarget.fName.value,
      lName: e.currentTarget.lName.value,
    }
    console.log(newUser);
    const postUser = await fetch('/users/sign-up', {
      method: "post",
      body: JSON.stringify(newUser),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const body = await postUser.json();
    console.log(body);
  }

  return(
    <div className="sign-in-up-wrap">
      <div>
        <h1>Welcome to Wishlist</h1>
        <p>A tool for creating, organizing, and sharing wish lists for the Holidays, birthdays, and more!</p>
        <form onSubmit={signUp}>
          <InputNotched
            name="email"
            type="email"
            label="Email"
            // required={true}
          />
          <InputNotched
            name="fName"
            type="text"
            label="First Name"
            className="span-6"
            // required={true}
          />
          <InputNotched
            name="lName"
            type="text"
            label="Last Name"
            className="span-6"
            // required={true}
          />
          <InputNotched
            name="password"
            type="password"
            label="Password"
          />
          <InputNotched
            name="password-confirm"
            type="password"
            label="Confirm Password"
          />
          <Button
            className="secondary w-1-2"
            text="Sign In"
            type="submit"
          />
          <div>Have an account? <Link to='/'>Sign In.</Link></div>
        </form>
      </div> 
    </div>
  )
}

export default SignUp;