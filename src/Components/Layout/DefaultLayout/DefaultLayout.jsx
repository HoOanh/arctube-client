import React from 'react';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';

import authApi from '../../../api/authApi';

import { useDispatch } from 'react-redux';
import {
  loginFailure,
  loginStart,
  loginSuccess,
} from '../../../redux/userSlice';

import { auth, provider } from '../../../firabase';
import { signInWithPopup } from 'firebase/auth';

import './DefaultLayout.scss';

const DefaultLayout = ({ children }) => {
  const dispatch = useDispatch();

  const handleSignInWithGoogle = async () => {
    dispatch(loginStart());
    signInWithPopup(auth, provider)
      .then((result) => {
        authApi
          .loginGoogle({
            name: result.user.displayName,
            email: result.user.email,
            img: result.user.photoURL,
          })
          .then((res) => {
            localStorage.setItem('access_token', res.token);
            dispatch(loginSuccess(res.other));
            // navigate('/');
          });
      })
      .catch((err) => {
        dispatch(loginFailure());
      });
  };
  return (
    <div className="layout">
      <Header login={handleSignInWithGoogle} />
      <div className="container">
        <Sidebar login={handleSignInWithGoogle} />
        <div className="content">{children}</div>
      </div>
    </div>
  );
};

export default DefaultLayout;
