import { ObjectId } from "mongodb";

import makeFindAllRecipes from "./findAllRecipes.js";
import makeFindRecipeByName from "./findRecipeByName.js";
import makeFindRecipeBasedOnIngredient from "./findRecipeBasedOnIngredient.js";
import makeFindRecipeById from "./findRecipeById.js";
import makeUpdateIsFavorite from "./updateIsFavorite.js";
import recipesDB from "../database/index.js";

const findAllRecipes = makeFindAllRecipes({ recipesDB });
const findRecipeByName = makeFindRecipeByName({ recipesDB })
const findRecipeBasedOnIngredient = makeFindRecipeBasedOnIngredient({ recipesDB })
const findRecipeById = makeFindRecipeById({ recipesDB, ObjectId })
const updateIsFavorite = makeUpdateIsFavorite({ recipesDB, ObjectId })

const recipeService = Object.freeze({
    findAllRecipes,
    findRecipeByName,
    findRecipeBasedOnIngredient,
    findRecipeById,
    updateIsFavorite
})

export default recipeService;