const baseUrl = "https://mood-io-app.herokuapp.com";

export const requestAccessToken = (uri, code, signal) => (dispatch, getState) => Promise.resolve().then(() => {
    const initialUri = { uri };
    const initialCode = { code };
    return fetch(`${baseUrl}/spotify/login/requestAccessToken`, {
        signal: signal,
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

export const refreshAccessToken = (token, refreshToken, signal) => (dispatch, getState) => Promise.resolve().then(() => {
    const initialAccessToken = { token };
    const initialRefreshToken = { refreshToken };
    return fetch(`${baseUrl}/spotify/login/refreshAccessToken`, {
        signal: signal,
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

export const getUserId = (token, signal) => (dispatch, getState) => Promise.resolve().then(() => {
    const initialToken = { token };
    return fetch(`${baseUrl}/spotify/login/getUserId`, {
        signal: signal,
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

export const getTopArtistsLogin = (token, signal) => (dispatch, getState) => Promise.resolve().then(() => {
    const initialToken = { token };
    return fetch(`${baseUrl}/spotify/login/getUserTopArtists`, {
        signal: signal,
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

export const getTopArtistsHome = (token, signal) => (dispatch, getState) => Promise.resolve().then(() => {
    const initialToken = { token };
    return fetch(`${baseUrl}/spotify/home/getTopArtists`, {
        signal: signal,
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

export const getName = (token, signal) => (dispatch, getState) => Promise.resolve().then(() => {
    const initialToken = { token };
    return fetch(`${baseUrl}/spotify/home/getName`, {
        signal: signal,
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

export const getTopTracksHome = (token, signal) => (dispatch, getState) => Promise.resolve().then(() => {
    const initialToken = { token };
    return fetch(`${baseUrl}/spotify/home/getTopTracks`, {
        signal: signal,
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

export const getListeningHabits = (token, trackIds, amount, signal) => (dispatch, getState) => Promise.resolve().then(() => {
    const initialToken = { token };
    const initialTrackIds = { trackIds };
    const initialAmount = { amount };
    return fetch(`${baseUrl}/spotify/home/getListeningHabits`, {
        signal: signal,
        method: 'post',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            token: initialToken.token,
            tracks: initialTrackIds.trackIds,
            amount: initialAmount.amount
        })
    })
        .then(res => res.json())
        .then(data => {
            return dispatch({ type: 'GET_LISTENING_HABITS', getListeningHabits: data.habits });
        })
})


export const getUserProfile = (token, signal) => (dispatch, getState) => Promise.resolve().then(() => {
    const initialToken = { token };
    return fetch(`${baseUrl}/spotify/stats/getProfile`, {
        signal: signal,
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

export const getTopArtistsStats = (token, range, signal) => (dispatch, getState) => Promise.resolve().then(() => {
    const initialToken = { token };
    const initialRange = { range };
    return fetch(`${baseUrl}/spotify/stats/getTopArtists`, {
        signal: signal,
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

export const getTopTracksStats = (token, range, signal) => (dispatch, getState) => Promise.resolve().then(() => {
    const initialToken = { token };
    const initialRange = { range };
    return fetch(`${baseUrl}/spotify/stats/getTopTracks`, {
        signal: signal,
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

export const createLibrary = (token, artists, features, signal) => (dispatch, getState) => Promise.resolve().then(() => {
    const initialToken = { token };
    const initialArtists = { artists };
    const initialFeatures = { features };
    return fetch(`${baseUrl}/spotify/results/createLibrary`, {
        signal: signal,
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

export const getRecommendations = (token, tracks, features, signal) => (dispatch, getState) => Promise.resolve().then(() => {
    const initialToken = { token };
    const initialTracks = { tracks };
    const initialFeatures = { features };
    return fetch(`${baseUrl}/spotify/results/getRecommendations`, {
        signal: signal,
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

export const createPlaylist = (token, name, description, signal) => (dispatch, getState) => Promise.resolve().then(() => {
    const initialToken = { token };
    const initialName = { name };
    const initialDescription = { description };
    return fetch(`${baseUrl}/spotify/results/createPlaylist`, {
        signal: signal,
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

export const addTracksToPlaylist = (token, id, uris, signal) => (dispatch, getState) => Promise.resolve().then(() => {
    const initialToken = { token };
    const initialId = { id };
    const initialUris = { uris };
    return fetch(`${baseUrl}/spotify/results/addTracksToPlaylist`, {
        signal: signal,
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

export const searchForArtists = (token, artist, signal) => (dispatch, getState) => Promise.resolve().then(() => {
    const initialToken = { token };
    const initialArtist = { artist };
    return fetch(`${baseUrl}/spotify/home/searchForArtists`, {
        signal: signal,
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

