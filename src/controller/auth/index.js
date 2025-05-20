import login from "./login.auth.js";
import refreshToken from "./refresh.js";

const createAuthcontroller = () => {
  const methods = {};

  methods.login = (req, res) => login(req, res);
  methods.refresh = (req, res) => refreshToken(req, res);
  return methods;
};

export default createAuthcontroller();
