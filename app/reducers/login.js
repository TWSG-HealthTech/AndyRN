import { REQ_LOGIN, DONE_LOGIN, ERROR_LOGIN } from '../actions/nurse'

const initialState = {
  inProgress: false
}

export default user = (state = initialState, action) => {
    switch(action.type) {
      case REQ_LOGIN:
      return {
        ...state,
        inProgress: true,
        error: null
      }
      case DONE_LOGIN:
      return {
        ...state,
        inProgress: false
      }
      case ERROR_LOGIN:
      return {
        ...state,
        inProgress: false,
        error: action.error
      }
        default:
        return state
    }
}
