export default function makeUserDb({ usersCollection }) {
    // findAll

    async function findAll() {
        let data = [];
        const query = {}
        const documentCount = await usersCollection?.countDocuments(query)
        const cursor = await usersCollection?.find(query)

        if (documentCount !== 0) {
            let i = 0;
            for await (let doc of cursor) {
                data[i] = doc;
                i++
            }
        }
        return data
    }
    // findOne

    async function findOneUser({ query }) {
        const data = await usersCollection?.findOne({ query })

        if (data === null) {
            throw new Error('The document does not exist');
        }

        return data;
    }

    // update recipe (specifically the isFavorite array)

    // aggregate find

    return Object.freeze({
        findAll,
        findOneUser
    })
}