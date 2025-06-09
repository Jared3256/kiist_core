import express from "express";
import createDepartmentController from "../../controller/department/createDepartmentController.js";

const departmentRouter = express.Router();


departmentRouter.get("/department", (req, res)=> res.send("helolo"))
departmentRouter.post("/create", createDepartmentController.create);
export default departmentRouter;
