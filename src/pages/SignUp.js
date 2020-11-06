import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/buttons/Button';
import InputNotched from '../components/forms/InputNotched';
import { signInUp } from '../utils/userServices';

const SignUp = ({ stateFns, setPgSettings }) => {

  useEffect(() => {
    setPgSettings({
      pgClass: 'sign-in-up'
    });
  }, [setPgSettings])

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      email: e.currentTarget.email.value,
      fName: e.currentTarget.fName.value,
      lName: e.currentTarget.lName.value,
      password: e.currentTarget.password.value,
      'password-confirm': e.currentTarget['password-confirm'].value
    }
    if (e.currentTarget['password-confirm'].value === e.currentTarget.password.value) {
      signInUp('sign-up', newUser, stateFns);
    } else {
      stateFns.setFlashes([{
        msg: 'Passwords must match.',
        type: 'error'
      }])
    }
  }

  return (
    <div className="sign-in-up-wrap">
      <div>
        <h1>Welcome to Wishlist</h1>
        <p>A tool for creating, organizing, and sharing wish lists for the Holidays, birthdays, and more!</p>
        <form onSubmit={handleSubmit}>
          <InputNotched
            name="email"
            type="email"
            label="Email"
            required={true}
          />
          <InputNotched
            name="fName"
            type="text"
            label="First Name"
            className="span-6"
            required={true}
          />
          <InputNotched
            name="lName"
            type="text"
            label="Last Name"
            className="span-6"
            required={true}
          />
          <InputNotched
            name="password"
            type="password"
            label="Password"
            required={true}
            newPassword={true}
          />
          <InputNotched
            name="password-confirm"
            type="password"
            label="Confirm Password"
            required={true}
          />
          <Button
            className="secondary w-1-2"
            text="Sign Up"
            type="submit"
          />
          <div>Have an account? <Link to='/'>Sign In.</Link></div>
        </form>
      </div> 
    </div>
  )
}

export default SignUp;