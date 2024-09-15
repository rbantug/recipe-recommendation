import { faker } from '@faker-js/faker';

export default function makeFakeRecipe(overrides) {

    const recipe = {
        recipeName: faker.food.dish(),
        cuisine: faker.helpers.arrayElement(['Chinese']),
        sourceWebsite: faker.helpers.arrayElement(['Made with Lau']),
        url: faker.internet.url(),
        imgUrl: faker.image.url(),
        description: faker.food.description(),
        ingredients: Array.from({ length: Math.round(Math.random() * 20) + 1 }, () => faker.food.ingredient()),
        isFavorite: Array.from({ length: Math.floor(Math.random() * 5) }, () => faker.string.alphanumeric({ length: 24 }))
    };

    return {
        ...recipe,
        ...overrides
    }
}