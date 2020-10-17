const router = require('express').Router();
const functions = require('firebase-functions');
const { getCollectionList } = require('./collectionService');
const { ErrorHandler } = require('./errorHandler');

router.get('/', async (req, res, next) => {
  return await getCollectionList()
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

module.exports = router;
