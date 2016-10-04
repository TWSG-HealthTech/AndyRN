import React, { Component, PropTypes } from 'react'
import { StyleSheet, ListView, View, Text } from 'react-native'
import ScheduleItem from './ScheduleItem'

class ScheduleList extends Component {
  static propTypes = {
    schedules: PropTypes.array.isRequired,
    showSchedule: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.state = {
      dataSource: ds.cloneWithRows(props.schedules)
    }
  }

  componentWillReceiveProps(nextProps) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(nextProps.schedules)
      })
  }

  render () {
    return this.props.schedules.length > 0 ? this._renderScheduleView() : this._renderFreeView()
  }

  _renderScheduleView() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Your Schedule of Today</Text>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) => <ScheduleItem schedule={rowData} onPress={this.props.showSchedule}/>}
        />
      </View>
    )
  }

  _renderFreeView() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Looks like you are free today</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 10
  },
  title: {
    fontSize: 30,
    marginBottom: 10
  },
})

export default ScheduleList;
