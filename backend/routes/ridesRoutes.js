const express = require('express');
const router = express.Router();
const {body, query} = require('express-validator')
const rideController = require('../controllers/rideController');
const authMiidleware = require('../middlewares/authMiddleware')

router.post('/create',
    authMiidleware.authUser,
    body('pickup').isString().isLength({min:3}).withMessage('Invalid pickup address'),
    body('destination').isString().isLength({min:3}).withMessage('Invalid destination address'),
    body('vehicleType').isString().isIn(['auto','car','moto']).withMessage('invalid car type'),
    rideController.createRide
)

router.get('/get-fare',
    authMiidleware.authUser,
    query('pickup').isString().isLength({min:3}).withMessage('Invalid pickup address'),
    query('destination').isString().isLength({min:3}).withMessage('Invalid destination address'),
    rideController.getFare
)

module.exports = router;