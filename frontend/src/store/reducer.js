import * as actionTypes from './actions'

const initialState = {
    alert: {
        show: false,
        variant: '',
        text: ''
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
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