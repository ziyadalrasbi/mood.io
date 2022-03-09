export const initialState = {
    initUser: {},
    loginUser: {},
    isLoggedIn: false,
    signOut: {},
    deleteUser: {},
    saveUserArtists: {},
    newUser: true,
    getUserDatabaseArtists: {},
    getPreviousRecommendations: {},
    getMoodCount: {},
    getRecentMood: {},
    saveRecentMood: {},
    incrementMoodCount: {},
    saveUserRating: {},
    getPlaylistsAmount: {},
    incrementPlaylistsAmount: {},
    saveRecommendations: {},
    setPlaylisted: {}
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
                loginUser: action.loginUser,
                isLoggedIn: true
            }
        case 'SIGN_OUT':
            return initialState;
        case 'DELETE_USER':
            return initialState;
        case 'SAVE_USER_ARTISTS':
            return {
                ...state,
                saveUserArtists: action.saveUserArtists,
                newUser: false
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
        case 'GET_MOOD_COUNT':
            return {
                ...state,
                getMoodCount: action.getMoodCount
            }
        case 'GET_RECENT_MOOD':
            return {
                ...state,
                getRecentMood: action.getRecentMood
            }
        case 'SAVE_RECENT_MOOD':
            return {
                ...state,
                saveRecentMood: action.saveRecentMood
            }
        case 'INCREMENT_MOOD_COUNT':
            return {
                ...state,
                incrementMoodCount: action.incrementMoodCount
            }
        case 'SAVE_USER_RATING':
            return {
                ...state,
                saveUserRating: action.saveUserRating
            }
        case 'GET_PLAYLISTS_AMOUNT':
            return {
                ...state,
                getPlaylistsAmount: action.getPlaylistsAmount
            }
        case 'INCREMENT_PLAYLISTS_AMOUNT':
            return {
                ...state,
                incrementPlaylistsAmount: action.incrementPlaylistsAmount
            }
        case 'SAVE_RECOMMENDATIONS':
            return {
                ...state,
                saveRecommendations: action.saveRecommendations
            }
        case 'SET_PLAYLISTED':
            return {
                ...state,
                setPlaylisted: action.setPlaylisted
            }
        default:
            return state
    }
}