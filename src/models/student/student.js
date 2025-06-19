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

            type: String,
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
        transcript: {
            type: String,
            trim: true,
            required: true,
            lowercase: true,
        },
    },
    college: {
        name: {
            type: String,
            trim: true,
        },
        location: String,
        startDate: {
            type: String,
            trim: true,
        },
        endDate: {
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
        transcript: {
            type: String,
        },
    },
    proffessionalQualification: {
        certifications: String,
        certificationDocuments: String,
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
    level: {
        type: String,
        required: true,
        default: "DIP",
        enum: ["DIP", "CER", "ART"],
        trim: true,
    },
});

const personalStatementSchema = new mongoose.Schema({
    statement: {
        type: String,
        required: true,
    },
    additionalInfo: {
        curricular: String,
        honors: String,
        circumstances: String,
    },
});

const documentSchema = new mongoose.Schema({
    identificationDocument: {
        type: String,
        required: true,
    },
    passportPhoto: {
        type: String,
        required: true,
    },
    academicCertificates: {
        type: String,
        required: true,
    },
    academicTranscripts: String,
    recommendationLetters: String,
    cvResume: String,
    englishProficiency: String,
    additionalDocuments: String,
    documentNotes: String,
});

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
        personalDetails: {type: personalDetailSchema, required: true},
        contactAddress: {type: contactAddressSchema, required: false},
        academicBackground: {type: academicBackgroundSchema, required: false},
        programSelection: {type: programSelectionSchema},
        personalStatement: {type: personalStatementSchema},
        paymentInfo: {type: paymentInfoSchema, required: false},
        documentInfo: {type: documentSchema, required: false},
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
        regNumberGiven: {type: Boolean, default: false},
        suspended: {
            type: Boolean, default: false, required: true
        }
    },
    {
        timestamps: true,
    }
);

// indexes
studentProfileSchema.index("personalDetails.nationalId", {unique: true});
studentProfileSchema.index("contactAddress.email", {unique: true});
studentProfileSchema.index("academicBackground.examIndexNumber", {
    unique: true,
});

const studentProfileModel = mongoose.model(
    "StudentProfile",
    studentProfileSchema
);

export default studentProfileModel;
