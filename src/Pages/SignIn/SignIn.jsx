import React from 'react';
import { useState } from 'react';
import authApi from '../../api/authApi';
import './SignIn.scss';

import { useDispatch } from 'react-redux';
import { loginFailure, loginStart, loginSuccess } from '../../redux/userSlice';
import { useNavigate } from 'react-router-dom';

import { auth, provider } from '../../firabase';
import { signInWithPopup } from 'firebase/auth';
import { useEffect } from 'react';

const SignIn = () => {
  // const [name, setName] = useState('');
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');

  // const navigate = useNavigate();
  // const dispatch = useDispatch();

  // const handleSignInWithGoogle = async () => {
  //   dispatch(loginStart());
  //   signInWithPopup(auth, provider)
  //     .then((result) => {
  //       authApi
  //         .loginGoogle({
  //           name: result.user.displayName,
  //           email: result.user.email,
  //           img: result.user.photoURL,
  //         })
  //         .then((res) => {
  //           localStorage.setItem('access_token', res.token);
  //           dispatch(loginSuccess(res.other));
  //           navigate('/');
  //         });
  //     })
  //     .catch((err) => {
  //       dispatch(loginFailure());
  //     });
  // };

  // const handleSignIn = async (e) => {
  //   e.preventDefault();
  //   dispatch(loginStart());

  //   try {
  //     const res = await authApi.login({ name: name, password: password });

  //     localStorage.setItem('access_token', res.token);
  //     dispatch(loginSuccess(res.other));
  //     navigate('/');
  //   } catch (err) {
  //     dispatch(loginFailure());
  //   }
  // };
  // const handleSignUp = (e) => {
  //   e.preventDefault();
  // };
  return (
    <div className="signin">
      {/* <div className="signin__content">
        <h1>Sign in</h1>
        <h2>to continue to ArcTube</h2>
        <form onSubmit={(e) => handleSignIn(e)}>
          <input
            type="text"
            placeholder="username"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <input type="submit" value="Sign in" />
        </form>
        <h1>or</h1>
        <button className="signIn-google" onClick={handleSignInWithGoogle}>
          Sign in with Google
        </button>
        <form onSubmit={(e) => handleSignUp(e)}>
          <input
            type="text"
            placeholder="username"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <input type="submit" value="Sign up" />
        </form>
      </div> */}
    </div>
  );
};

export default SignIn;
