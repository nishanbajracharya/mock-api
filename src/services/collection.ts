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
    const customError = {
      code: 'collection/already-exists',
      message: 'Collection already exists',
    };

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

export async function deleteCollection(
  collection: CollectionItemProp | null | undefined,
  collectionList: CollectionItemProp[] | null | undefined
) {
  if (!collection || !collection.collectionName) {
    return Promise.reject();
  }

  return deleteCollectionWithData(collection.collectionName, 10).then(() =>
    getCollectionList().set(
      {
        list: collectionList?.filter((item) => item !== collection) || [],
      },
      { merge: true }
    )
  );
}

async function deleteCollectionWithData(
  collectionPath: string,
  batchSize: number
) {
  const db = firestore;
  const collectionRef = db.collection(collectionPath);
  const query = collectionRef.orderBy('__name__').limit(batchSize);

  return new Promise((resolve, reject) => {
    deleteQueryBatch(query, resolve).catch(reject);
  });
}

async function deleteQueryBatch(
  query: firebase.firestore.Query<firebase.firestore.DocumentData>,
  resolve: (data?: any) => any
) {
  const db = firestore;
  const snapshot = await query.get();

  const batchSize = snapshot.size;
  if (batchSize === 0) {
    // When there are no documents left, we are done
    resolve();
    return;
  }

  // Delete documents in a batch
  const batch = db.batch();
  snapshot.docs.forEach((doc) => {
    batch.delete(doc.ref);
  });
  await batch.commit();

  // Recurse on the next process tick, to avoid
  // exploding the stack.
  process.nextTick(() => {
    deleteQueryBatch(query, resolve);
  });
}

export function updateSchema(
  collection: string,
  fields: DocumentFieldProp[],
  collections: CollectionItemProp[]
) {
  const list = collections.map((col) => {
    if (collection === col.collectionName) {
      return {
        ...col,
        fields: fields.map((field) => ({ ...field, value: '' })),
      };
    }

    return col;
  });

  return firestore
    .collection(FIRESTORE_COLLECTION.META)
    .doc(FIRESTORE_COLLECTION.META_COLECTION)
    .set({
      list,
    });
}
