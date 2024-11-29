export default function makeGetAllRecipes(findAllRecipes) {
    return async function getAllRecipes() {
        const headers = {
            'Content-Type': 'application/json'
        }

        try {
            const data = await findAllRecipes()

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