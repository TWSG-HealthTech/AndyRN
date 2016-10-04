import React , { Component } from 'react'
import { BackAndroid } from 'react-native'
import { Provider } from 'react-redux'
import App from './containers/App'
import AppContainer from './containers/AppContainer'
import configureStore from './store/configureStore'

import { navigatePop } from './actions/navigation'

const store = configureStore()

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
