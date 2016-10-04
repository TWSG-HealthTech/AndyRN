import { SET_NURSE } from '../actions/nurse'

const initialState = {
  name: 'Chansey'
}

export default user = (state = null, action) => {
    switch(action.type) {
      case SET_NURSE:
      return action.nurse
        default:
        return state
    }
}
