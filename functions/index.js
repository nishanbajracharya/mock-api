const express = require('express');
const functions = require('firebase-functions');

const collectionRouter = require('./src/collectionRouter');

const app = express();

app.use(express.json());

app.get('/', (_, res) => {
  res.json({
    name: 'mock-api',
  });
});

app.use('/collections', collectionRouter);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.api = functions.https.onRequest(app);
