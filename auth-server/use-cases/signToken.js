export default function makeSignToken({ createToken }) {
    return async function signToken({ userId }) {
        return createToken.sign(userId)
    }
}

