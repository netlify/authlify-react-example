import Authlify from 'authlify-js';

const authlify = new Authlify({APIUrl: 'http://localhost:9999'});

export function loginSuccess(user) {
  console.log('loginSuccess', user, user.email);
  return {type: 'LOGIN_SUCCESS', payload: {
    email: user.email,
    tokenResponse: user.tokenResponse
  }};
}

export function login(email, password) {
  return (dispatch, getState) => {
    return authlify.login(email, password).then(
      (user) => dispatch(loginSuccess(user))
    ).catch((error) => {
      console.log(error);
    });
  };
}

export function signup(email, password) {
  return (dispatch, getState) => {
    return authlify.signup(email, password).then(
      (success) => dispatch({type: 'SIGNUP_SUCCESS'})
    );
  };
}

export function sendRecovery(email) {
  return (dispatch, getState) => {
    return authlify.requestPasswordRecovery(email).then(
      (success) => dispatch({type: 'RECOVER_REQUEST_SUCCESS'})
    );
  };
}

export function recover(code) {
  return (dispatch, getState) => {
    return authlify.recover(code).then(
      (user) => dispatch(loginSuccess(user))
    );
  };
}

export function confirm(code) {
  return (dispatch, getState) => {
    return authlify.confirm(code).then(
      (user) => dispatch(loginSuccess(user))
    );
  };
}
