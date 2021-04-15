import React from 'react'
import { Alert } from 'react-bootstrap'
import { connect } from 'react-redux'

import * as actionTypes from '../store/actions'

const alert = props => {
    return (
        <Alert variant={props.variant} className="text-center" onClose={setTimeout(() => { props.hideAlert() }, 3000)}>
            {props.text}
        </Alert>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        hideAlert: () => dispatch({ type: actionTypes.HIDEALERT })
    }
}
export default connect(null, mapDispatchToProps)(alert)