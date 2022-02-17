import * as SecureStore from 'expo-secure-store';
const baseUrl = "https://mood-io-app.herokuapp.com";

/* ------------- LOGIN FETCH FUNCTIONS --------------- */

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

export const initUser = async (user) => {
    try {
        await fetch(`${baseUrl}/database/login/addUser`, {
            method: 'post',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user: user
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


export const getUserId = async (token) => {
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

export const getUserTopArtistsLogin = async (token) => {
    try {
        return fetch(`${baseUrl}/spotify/login/getUserTopArtists`, {
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

export const saveUserArtists = async (user, artists) => {
    try {
        return fetch(`${baseUrl}/database/login/saveUserArtists`, {
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

export const requestAccessToken = async (uri, code) => {
    try {
        return fetch(`${baseUrl}/spotify/login/requestAccessToken`, {
            method: 'post',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                redirect: uri,
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
export const getTopArtistsHome = async (token) => {
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

export const getTopTracksHome = async (token) => {
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

export const getPreviousRecommendations = async (id) => {
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

export const saveRecentMood = async (user, mood) => {
    return fetch(`${baseUrl}/database/results/saveRecentMood`, {
        method: 'post',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            user: user,
            mood: mood
        })
    })
}

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

export const getUserDatabaseArtists = async (id) => {
    return fetch(`${baseUrl}/database/results/getUserArtists`, {
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

export const createLibrary = async (token, artists, features) => {
    return fetch(`${baseUrl}/spotify/results/createLibrary`, {
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

export const getRecommendations = async (token, tracks, features) => {
    return fetch(`${baseUrl}/spotify/results/getRecommendations`, {
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

export const saveRecommendations = async (user, mood, tracks) => {
    return fetch(`${baseUrl}/database/results/saveRecommendations`, {
        method: 'post',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            user: user,
            mood: mood,
            tracks: tracks
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

export const getRecentMood = async (user) => {
    return fetch(`${baseUrl}/database/results/getRecentMood`, {
        method: 'post',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            user: user
        })
    })
}

export const createPlaylist = async (token, name, description) => {
    return fetch(`${baseUrl}/spotify/results/createPlaylist`, {
        method: 'post',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            token: token,
            name: name,
            description: description
        })
    })
}

export const addTracksToPlaylist = async (token, id, uris) => {
    return fetch(`${baseUrl}/spotify/results/addTracksToPlaylist`, {
        method: 'post',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            token: token,
            id: id,
            uris: uris
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

export const getUserTopArtistsStats = async (token, range) => {
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

export const getUserTopTracksStats = async (token, range) => {
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