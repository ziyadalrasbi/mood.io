export const initialState = {
    initUser: {},
    loginUser: {},
    saveUserArtists: {},
    getUserDatabaseArtists: {},
    getPreviousRecommendations: {},
    getRecentMood: {}
}

export const dbReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'INIT_USER':
            return {
                ...state,
                initUser: action.initUser
            }
        case 'LOGIN_USER':
            return {
                ...state,
                loginUser: action.loginUser
            }
        case 'SAVE_USER_ARTISTS':
            return {
                ...state,
                saveUserArtists: action.saveUserArtists
            }
        case 'GET_USER_DATABASE_ARTISTS':
            return {
                ...state,
                getUserDatabaseArtists: action.getUserDatabaseArtists
            }
        case 'GET_PREVIOUS_RECOMMENDATIONS':
            return {
                ...state,
                getPreviousRecommendations: action.getPreviousRecommendations
            }
        case 'GET_RECENT_MOOD':
            return {
                ...state,
                getRecentMood: action.getRecentMood
            }
        default:
            return state
    }
}