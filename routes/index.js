const router = require('express').Router()
const roomController = require('../controllers/room')

router.get('/', roomController.find)
router.get('/:id', roomController.findById)
router.post('/', roomController.create)
router.patch('/player/:id', roomController.updatePlayer)
router.patch('/status/:id', roomController.updateStatus)
router.delete('/:id', roomController.remove)

module.exports = router