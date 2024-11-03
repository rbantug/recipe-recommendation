export default function makePatchUpdateIsFavorite({ updateIsFavorite }) {
    return async function patchUpdateIsFavorite(httpRequest) {
        const headers = {
            'Content-Type': 'application/json'
        }

        try {
            const recipeId = httpRequest.params.id

            const data = await updateIsFavorite(httpRequest.user.id, recipeId)

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