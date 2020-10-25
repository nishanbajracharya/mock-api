const cors = require('cors');
const express = require('express');
const functions = require('firebase-functions');

const { handleError } = require('./src/errorHandler');
const collectionRouter = require('./src/collectionRouter');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api', (_, res) => {
  return res.json({
    name: 'mock-api',
  });
});


app.use('/api/collections', collectionRouter);

app.use((err, req, res, next) => {
  return handleError(err, res);
});

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.app = functions.https.onRequest(app);
