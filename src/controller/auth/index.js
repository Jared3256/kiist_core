import login from "./login.auth.js";

const createAuthcontroller = () => {
  const methods = {};

  methods.login = (req, res) => login(req, res);
  return methods;
};

export default createAuthcontroller();
