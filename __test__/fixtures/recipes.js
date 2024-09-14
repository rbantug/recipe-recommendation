import { faker } from '@faker-js/faker';

export default function makeFakeRecipe(overrides) {

    const recipe = {
        recipeName: faker.lorem.words({ min: 1, max: 3 }),
        cuisine: faker.helpers.arrayElement(['Chinese']),
        sourceWebsite: faker.lorem.words({ min: 1, max: 3 }),
        url: faker.internet.url(),
        imgUrl: faker.image.url(),
        desciption: faker.food.description(),
        ingredients: Array.from({ length: Math.round(Math.random() * 20) }, () => faker.food.ingredient()),
        isFavorite: Array.from({ length: Math.floor(Math.random() * 5) }, () => faker.string.alphanumeric({ length: 24 }))
    };

    return {
        ...recipe,
        ...overrides
    }
}