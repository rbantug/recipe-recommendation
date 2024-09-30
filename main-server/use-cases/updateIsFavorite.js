export default function makeUpdateIsFavorite({ recipesDB, isValid }) {
    return async function updateIsFavorite(userId, recipeId, isFavorite) {
        if (!isValid(userId)) {
            throw new Error('This is not a valid recipe id')
        }

        const result = await recipesDB.updateIsFavorite(userId, recipeId, isFavorite)

        return result
    }
}