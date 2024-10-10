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
        const data = await usersCollection?.findOne({ query })

        if (data === null) {
            throw new Error('The user does not exist');
        }

        const { _id, ...modifiedData } = data

        return modifiedData;
    }

    // create single user

    async function insertUser({ ...userInfo }) {
        const insertData = structuredClone({ userInfo })

        const data = await usersCollection.insertOne(insertData)

        return data
    }

    // update single user

    async function updateUser(userId, userInfo) {
        const query = { id: userId }
        const d = new Date()
        d.setSeconds(0, 0)
        // FIXME: lastModified could be duplicated if updateUser runs. This code might fail.
        const update = {
            $set: {
                ...userInfo,
                lastModified: d
            }
        }
        const option = {
            upsert: false,
            returnDocument: 'after',
            projection: { password: 0, passwordConfirm: 0 }
        }

        const data = await usersCollection.findOneAndUpdate(query, update, option)

        if (!data) throw new Error('The user does not exist')

        const { _id, ...modifiedData } = data
        return modifiedData

    }

    // delete user

    async function deleteUser(query) {
        await usersCollection.deleteOne(query)
    }

    return Object.freeze({
        findAll,
        findOneUser,
        insertUser,
        updateUser,
        deleteUser
    })
}