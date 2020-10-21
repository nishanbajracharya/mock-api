const functions = require('firebase-functions');

const admin = require('./admin');

function getCollectionList() {
  return admin
  .firestore()
  .collection('meta')
  .doc('collection')
  .get()
  .then(response => response.data());
}

function getCollection(collectionID) {
  return admin.firestore().collection(collectionID).get();
}

function getCollectionListData() {
  return getCollectionList()
    .then((data) => {
      const projectId = process.env.GCP_PROJECT || process.env.GCLOUD_PROJECT;
      const region = functions.config().project.region || 'us-central1';

      return data
        ? data.list.map((item) => {
            return {
              collection: item.title,
              url: `https://${region}-${projectId}.cloudfunctions.net/api/collections${item.route}`,
            };
          }) || []
        : [];
    })
}

function getCollectionData(collectionID) {
  return getCollection(collectionID)
  .then((snapshot) => {
    if (snapshot.empty) {
      return [];
    }

    return snapshot.docs.map((item) => item.data());
  })
}

function getCollectionMetadata(collectionRoute) {
  return getCollectionList()
    .then(data => {
      return data && data.list ? data.list.filter(item => item.route === `/${collectionRoute}`)[0] : []
    })
}

module.exports = {
  getCollectionList,
  getCollection,
  getCollectionListData,
  getCollectionData,
  getCollectionMetadata,
};
