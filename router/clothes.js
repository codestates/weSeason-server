const express = require('express');
const router = express.Router();
const clothesController = require('../controller/clothes')

router.get('/', clothesController)