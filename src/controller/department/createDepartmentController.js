import createDepartment from "./create.department.js";
import DeleteDeparment from "./delete.department.js";
import ListAllDepartment from "./listall.department.js";
import UpdateDepartment from "./update.department.js";

const createDepartmentController = () => {
  const methods = {};

  methods.create = (req, res) => createDepartment(req, res);
  methods.update = (req, res) => UpdateDepartment(req, res);
  methods.delete = (req, res) => DeleteDeparment(req, res);
  methods.list = (req, res) => ListAllDepartment(req, res);
  return methods;
};

export default createDepartmentController();
