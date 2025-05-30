import mongoose from "mongoose";

const personalDetailSchema = new mongoose.Schema(
    {
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
            enum: ["male", "female", "rather not say"],
            required: true,
            default: "rather not say",
        },
        nationalId: {
            type: Number,
            required: true,
            minlength: [8, "National Id must be atleast 8 characters long"],
            maxlength: [12, "National Id must be at most 12 characters long"],
        },
        placeOfBirth: {
            county: {
                required: true,
                type: String,
            },
            townOrVillage: {
                required: true,
                type: String,
            },
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
    alternativePhone: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        match: [
            /^(?:\+?254|0)(7[0-9]{8})$/,
            "Please fill a valid Kenyan mobile phone number",
        ],
    },

    currentAddress: {
        county: {
            required: true,
            type: String,
        },
        townOrVillage: {
            required: true,
            type: String,
        },
    },
});

const academicBackgroundSchema = new mongoose.Schema({
    highestQualification: {
        type: String,
        required: true,
        enum: ["Diploma", "Certificate", "KCSE", "KCPE"],
        default: "KCPE",
    },
    graduationYear: {
        trim: true,
        type: Number,
        required: true,
        min: [2000, "Graduation year must be at least 2000"],
        max: [new Date().getFullYear(), "Graduation year cannot be in the future"],
    },
    examIndexNumber: {
        type: String,
        required: true,
        unique: true
    },
    gradeAggregate: {
        type: String,
        required: true
    },
    previousInstitution: {
        name: {
            type: String,
            required: true
        },
        location: {
            type: String,
            required: true
        }
    },
    intendedCourse: {
        type: String, required: true
    },
    modeOfStudy: {
        type: String,
        required: true,
        enum: ["full-time", "part-time", "online"],
        default: "full-time",
    }
});


const documentSchema = new mongoose.Schema({
    photoUrl: {
        type: String,
        required: true,
    },
    idScanUrl: {
        type: String,
        required: true
    },
    certificateUrl: {
        type: String,
        required: true
    },

}, {
    _id: false
})

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
        enum: [
            "Mpesa", "Bank"
        ]
    },
    transactionRef: {
        required: true,
        type: String,
    }

})

/**
 * Student Profile Schema which includes all the other schemas
 */
const studentProfileSchema = new mongoose.Schema({
    personalDetails: {type: personalDetailSchema, required: true},
    contactAddress: {type: contactAddressSchema, required: false},
    academicBackground: {type: academicBackgroundSchema, required: false},
    // document: {type: documentSchema, required: false},
    paymentInfo: {type: paymentInfoSchema, required: false},
    isComplete: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        default: "student",
    }
}, {
    timestamps: true,
});

// indexes
studentProfileSchema.index(
    "personalDetails.nationalId",
    {unique: true}
);
studentProfileSchema.index("contactAddress.email", {unique: true});
studentProfileSchema.index("academicBackground.examIndexNumber", {unique: true});

const studentProfileModel = mongoose.model(
    "StudentProfile",
    studentProfileSchema
);


export default studentProfileModel;
