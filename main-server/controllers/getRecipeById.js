export default function makeGetRecipeById(findRecipeById) {
    return async function getRecipeById(httpRequest) {
        const headers = {
            'Content-Type': 'application/json'
        }

        try {
            const recipeId = httpRequest.params.id

            const data = await findRecipeById(recipeId)

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
                message: error.message,
                stack: error.stack
            }
        }
    }
}