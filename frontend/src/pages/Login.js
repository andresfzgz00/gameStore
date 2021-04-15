import React, { useState } from 'react'
import { connect } from 'react-redux'

import axios from '../axios'
import LoginForm from '../components/LoginForm'
import * as actionTypes from '../store/actions'
import Alert from '../components/Alert'

const Login = props => {

    const [form, setForm] = useState({ username: null, password: null })

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const loginHandler = async event => {
        try {
            event.preventDefault()
            const response = await axios.post('/auth/login', form)
            props.onLogin(response.data.token)
            props.showAlert(response.data.message, 'success')
            props.history.push('/games')
        } catch (err) {
            props.showAlert(err.response.data, 'danger')
        }
    }

    return (
        <LoginForm onLogin={loginHandler} onChange={changeHandler} />
    )
}

const mapDispatchToProps = dispatch => {
    return {
        onLogin: (token) => dispatch({ type: actionTypes.LOGIN, payload: { token: token } }),
        showAlert: (text, variant) => dispatch({ type: actionTypes.SHOWALERT, payload: { text: text, variant: variant } })
    }
}

export default connect(null, mapDispatchToProps)(Login)