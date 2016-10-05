import { navigatePop } from './navigation'
import { AsyncStorage } from 'react-native'
import { saveSchedules, setSchedules } from './schedules'
import { HOST } from '../utils/config'

export const REQ_LOGIN = 'REQ_LOGIN'

export const SET_NURSE = 'SET_NURSE'
function setNurse(nurse) {
  return {
    type: SET_NURSE,
    nurse
  }
}

function saveNurse(nurse) {
  return (dispatch) => {
    return AsyncStorage.setItem('nurse', JSON.stringify(nurse))
  }
}

export function loadNurse() {
  return (dispatch) => {
    AsyncStorage.getItem('nurse')
    .then(nurse => {
      if(nurse !== null) {
        dispatch(setNurse(JSON.parse(nurse)))
      }
    })
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
    fetch(`${HOST}nurses`, {
      headers: {
        'Accept': 'application/json'
      }
    })
    .then(response => response.json())
    .then(nurses => {
      const nurse = nurses.find(n => n.email === email)
      if(!nurse) {
        throw 'No Such User'
      }
      if(nurse.password !== password) {
        throw 'Wrong Password'
      }

      dispatch(saveNurse(nurse))
      dispatch(setNurse(nurse))
      dispatch(doneLogin())
      dispatch(navigatePop())

    })
    .catch(e => dispatch(errorLogin(e)))
  }
}

export function logout() {
  return (dispatch) => {
    dispatch(setSchedules([]))
    dispatch(saveSchedules([]))
    dispatch(setNurse(null))
    dispatch(saveNurse(null))
  }
}
