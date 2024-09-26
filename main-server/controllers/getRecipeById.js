export default function makeGetRecipeById(findRecipeById) {
    return async function getRecipeById(httpRequest) {
        const headers = {
            'Content-Type': 'application/json'
        }

        try {
            const {recipeId, ...body} = httpRequest.body

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
                message: error.message
            }
        }
    }
}