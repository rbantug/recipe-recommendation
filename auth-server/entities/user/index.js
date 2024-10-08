import joi from "joi";

import buildMakeUser from "./user.js";

const makeUser = buildMakeUser({ joi })

export default makeUser