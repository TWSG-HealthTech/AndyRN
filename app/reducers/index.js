import { combineReducers } from 'redux'
import nurse from './nurse'
import navigation from './navigation'
import schedules from './schedules'
import login from './login'
import app from './app'

export default combineReducers({
  navigation,
  nurse,
  schedules,
  login,
  app
});
