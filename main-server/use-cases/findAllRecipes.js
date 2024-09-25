export default function makeFindAllRecipes({ recipesDB }) {
    return async function findAllRecipes() {
        const result = await recipesDB.findAll()
        return result
    }
}