export default function buildMakeRecipe({
  joi,
}) {
  return function makeRecipe({
    recipeName,
    cuisine,
    sourceWebsite,
    url,
    imgUrl,
    description,
    ingredients,
    isFavorite,
  } = {}) {
    const schema = joi.object({
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
