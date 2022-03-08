import * as Constants from '../../../Constants';

const baseUrl = Constants.BASE_URL;

export const initUser = (user, signal) => (dispatch, getState) => Promise.resolve().then(() => {
    const initialUser = { user };
    return fetch(`${baseUrl}/database/login/addUser`, {
        signal: signal,
        method: 'post',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            user: initialUser.user
        })
    })
        .then((res) => res.json())
        .then(data => {
            return dispatch({ type: 'INIT_USER', initUser: data });
        })
})

export const loginUser = (id, signal) => (dispatch, getState) => Promise.resolve().then(() => {
    const initialId = { id };
    return fetch(`${baseUrl}/database/admin/createToken`, {
        signal: signal,
        method: 'post',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id: initialId.id
        })
    })
        .then((res) => res.json())
        .then(data => {
            const tempToken = data.token;
            return fetch(`${baseUrl}/database/login/signIn`, {
                method: 'post',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    token: tempToken
                }),
            });
        })
        .then((res) => res.json())
        .then(data => {
            return dispatch({ type: 'LOGIN_USER', loginUser: data.user, isLoggedIn: true });
        })
})

export const signOut = (signal) => (dispatch, getState) => Promise.resolve().then(() => {
    return fetch(`${baseUrl}/database/login/signOut`, {
        signal: signal,
        method: 'post',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    })
        .then((res) => res.json())
        .then(data => {
            return dispatch({ type: 'SIGN_OUT', signOut: data });
        })
})

export const saveUserArtists = (user, artists, signal) => (dispatch, getState) => Promise.resolve().then(() => {
    const initialUser = { user };
    const initialArtists = { artists };
    return fetch(`${baseUrl}/database/login/saveUserArtists`, {
        signal: signal,
        method: 'post',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            user: initialUser.user,
            artists: initialArtists.artists
        })
    })
        .then((res) => res.json())
        .then(data => {
            return dispatch({ type: 'SAVE_USER_ARTISTS', saveUserArtists: data, newUser: false });
        })
})

export const getUserDatabaseArtists = (id, signal) => (dispatch, getState) => Promise.resolve().then(() => {
    const initialId = { id };
    return fetch(`${baseUrl}/database/results/getUserArtists`, {
        signal: signal,
        method: 'post',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            user: initialId.id
        })
    })
        .then(res => res.json())
        .then(data => {
            if (data.topGenres == null) {
                return dispatch({ type: 'GET_USER_DATABASE_ARTISTS', getUserDatabaseArtists: [] });
            } else {
                return dispatch({ type: 'GET_USER_DATABASE_ARTISTS', getUserDatabaseArtists: data.topGenres });
            }
        })
})

export const getPreviousRecommendations = (id, signal) => (dispatch, getState) => Promise.resolve().then(() => {
    return fetch(`${baseUrl}/database/home/getRecommendations`, {
        signal: signal,
        method: 'post',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            user: id
        })
    })
        .then(res => res.json())
        .then(data => {
            return dispatch({ type: 'GET_PREVIOUS_RECOMMENDATIONS', getPreviousRecommendations: data.recommendations });
        })
})

export const getMoodCount = (id, signal) => (dispatch, getState) => Promise.resolve().then(() => {
    return fetch(`${baseUrl}/database/home/getMoodCount`, {
        signal: signal,
        method: 'post',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            user: id
        })
    })
        .then(res => res.json())
        .then(data => {
            return dispatch({ type: 'GET_MOOD_COUNT', getMoodCount: data });
        })
})

export const getRecentMood = (user, signal) => (dispatch, getState) => Promise.resolve().then(() => {
    const initialUser = { user };
    return fetch(`${baseUrl}/database/results/getRecentMood`, {
        signal: signal,
        method: 'post',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            user: initialUser.user
        })
    })
        .then(res => res.json())
        .then(data => {
            return dispatch({ type: 'GET_RECENT_MOOD', getRecentMood: data.recentMood });
        })
})

