const express = require('express');

const moviesControllers = require('../controllers/movies-controllers');

const router = express.Router();

router.get('/', moviesControllers.getAllMovies);

router.get('/:mid', moviesControllers.getMovieById);

router.get('/creator/:cid', moviesControllers.getMovieByCreator);

router.post('/', moviesControllers.saveMovie);

router.patch('/:mid', moviesControllers.updateMovie);

router.delete('/:mid', moviesControllers.deleteMovie);

module.exports = router;