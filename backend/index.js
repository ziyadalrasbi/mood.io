const express = require('express');
const path = require('path');
const cors = require('cors');
const config = require('./database/config.js');
/*------------ DATABASE ROUTES ------------*/
const adminRoutes = require('./database/routes/admin-routes.js');
const loginRoutes = require('./database/routes/login-routes.js');
const resultsRoutes = require('./database/routes/results-routes.js');
/*------------ DETECTION ROUTES ------------*/
const detectionRoutes = require('./detection/routes/detection-routes.js');
/*------------ SPOTIFY ROUTES ------------*/
const spotifyLoginRoutes = require('./spotify/routes/login-routes.js');
const spotifyHomeRoutes = require('./spotify/routes/home-routes.js');
const spotifyResultsRoutes = require('./spotify/routes/results-routes.js');

const PORT = process.env.PORT || 19001;
const app = express();
app.use(cors());
app.use(express.static(__dirname));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));


app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, '../../web/index.html'), function (err) {
        if (err) {
            res.status(500).send(err);
        }
    })
})

/*------------ DATABASE ROUTES ------------*/
app.use('/database/admin', adminRoutes.routes);
app.use('/database/login', loginRoutes.routes);
app.use('/database/results', resultsRoutes.routes);
/*------------ DETECTION ROUTES ------------*/
app.use('/detection/detect', detectionRoutes.routes);
/*------------ SPOTIFY ROUTES ------------*/
app.use('/spotify/login', spotifyLoginRoutes.routes);
app.use('/spotify/home', spotifyHomeRoutes.routes);
app.use('/spotify/results', spotifyResultsRoutes.routes);

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`)
})