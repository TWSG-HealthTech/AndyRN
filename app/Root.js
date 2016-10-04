import React , { Component } from 'react'
import { BackAndroid } from 'react-native'
import { Provider } from 'react-redux'
import App from './containers/App'
import AppContainer from './containers/AppContainer'
import configureStore from './store/configureStore'

import { navigatePop } from './actions/navigation'
import { loadNurse } from './actions/nurse'
import { loadSchedules } from './actions/schedules'

const store = configureStore()

store.dispatch(loadNurse())
store.dispatch(loadSchedules())

BackAndroid.addEventListener('hardwareBackPress', () => {
    store.dispatch(navigatePop())
    return true
})

export default class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}
