export const initialState = {
    detectFace: {}
}

export const detectReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'DETECT_FACE':
            return {
                ...state,
                detectFace: action.detectFace
            }
        default:
            return state
    }
}