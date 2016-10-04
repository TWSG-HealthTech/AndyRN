import { REQ_SYNC, DONE_SYNC } from '../actions/schedules'

const initialState = {
  inSync: false
}

export default app = (state=initialState, action) => {
  switch (action.type) {
    case REQ_SYNC:
      return {
        ...state,
        inSync: true
      }
    case DONE_SYNC:
      return {
        ...state,
        inSync: false
      }
    default:
      return state
  }
}
