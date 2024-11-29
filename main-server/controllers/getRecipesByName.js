export default function makeGetRecipeByName(findRecipesByName) {
    return async function getRecipeByName(httpRequest) {
        const headers = {
            'Content-Type': 'application/json'
        }

        try {
            const recipeName = httpRequest.params.name

            const data = await findRecipesByName(recipeName)

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