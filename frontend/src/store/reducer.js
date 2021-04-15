import * as actionTypes from './actions'

const initialState = {
    loggedIn: false,
    token: null,
    cart: [],
    alert: {
        show: false,
        variant: '',
        text: ''
    }

}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOGIN:
            return {
                ...state,
                loggedIn: true,
                token: action.payload.token
            }
        case actionTypes.LOGOUT:
            return {
                ...state,
                loggedIn: false,
                token: null
            }
        case actionTypes.ADDTOCART:
            let newCart = [...state.cart]
            let found = false
            newCart = newCart.map(cartItem => {
                if (cartItem.id === action.payload.newCartItemId) {
                    found = true
                    return {
                        ...cartItem,
                        quantity: cartItem.quantity + 1
                    }
                }
                return cartItem
            })
            return {
                ...state,
                cart: !found ? newCart.concat({ id: action.payload.newCartItemId, quantity: 1 }) : newCart
            }
        case actionTypes.DELETEFROMCART:
            return {
                ...state,
                cart: state.cart.filter(cartItem => cartItem.id !== action.payload.newCartItemId)
            }
        case actionTypes.CLEARCART:
            return {
                ...state,
                cart: []
            }
        case actionTypes.SHOWALERT:
            return {
                ...state,
                alert: {
                    ...action.payload,
                    show: true
                }
            }
        case actionTypes.HIDEALERT:
            return {
                ...state,
                alert: {
                    show: false,
                    variant: '',
                    text: ''
                }
            }

        default:
            return state
    }
}

export default reducer