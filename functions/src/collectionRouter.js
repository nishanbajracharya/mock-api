const router = require('express').Router();

router.get('/', (req, res) => {
  res.json({
    'title': 'collections',
  });
});

module.exports = router;