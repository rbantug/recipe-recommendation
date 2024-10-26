export default function makeUpdateIsFavorite({ recipesDB, isValid }) {
    return async function updateIsFavorite(userId, recipeId) {
        if (!isValid(recipeId)) {
            throw new Error('This is not a valid recipe id')
        }

        const result = await recipesDB.updateIsFavorite(userId, recipeId)

        return result
    }
}