import express from 'express';
import makeExpressCallback from '../../utils/express-callback.js';
import makeMiddleware from '../../utils/express-middleware.js';
import recipeController from '../controllers/index.js';
import userController from '../../auth-server/controllers/index.js';

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
    .patch(
        makeMiddleware(userController.protectRoute),
        makeExpressCallback(recipeController.patchUpdateIsFavorite),
    )

export default recipeRouter;