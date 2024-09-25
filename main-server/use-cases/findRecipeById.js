export default function makeFindRecipeById({ recipesDB, ObjectId }) {
    return async function findRecipeById({ recipeId }) {
        if(!ObjectId.isValid(recipeId)) {
            throw new Error('This is not a valid recipe id')
        }

        const result = await recipesDB.findOneRecipe({ _id: recipeId })

        return result
    }
}