const express = require('express');
const admin = require('firebase-admin')
const path = require('path')
const app = express();

const distDir = __dirname + "/dist/my-firebase-admin-app";
const serviceAccount = require('./stackplay2-firebase-adminsdk-c54zb-f495f59560.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:  "https://stackplay2.firebaseio.com"
});

admin.database().ref('/admins');

app.use(express.static(distDir));
app.use('*', (req, res) => {
  res.sendFile(path.resolve(distDir +'index.html'));
});

app.listen(process.env.PORT || 8080);