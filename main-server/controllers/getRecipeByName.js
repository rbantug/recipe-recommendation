export default function makeGetRecipeByName(findRecipeByName) {
    return async function getRecipeByName(httpRequest) {
        const headers = {
            'Content-Type': 'application/json'
        }

        try {
            const {recipeName, ...body} = httpRequest.body

            const data = await findRecipeByName(recipeName)

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