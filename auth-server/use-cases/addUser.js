import makeUser from "../entities/user";

export default function makeAddUser({ usersDB, encrypt }) {
    return async function addUser(userInfo) {
        const user = makeUser(userInfo)

        const hashedPassword = await encrypt(user.getPassword())

        const newUser = await usersDB.insertUser({
            id: user.getId(),
            email: user.getEmail(),
            userName: user.getUserName(),
            fullName: user.getFullName(),
            role: user.getRole(),
            password: hashedPassword,
            passwordConfirm: null,
            passwordChangedAt: user.getPasswordChangedAt(),
            passwordResetToken: user.getPasswordResetToken(),
            passwordResetExpires: user.getPasswordResetExpires(),
            favoriteRecipes: user.getFavoriteRecipes(),
            createdAt: user.getCreatedAt(),
            active: user.getActive(),
            lastModified: user.getLastModified()
        })

        return newUser
    }
}