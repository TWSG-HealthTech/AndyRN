import { connect } from 'react-redux'

import ModalScreen from '../components/Modal'
import { navigatePop } from '../actions/navigation'


const mapStateToProps = (state) => {
	return {	
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onButtonPress: () => {
			dispatch(navigatePop())
		}
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ModalScreen)