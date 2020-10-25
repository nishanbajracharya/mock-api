const yup = require('yup');
const router = require('express').Router();

const {
  getCollectionListData,
  getCollectionData,
  getCollectionMetadata,
  createDocument,
  getDocumentById,
  deleteDocumentById,
  patchDocument,
} = require('./collectionService');
const { ErrorHandler } = require('./errorHandler');

router.get('/', async (req, res, next) => {
  return await getCollectionListData()
    .then((list) => {
      return res.json({
        title: 'collections',
        list,
      });
    })
    .catch((err) => {
      next(new ErrorHandler(500, err));
    });
});

router.get(['/:collectionID', '/:collectionID/documents'], async (req, res, next) => {
  const collectionID = req.params.collectionID;

  return await Promise.all([
    getCollectionData(collectionID),
    getCollectionMetadata(collectionID),
  ])
    .then(([list, collection]) => {
      return res.json({
        title: collection.title,
        list: list.map((listItem) => ({
          id: listItem.id,
          ...(listItem.fields || []).reduce(
            (acc, current) => ({
              ...acc,
              [current.label || current.displayLabel]: current.value,
            }),
            {}
          ),
        })),
      });
    })
    .catch((err) => {
      next(new ErrorHandler(500, err));
    });
});

const schema = yup.object().shape({
  displayLabel: yup.string().trim().required('Display Label is required'),
  fields: yup
    .array()
    .of(
      yup.object().shape({
        label: yup.string().trim().required(),
        displayLabel: yup.string().trim(),
        type: yup.string().trim().required(),
        value: yup.mixed(),
      })
    )
    .required(),
});

router.post(
  '/:collectionID',
  async (req, res, next) => {
    const body = req.body;

    try {
      await schema.validate(body);
      return next();
    } catch (error) {
      return next(new ErrorHandler(400, error));
    }
  },
  async (req, res, next) => {
    const collectionID = req.params.collectionID;

    const body = req.body;

    return await createDocument(collectionID, body)
      .then((response) =>
        res.json({
          data: response,
        })
      )
      .catch((err) => {
        next(new ErrorHandler(500, err));
      });
  }
);

router.get('/:collectionID/documents/:documentID', async (req, res, next) => {
  const collectionID = req.params.collectionID;
  const documentID = req.params.documentID;

  return await getDocumentById(collectionID, documentID)
    .then((response) => {
      const data = response.data();
      if (!data) {
        return next(new ErrorHandler(404, 'No document with the supplied id'));
      }

      return res.json({
        id: data.id,
        ...(data.fields || []).reduce(
          (acc, current) => ({
            ...acc,
            [current.label || current.displayLabel]: current.value,
          }),
          {}
        ),
      });
    })
    .catch((err) => {
      next(new ErrorHandler(500, err));
    });
});

router.delete('/:collectionID/documents/:documentID', async (req, res, next) => {
  const collectionID = req.params.collectionID;
  const documentID = req.params.documentID;

  return await deleteDocumentById(collectionID, documentID)
    .then(() => {
      return res.json({
        success: true,
      });
    })
    .catch((err) => {
      next(new ErrorHandler(500, err));
    });
});

const updateDocumentRouteHandler = async (req, res, next) => {
  const collectionID = req.params.collectionID;
  const documentID = req.params.documentID;

  const body = req.body;

  return await patchDocument(collectionID, documentID, body)
    .then((response) => {
      console.log(response);
      return res.json({
        success: true,
      });
    })
    .catch((err) => {
      next(new ErrorHandler(500, err));
    });
}

router.put('/:collectionID/documents/:documentID', updateDocumentRouteHandler);

router.patch('/:collectionID/documents/:documentID', updateDocumentRouteHandler);

module.exports = router;
