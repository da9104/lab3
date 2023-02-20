const express = require('express')
const router = express.Router()
const screenView = require('./controller/screenView')

router.get('/', screenView.home)
//router.get('/view', screenView.view)
router.post('/showAll', screenView.showAll)
router.get('/close', screenView.close)
router.post('/delete', screenView.delete)
router.post('/view', screenView.view)
router.post('/update', screenView.update)
router.post('/add', screenView.add)

module.exports = router