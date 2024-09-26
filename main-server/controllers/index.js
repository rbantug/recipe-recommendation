import recipeService from "../use-cases/index.js";
import makeGetAllRecipes from "./getAllRecipes.js";
import makeGetRecipeById from "./getRecipeById.js";
import makeGetRecipeByName from "./getRecipeByName.js";
import makeGetRecipeBasedOnIngredient from "./getRecipeBasedOnIngredient";
import makePatchUpdateIsFavorite from "./patchUpdateIsFavorite.js";

const getAllRecipes = makeGetAllRecipes(recipeService.findAllRecipes)
const getRecipeById = makeGetRecipeById(recipeService.findRecipeById)
const getRecipeByName = makeGetRecipeByName(recipeService.findRecipeByName)
const getRecipeBasedOnIngredient = makeGetRecipeBasedOnIngredient(recipeService.findRecipeBasedOnIngredient)
const patchUpdateIsFavorite = makePatchUpdateIsFavorite(recipeService.updateIsFavorite)

const recipeController = Object.freeze({
    getAllRecipes,
    getRecipeById,
    getRecipeByName,
    getRecipeBasedOnIngredient,
    patchUpdateIsFavorite
})

export default recipeController;