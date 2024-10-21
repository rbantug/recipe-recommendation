export default function makeUserDb({ usersCollection }) {
    // findAll

    async function findAll(query = {}) {
        let data = [];
        const option = { projection: { password: 0, passwordConfirm: 0 } }

        const documentCount = await usersCollection?.countDocuments(query)
        const cursor = await usersCollection?.find(query, option)

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
    // findOne

    async function findOneUser(query) {
        const documentCount = await usersCollection?.countDocuments(query)

        if(documentCount === 0) {
            throw new Error('The user does not exist')
        }

        const data = await usersCollection?.findOne(query)

        const { _id, ...modifiedData } = data

        return modifiedData;
    }

    // create single user

    async function insertUser(userInfo) {
        const insertData = structuredClone(userInfo)

        const data = await usersCollection.insertOne(insertData)

        return data
    }

    // update single user

    async function updateUser(userId, userInfo) {
        // check if user exist in the database
        const documentCount = await usersCollection?.countDocuments({
            id: userId
        })

        if(documentCount === 0) {
            throw new Error('The user does not exist')
        }
        // check if userInfo to be updated contains "password", "confirmPassword" or "id" properties

        if(userInfo.type !== 'updatePassword' || userInfo.id) {
            const props = Object.keys(userInfo)
            for (let x of props) {
                if(x === 'password' || x === 'confirmPassword' || x === 'id') {
                    throw new Error('You can\'t change these properties')
                }
            }
        }

        delete userInfo.type

        const query = { id: userId }
        const d = new Date()
        d.setSeconds(0,0)
        const update = {
            $set: {
                ...userInfo,
                lastModified: d
            }
        }
        const option = {
            upsert: false,
            returnDocument: 'after',
            //projection: { password: 0, passwordConfirm: 0 }
        }

        const data = await usersCollection.findOneAndUpdate(query, update, option)

        const { _id, ...modifiedData } = data
        return modifiedData

    }

    // delete user

    async function deleteUser(query) {
        // check if there are documents that fits the query
        const documentCount = await usersCollection?.countDocuments(query)

        if(documentCount === 0) {
            throw new Error('This user does not exist')
        }

        if(documentCount > 1) {
            throw new Error('This query is invalid')
        }

        await usersCollection.deleteOne(query)
        return 'User was deleted'
    }

    return Object.freeze({
        findAll,
        findOneUser,
        insertUser,
        updateUser,
        deleteUser
    })
}