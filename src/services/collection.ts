import Case from 'case';

import { firestore } from './firebase';
import { FIRESTORE_COLLECTION } from '../constants/firebase';

type CollectionProp = {
  title: string;
  route: string;
  createdAt?: number;
  updatedAt?: number;
  collectionName?: string;
};

export function getCollectionList() {
  return firestore
    .collection(FIRESTORE_COLLECTION.META)
    .doc(FIRESTORE_COLLECTION.META_COLECTION);
}

export async function addNewCollection(
  collection: CollectionProp,
  initialList?: []
) {
  let previousList = initialList || [];

  const collectionName = Case.camel(collection.title);

  if (!initialList)
    await getCollectionList()
      .get()
      .then((response) => {
        if (!response.exists) {
          return;
        }

        previousList = response.data()?.list || [];
      });

  if (
    previousList.find((item: CollectionProp) => {
      return (
        item.collectionName === collectionName ||
        item.route === collection.route ||
        item.title.toLowerCase() === collection.title.toLowerCase()
      );
    })
  ) {
    const customError = { code: 'collection/already-exists', message: 'Collection already exists' };

    throw customError;
  }

  return getCollectionList().set(
    {
      list: [
        ...previousList,
        {
          ...collection,
          collectionName,
          createdAt: Date.now(),
          updatedAt: Date.now(),
        },
      ],
    },
    { merge: true }
  );
}

export function getDocumentList(collection: string | undefined) {
  if (!collection) {
    return;
  }
  return firestore.collection(collection);
}