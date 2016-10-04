import React, { Component } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, View, Text, TouchableNativeFeedback, TextInput } from 'react-native'
import { navigatePop } from '../actions/navigation'
import { addVitals } from '../actions/schedules'
import * as C from '../utils/colors'

class NewVitals extends Component {
  constructor(props) {
    super(props)
    this.state = {
      height: 0,
      weight: 0,
      temperature: 0,
      pulse: 0,
      bpHigh: 0,
      bpLow: 0
    }
  }

  render () {
    let { scheduleId, saveVitals } = this.props
    let { height, weight, temperature, pulse, bpHigh, bpLow } = this.state
    return (
      <View style={styles.container}>
        <TouchableNativeFeedback onPress={() => saveVitals(scheduleId, {...this.state, timeMeasured: new Date()})}>
          <View style={styles.button}>
            <Text style={styles.label}>SAVE</Text>
          </View>
        </TouchableNativeFeedback>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Height:</Text>
          <TextInput
            style={styles.inputText}
            onChangeText={(text) => this.setState({...this.state, height: text})}
            value={''+height}/>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Weight:</Text>
          <TextInput
            style={styles.inputText}
            onChangeText={(text) => this.setState({...this.state, weight: text})}
            value={''+weight}/>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Temperature:</Text>
          <TextInput
            style={styles.inputText}
            onChangeText={(text) => this.setState({...this.state, temperature: text})}
            value={''+temperature}/>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Pulse:</Text>
          <TextInput
            style={styles.inputText}
            onChangeText={(text) => this.setState({...this.state, pulse: text})}
            value={''+pulse}/>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Blood Pressure:</Text>
          <TextInput
            style={styles.inputText}
            onChangeText={(text) => this.setState({...this.state, bpHigh: text})}
            value={''+bpHigh}/>
          <Text style={styles.inputLabel}> / </Text>
            <TextInput
              style={styles.inputText}
              onChangeText={(text) => this.setState({...this.state, bpLow: text})}
              value={''+bpLow}/>
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
  button: {
    marginTop: 20,
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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  inputLabel: {
    fontSize: 20
  },
  inputText: {
    width: 100,
    fontSize: 20,
    justifyContent: 'center'
  }
})

const mapStateToProps = (state, ownProps) => {
  return {
    scheduleId: ownProps.id
  }
}

const mapDispatchToProps = (dispatch) => {
    return {
      saveVitals: (scheduleId, vitals) => {
        dispatch(addVitals(scheduleId, vitals))
        dispatch(navigatePop())
      }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewVitals);
