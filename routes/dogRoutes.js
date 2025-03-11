const express = require('express');
const router = express.Router();
const dogController = require('../controllers/dogController');
const authMiddleware = require('../middleware/auth');

// Route to register a new dog
router.post('/register', authMiddleware, dogController.registerDog);

// Route to adopt a dog
router.post('/adopt/:dogId', authMiddleware, dogController.adoptDog);

// Route to remove a dog
router.delete('/remove/:dogId', authMiddleware, dogController.removeDog);

// Route to list dogs registered by the user
router.get('/registered', authMiddleware, dogController.listRegisteredDogs);

// Route to list dogs adopted by the user
router.get('/adopted', authMiddleware, dogController.listAdoptedDogs);

module.exports = router;
