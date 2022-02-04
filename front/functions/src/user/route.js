const router = require("express").Router();
const controller = require("./controller");

//Endpoint url: https://yourfirebaseurl.com/api/authentication
router.post("/authentication/", controller.proxySpotifyToken);


module.exports = router;