import { createId, isCuid } from "@paralleldrive/cuid2";

const identity = Object.freeze({
    makeId: createId,
    isValidId: isCuid 
})

export default identity;