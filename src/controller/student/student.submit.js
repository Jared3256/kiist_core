import asyncHandler from "express-async-handler";
import studentProfileModel from "../../models/student/student.js";
import RegisterStudentAsUser from "./student.register.use.js";
import RegistrationNumberAllotment from "./utils/RegistrationNumberAllotment.js";

const submitStudentApplication = asyncHandler(async (req, res) => {
    const {id} = req.params;

    if (String(id).length !== 24) {
        return res.status(412).json({
            message: "Invalid Student Id received",
            success: false,
            data: null
        })
    }

    const profile = await studentProfileModel.findById(id);

    if (!profile) {
        return res.status(412).json({
            success: false,
            data: null,
            message: "Id does not match any student profile"
        })
    }
    const sections = ['personalDetails', 'contactAddress', 'academicBackground',"programSelection"]//, 'paymentInfo'];
    const missing = sections.filter(s => !profile[s]);
    if (missing.length) {
        return res.status(400).json({
            success: false,
            message: `Cannot finalize: missing sections ${missing.join(', ')}.`
        });
    }
    // e.g. set a flag or move profile to “active” collection, etc.
    profile.isComplete = true;
    const profileRes = await profile.save()
    console.log("Student Result ", profileRes)

    // // Generate a new Registration for the student
    if (!profile.regNumberGiven) {
        const regNumber = await RegistrationNumberAllotment(profile.programSelection.level, res)

        profile.registrationNumber = regNumber;
        profile.regNumberGiven = true
        await profile.save();
    }


    // Call StudentUser
    await RegisterStudentAsUser(
        profile.contactAddress.email,
        profile.registrationNumber,
        profile.personalDetails.nationalId,
        profile.personalDetails.gender,
        profile.personalDetails.firstname + " " + profile.personalDetails.middlename + " " + profile.personalDetails.lastname,
        profile.role,
        res)
})

export default submitStudentApplication;