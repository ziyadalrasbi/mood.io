const baseUrl = "https://mood-io-app.herokuapp.com";

export const initUser = (user) => (dispatch, getState) => Promise.resolve().then(() => {
    const initialUser = { user };
    return fetch(`${baseUrl}/database/login/addUser`, {
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
            console.log('success initializing user');
            return dispatch({ type: 'INIT_USER', initUser: data });
        })
})

export const loginUser = (id) => (dispatch, getState) => Promise.resolve().then(() => {
    const initialId = { id };
    return fetch(`${baseUrl}/database/admin/createToken`, {
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
            console.log('success logging in user');
            return dispatch({ type: 'LOGIN_USER', loginUser: data.user });
        })
})

export const saveUserArtists = (user, artists) => (dispatch, getState) => Promise.resolve().then(() => {
    const initialUser = { user };
    const initialArtists = { artists };
    return fetch(`${baseUrl}/database/login/saveUserArtists`, {
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
})

export const getUserDatabaseArtists = (id) => (dispatch, getState) => Promise.resolve().then(() => {
    const initialId = { id };
    return fetch(`${baseUrl}/database/results/getUserArtists`, {
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
                var isNew = true;
                return dispatch({ type: 'GET_USER_DATABASE_ARTISTS', getUserDatabaseArtists: isNew });
            } else {
                return dispatch({ type: 'GET_USER_DATABASE_ARTISTS', getUserDatabaseArtists: false });
            }
        })
})

export const getPreviousRecommendations = (id) => (dispatch, getState) => Promise.resolve().then(() => {
    return fetch(`${baseUrl}/database/home/getRecommendations`, {
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

export const getRecentMood = (user) => (dispatch, getState) => Promise.resolve().then(() => {
    const initialUser = { user };
    return fetch(`${baseUrl}/database/results/getRecentMood`, {
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