const firebase = require('../db.js');

const submitQuery = async (req, res, next) => {
    try {
        await firebase.firestore().collection('queries').add(req.body.query);
        return res.json({ status: 200 });
    } catch (error) {
        const message = 'Error saving query, please try again. \n' + error;
        return res.json({ status: 400, message: message });
    }
}

module.exports = {
    submitQuery
}