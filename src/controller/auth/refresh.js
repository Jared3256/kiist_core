import asyncHandler from "express-async-handler";
import UserModel from "../../models/app/user.model.js";
import jwt from "jsonwebtoken";
import studentProfileModel from "../../models/student/student.js";

const refreshToken = asyncHandler(async (req, res) => {
    const cookies = req.cookies;


    if (!cookies?.kiist_token) {
        return res.status(401).json({
            message: "Unauthorized - no token found",
            success: false,
        });
    }

    const refreshToken = cookies.kiist_token;

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,

        asyncHandler(async (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    message: "Unauthorized token",
                    success: false,
                });
            }

            const foundUser = await UserModel.findOne({
                email: decoded.UserInfo.email,
            }).exec();


            if (!foundUser) {
                return res.status(401).json({message: "Unauthorized - no user found"});
            }

            let entity = {}
            if (String(foundUser.role) === "student") {
                entity = await studentProfileModel.findOne({
                    registrationNumber: foundUser.regNumber
                })
            }
            const accessToken = jwt.sign(
                {
                    UserInfo: {
                        id: foundUser._id,
                        removed: foundUser.removed,
                        enabled: foundUser.enabled,
                        email: foundUser.email,
                        fullname: foundUser.fullname,
                        created: foundUser.created,
                        role: foundUser.role,
                        entity: entity
                    },
                },
                process.env.ACCESS_TOKEN_SECRET,
                {
                    expiresIn: "30min",
                }
            );
            res.json({
                accessToken: accessToken,
                success: true,
                message: "Token refreshed",
            });
        })
    );
});

export default refreshToken;
