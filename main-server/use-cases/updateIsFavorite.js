export default function makeUpdateIsFavorite({ recipesDB, ObjectId }) {
    return async function updateIsFavorite(userId, recipeId, isFavorite) {
        if (!ObjectId.isValid(userId)) {
            throw new Error('This is not a valid recipe id')
        }

        const result = await recipesDB.updateIsFavorite(userId, recipeId, isFavorite)

        if (result.modifiedCount === 0) {
            throw new Error('The recipe does not exist')
        }

        return result
    }
}