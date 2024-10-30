import axios from "axios"

export default function makePatchUpdateIsFavorite(updateIsFavorite) {
    return async function patchUpdateIsFavorite(httpRequest) {
        const headers = {
            'Content-Type': 'application/json'
        }

        try {
            const recipeId = httpRequest.params.id

            // the main server will send a recipeId
            /*  the auth server will send an acknowledgement and the userId to the main server

            something like this:

            {
                isLoggedIn: true,
                userId: 'dw2asxasdd'
            }

            */
            const {data: userData} = await axios({
                method: 'get',
                url: 'http://localhost:7000/auth'
            })

            if(!userData.isLoggedIn) throw new Error('User is not authenticated')

            const data = await updateIsFavorite(userData.userId, recipeId)

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