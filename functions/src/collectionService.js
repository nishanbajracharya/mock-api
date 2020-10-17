const admin = require('./admin');

function getCollectionList() {
  return admin
  .firestore()
  .collection('meta')
  .doc('collection')
  .get()
  .then(response => response.data());
}

module.exports = {
  getCollectionList,
};
