export default function makeFindRecipesByName({ recipesDB }) {
    return async function findRecipesByName( recipeName) {
        if(typeof recipeName !== 'string') {
            throw new Error('This is not a valid recipe name.')
        }

        const query = {
            recipeName: {
                $regex: `${recipeName}`
            }
        }

        const result = await recipesDB.findAll(query)
        return result
    }
}