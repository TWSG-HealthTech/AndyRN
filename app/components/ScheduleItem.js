import React, { Component, PropTypes } from 'react'
import { StyleSheet, View, Text, TouchableNativeFeedback } from 'react-native'
import * as C from '../utils/colors'

class ScheduleItem extends Component {
  render () {
    let { schedule, onPress } = this.props
    return (
      <View style={styles.container}>
        <TouchableNativeFeedback onPress={() => onPress(schedule.id)}>
          <View style={styles.card}>
            <Text style={styles.patientName}>{schedule.patient.name}</Text>
          </View>
        </TouchableNativeFeedback>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10
  },
  card: {
    flex: 1,
    backgroundColor: C.TextPrimaryColor,
    borderRadius: 2,
    padding: 10
  },
  patientName: {
    fontSize: 20
  }
})

export default ScheduleItem;
