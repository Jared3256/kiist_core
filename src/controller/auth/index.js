import login from "./login.auth.js";
import refreshToken from "./refresh.js";
import logout from "./logout.js";
import ResetPassword from "./reset.password.js";
import changePassword from "./change.password.js";

const createAuthcontroller = () => {
    const methods = {};

    methods.login = (req, res) => login(req, res);
    methods.refresh = (req, res) => refreshToken(req, res);
    methods.logout = (req, res) => logout(req, res);
    methods.reset_password = (req, res) => ResetPassword(req, res);
    methods.change_password = (req, res) => changePassword(req, res);
    return methods;
};

export default createAuthcontroller();
