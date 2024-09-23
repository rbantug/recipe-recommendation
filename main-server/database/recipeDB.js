export default function makeRecipeDb({ recipesCollection }) {
    // findAll

    async function findAll() {
        let data = [];
        const query = {}
        const documentCount = await recipesCollection?.countDocuments(query)
        const cursor = await recipesCollection?.find(query)

        if (documentCount !== 0) {
            let i = 0;
            for await (let doc of cursor) {
                data[i] = doc;
                i++
            }
        }
        return data
    }
    // findOne

    async function findOneRecipe(query) {
        const data = await recipesCollection?.findOne(query)

        if (data === null) {
            throw new Error('The recipe does not exist');
        }

        return data;
    }

    // update recipe (specifically the isFavorite array)

    // aggregate find
    async function findRecipesBasedOnIngredients(ingredients) {
        let data = [];

        const pipeline = [
            { $match: { ingredients } }
        ]

        const aggCursor = recipesCollection.aggregate(pipeline)

        let i = 0;
        for await (let doc of aggCursor) {
            data[i] = doc
            i++;
        }

        return data;
    }

    // insert recipe for TESTING ONLY

    async function insertManyRecipes(recipeArr) {
        return recipesCollection.insertMany(recipeArr, {
            ordered: true,
        })
    }

    return Object.freeze({
        findAll,
        findOneRecipe,
        insertManyRecipes,
        findRecipesBasedOnIngredients,
    })
}