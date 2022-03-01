const baseUrl = "https://mood-io-app.herokuapp.com";

export const requestAccessToken = (uri, code) => (dispatch, getState) => Promise.resolve().then(() => {
    const initialUri = { uri };
    const initialCode = { code };
    return fetch(`${baseUrl}/spotify/login/requestAccessToken`, {
        method: 'post',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            redirect: initialUri.uri,
            code: initialCode.code
        })
    })
        .then(res => res.json())
        .then(data => {
            return dispatch({ type: 'REQUEST_ACCESS_TOKEN', requestAccessToken: data });
        })
})

export const refreshAccessToken = (token, refreshToken) => (dispatch, getState) => Promise.resolve().then(() => {
    const initialAccessToken = { token };
    const initialRefreshToken = { refreshToken };
    return fetch(`${baseUrl}/spotify/login/refreshAccessToken`, {
        method: 'post',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            accessToken: initialAccessToken.token,
            refreshToken: initialRefreshToken.refreshToken
        })
    })
        .then(res => res.json())
        .then(data => {
            if (data.token != null) {
                return dispatch({ type: 'REFRESH_ACCESS_TOKEN', refreshAccessToken: data.token });
            } else {
                return dispatch({ type: 'REFRESH_ACCESS_TOKEN', refreshAccessToken: null });
            }
        })
})

export const getUserId = (token) => (dispatch, getState) => Promise.resolve().then(() => {
    const initialToken = { token };
    return fetch(`${baseUrl}/spotify/login/getUserId`, {
        method: 'post',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            token: initialToken.token
        })
    })
        .then(res => res.json())
        .then(data => {
            return dispatch({ type: 'GET_USER_ID', getUserId: data.id });
        })
})

export const getTopArtistsLogin = (token) => (dispatch, getState) => Promise.resolve().then(() => {
    console.log(getState());
    const initialToken = { token };
    return fetch(`${baseUrl}/spotify/login/getUserTopArtists`, {
        method: 'post',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            token: initialToken.token
        })
    })
        .then((res) => res.json())
        .then(data => {
            if (Object.keys(data.topArtists).length > 0) {
                return dispatch({ type: 'GET_TOP_ARTISTS_LOGIN', getTopArtistsLogin: data.topArtists });
            } else {
                return dispatch({ type: 'GET_TOP_ARTISTS_LOGIN', getTopArtistsLogin: null });
            }
        })
})

export const getTopArtistsHome = (token) => (dispatch, getState) => Promise.resolve().then(() => {
    const initialToken = { token };
    return fetch(`${baseUrl}/spotify/home/getTopArtists`, {
        method: 'post',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            token: initialToken.token
        })
    })
        .then(res => res.json())
        .then(data => {
            return dispatch({ type: 'GET_TOP_ARTISTS_HOME', getTopArtistsHome: data.artistNames });
        })
})

export const getName = (token) => (dispatch, getState) => Promise.resolve().then(() => {
    const initialToken = { token };
    return fetch(`${baseUrl}/spotify/home/getName`, {
        method: 'post',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            token: initialToken.token
        })
    })
        .then(res => res.json())
        .then(data => {
            return dispatch({ type: 'GET_NAME', getName: data.name });
        })
})

export const getTopTracksHome = (token) => (dispatch, getState) => Promise.resolve().then(() => {
    const initialToken = { token };
    return fetch(`${baseUrl}/spotify/home/getTopTracks`, {
        method: 'post',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            token: initialToken.token
        })
    })
        .then(res => res.json())
        .then(data => {
            return dispatch({ type: 'GET_TOP_TRACKS_HOME', getTopTracksHome: data });
        })
})

export const getListeningHabits = (token, trackIds, length) => (dispatch, getState) => Promise.resolve().then(() => {
    const initialToken = { token };
    const initialTrackIds = { trackIds };
    const initalLength = { length };
    return fetch(`${baseUrl}/spotify/home/getListeningHabits`, {
        method: 'post',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            token: initialToken.token,
            tracks: initialTrackIds.trackIds,
            length: initalLength.length
        })
    })
        .then(res => res.json())
        .then(data => {
            console.log(data.habits);
            return dispatch({ type: 'GET_LISTENING_HABITS', getListeningHabits: data.habits });
        })
})


