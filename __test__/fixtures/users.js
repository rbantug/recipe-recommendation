import { faker } from '@faker-js/faker';

import identity from '../../utils/id.js';

export default function makeFakeUser(overrides) {

    const firstName = faker.person.firstName()
    const lastName = faker.person.lastName()

    const user = {
        id: identity.makeId(),
        email: faker.internet.email(),
        fullName: `${firstName} ${lastName}`,
        userName: faker.internet.displayName({
            firstName: firstName,
            lastName: lastName
        }), 
        role: faker.helpers.arrayElement(['user', 'admin']),
        password: faker.internet.password({
            length: 10
        }),
        favoriteRecipes: Array.from({ length: Math.floor(Math.random() * 5) }, () => faker.string.alphanumeric({ length: 24 })),
        createdAt: new Date(),
        lastModified: faker.date.soon(),
        active: faker.datatype.boolean(0.9)
    }

    return {
        ...user,
        ...overrides
    }
}