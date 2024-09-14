import joi from 'joi';

import buildMakeRecipe from './recipe.js';

const makeRecipe = buildMakeRecipe({ joi });

export default makeRecipe;
