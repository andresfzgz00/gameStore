import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Container, Button } from 'react-bootstrap'

import axios from '../axios'
import * as actionTypes from '../store/actions'
import CartItem from '../components/CartItem'
import Alert from '../components/Alert'

const Cart = props => {
    const [cart, setCart] = useState([])

    useEffect(async () => {
        if (props.cart.length > 0) {
            const response = await axios.get('/games/' + props.cart.map(cartItem => cartItem.id))
            setCart(response.data.games.map((game, index) => {
                return {
                    ...game,
                    quantity: props.cart[index].quantity
                }
            }))
        } else {
            setCart([])
        }
    }, [props.cart])

    const deleteFromCartHandler = game => {
        props.deleteFromCart(game._id)
        props.showAlert(game.title + ' removed from cart successfully', 'success')
    }

    const completePurchaseHandler = async () => {
        try {
            const response = await axios.post('/order', { cart: props.cart }, {
                headers: {
                    Authorization: 'Bearer ' + props.token
                }
            })
            props.showAlert(response.data.message, 'success')
            props.history.push('/orders')
            props.clearCart()
        } catch (err) {
            props.showAlert(err.response.data, 'danger')
        }
    }

    let cartComponents = <h1>No cart items</h1>
    let totalAmount = 0
    if (cart.length > 0) {
        cartComponents = cart.map(game => {
            totalAmount += game.price * game.quantity
            return <CartItem game={game} deleteFromCartHandler={deleteFromCartHandler} />
        })
        cartComponents.push(
            <div className="d-flex align-items-end flex-column">
                <h4>Total: ${totalAmount}</h4>
                <Button variant="success" type="submit" onClick={completePurchaseHandler}>Proceed to purchase</Button>
            </div>
        )
    }

    return (
        <Container className="my-3">
            {cartComponents}
        </Container>
    )
}

const mapStateToProps = state => {
    return {
        cart: state.cart,
        token: state.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        deleteFromCart: id => dispatch({ type: actionTypes.DELETEFROMCART, payload: { newCartItemId: id } }),
        showAlert: (text, variant) => dispatch({ type: actionTypes.SHOWALERT, payload: { text: text, variant: variant } }),
        clearCart: () => dispatch({ type: actionTypes.CLEARCART })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)