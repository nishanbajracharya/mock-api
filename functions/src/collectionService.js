// const functions = require('firebase-functions');

const admin = require('./admin');

function getCollectionList() {
  return admin
    .firestore()
    .collection('meta')
    .doc('collection')
    .get()
    .then((response) => response.data());
}

function getCollection(collectionID) {
  return admin.firestore().collection(collectionID).get();
}

function getCollectionListData() {
  return getCollectionList().then((data) => {
    const projectId = process.env.GCP_PROJECT || process.env.GCLOUD_PROJECT;
    // const region = functions.config().project.region || 'us-central1';

    return data
      ? data.list.map((item) => {
          return {
            collection: item.title,
            url: `https://${projectId}.web.app/api/collections${item.route}`,
            // directUrl: `https://${region}-${projectId}.cloudfunctions.net/app/api/collections${item.route}`,
          };
        }) || []
      : [];
  });
}

function getCollectionData(collectionID) {
  return getCollection(collectionID).then((snapshot) => {
    if (snapshot.empty) {
      return [];
    }

    return snapshot.docs.map((item) => item.data());
  });
}

function getCollectionMetadata(collectionRoute) {
  return getCollectionList().then((data) => {
    return data && data.list
      ? data.list.filter((item) => item.route === `/${collectionRoute}`)[0]
      : [];
  });
}

function createDocument(collectionID, body) {
  const collectionRef = admin.firestore().collection(collectionID);

  const documentID = collectionRef.doc().id;

  return collectionRef.doc(documentID).set({
    fields: [],
    displayLabel: '',
    ...body,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    id: documentID,
  });
}

module.exports = {
  createDocument,
  getCollectionList,
  getCollection,
  getCollectionListData,
  getCollectionData,
  getCollectionMetadata,
};
