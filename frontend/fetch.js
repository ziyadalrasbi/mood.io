import * as Constants from "./src/Constants";
const baseUrl = Constants.BASE_URL;

/* Initial methods used in App.js to save a user's artists and to check if the token has expired.
   App.js cannot make use of dispatch functions, so these functions are used instead. */

export const refreshAccessToken = async (token, refreshToken, expiry, signal) => {
    const initialAccessToken = { token };
    const initialRefreshToken = { refreshToken };
    const initialExpiry = { expiry };
    const timeNow = Date.now();

    if (timeNow > initialExpiry.expiry) {
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
                    const newExpiry = Date.now() + 3.6e6;
                    const newData = {
                        token: data.token,
                        time: JSON.stringify(newExpiry)
                    }
                    return newData;
                } else {
                    return null;
                }
            })
    } else {
        const data = {
            token: initialAccessToken.token,
            time: initialExpiry.expiry
        }
        return data;
    }
}

export const getUserId = async (token, signal) => {
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
            return data.id;
        })
}

export const getUserTopArtistsLogin = async (token, signal) => {
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
                return data.topArtists;
            } else {
                return null;
            }
        })
}

export const saveUserArtists = async (user, artists, signal) => {
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
            return data;
        })
}