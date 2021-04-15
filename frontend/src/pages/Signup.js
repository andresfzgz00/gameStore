import React, { Component, useState } from 'react'
import { connect } from 'react-redux'

import * as actionTypes from '../store/actions'
import axios from '../axios'
import SignupForm from '../components/SignupForm'

const Signup = props => {

    const [form, setForm] = useState({
        username: null,
        email: null,
        password: null,
        name: null,
        lastName: null,
        confirmPassword: null,
        type: null
    })

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const signupHandler = async event => {
        event.preventDefault()
        try {
            const response = await axios.post('/auth/signup', form)
            props.onLogin(response.data.token)
            props.showAlert(response.data.message, 'success')
            props.history.push('/')
        } catch (err) {
            props.showAlert(err.response.data, 'danger')
        }
    }

    return (
        <SignupForm onSignup={signupHandler} onChange={changeHandler} />
    )
}

const mapDispatchToProps = dispatch => {
    return {
        onLogin: (token) => dispatch({ type: actionTypes.LOGIN, payload: { token: token } }),
        showAlert: (text, variant) => dispatch({ type: actionTypes.SHOWALERT, payload: { text: text, variant: variant } })
    }
}

export default connect(null, mapDispatchToProps)(Signup)