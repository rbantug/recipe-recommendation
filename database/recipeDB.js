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
        const documentCount = await recipesCollection?.countDocuments(query)

        if(documentCount === 0) {
            throw new Error('The recipe does not exist');
        }

        const data = await recipesCollection?.findOne(query)

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

    // TODO: Refactor to make it a general purpose update method. Transfer the code that updates the isFavorite to the use case

    async function updateIsFavorite(userId, recipeId) {
        const query = { id: recipeId };

        // check if recipe exist
        const documentCount = await recipesCollection?.countDocuments(query)

        if(documentCount === 0) {
            throw new Error('The recipe does not exist');
        }

        const d = new Date()
        d.setSeconds(0,0)

        const { isFavorite } = await recipesCollection.findOne({ id: recipeId })

        const update = { $set: { isFavorite: [...isFavorite, userId], lastModified: d } }
        const option = { upsert: false, returnDocument: 'after' }

        const data = await recipesCollection.findOneAndUpdate(query, update, option)

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
        const toBeInserted = structuredClone(recipeArr)

        return recipesCollection.insertMany(toBeInserted, {
            ordered: true,
        })
    }

    async function deleteOneRecipe(query) {
        // check if there are documents that fits the query
        const documentCount = await recipesCollection.countDocuments(query)

        if(documentCount === 0) {
            throw new Error('This recipe does not exist')
        }

        if(documentCount > 1) {
            throw new Error('This query is invalid')
        }

        await recipesCollection.deleteOne(query)
        return 'recipe was deleted'
    }

    return Object.freeze({
        findAll,
        findOneRecipe,
        insertManyRecipes,
        findRecipesBasedOnIngredients,
        updateIsFavorite,
        deleteOneRecipe
    })
}