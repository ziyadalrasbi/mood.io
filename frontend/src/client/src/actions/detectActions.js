import * as Constants from '../../../Constants';

const baseUrl = Constants.BASE_URL;

export const detectFace = (base64, signal) => (dispatch, getState) => Promise.resolve().then(() => {
    const initialBase = { base64 };
    return fetch(`${baseUrl}/detection/detect/detectFace`, {
        signal: signal,
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