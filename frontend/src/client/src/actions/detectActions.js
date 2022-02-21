const baseUrl = "https://mood-io-app.herokuapp.com";

export const detectFace = (base64) => (dispatch, getState) => Promise.resolve().then(() => {
    const initialBase = { base64 };
    return fetch(`${baseUrl}/detection/detect/detectFace`, {
        method: 'post',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            base64: initialBase.base64
        })
    })
        .then(res => res.json())
        .then(data => {
            return dispatch({ type: 'DETECT_FACE', detectFace: data.image });
        })
})