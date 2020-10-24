import { firestore } from './firebase';

export function addDocument(
  collection: string | undefined,
  document: DocumentData
) {
  if (!collection) {
    return Promise.reject('Collection not specified');
  }

  const collectionRef = firestore.collection(collection);

  const documentID = collectionRef.doc().id;

  return collectionRef
    .doc(documentID)
    .set({
      ...document,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      id: documentID,
    });
}

export function editDocument(
  collection: string | undefined,
  id: string | null,
  document: DocumentData
) {
  if (!collection || !id) {
    return Promise.reject('Collection or ID not specified');
  }

  const collectionRef = firestore.collection(collection);

  return collectionRef.doc(id).set(document, { merge: true });
}

const documentService = {
  addDocument,
  editDocument,
};

export default documentService;
