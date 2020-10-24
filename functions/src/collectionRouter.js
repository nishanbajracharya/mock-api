const router = require('express').Router();
const {
  getCollectionListData,
  getCollectionData,
  getCollectionMetadata,
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

  return await Promise.all([getCollectionData(collectionID), getCollectionMetadata(collectionID)])
    .then(([list, collection]) => {
      return res.json({
        title: collection.title,
        list: list.map(listItem => ({
          id: listItem.id,
          ...((listItem.fields || []).reduce((acc, current) => ({ ...acc, [current.label || current.displayLabel]: current.value }), {})),
        })),
      });
    })
    .catch((err) => {
      next(new ErrorHandler(500, err));
    });
});

module.exports = router;
