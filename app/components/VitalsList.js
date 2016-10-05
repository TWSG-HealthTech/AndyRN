import React, { Component } from 'react'
import { StyleSheet, ListView, View, Text } from 'react-native'
import VitalsItem from './VitalsItem'

class VitalsList extends Component {
  constructor(props) {
    super(props)
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.state = {
      dataSource: ds.cloneWithRows(props.vitals)
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(nextProps.vitals)
    })
  }

  render () {
    return (
      <ListView
        enableEmptySections={true}
        dataSource={this.state.dataSource}
        renderRow={(rowData) => <VitalsItem vital={rowData}/>}
      />
    )
  }
}

export default VitalsList;
