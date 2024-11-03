import recipeService from "../use-cases/index.js";
import makeGetAllRecipes from "./getAllRecipes.js";
import makeGetRecipeById from "./getRecipeById.js";
import makeGetRecipesByName from "./getRecipesByName.js";
import makeGetRecipeBasedOnIngredient from "./getRecipeBasedOnIngredient.js";
import makePatchUpdateIsFavorite from "./patchUpdateIsFavorite.js";

const getAllRecipes = makeGetAllRecipes(recipeService.findAllRecipes)
const getRecipeById = makeGetRecipeById(recipeService.findRecipeById)
const getRecipesByName = makeGetRecipesByName(recipeService.findRecipesByName)
const getRecipeBasedOnIngredient = makeGetRecipeBasedOnIngredient(recipeService.findRecipeBasedOnIngredient)
const patchUpdateIsFavorite = makePatchUpdateIsFavorite({ updateIsFavorite: recipeService.updateIsFavorite })

const recipeController = Object.freeze({
    getAllRecipes,
    getRecipeById,
    getRecipesByName,
    getRecipeBasedOnIngredient,
    patchUpdateIsFavorite
})

export default recipeController;