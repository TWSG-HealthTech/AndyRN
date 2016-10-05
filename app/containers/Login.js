import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, View, Text, TouchableNativeFeedback, TextInput } from 'react-native'
import { MKButton, MKColor, MKSpinner } from 'react-native-material-kit'
import { login } from '../actions/nurse'
import * as C from '../utils/colors'

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
        <View style={styles.field}>
          <Text style={styles.label}>
            Email
          </Text>
          <TextInput
            style={styles.input}
            editable={!this.props.inProgress}
            onChangeText={(text) => this.setState({...this.state, email: text})}
            value={this.state.email}
            returnKeyType="next"
          />
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>
            Password
          </Text>
          <TextInput
            style={styles.input}
            editable={!this.props.inProgress}
            secureTextEntry={true}
            onChangeText={(text) => this.setState({...this.state, password: text})}
            value={this.state.password}
            returnKeyType="done"
          />
        </View>
        {this.props.error ?
          <Text style={styles.error}>{this.props.error}</Text> :
          null
        }

        {this.props.inProgress ?
          <MKSpinner style={styles.progress}/> :
            <MKButton
              enabled={!!this.state.email && !!this.state.password}
              style={{marginTop: 20}}
              backgroundColor={C.AccentColor}
              shadowRadius={2}
              shadowOffset={{width:0, height:2}}
              shadowOpacity={.7}
              shadowColor="black"
              onPress={() => this.props.login(this.state.email, this.state.password)}
              >
              <Text
                pointerEvents="none"
                style={{color: 'white', fontWeight: 'bold', fontSize: 20, margin: 20}}>
                LOGIN
              </Text>
            </MKButton>
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  field: {
    width: 500
  },
  label: {
    fontSize: 20,
    marginTop: 50
  },
  input: {
    fontSize: 20
  },
  button: {
    flex: 1,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: C.AccentColor,
    paddingHorizontal: 20,
    borderRadius: 4
  },
  error: {
    color: '#FF0000',
    fontWeight: 'bold',
    fontSize: 20
  },
  progress: {
    marginTop: 20,
    width: 50,
    height: 50
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
