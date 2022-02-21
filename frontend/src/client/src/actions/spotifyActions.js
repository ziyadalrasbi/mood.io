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
