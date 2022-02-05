import * as SecureStore from 'expo-secure-store';
const baseUrl = "https://mood-io-app.herokuapp.com";

/* ------------- LOGIN FETCH FUNCTIONS --------------- */
export const getGenreSeeds = async (token) => {
    try {
        return fetch(`${baseUrl}/spotify/login/getGenreSeeds`, {
            method: 'post',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                token: token
            })
        })
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const loginUser = async (id) => {
    try {
        await fetch(`${baseUrl}/database/admin/createToken`, {
            method: 'post',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: id
            })
        })
            .then((res) => res.json())
            .then(data => {
                const tempToken = data.token;
                SecureStore.setItemAsync('database_access_token', tempToken, { keychainAccessible: SecureStore.ALWAYS_THIS_DEVICE_ONLY });
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
                return data.user;
            })
    }
    catch (error) {
        console.log(error);
        throw error;
    }
}

export const initUser = async (user, refreshToken) => {
    try {
        await fetch(`${baseUrl}/database/login/addUser`, {
            method: 'post',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user: user,
                refreshToken: refreshToken
            })
        })
            .then((res) => res.json())
            .then(data => {
                console.log('success initializing user');
            })

    } catch (error) {
        console.log(error);
        throw error;
    }
}


export const getUserData = async (token) => {
    try {
        return fetch(`${baseUrl}/spotify/login/getUserId`, {
            method: 'post',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                token: token
            })
        })
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const getUserGenres = async (token) => {
    try {
        return fetch(`${baseUrl}/spotify/login/getUserTopGenres`, {
            method: 'post',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                token: token
            })
        })
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const saveUserGenres = async (user, artists) => {
    try {
        return fetch(`${baseUrl}/database/login/saveUserGenres`, {
            method: 'post',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user: user,
                artists: artists
            })
        })
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const requestAccessToken = async (code) => {
    try {
        return fetch(`${baseUrl}/spotify/login/requestAccessToken`, {
            method: 'post',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                code: code
            })
        })
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const signOut = async () => {
    return fetch(`${baseUrl}/database/login/signOut`, {
        method: 'post',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    })
}

/* ------------ HOME FETCH FUNCTIONS ---------- */
export const getTopArtists = async (token) => {
    return fetch(`${baseUrl}/spotify/home/getTopArtists`, {
        method: 'post',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            token: token
        })
    })
}

export const getName = async (token) => {
    return fetch(`${baseUrl}/spotify/home/getName`, {
        method: 'post',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            token: token
        })
    })
}

export const getTopTracks = async (token) => {
    return fetch(`${baseUrl}/spotify/home/getTopTracks`, {
        method: 'post',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            token: token
        })
    })
}

export const getListeningHabits = async (token, trackIds) => {
    return fetch(`${baseUrl}/spotify/home/getListeningHabits`, {
        method: 'post',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            token: token,
            tracks: trackIds
        })
    })
}

export const searchForArtists = async (token, artist) => {
    return fetch(`${baseUrl}/spotify/home/searchForArtists`, {
        method: 'post',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            token: token,
            search: artist
        })
    })
}

/* -------------- DETECTION FETCH FUNCTIONS ---------- */
export const detectFace = async (base64) => {
    return fetch(`${baseUrl}/detection/detect/detectFace`, {
        method: 'post',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            base64: base64
        })
    })
}

/* ---------------- RESULTS FETCH FUNCTIONS ---------- */

export const refreshAccessToken = async (token, refreshToken) => {
    return fetch(`${baseUrl}/spotify/login/refreshAccessToken`, {
        method: 'post',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            accessToken: token,
            refreshToken: refreshToken
        })
    })
}

export const getUserId = async (token) => {
    return fetch(`${baseUrl}/spotify/login/getUserId`, {
        method: 'post',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            token: token
        })
    })
}

export const getUserDatabaseGenres = async (id) => {
    return fetch(`${baseUrl}/database/results/getUserGenres`, {
        method: 'post',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            user: id
        })
    })
}

export const getRecommendations = async (token, artists, features) => {
    return fetch(`${baseUrl}/spotify/results/getRecommendations`, {
        method: 'post',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            token: token,
            artists: artists,
            features: features
        })
    })
}

export const getAudioFeatures = async (token, tracks, features) => {
    return fetch(`${baseUrl}/spotify/results/getAudioFeatures`, {
        method: 'post',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            token: token,
            tracks: tracks,
            features: features
        })
    })
}

export const saveUserRating = async (rating) => {
    return fetch(`${baseUrl}/database/results/saveUserRating`, {
        method: 'post',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            rating: rating
        })
    })
}

/* ------------- USER STATS FETCH FUNCTIONS ---------- */

export const getUserProfile = async (token) => {
    return fetch(`${baseUrl}/spotify/stats/getProfile`, {
        method: 'post',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            token: token
        })
    })
}

export const getUserTopArtists = async (token, range) => {
    return fetch(`${baseUrl}/spotify/stats/getTopArtists`, {
        method: 'post',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            token: token,
            range: range
        })
    })
}

export const getUserTopTracks = async (token, range) => {
    return fetch(`${baseUrl}/spotify/stats/getTopTracks`, {
        method: 'post',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            token: token,
            range: range
        })
    })
}