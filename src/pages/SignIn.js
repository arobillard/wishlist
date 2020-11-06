import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/buttons/Button';
import InputNotched from '../components/forms/InputNotched';
import { signInUp } from '../utils/userServices';

const SignIn = ({ stateFns }) => {

  const handleSubmit = (e) => {
    e.preventDefault();
    const userInfo = {
      email: e.currentTarget.email.value,
      password: e.currentTarget.password.value
    }
    signInUp('sign-in', userInfo, stateFns);
  }

  return(
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
            name="password"
            type="password"
            label="Password"
          />
          <Button
            className="secondary w-1-2"
            text="Sign In"
            type="submit"
          />
        </form>
        <Link to="/sign-up">Sign Up</Link>
      </div> 
    </div>
  )
}

export default SignIn;