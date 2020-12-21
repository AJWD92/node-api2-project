const express = require('express');
const Db = require('../db.js');

const router = express.Router();

router.get('/', (req, res) => {
    Db.find(req.query)
    .then(db => {
        res.status(200).json(db);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ message: 'Error retrieving the db' });
    });
});

router.get('/:id', (req, res) => {
    Db.findById(req.params.id)
    .then(db => {
      if (db) {
        res.status(200).json(db);
      } else {
        res.status(404).json({ message: 'Post not found' });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: 'Error retrieving the db',
      });
    });
  });
  