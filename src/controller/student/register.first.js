import asyncHandler from "express-async-handler";
import studentProfileModel from "../../models/student/student.js";
import { parse } from "date-fns";

const RegisterNewStudent = asyncHandler(async (req, res) => {
  const {
    title,
    firstname,
    middlename,
    lastname,
    dateOfBirth,
    gender,
    nationalId,
    email,
    mobilePhone,
    addressLine1,
    addressLine2,
    city,
    province,
    postalZip,
    country,
    emergency,
  } = req.body;

  if (
    !title ||
    !firstname ||
    !lastname ||
    !gender ||
    !nationalId ||
    !email ||
    !mobilePhone ||
    !addressLine1 ||
    !city ||
    !province ||
    !postalZip ||
    !emergency.fullname ||
    !emergency.mobilePhone
  ) {
    return res.status(400).json({
      message: "Ensure to input all required fields",
      success: false,
      data: null,
    });
  }

  // TODO in the future make sure that if a student tries to register and they have provided their national id or birth certificate number , the system should actually check if the there is records and continues the applications
  // Check if there is a student with the provided details
  const foundStudent = await studentProfileModel.findOne({
    "personalDetails.nationalId": nationalId,
  });
  console.log("found student in the database", foundStudent);

  if (foundStudent) {
    return res.status(409).json({
      success: false,
      data: null,
      message: "Student with that nationalId is already registered",
    });
  }

  // Check the length of the national Id
  if (String(nationalId).length > 12 || nationalId.length < 8) {
    return res.status(400).json({
      message: "Invalid national Id provided",
      success: false,
      data: null,
    });
  }

  const result = await new studentProfileModel({
    personalDetails: {
      title,
      firstname,
      middlename,
      lastname,
      dateOfBirth: parse(dateOfBirth, "dd/MM/yyyy", new Date()),
      gender,
      nationalId,
    },
    contactAddress: {
      email,
      mobilePhone,
      addressLine1,
      addressLine2,
      city,
      province,
      postalZip,
      country,
      emergency,
    },
  }).save();

  if (!result) {
    return res.status(403).json({
      message: "Problem saving student personal Details",
      success: false,
      data: null,
    });
  }

  return res.status(201).json({
    status: "success",
    message: "Register new student",
    data: req.body,
  });
});

export default RegisterNewStudent;
