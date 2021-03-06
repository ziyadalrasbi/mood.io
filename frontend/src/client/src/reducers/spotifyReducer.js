export const initialState = {
    requestAccessToken: {},
    refreshAccessToken: {},
    getUserId: {},
    getTopArtistsLogin: {},
    getTopArtistsHome: {},
    getName: {},
    getTopTracksHome: {},
    getListeningHabitsHome: {},
    getUserProfile: {},
    getTopArtistsStats: {},
    getTopTracksStats: {},
    createLibrary: {},
    createPlaylist: {},
    addTracksToPlaylist: {},
    searchForArtists: {},
    getListeningHabits: {}
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
        case 'GET_LISTENING_HABITS_HOME':
            return {
                ...state,
                getListeningHabitsHome: action.getListeningHabitsHome
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
        case 'CREATE_LIBRARY':
            return {
                ...state,
                createLibrary: action.createLibrary
            }
        case 'CREATE_PLAYLIST':
            return {
                ...state,
                createPlaylist: action.createPlaylist
            }
        case 'ADD_TRACKS_TO_PLAYLIST':
            return {
                ...state,
                addTracksToPlaylist: action.addTracksToPlaylist
            }
        case 'SEARCH_FOR_ARTISTS':
            return {
                ...state,
                searchForArtists: action.searchForArtists
            }
        case 'GET_LISTENING_HABITS':
            return {
                ...state,
                getListeningHabits: action.getListeningHabits
            }
        case 'SIGN_OUT':
            return initialState;
        default:
            return state
    }
}