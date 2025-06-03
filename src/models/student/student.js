import mongoose from "mongoose";

const personalDetailSchema = new mongoose.Schema({
  title: {
    type: String,
    enum: ["Mr", "Mrs", "Miss", "Ms", "Dr", "Prof"],
  },
  firstname: {
    required: true,
    trim: true,
    type: String,
  },
  middlename: {
    type: String,
    trim: true,
  },
  lastname: {
    type: String,
    required: true,
    trim: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
    trim: true,
  },
  gender: {
    type: String,
    enum: ["male", "female", "rather not say", "other"],
    required: true,
    default: "rather not say",
  },
  nationalId: {
    type: Number,
    required: true,
    minlength: [8, "National Id must be atleast 8 characters long"],
    maxlength: [12, "National Id must be at most 12 characters long"],
  },
});

const contactAddressSchema = new mongoose.Schema({
  email: {
    trim: true,
    required: true,
    type: String,
    unique: true,
    lowercase: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  mobilePhone: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    match: [
      /^(?:\+?254|0)(7[0-9]{8})$/,
      "Please fill a valid Kenyan mobile phone number",
    ],
  },
  addressLine1: {
    type: String,
    required: true,
  },
  addressLine2: {
    type: String,
  },
  city: {
    type: String,
    required: true,
    trim: true,
  },
  province: {
    type: String,
    required: true,
    trim: true,
  },
  postalZip: {
    type: String,
    required: true,
    trim: true,
  },
  country: {
    type: String,
    required: true,
    enum: ["Kenya", "Uganda", "Tanzania"],
    default: "Kenya",
  },
  emergency: {
    fullname: {
      type: String,
      required: true,
      trim: true,
    },
    relationship: {
      type: String,
      required: true,
      trim: true,
      default: "Other",
      enum: ["Parent", "Spouse", "Sibling", "Other relative", "Other"],
    },
    email: {
      trim: true,
      required: false,
      type: String,
      unique: true,
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    mobilePhone: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      match: [
        /^(?:\+?254|0)(7[0-9]{8})$/,
        "Please fill a valid Kenyan mobile phone number",
      ],
    },
  },
});

const academicBackgroundSchema = new mongoose.Schema({
  secondarySchool: {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    startDate: {
      type: String,
      trim: true,
      required: true,
    },
    endDate: {
      type: String,
      trim: true,
      required: true,
    },
    qualificationObtained: {
      type: String,
      trim: true,
      required: true,
    },
    finalGrade: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
    },
  },
  college: {
    name: {
      type: String,
      trim: true,
    },
    startDate: {
      type: String,
      trim: true,
    },
    qualificationObtained: {
      type: String,
      trim: true,
    },
    major: {
      type: String,
      trim: true,
    },
    finalGrade: {
      type: String,
      trim: true,
      uppercase: true,
    },
  },
  proffessionalQualification: {
    type: String,
    trim: false,
  },
  academicInformation: String,
});

const programSelectionSchema = new mongoose.Schema({
  main: {
    department: {
      required: true,
      trim: true,
      type: String,
    },
    program: {
      required: true,
      trim: true,
      type: String,
    },
    studyMode: {
      type: String,
      required: true,
      default: "full-time",
      enum: ["full-time", "part-time", "online-distance"],
    },
    intendedStartTerm: {
      type: String,
      required: true,
      trim: true,
    },
  },
  alternative: {
    altDepartment: String,
    altProgram: String,
    reason: String,
    careerGoals: String,
  },
});

const personalStatementSchema = new mongoose.Schema({
  statement: {
    type: String,
    required: true,
  },
  additionalInfo: {
    curricular: String,
    awards: String,
    circumstances: String,
  },
});
const documentSchema = new mongoose.Schema(
  {
    photoUrl: {
      type: String,
      required: true,
    },
    idScanUrl: {
      type: String,
      required: true,
    },
    certificateUrl: {
      type: String,
      required: true,
    },
  },
  {
    _id: false,
  }
);

const paymentInfoSchema = new mongoose.Schema({
  registrationFee: {
    type: Number,
    required: true,
    min: [1000, "registration fee cannot be less than 1000"],
    max: [1000, "registration fee cannot be more than 1000"],
    default: "1000",
  },
  paymentMethod: {
    type: String,
    default: "Mpesa",
    enum: ["Mpesa", "Bank"],
  },
  transactionRef: {
    required: true,
    type: String,
  },
});

/**
 * Student Profile Schema which includes all the other schemas
 */
const studentProfileSchema = new mongoose.Schema(
  {
    personalDetails: { type: personalDetailSchema, required: true },
    contactAddress: { type: contactAddressSchema, required: false },
    academicBackground: { type: academicBackgroundSchema, required: false },
    programSelection: { type: programSelectionSchema },
    personalStatement: { type: personalStatementSchema },
    paymentInfo: { type: paymentInfoSchema, required: false },
    isComplete: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      default: "student",
    },
    registrationNumber: {
      type: String,
      unique: true,
    },
    regNumberGiven: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

// indexes
studentProfileSchema.index("personalDetails.nationalId", { unique: true });
studentProfileSchema.index("contactAddress.email", { unique: true });
studentProfileSchema.index("academicBackground.examIndexNumber", {
  unique: true,
});

const studentProfileModel = mongoose.model(
  "StudentProfile",
  studentProfileSchema
);

export default studentProfileModel;
