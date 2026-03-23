const express = require('express');
const router = express.Router();
const { getTrackerData, updateTrackerData } = require('../controllers/trackerController');

router.route('/:firebaseUid')
    .get(getTrackerData)
    .put(updateTrackerData);

module.exports = router;
