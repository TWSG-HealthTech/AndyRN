import React, { Component } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, View, Text, TouchableNativeFeedback } from 'react-native'
import { navigatePop, navigatePush } from '../actions/navigation'
import VitalsList from '../components/VitalsList'
import * as C from '../utils/colors'

class Schedule extends Component {
  render () {
    let { schedule, addVitals } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.patientInfo}>
          <Text style={styles.title}>{schedule.patient.name}</Text>
          <Text style={styles.subtitle}>Scheduled Time: {schedule.time}</Text>
        </View>
        <View>
          <TouchableNativeFeedback onPress={() => addVitals(schedule.id)}>
            <View style={styles.button}>
              <Text style={styles.label}>ADD VITALS</Text>
            </View>
          </TouchableNativeFeedback>
          <View style={styles.vitalsView}>
            <VitalsList patientId={schedule.patient.id} vitals={schedule.vitals}/>
          </View>
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
  patientInfo: {
    marginTop: 40,
    marginBottom: 20
  },
  title: {
    fontSize: 40,
    marginBottom: 10
  },
  subtitle: {
    fontSize: 30
  },
  button: {
    width: 150,
    alignItems: 'center',
    backgroundColor: C.AccentColor,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 4
  },
  label: {
    fontSize: 20,
    color: C.TextPrimaryColor
  },
  vitalsView: {
    marginTop: 10
  }
})

const mapStateToProps = (state, ownProps) => {
  return {
    schedule: state.schedules.find(s => s.id === ownProps.id)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addVitals: (scheduleId) => { dispatch(navigatePush({key: 'NewVitals', title: 'New Vitals', scheduleId})) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Schedule);
