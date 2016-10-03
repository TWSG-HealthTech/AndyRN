import { connect } from 'react-redux'

import SecondScreen from '../components/Second'
import { navigatePush } from '../actions/navigation'


const mapStateToProps = (state) => {
	return {
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onButtonPress: () => {
			dispatch(navigatePush('Third'))
		},
		onModalButtonPress: () => {
			dispatch(navigatePush('Modal'))
		}
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SecondScreen)