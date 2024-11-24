export default function makeListUserByResetToken({ usersDB }) {
    return async function listUserByResetToken(resetToken) {   
        const result = await usersDB.findOneUser({
            passwordResetToken: resetToken,
            passwordResetExpires: { $gt: new Date() }
        })
        
        return result
    }
}