import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, View, Text, TouchableNativeFeedback, TextInput } from 'react-native'
import { MKButton, MKTextField } from 'react-native-material-kit'
import { login } from '../actions/nurse'

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    }
  }

  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.label}>
          Email
        </Text>
        <TextInput
          onChangeText={(text) => this.setState({...this.state, email: text})}
          value={this.state.email}
        />
        <Text style={styles.label}>
          Password
        </Text>
        <TextInput
          onChangeText={(text) => this.setState({...this.state, password: text})}
          value={this.state.password}
        />
      <TouchableNativeFeedback onPress={() => this.props.login(this.state.email, this.state.password)}>
          <View>
            <Text>
              Login
            </Text>
          </View>
        </TouchableNativeFeedback>
        {this.props.inProgress ? <Text>In Progress</Text> : null}
        <Text>{this.props.error}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 200,
    marginTop: 100
  },
  label: {
    fontSize: 20,
    marginTop: 50
  }
})

const mapStateToProps = (state) => {
  return {
    ...state.login
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (email, password) => { dispatch(login(email, password))}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
