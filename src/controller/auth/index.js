import login from "./login.auth.js";
import refreshToken from "./refresh.js";
import logout from "./logout.js";

const createAuthcontroller = () => {
  const methods = {};

  methods.login = (req, res) => login(req, res);
  methods.refresh = (req, res) => refreshToken(req, res);
  methods.logout = (req, res) => logout(req, res);
  return methods;
};

export default createAuthcontroller();
