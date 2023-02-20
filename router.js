const express = require('express')
const router = express.Router()
const screenView = require('./controller/screenView')

router.get('/', screenView.home)

module.exports = router