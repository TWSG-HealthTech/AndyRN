export const ADD_VITALS = 'ADD_VITALS'

export function addVitals(scheduleId, vitals) {
  return {
    type: ADD_VITALS,
    scheduleId,
    vitals: {
      ...vitals,
      local: true
    }
  }
}

export const SET_SCHEDULES = 'SET_SCHEDULES'
export function setSchedules(schedules) {
  return {
    type: SET_SCHEDULES,
    schedules
  }
}

function findPatientById(patientId, patients) {
  return patients.find(p => p.id === patientId)
}

function findVitalsByPatientId(patientId, vitals) {
  return vitals
  .filter(v => v.patient_id === patientId)
  .map(v => ({
    id: v.id,
    height: v.height,
    weight: v.weight,
    pulse: v.pulse,
    temperature: v.temperature,
    bpHigh: v.bp_high,
    bpLow: v.bp_low,
    timeMeasured: v.updated_at
  }))
}

export function syncSchedule() {
  return (dispatch, getState) => {
    let { nurse, schedules } = getState()

    const localVitals = schedules.map(s => s.vitals.filter(v => v.local === true).map(v => ({
      patient_id: s.patient.id,
      weight: v.weight,
      height: v.height,
      pulse: v.pulse,
      temperature: v.temperature,
      bp_high: v.bpHigh,
      bp_low: v.bpLow
    }))).reduce((prev, curr) => prev.concat(curr), [])

    Promise.all(
      localVitals.map(v => fetch(`http://young-journey-22645.herokuapp.com/vital_records`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(v)
      })))
      .then(() => Promise.all([
        fetch(`https://young-journey-22645.herokuapp.com/visiting_schedules?nurse_id=${nurse.id}`, {
          headers: {
            'Accept': 'application/json'
          }
        }).then(response => response.json()),
        fetch(`http://young-journey-22645.herokuapp.com/patients`, {
          headers: {
            'Accept': 'application/json'
          }
        }).then(response => response.json()),
        fetch(`http://young-journey-22645.herokuapp.com/vital_records`, {
          headers: {
            'Accept': 'application/json'
          }
        }).then(response => response.json())
      ]))
    .then(([schedules, patients, vitals]) => {
      const sList = schedules.map(s => ({
        id: s.id,
        time: s.appointment_time,
        patient: findPatientById(s.patient_id, patients),
        vitals: findVitalsByPatientId(s.patient_id, vitals)
      }))
      dispatch(setSchedules(sList))
    })
    .catch(e => console.error(e))
  }
}