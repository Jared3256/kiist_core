import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserPasswordSchema = new mongoose.Schema(
    {
        removed: {
            type: Boolean,
            default: false,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            trim: true,
        },
        securityAnswer: String,
        securityQuestion: String,
        emailToken: String,
        emailTokenExpiresAt: Date,
        resetToken: String,
        resetTokenExpiresAt: Date,
        resetTokenUsed: {
            type: Boolean,
            default: false,
        },
        salt: {
            type: String,
            required: true,
        },
        resetTokenUsedAt: Date,
        emailVerified: {
            type: Boolean,
            default: false,
        },
        emailVerifiedAt: Date,
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

// UserPasswordSchema.index({ user: 1 });
// generating a hash
UserPasswordSchema.methods.generateHash = function (salt, password) {
    return bcrypt.hashSync(salt + password);
};

// checking if password is valid
UserPasswordSchema.methods.validPassword = function (salt, userPassword) {
    return bcrypt.compareSync(salt + userPassword, this.password);
};

const UserPasswordModel = mongoose.model("UserPassword", UserPasswordSchema);

export default UserPasswordModel;