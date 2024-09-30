export default function makeFindRecipeById({ recipesDB, isValid }) {
    return async function findRecipeById(recipeId) {
        if(!isValid(recipeId)) {
            throw new Error('This is not a valid recipe id')
        }

        const result = await recipesDB.findOneRecipe({ id: recipeId })

        return result
    }
}