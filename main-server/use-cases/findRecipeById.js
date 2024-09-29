export default function makeFindRecipeById({ recipesDB }) {
    return async function findRecipeById(recipeId) {
        if(recipeId.length !== 24) {
            throw new Error('This is not a valid recipe id')
        }

        const result = await recipesDB.findOneRecipe({ id: recipeId })

        return result
    }
}