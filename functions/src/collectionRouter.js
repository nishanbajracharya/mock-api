const yup = require('yup');
const router = require('express').Router();

const {
  getCollectionListData,
  getCollectionData,
  getCollectionMetadata,
  createDocument,
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

router.get('/:collectionID', async (req, res, next) => {
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

module.exports = router;
