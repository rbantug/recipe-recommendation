/**
 * This is a factory function that will return another function. makeUser() will be exported to the use-case and test file for user.js
 * @param { Object } joi - Schema validation for Javascript objects 
 * @returns { Function } - returns the function makeUser(). makeUser() will run schema validation using Joi. It returns an object that can't be changed outside the entity. The only thing we can do is get the properties by running methods like getId()
 */

function buildMakeUser({
  joi
}) {
  return function makeUser({
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
    favoriteRecipes = [],
    createdAt = Date.now(),
    lastModified,
    active = true,
    type
  } = {}) {
    const newUserSchema = joi.object({
      id: joi.string().length(24).required(),
      email: joi.string().email().required(),
      userName: joi.string().max(50).required(),
      fullName: joi.string().max(50).required(),
      role: joi.string().valid('user', 'admin').required(),
      password: joi.string().min(6).required(),
      passwordConfirm: joi.string().custom((value, helper) => {
        if (value !== password) {
          return helper.message('"passwordConfirm" is not the same with "password"')
        }
      }),
      passwordChangedAt: joi.date(),
      passwordResetToken: joi.string(),
      passwordResetExpires: joi.date(),
      favoriteRecipes: joi.array(),
      createdAt: joi.date(),
      active: joi.boolean(),
      lastModified: joi.date(),
      type: 'newUser'
    });

    const updatePasswordSchema = joi.object({
      password: joi.string().min(6).required(),
      passwordConfirm: joi.string().custom((value, helper) => {
        if (value !== password) {
          return helper.message('"passwordConfirm" is not the same with "password"')
        }
      }),
      type: 'updatePassword'
    })

    const conditionalSchema = joi.any().when('.type', {
      switch: [
        { is: 'newUser', then: newUserSchema },
        { is: 'updatePassword', then: updatePasswordSchema }
      ]
    })  

    if (type === 'newUser') {

      const { error, value } = conditionalSchema.validate({
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
        lastModified,
        type
      }, { convert: false })
  
      if (error) {
        throw new Error(error);
      }
    }

      if (type === 'updatePassword') {

        const { error, value } = conditionalSchema.validate({
          password,
          passwordConfirm,
          type
        }, { convert: false })
    
        if (error) {
          throw new Error(error);
        }
        
      }

      return Object.freeze({
        getId: () => id,
        getEmail: () => email,
        getFullName: () => fullName,
        getUserName: () => userName,
        getRole: () => role,
        getPassword: () => password,
        getPasswordConfirm: () => passwordConfirm,
        getPasswordChangedAt: () => passwordChangedAt,
        getPasswordResetToken: () => passwordResetToken,
        getPasswordResetExpires: () => passwordResetExpires,
        getFavoriteRecipes: () => favoriteRecipes,
        getCreatedAt: () => createdAt,
        getLastModified: () => lastModified,
        getActive: () => active,
        getType: () => type
      });
    };
  }

export default buildMakeUser
