const express = require('express');

const getAllUsers = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'this route are still under consturction'
  });
};

const getAUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'this route are still under consturction'
  });
};

const postAUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'this route are still under consturction'
  });
};

const editAUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'this route are still under consturction'
  });
};

const deleteAUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'this route are still under consturction'
  });
};

const router = express.Router();

router
  .route('/')
  .get(getAllUsers)
  .post(postAUser);
router
  .route('/:id')
  .get(getAUser)
  .patch(editAUser)
  .delete(deleteAUser);

module.exports = router;
