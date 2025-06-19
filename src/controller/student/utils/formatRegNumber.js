import asyncHandler from "express-async-handler";

const formatRegNumber = asyncHandler(async (level, seq, year) => {
    const padded = String(seq).padStart(4, 0)

    return `KIIST/${level}/${padded}/${year}`
})

export default formatRegNumber
