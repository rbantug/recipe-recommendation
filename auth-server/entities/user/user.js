/**
 * This is a factory function that will return another function. makeUser() will be exported to the use-case and test file for user.js
 * @param { Object } joi - Schema validation for Javascript objects 
 * @returns { Function } - returns the function makeUser(). makeUser() will run schema validation using Joi. It returns an object that can't be changed outside the entity. The only thing we can do is get the properties by running methods like getId()
 */

function buildMakeUser({
    joi,
  }) {
    return function makeUser({
      id,
      email,
      username,
      fullName,
      role,
      password,
      passwordConfirm,
      passwordChangedAt,
      passwordResetToken,
      passwordResetExpires,
      favoriteRecipes,
      createdAt,
      lastModified,
      active

    }) {
      const schema = joi.object({
        id: joi.string().length(24).required(),
        email: joi.string().email().required(),
        userName: joi.string().length(50).required(),
        fullName: joi.string().length(50).required(),
        role: joi.string().valid(['user', 'admin']).required(),
        password: joi.string().min(6).max(20).required(),
        passwordConfirm: joi.string().min(6).max(20).required(),
        passwordChangedAt: joi.date(),
        passwordResetToken: joi.string(),
        passwordResetExpires: joi.date(),
        favoriteRecipes: joi.array(),
        createdAt: joi.date(),
        active: joi.boolean(),
        lastModified: joi.date()
      });
  
      const { error, value } = schema.validate({
        id,
        email,
        userName,
        fullName,
        role,
        password,
        passwordConfirm,
        passwordChangedAt,
        passwordResetToken,
        passwordResetExpires,
        favoriteRecipes,
        createdAt,
        active,
        lastModified
      }, { convert: false });
  
      if (error) {
        throw new Error(error);
      }
  
      return Object.freeze({
        getId: () => id,
        getEmail: () => email,
        getFullName: () => fullName,
        getUserName: () => userName,
        getRole: () => role,
        getFavoriteRecipes: () => favoriteRecipes,
        getCreatedAt: () => createdAt,
        getLastModified: () => lastModified,
        getActive: () => active
      });
    };
  }
  
  export default buildMakeUser
  