export default function makeRecipeDb({ recipesCollection }) {
    /**
     * Returns all the recipe in the collection. It accept an optional query object.
     * @param {Object} query - the default is an empty object 
     * @returns {Promise<any>}
     */

    async function findAll(query = {}) {
        let data = [];
        const documentCount = await recipesCollection?.countDocuments(query)
        const cursor = await recipesCollection?.find(query)

        if (documentCount !== 0) {
            let i = 0;
            for await (let doc of cursor) {
                const { _id, ...modifiedDoc } = doc
                data[i] = modifiedDoc;
                i++
            }
        }
        return data
    }

    /**
     * Returns one recipe. It requires a query parameter.
     * @param {Object} query 
     * @returns {Promise<any>}
     */

    async function findOneRecipe(query) {
        const data = await recipesCollection?.findOne(query)

        if (data === null) {
            throw new Error('The recipe does not exist');
        }

        const { _id, ...modifiedData } = data

        return modifiedData;
    }

    /**
     * Update recipe (specifically the isFavorite array)
     * @param {String} userId - The ObjectId of the current user
     * @param {String} recipeId - The ObjectId of the current recipe
     * @param {Array} isFavorite - An array of MongoDB ObjectId from users
     * @returns {Promise<any>}
     */

    async function updateIsFavorite(userId, recipeId, isFavorite) {
        const query = { id: recipeId };
        const d = new Date()
        d.setSeconds(0, 0)
        const update = { $set: { isFavorite: [...isFavorite, userId], lastModified: d } }
        const option = { upsert: false, returnDocument: 'after' }

        const data = await recipesCollection.findOneAndUpdate(query, update, option)

        if(!data) throw new Error('The recipe does not exist')

        const { _id, ...modifiedData } = data
        return modifiedData;
    }

    /**
     * Finds recipes based on a list of ingredients. The plan is to use some sort of weight to easily sort the most relevent search result.
     * @param {Array} queryIngredients - an array of ingredients
     * @returns {Promise<any>}
     */
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
            const { _id, ...modifiedDoc } = doc
            data[i] = modifiedDoc
            i++;
        }

        return data;
    }

    // 

    /**
     * Insert multiple recipes for TESTING ONLY
     * @param {Array} recipeArr 
     * @returns {Promise<any>}
     */
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