import makeListAllRecipes from "./listAllRecipes.js";
import makeFindOneRecipeByName from "./findOneRecipeByName.js";
import recipesDB from "../database/index.js";

const listAllRecipes = makeListAllRecipes({ recipesDB });
const findOneRecipeByName = makeFindOneRecipeByName({ recipesDB })

const recipeService = Object.freeze({
    listAllRecipes,
    findOneRecipeByName
})

export default recipeService;