const express = require('express');

const users = require('../controllers/users');

const router = express.Router();

router.get('/:username', users.get);
router.get('/:id', users.getById);

module.exports = router;
