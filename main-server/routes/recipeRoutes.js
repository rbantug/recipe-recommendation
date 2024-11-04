import express from 'express';
import makeExpressCallback from '../../utils/express-callback.js';
import recipeController from '../controllers/index.js';
import userController from '../../auth-server/controllers/index.js';

// middlewares
import makeProtectRoute from '../../auth-server/controllers/middlewares/protectRoute.js';
import makeRestrictedTo from '../../auth-server/controllers/middlewares/restrictedTo.js';

// use case
import userService from '../../auth-server/use-cases/index.js';

// utils
import token from '../../utils/token.js';


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
        makeProtectRoute(userService.listUserById, token.verifyToken),
        makeRestrictedTo('user'),
        makeExpressCallback(recipeController.patchUpdateIsFavorite),
    )

export default recipeRouter;