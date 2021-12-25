const express = require('express');
const path = require('path');
const cors = require('cors');
const config = require('./config.js');
const adminRoutes = require('./routes/admin-routes.js');
const detectionRoutes = require('../detection/routes/detection-routes.js');
const spotifyRoutes = require('../spotify/routes/spotify-routes.js');

const PORT = process.env.PORT || 19001;
const app = express();
app.use(cors());
app.use(express.static(__dirname));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));


app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, '../../web/index.html'), function (err) {
        if (err) {
            res.status(500).send(err)
        }
    })
})

/*------------ ROUTES ------------*/
app.use('/admin', adminRoutes.routes);
app.use('/detect', detectionRoutes.routes);
app.use('/spotify', spotifyRoutes.routes);


app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`)
})
