import listAllUsers from "./listall..user.js";
import createUser from "./create.user.js";

/**
 * @description This function creates a user controller
 * @returns
 */
const creatUserController = () => {
  let methods = {};

  methods.listall = (req, res) => listAllUsers(req, res);
  methods.create = (req, res) => createUser(req, res);
  return methods;
};

export default creatUserController();
