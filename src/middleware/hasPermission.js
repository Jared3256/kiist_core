//this middleware will check if the user has permission
import jwt from "jsonwebtoken";

export const roles = {
    owner: [
        "create_all",
        "read_all",
        "update_all",
        "delete_all",
        "download",
        "upload",
    ],

    admin: [
        "create_v_u",
        "read_v_u",
        "update_v_u",
        "delete_v_u",
        "download",
        "upload",
    ],

    vendor: ["create_u", "read_u", "update_u", "delete_u", "download", "upload"],
    user: ["create", "read", "update", "download", "upload"],
};

export const hasPermission = (permissionName) => {
    return function (req, res, next) {
        const authHeader = req.headers.authorization || req.headers.Authorization;

        if (!authHeader?.startsWith("Bearer ")) {
            return res
                .status(401)
                .json({message: "Access denied. You need to authenticate"});
        }

        const token = authHeader.split(" ")[1];
        const decoded = jwt.decode(token);

        let active_role = decoded.user.roles || "owner";

        let accepted = false;

        permissionName.forEach((role) => {
            if (roles[active_role].includes(role)) {
                accepted = true;
            }
        });

        if (accepted) {
            next();
        } else {
            return res.status(403).json({
                success: false,
                result: null,
                message: "Access denied : you are not granted permission.",
            });
        }
    };
};
