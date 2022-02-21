export const initialState = {
    requestAccessToken: {},
    refreshAccessToken: {},
    getUserId: {},
    getTopArtistsLogin: {},
    getTopArtistsHome: {},
    getName: {},
    getTopTracksHome: {},
    getUserProfile: {},
    getTopArtistsStats: {},
    getTopTracksStats: {}
}

export const spotifyReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'REQUEST_ACCESS_TOKEN':
            return {
                ...state,
                requestAccessToken: action.requestAccessToken
            }
        case 'REFRESH_ACCESS_TOKEN':
            return {
                ...state,
                refreshAccessToken: action.refreshAccessToken
            }
        case 'GET_USER_ID':
            return {
                ...state,
                getUserId: action.getUserId
            }
        case 'GET_TOP_ARTISTS_LOGIN':
            return {
                ...state,
                getTopArtistsLogin: action.getTopArtistsLogin
            }
        case 'GET_TOP_ARTISTS_HOME':
            return {
                ...state,
                getTopArtistsHome: action.getTopArtistsHome
            }
        case 'GET_NAME':
            return {
                ...state,
                getName: action.getName
            }
        case 'GET_TOP_TRACKS_HOME':
            return {
                ...state,
                getTopTracksHome: action.getTopTracksHome
            }
        case 'GET_USER_PROFILE':
            return {
                ...state,
                getUserProfile: action.getUserProfile
            }
        case 'GET_TOP_ARTISTS_STATS':
            return {
                ...state,
                getTopArtistsStats: action.getTopArtistsStats
            }
        case 'GET_TOP_TRACKS_STATS':
            return {
                ...state,
                getTopTracksStats: action.getTopTracksStats
            }
        default:
            return state
    }
}