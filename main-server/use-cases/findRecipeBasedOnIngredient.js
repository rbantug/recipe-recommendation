export default function makeFindRecipeBasedOnIngredient({ recipesDB }) {
    return async function findRecipeBasedOnIngredient(ingredients) {
        const result = await recipesDB.findRecipesBasedOnIngredients(ingredients)

        return result
    }
}