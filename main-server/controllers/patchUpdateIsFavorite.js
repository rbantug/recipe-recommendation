export default function makePatchUpdateIsFavorite(updateIsFavorite) {
    return async function patchUpdateIsFavorite(httpRequest) {
        const headers = {
            'Content-Type': 'application/json'
        }

        try {
            const { ingredients, ...body } = httpRequest.body

            const data = await updateIsFavorite(ingredients)

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