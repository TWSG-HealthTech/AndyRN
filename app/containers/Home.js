import React, { Component } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, View, Text, TouchableNativeFeedback, Image } from 'react-native'
import { MKSpinner } from 'react-native-material-kit'
import Avatar from '../components/Avatar'
import ScheduleList from '../components/ScheduleList'
import { navigatePush } from '../actions/navigation'
import { logout } from '../actions/nurse'
import { syncSchedule } from '../actions/schedules'
import * as C from '../utils/colors'

class Home extends Component {
  render () {
    let { nurse, schedules, inSync, showSchedule, login, sync, logout } = this.props
    return (
      <View style={styles.container}>
        <View style={styles.nurseContainer}>
          <Avatar />
          <Text style={styles.nurseName}>{nurse ? nurse.name : 'Guest'}</Text>
          <View style={styles.buttonContainer}>
            {nurse ?
              <TouchableNativeFeedback onPress={logout}>
                <View style={[styles.button, {backgroundColor: 'red', marginRight: 10}]}>
                  <Text style={styles.label}>LOGOUT</Text>
                </View>
              </TouchableNativeFeedback> :
              null
            }
            {inSync ?
              <MKSpinner /> :
                <TouchableNativeFeedback onPress={nurse ? sync : login}>
                  <View style={styles.button}>
                    <Text style={styles.label}>{nurse ? 'SYNC' : 'LOGIN'}</Text>
                  </View>
                </TouchableNativeFeedback>
            }
          </View>
        </View>
        <View>
          <ScheduleList schedules={schedules} showSchedule={showSchedule}/>
        </View>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 20,
    marginRight: 20
  },
  nurseContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 20
  },
  nurseName: {
    marginLeft: 20,
    fontSize: 40
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  button: {
    backgroundColor: C.AccentColor,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 4
  },
  label: {
    fontSize: 20,
    color: C.TextPrimaryColor
  }
})

const mapStateToProps = (state) => {
  return {
    nurse: state.nurse,
    schedules: state.schedules,
    inSync: state.app.inSync
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    showSchedule: (id) => { dispatch(navigatePush({key: 'Schedule', title: 'Schedule', scheduleId: id})) },
    login: () => { dispatch(navigatePush({key: 'Login', title: 'Login'})) },
    sync: () => { dispatch(syncSchedule()) },
    logout: () => { dispatch(logout()) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
