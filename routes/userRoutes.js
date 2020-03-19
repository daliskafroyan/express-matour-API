const express = require('express');

const userController = require('./../controllers/userController');

const router = express.Router();

router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.postAUser);
router
  .route('/:id')
  .get(userController.getAUser)
  .patch(userController.editAUser)
  .delete(userController.deleteAUser);

module.exports = router;