export const getUserProfile = (token) => (dispatch, getState) => Promise.resolve().then(() => {
    const initialToken = { token };
    return fetch(`${baseUrl}/spotify/stats/getProfile`, {
        method: 'post',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            token: initialToken.token
        })
    })
        .then(res => res.json())
        .then(data => {
            return dispatch({ type: 'GET_USER_PROFILE', getUserProfile: data });
        })
})

export const getTopArtistsStats = (token, range) => (dispatch, getState) => Promise.resolve().then(() => {
    const initialToken = { token };
    const initialRange = { range };
    return fetch(`${baseUrl}/spotify/stats/getTopArtists`, {
        method: 'post',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            token: initialToken.token,
            range: initialRange.range
        })
    })
        .then(res => res.json())
        .then(data => {
            return dispatch({ type: 'GET_TOP_ARTISTS_STATS', getTopArtistsStats: data.artistNames });
        })
})

export const getTopTracksStats = (token, range) => (dispatch, getState) => Promise.resolve().then(() => {
    const initialToken = { token };
    const initialRange = { range };
    return fetch(`${baseUrl}/spotify/stats/getTopTracks`, {
        method: 'post',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            token: initialToken.token,
            range: initialRange.range
        })
    })
        .then(res => res.json())
        .then(data => {
            return dispatch({ type: 'GET_TOP_TRACKS_STATS', getTopTracksStats: data.topTracks });
        })
})

export const createLibrary = (token, artists, features) => (dispatch, getState) => Promise.resolve().then(() => {
    const initialToken = { token };
    const initialArtists = { artists };
    const initialFeatures = { features };
    return fetch(`${baseUrl}/spotify/results/createLibrary`, {
        method: 'post',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            token: initialToken.token,
            artists: initialArtists.artists,
            features: initialFeatures.features
        })
    })
        .then(res => res.json())
        .then((data) => {
            return dispatch({ type: 'CREATE_LIBRARY', createLibrary: data.trackIds });
        })
})

export const getRecommendations = (token, tracks, features) => (dispatch, getState) => Promise.resolve().then(() => {
    const initialToken = { token };
    const initialTracks = { tracks };
    const initialFeatures = { features };
    return fetch(`${baseUrl}/spotify/results/getRecommendations`, {
        method: 'post',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            token: initialToken.token,
            tracks: initialTracks.tracks,
            features: initialFeatures.features
        })
    })
        .then(res => res.json())
        .then((data) => {
            return dispatch({ type: 'GET_RECOMMENDATIONS', getRecommendations: data });
        })
})

export const createPlaylist = (token, name, description) => (dispatch, getState) => Promise.resolve().then(() => {
    const initialToken = { token };
    const initialName = { name };
    const initialDescription = { description };
    return fetch(`${baseUrl}/spotify/results/createPlaylist`, {
        method: 'post',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            token: initialToken.token,
            name: initialName.name,
            description: initialDescription.description
        })
    })
        .then(res => res.json())
        .then((data) => {
            return dispatch({ type: 'CREATE_PLAYLIST', createPlaylist: data.playlist });
        })
})

export const addTracksToPlaylist = (token, id, uris) => (dispatch, getState) => Promise.resolve().then(() => {
    const initialToken = { token };
    const initialId = { id };
    const initialUris = { uris };
    return fetch(`${baseUrl}/spotify/results/addTracksToPlaylist`, {
        method: 'post',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            token: initialToken.token,
            id: initialId.id,
            uris: initialUris.uris
        })
    })
        .then(res => res.json())
        .then((data) => {
            return dispatch({ type: 'ADD_TRACKS_TO_PLAYLIST', addTracksToPlaylist: data });
        })
})

export const searchForArtists = (token, artist) => (dispatch, getState) => Promise.resolve().then(() => {
    const initialToken = { token };
    const initialArtist = { artist };
    return fetch(`${baseUrl}/spotify/home/searchForArtists`, {
        method: 'post',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            token: initialToken.token,
            search: initialArtist.artist
        })
    })
        .then(res => res.json())
        .then(data => {
            return dispatch({ type: 'SEARCH_FOR_ARTISTS', searchForArtists: data.artists });
        })
})

export const spotifySignOut = () => (dispatch, getState) => Promise.resolve().then(() => {
    return dispatch({ type: 'SIGN_OUT' });
})

