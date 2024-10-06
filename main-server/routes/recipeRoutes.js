import express from 'express';
import makeExpressCallback from '../express-callback.js';
import recipeController from '../controllers/index.js';

const recipeRouter = express.Router()

recipeRouter
    .get('/ingredients', makeExpressCallback(recipeController.getRecipeBasedOnIngredient))

recipeRouter
    .get('/recipe-by-name/:name', makeExpressCallback(recipeController.getRecipesByName))

recipeRouter
    .route('/')
    .get(makeExpressCallback(recipeController.getAllRecipes))

recipeRouter
    .route('/recipe-by-id/:id')
    .get(makeExpressCallback(recipeController.getRecipeById))

recipeRouter
    .route('/:id')    
    .patch(makeExpressCallback(recipeController.patchUpdateIsFavorite))



export default recipeRouter;