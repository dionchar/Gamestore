const express = require('express');
const router = express.Router();

const REPLACE_ME = 'HELP REPLACE ME!!!!';

const { getAllVideoGames,
    getVideoGameById,
    createVideoGame,
    updateVideoGame,
    deleteVideoGame } = require('../db/videoGames');

// GET - /api/video-games - get all video games
router.get('/', async (req, res, next) => {
    try {
        const videoGames = await getAllVideoGames();
        res.send(videoGames);
    } catch (error) {
        next(error);
    }
});

// GET - /api/video-games/:id - get a single video game by id
router.get('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const videoGame = await getVideoGameById(id);
        res.send(videoGame);
    } catch (error) {
        next(error);
    }
});

// POST - /api/video-games/create-game - create a new video game
router.patch('/', async (req, res, next) => {
    const database = require('../db/videoGames'); // Replace with your actual database library

    // Function to create a video game in the database
    async function insertVideoGame(gameData) {
        try {
            const newGame = await database.createVideoGame(gameData); // Use the appropriate method from your database library
            console.log('Video game created:', newGame);
            return newGame;
        } catch (error) {
            console.error('Error creating video game:', error);
            throw error;
        }
    }
    // Example data for the new video game
    const newGameInfo = {
        title: 'Awesome Game',
        genre: 'Action',
        platform: 'PlayStation 5',
        releaseYear: 2023
    };
    
    // Call the function to create the video game
    createVideoGame(newGameInfo);
    

     
});


// PUT - /api/video-games/:id - update a single video game by id
router.put('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const updatedGameInfo = req.body; // Assuming the updated data is sent in the request body

        const updatedGame = await updateVideoGame(id, updatedGameInfo); // Call the appropriate update method from your database library
        if (updatedGame) {
            res.send(updatedGame);
        } else {
            res.status(404).json({ error: 'Video game not found' });
        }
    } catch (error) {
        next(error);
    }
});

// DELETE - /api/video-games/:id - delete a single video game by id
router.delete('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;

        const deletedGame = await deleteVideoGame(id); // Call the appropriate delete method from your database library
        if (deletedGame) {
            res.json({ message: 'Video game deleted successfully' });
        } else {
            res.status(404).json({ error: 'Video game not found' });
        }
    } catch (error) {
        next(error);
    }
});

module.exports = router;
