import joi from "joi";

import buildMakeUser from "./user.js";
import identity from "../../../utils/id.js";
identity

const makeUser = buildMakeUser({ joi, makeId: identity.makeId })

export default makeUser