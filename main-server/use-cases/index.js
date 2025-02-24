import makeFindAllRecipes from "./findAllRecipes.js";
import makeFindRecipesByName from "./findRecipesByName.js";
import makeFindRecipeBasedOnIngredient from "./findRecipeBasedOnIngredient.js";
import makeFindRecipeById from "./findRecipeById.js";
import makeUpdateIsFavorite from "./updateIsFavorite.js";
import { recipesDB } from "../../database/index.js"
import identity from "../../utils/id.js";

const findAllRecipes = makeFindAllRecipes({ recipesDB });
const findRecipesByName = makeFindRecipesByName({ recipesDB })
const findRecipeBasedOnIngredient = makeFindRecipeBasedOnIngredient({ recipesDB })
const findRecipeById = makeFindRecipeById({ recipesDB, isValid: identity.isValid })
const updateIsFavorite = makeUpdateIsFavorite({ recipesDB, isValid: identity.isValid })

const recipeService = Object.freeze({
    findAllRecipes,
    findRecipesByName,
    findRecipeBasedOnIngredient,
    findRecipeById,
    updateIsFavorite
})

export default recipeService;