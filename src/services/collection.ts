import { FIRESTORE_COLLECTION } from '../constants/firebase';
import { firestore } from './firebase';

type CollectionProp = {
  title: string;
  route: string;
  createdAt?: number;
  updatedAt?: number;
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

  if (!initialList)
    await getCollectionList()
      .get()
      .then((response) => {
        if (!response.exists) {
          return;
        }

        previousList = response.data()?.list || [];
      });

  return getCollectionList().set(
    { list: [...previousList, collection] },
    { merge: true }
  );
}
