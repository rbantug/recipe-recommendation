export default function makeListAllRecipes({ recipesDB }) {
    return async function listAllRecipes() {
        const result = await recipesDB.findAll()
        return result
    }
}