export const saveRecentMood = (user, mood, signal) => (dispatch, getState) => Promise.resolve().then(() => {
    const initialUser = { user };
    const initialMood = { mood };
    return fetch(`${baseUrl}/database/results/saveRecentMood`, {
        signal: signal,
        method: 'post',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            user: initialUser.user,
            mood: initialMood.mood
        })
    })
        .then(res => res.json())
        .then(data => {
            return dispatch({ type: 'SAVE_RECENT_MOOD', saveRecentMood: data });
        })
})

export const incrementMoodCount = (user, mood, signal) => (dispatch, getState) => Promise.resolve().then(() => {
    const initialUser = { user };
    const initialMood = { mood };
    return fetch(`${baseUrl}/database/results/incrementMoodCount`, {
        signal: signal,
        method: 'post',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            user: initialUser.user,
            mood: initialMood.mood
        })
    })
        .then(res => res.json())
        .then(data => {
            return dispatch({ type: 'INCREMENT_MOOD_COUNT', incrementMoodCount: data });
        })
})

export const getPlaylistsAmount = (user, signal) => (dispatch, getState) => Promise.resolve().then(() => {
    const initialUser = { user };
    return fetch(`${baseUrl}/database/results/getPlaylistsAmount`, {
        signal: signal,
        method: 'post',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            user: initialUser.user
        })
    })
        .then(res => res.json())
        .then(data => {
            return dispatch({ type: 'GET_PLAYLISTS_AMOUNT', getPlaylistsAmount: data.amount });
        })
})

export const incrementPlaylistsAmount = (user, signal) => (dispatch, getState) => Promise.resolve().then(() => {
    const initialUser = { user };
    return fetch(`${baseUrl}/database/results/incrementPlaylistsAmount`, {
        signal: signal,
        method: 'post',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            user: initialUser.user
        })
    })
        .then(res => res.json())
        .then(data => {
            return dispatch({ type: 'INCREMENT_PLAYLISTS_AMOUNT', incrementPlaylistsAmount: data });
        })
})

export const saveRecommendations = (user, mood, tracks, uris, playlistId, signal) => (dispatch, getState) => Promise.resolve().then(() => {
    const initialUser = { user };
    const initialMood = { mood };
    const initialTracks = { tracks };
    const initialUris = { uris };
    const initialPlaylistId = { playlistId };
    return fetch(`${baseUrl}/database/results/saveRecommendations`, {
        signal: signal,
        method: 'post',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            user: initialUser.user,
            mood: initialMood.mood,
            tracks: initialTracks.tracks,
            uris: initialUris.uris,
            id: initialPlaylistId.playlistId
        })
    })
        .then(res => res.json())
        .then(data => {
            return dispatch({ type: 'SAVE_RECOMMENDATIONS', saveRecommendations: data });
        })
})

export const setPlaylisted = (user, id, link, signal) => (dispatch, getState) => Promise.resolve().then(() => {
    const initialUser = { user };
    const initialId = { id };
    const initialLink = { link };
    return fetch(`${baseUrl}/database/results/setPlaylisted`, {
        signal: signal,
        method: 'post',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            user: initialUser.user,
            id: initialId.id,
            link: initialLink.link
        })
    })
        .then(res => res.json())
        .then(data => {
            return dispatch({ type: 'SET_PLAYLISTED', setPlaylisted: data });
        })
})

export const saveUserRating = (rating, signal) => (dispatch, getState) => Promise.resolve().then(() => {
    const initialRating = { rating };
    return fetch(`${baseUrl}/database/results/saveUserRating`, {
        signal: signal,
        method: 'post',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            rating: initialRating.rating
        })
    })
        .then(res => res.json())
        .then(data => {
            return dispatch({ type: 'SAVE_USER_RATING', saveUserRating: data });
        })
})