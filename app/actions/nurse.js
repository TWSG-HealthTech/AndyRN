import { navigatePop } from './navigation'

export const REQ_LOGIN = 'REQ_LOGIN'

export const SET_NURSE = 'SET_NURSE'
function setNurse(nurse) {
  return {
    type: SET_NURSE,
    nurse
  }
}

export const DONE_LOGIN = 'DONE_LOGIN'
function doneLogin() {
  return {
    type: DONE_LOGIN
  }
}

export const ERROR_LOGIN = 'ERROR_LOGIN'
function errorLogin(error) {
  return {
    type: ERROR_LOGIN,
    error
  }
}

export function login(email, password) {
  return (dispatch) => {
    dispatch({type: REQ_LOGIN})
    fetch('https://young-journey-22645.herokuapp.com/nurses', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(nurses => {
      const nurse = nurses.find(n => n.email === email && n.password === password)
      if(nurse) {
        dispatch(setNurse(nurse))
        dispatch(doneLogin())
        dispatch(navigatePop())
      } else {
        throw 'No such user'
      }
    })
    .catch(e => dispatch(errorLogin(e)))
  }
}
