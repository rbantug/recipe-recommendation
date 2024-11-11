import makeUser from "../entities/user/index.js";

export default function makeAddUser({ usersDB, encrypt }) {
    return async function addUser(userInfo) {
        const user = makeUser({...userInfo, type: 'newUser'})

        const hashedPassword = await encrypt(user.getPassword())

        const date = new Date()
        date.setSeconds(0, 0)

        const newUser = await usersDB.insertUser({
            id: user.getId(),
            email: user.getEmail(),
            userName: user.getUserName(),
            fullName: user.getFullName(),
            role: user.getRole(),
            password: hashedPassword,
            passwordConfirm: null,
            passwordChangedAt: null,
            passwordResetToken: null,
            passwordResetExpires: null,
            favoriteRecipes: [],
            createdAt: date,
            active: true,
            lastModified: date
        })

        return newUser
    }
}