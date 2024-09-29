import makeFindAllRecipes from "./findAllRecipes.js";
import makeFindRecipesByName from "./findRecipesByName.js";
import makeFindRecipeBasedOnIngredient from "./findRecipeBasedOnIngredient.js";
import makeFindRecipeById from "./findRecipeById.js";
import makeUpdateIsFavorite from "./updateIsFavorite.js";
import recipesDB from "../database/index.js";

const findAllRecipes = makeFindAllRecipes({ recipesDB });
const findRecipesByName = makeFindRecipesByName({ recipesDB })
const findRecipeBasedOnIngredient = makeFindRecipeBasedOnIngredient({ recipesDB })
const findRecipeById = makeFindRecipeById({ recipesDB })
const updateIsFavorite = makeUpdateIsFavorite({ recipesDB })

const recipeService = Object.freeze({
    findAllRecipes,
    findRecipesByName,
    findRecipeBasedOnIngredient,
    findRecipeById,
    updateIsFavorite
})

export default recipeService;