export default function makeUpdateIsFavorite({ recipesDB }) {
    return async function updateIsFavorite(userId, recipeId, isFavorite) {
        if (userId.length !== 24) {
            throw new Error('This is not a valid recipe id')
        }

        const result = await recipesDB.updateIsFavorite(userId, recipeId, isFavorite)

        return result
    }
}