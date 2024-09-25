export default function makeFindRecipeByName({ recipesDB }) {
    return async function findRecipeByName({ recipeName }) {
        if(typeof recipeName !== 'string') {
            throw new Error('This is not a valid recipe name.')
        }

        const result = await recipesDB.findOneRecipe(recipeName)
        return result
    }
}