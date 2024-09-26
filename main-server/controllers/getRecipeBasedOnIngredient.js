export default function makeGetRecipeBasedOnIngredient(findRecipeBasedOnIngredient) {
    return async function getRecipeBasedOnIngredient(httpRequest) {
        const headers = {
            'Content-Type': 'application/json'
        }

        try {
            const { ingredients, ...body } = httpRequest.body

            const data = await findRecipeBasedOnIngredient(ingredients)

            return {
                headers,
                statusCode: 200,
                status: 'success',
                data
            }
        } catch (error) {
            return {
                headers,
                statusCode: 400,
                status: 'fail',
                message: error.message
            }
        }
    }
}