import { ADD_VITALS, SET_SCHEDULES } from '../actions/schedules'

const initialState = [
  {
    id: 1,
    time: 'today',
    patient: {
      id: 1,
      name: 'Andy'
    },
    vitals: [
      {
        timeMeasured: new Date(),
        height: 175,
        weight: 80
      }
    ]
  }
]

export default schedules = (state = [], action) => {
  switch(action.type) {
    case ADD_VITALS:
    const scheduleIndex = state.findIndex(s => s.id === action.scheduleId)
    const schedule = state[scheduleIndex]
    return state
    .filter(s => s.id !== action.scheduleId)
    .concat({
      ...schedule,
      vitals: schedule.vitals.concat(action.vitals)
    })
    case SET_SCHEDULES:
    return action.schedules
    default:
    return state
  }
}
