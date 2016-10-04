import { combineReducers } from 'redux'
import nurse from './nurse'
import navigation from './navigation'
import schedules from './schedules'
import login from './login'

export default combineReducers({
  navigation,
  nurse,
  schedules,
  login
});
