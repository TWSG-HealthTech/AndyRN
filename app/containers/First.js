import { connect } from 'react-redux'

import FirstScreen from '../components/First'
import { navigatePush } from '../actions/navigation'


const mapStateToProps = (state) => {
	return {	
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onButtonPress: () => {
			dispatch(navigatePush('Second'))
		}
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(FirstScreen)