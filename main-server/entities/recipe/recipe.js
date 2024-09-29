/**
 * This is a factory function that will return another function. makeRecipe() will be exported to the use-case and test file for recipe.js
 * @param { Object } joi - Schema validation for Javascript objects 
 * @returns { Function } - returns the function makeRecipe(). makeRecipe() will run schema validation using Joi. It returns an object that can't be changed outside the entity. The only thing we can do is get the properties by running methods like getRecipeName()
 */

function buildMakeRecipe({
  joi,
}) {
  return function makeRecipe({
    id,
    recipeName,
    cuisine,
    sourceWebsite,
    url,
    imgUrl,
    description,
    ingredients,
    isFavorite,
  }) {
    const schema = joi.object({
      id: joi.string().length(24).required(),
      recipeName: joi.string().min(1).max(100).required(),
      cuisine: joi.string().valid('Chinese').required(),
      sourceWebsite: joi.string().valid('Made with Lau').required(),
      url: joi.string().uri().required(),
      imgUrl: joi.string().uri().required(),
      description: joi.string().trim().min(1).required(),
      ingredients: joi.array().min(1).required(),
      isFavorite: joi.array().required(),
    });

    const { error, value } = schema.validate({
      id,
      recipeName,
      cuisine,
      sourceWebsite,
      url,
      imgUrl,
      description,
      ingredients,
      isFavorite,
    }, { convert: false });

    if (error) {
      throw new Error(error);
    }

    return Object.freeze({
      getId: () => id,
      getRecipeName: () => recipeName,
      getCuisine: () => cuisine,
      getSourceWebsite: () => sourceWebsite,
      getUrl: () => url,
      getImgUrl: () => imgUrl,
      getDescription: () => description,
      getIngredients: () => ingredients,
      getIsFavorite: () => isFavorite,
    });
  };
}

export default buildMakeRecipe
