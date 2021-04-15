import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Container } from 'react-bootstrap'

import axios from '../axios'
import CartItem from '../components/CartItem'
import * as actionTypes from '../store/actions'

const Orders = props => {
    const [orders, setOrders] = useState([])

    useEffect(async () => {
        try {
            const response = await axios.get('/orders/', {
                headers: {
                    Authorization: 'Bearer ' + props.token
                }
            })
            setOrders(response.data.orders)
        } catch (err) {
            props.showAlert(err.response.data, 'danger')
        }
    }, [])

    const orderItems = orders.map(orderItem => {
        return (
            <CartItem order={orderItem} />
        )
    })

    return (
        <Container className="my-3">
            {orderItems}
        </Container>
    )
}

const mapStateToProps = state => {
    return {
        token: state.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        showAlert: (text, variant) => dispatch({ type: actionTypes.SHOWALERT, payload: { text: text, variant: variant } })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders)