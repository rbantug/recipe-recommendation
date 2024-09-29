import { createId, isCuid } from "@paralleldrive/cuid2";

const identity = Object.freeze({
    makeId: createId,
    // isValidId: isCuid worthless! Any string is a valid cuid.
})

export default identity;