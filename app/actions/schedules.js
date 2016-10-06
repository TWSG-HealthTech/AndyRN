import { AsyncStorage } from 'react-native'
import { HOST } from '../utils/config'

const moment = require('moment')

export const ADD_VITALS = 'ADD_VITALS'

export function addVitals(scheduleId, vitals) {
  return (dispatch, getState) => {
    dispatch({
      type: ADD_VITALS,
      scheduleId,
      vitals: {
        ...vitals,
        local: true
      }
    })
    dispatch(saveSchedules(getState().schedules))
  }
}

export const REQ_SYNC = 'REQ_SYNC'
function requestSync() {
    return {
      type: REQ_SYNC
    }
}

export const DONE_SYNC = 'DONE_SYNC'
function doneSync() {
  return {
    type: DONE_SYNC
  }
}

export const SET_SCHEDULES = 'SET_SCHEDULES'
export function setSchedules(schedules) {
  return {
    type: SET_SCHEDULES,
    schedules
  }
}

export function saveSchedules(schedules) {
  return (dispatch) => {
    return AsyncStorage.setItem('schedules', JSON.stringify(schedules))
  }
}

export function loadSchedules() {
  return (dispatch) => {
    AsyncStorage.getItem('schedules')
    .then(schedules => {
      if(schedules != null) {
        dispatch(setSchedules(JSON.parse(schedules)))
      }
    })
  }
}

function findPatientById(patientId, patients) {
  return patients.find(p => p.id === patientId)
}

function findVitalsByPatientId(patientId, vitals) {
  return vitals
  .filter(v => v.patient_id === patientId)
  .filter(v => moment().isSame(v.updated_at, 'day'))
  .map(v => convertToServerVital(v))
}

function convertToServerVital(v) {
  return {
    id: v.id,
    height: v.height,
    weight: v.weight,
    pulse: v.pulse,
    temperature: v.temperature,
    bpHigh: v.bp_high,
    bpLow: v.bp_low,
    timeMeasured: v.updated_at
  }
}

function convertToLocalVital(patientId, v) {
  return {
    patient_id: patientId,
    weight: v.weight,
    height: v.height,
    pulse: v.pulse,
    temperature: v.temperature,
    bp_high: v.bpHigh,
    bp_low: v.bpLow
  }
}

function findLocalVitals(schedules) {
  return schedules.map(s =>
      s.vitals
        .filter(v => v.local === true)
        .map(v => convertToLocalVital(s.patient.id, v))
    )
    .reduce((prev, curr) => prev.concat(curr), [])
}

function postVitals(v) {
  return fetch(`${HOST}vital_records`, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(v)
  })
}

function fetchSchedule(nurseId, date) {
  return fetch(encodeURI(`${HOST}visiting_schedules?nurse_id=${nurseId}&appointment_time=${date}`), {
    headers: {
      'Accept': 'application/json'
    }
  }).then(response => response.json())
}

function fetchPatients() {
  return fetch(`${HOST}patients`, {
    headers: {
      'Accept': 'application/json'
    }
  }).then(response => response.json())
}

function fetchVitalRecords() {
  return fetch(`${HOST}vital_records`, {
    headers: {
      'Accept': 'application/json'
    }
  }).then(response => response.json())
}

function mergeAsLocalSchedules(schedules, patients, vitals) {
  return schedules.map(s => ({
    id: s.id,
    time: moment(s.appointment_time),
    patient: findPatientById(s.patient_id, patients),
    vitals: findVitalsByPatientId(s.patient_id, vitals)
  }))
}

export function syncSchedule() {
  return (dispatch, getState) => {
    dispatch(requestSync())
    let { nurse, schedules } = getState()
    const localVitals = findLocalVitals(schedules)

    Promise.all(localVitals.map(v => postVitals(v)))
    .then(() => Promise.all([
      fetchSchedule(nurse.id, moment().format('DD/MM/YYYY')),
      fetchPatients(),
      fetchVitalRecords()
    ]))
    .then(([schedules, patients, vitals]) => {
      const sList = mergeAsLocalSchedules(schedules, patients, vitals)
      dispatch(setSchedules(sList))
      dispatch(saveSchedules(sList))
      dispatch(doneSync())
    })
    .catch(e => {
      console.error(e)
      dispatch(doneSync())
    })
  }
}
