import listAllUsers from "./listall..user.js";

/**
 * @description This function creates a user controller
 * @returns
 */
const creatUserController = () => {
  let methods = {};

  methods.listall = (req, res) => listAllUsers(req, res);
  return methods;
};

export default creatUserController();
