export default function makeFindOneRecipeByName({ recipesDB }) {
    return async function findOneRecipeByName({ recipeName }) {
        const result = await recipesDB.findOneRecipe(recipeName)
        return result
    }
}