import React, { Component } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import * as C from '../utils/colors'

class VitalsItem extends Component {
  render () {
    let { timeMeasured, height, weight, temperature, pulse, bpHigh, bpLow, local } = this.props.vital
    return (
      <View style={styles.container}>
        <Text style={styles.time}>
          Vitals measured at {timeMeasured.toLocaleString()}
        </Text>
        <Text style={styles.obs}>
          H:{height}, W:{weight}, T:{temperature}, P:{pulse}, BP:{bpHigh}/{bpLow}
        </Text>
        {local ? <Text>New</Text> : null}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderColor: C.DividerColor,
    paddingVertical: 10
  },
  time: {
    fontSize: 25,
  },
  obs: {
    fontSize: 20
  }
})

export default VitalsItem;
