const { v4: uuid } = require('uuid');
const HttpError = require('../models/http-error');

let DUMMY_MOVIES = [
    {
        id: 'm1',
        title: 'Inside_Out',
        creator: 'fm1'
    },
    {
        id: 'm2',
        title: 'Wall-E',
        creator: 'fm2'
    },
    {
        id: 'm3',
        title: 'Terminator',
        creator: 'fm3'
    }
];

const getAllMovies = (req, res, next)=>{
    res.json({movies: DUMMY_MOVIES});
};

const getMovieById = (req, res, next)=>{
    const movie = DUMMY_MOVIES.find(m => {
        return m.id === req.params.mid;
    });
    if(!movie){
        const error = new Error('Película no existente para el id especificado');
        error.code = 404;
        next(error);
    }
    else{
        res.json({movie});
    }
};

const getMovieByCreator = (req, res, next)=>{
    const movie = DUMMY_MOVIES.find(m => {
        return m.creator === req.params.cid
    });
    if(!movie){
        const error = new HttpError('Película no existente para el id de creador especificado');
        throw error;
    }
    res.json({movie});
};

const saveMovie = (req, res, next)=>{
    const {title, creator} = req.body;
    const id = uuid();
    const createdMovie = {
        id,
        title,
        creator
    };
    DUMMY_MOVIES.push(createdMovie);
    res.status(201).json({movie: createdMovie});

    res.json({movie});
};

const updateMovie = (req, res, next)=>{
    const {title} = req.body;
    const movieId = req.params.mid;

    const updatedMovie = {... DUMMY_MOVIES.find(m => m.id === movieId)};
    const moviesIndex = DUMMY_MOVIES.findIndex(m => m.id === movieId);

    updatedMovie.title = title;

    DUMMY_MOVIES[moviesIndex] = updatedMovie;
};

const deleteMovie = (req, res, next)=>{
    const movieId = req.params.mid;
    DUMMY_MOVIES = DUMMY_MOVIES.filter(m => m.id !== movieId)
    res.status(200).json({message: 'Película eliminada exitosamente'});
};

exports.getAllMovies = getAllMovies;
exports.getMovieById = getMovieById;
exports.getMovieByCreator = getMovieByCreator;
exports.saveMovie = saveMovie;
exports.updateMovie = updateMovie;
exports.deleteMovie = deleteMovie;