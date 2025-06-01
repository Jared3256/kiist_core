import asyncHandler from "express-async-handler";
import getNextSequence from "./getNextSequence.js";
import formatRegNumber from "./formatRegNumber.js";

const RegistrationNumberAllotment = asyncHandler(async (level, res) => {
//     Generate the registration number to the student
    let registrationNumber = ""
    const {seq, year} = await getNextSequence(level, res);
    registrationNumber = await formatRegNumber(level, seq, year)

    return registrationNumber
})

export default RegistrationNumberAllotment