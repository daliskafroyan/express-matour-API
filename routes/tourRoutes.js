const express = require('express');
const fs = require('fs');

const tours = JSON.parse(fs.readFileSync(`${__dirname}/../data/tours.json`));

const getAllTours = (req, res) => {
  console.log(req.requestTime);
  console.log(res.requestTime);

  res.status(200).json({
    status: 'success',
    result: tours.length,
    data: {
      tours
    }
  });
};

const getATour = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find(el => el.id === id);

  if (!tour) {
    return res.status(404).json({
      status: 'failed',
      message: 'invalid id'
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour
    }
  });
};

const postATour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);

  fs.writeFile(`${__dirname}/data/tours.json`, JSON.stringify(tours), err => {
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour
      }
    });
  });
};

const editATour = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find(el => el.id === id);

  if (!tour) {
    return res.status(404).json({
      status: 'failed',
      message: 'invalid id'
    });
  }

  res.status(204).json({
    status: 'success',
    data: {
      tour: '<updated here>'
    }
  });
};

const deleteATour = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find(el => el.id === id);

  if (!tour) {
    return res.status(404).json({
      status: 'failed',
      message: 'invalid id'
    });
  }

  res.status(204).json({
    status: 'success',
    data: {
      tour: null
    }
  });
};

const router = express.Router();

router
  .route('/')
  .get(getAllTours)
  .post(postATour);
router
  .route('/:id')
  .get(getATour)
  .patch(editATour)
  .delete(deleteATour);

module.exports = router;
