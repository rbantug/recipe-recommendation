export default function makeSignToken({ createToken }) {
    return async function signToken({ userInfo }) {
        return createToken.sign(userInfo.id)
    }
}

