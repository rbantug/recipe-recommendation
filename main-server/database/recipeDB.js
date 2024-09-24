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

    /**
     * Update recipe (specifically the isFavorite array)
     * @param {String} userId 
     * @param {String} recipeId 
     * @param {Array} isFavorite 
     * @returns
     */

    async function updateIsFavorite(userId, recipeId, isFavorite) {
        /* if (!ObjectId.isValid(userId)) {
            throw new Error('This is not a valid MongoDB id')
        } */

        const query = { _id: recipeId };
        const update = { $set: { isFavorite: [...isFavorite, userId] } }
        const option = { upsert: false }

        const data = await recipesCollection.updateOne(query, update, option)

        /* if (data.modifiedCount === 0) {
            throw new Error('The document does not exist')
        } */

        return data;

    }

    // aggregate find
    async function findRecipesBasedOnIngredients(queryIngredients) {
        let data = [];

        const pipeline = [
            {
                $match: {
                    ingredients: {
                        $in: [...queryIngredients]
                    }
                }
            }
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
        updateIsFavorite,
    })
}