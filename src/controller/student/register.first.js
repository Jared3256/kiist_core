import asyncHandler from "express-async-handler";
import studentProfileModel from "../../models/student/student.js";
import {parse} from "date-fns"

const RegisterNewStudent = asyncHandler(async (req, res) => {
   const {
firstname, middlename, lastname,dateOfBirth, gender, nationalId,placeOfBirth
   } = req.body

    if(!firstname || !lastname || !gender || !nationalId || !placeOfBirth.county || !placeOfBirth.townOrVillage){
        return  res.status(400).json({
            message:"Ensure to input all required fields",
            success:false,
            data:null
        })
    }

    // Check if there is a student with the provided details
    const foundStudent = await studentProfileModel.findOne({
"personalDetails.nationalId":nationalId
    })
    console.log("found student in the database",foundStudent)

    if(foundStudent){
        return res.status(409).json({
            message:"Student with that nationalId is already registered",
        })
    }

    // Check the length of the national Id
    if(String(nationalId).length > 12 || nationalId.length < 8){
        return res.status(400).json({
            message:"Invalid national Id provided",
            success:false,
            data:null
        })

    }

    const result = await new studentProfileModel({
        personalDetails: {
            firstname, middlename, lastname,dateOfBirth:parse(dateOfBirth,"dd/MM/yyyy", new Date())
            , gender, nationalId,placeOfBirth
        }
    }).save()

    if(!result){
        return res.status(403).json({
            message:"Problem saving student personal Details",
            success:false,
            data:null
        })
    }

    // TODO: create a user for the student

    return res.status(201).json({
        status: "success",
        message: "Register new student",
        data:req.body
    })
})

export default RegisterNewStudent