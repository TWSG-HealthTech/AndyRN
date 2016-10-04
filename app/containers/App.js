import React, {Component} from 'react'
import { connect } from 'react-redux';
import { StyleSheet, View, Text, NavigationExperimental } from 'react-native'
import { navigatePop } from '../actions/navigation.js'
import Home from './Home'
import Login from './Login'
import Schedule from './Schedule'
import NewVitals from './NewVitals'

const {
  CardStack: NavigationCardStack,
  Header: NavigationHeader
} = NavigationExperimental

class App extends Component {
  render() {
    let { navigationState, backAction } = this.props

    return (
      <NavigationCardStack
        style={styles.container}
        direction={navigationState.routes[navigationState.index].key === 'Login' ? 'vertical' : 'horizontal'}
        navigationState={navigationState}
        onNavigateBack={backAction}
        renderScene={this._renderScene}
      />
    )
  }

  _renderScene({scene}) {
    let { route } = scene
    switch(route.key) {
      case 'Home':
      return <Home/>
      case 'Login':
      return <Login/>
      case 'Schedule':
      return <Schedule id={route.scheduleId} />
      case 'NewVitals':
      return <NewVitals id={route.scheduleId} />
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

const mapStateToProps = (state) => {
  return {
    navigationState: state.navigation
  }
}

const mapDispatchTpProps = (dispatch) => {
  return {
    backAction: () => { dispatch(navigatePop()) }
  }
}

export default connect(mapStateToProps, mapDispatchTpProps)(App)
