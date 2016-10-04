import React, { Component, PropTypes } from 'react'
import { View, Image } from 'react-native'

class Avatar extends Component {
  static propTypes = {
    size: PropTypes.number
  }

  static defaultProps = {
    size: 80,
    source: require('../assets/images/guest.png')
  }

  render () {
    let { size, source } = this.props

    return (
      <View style={{overflow: 'hidden'}}>
        <Image
          style={{width: size, height: size, borderRadius: size/2}}
          source={source}/>
      </View>
    )
  }
}

export default Avatar;
