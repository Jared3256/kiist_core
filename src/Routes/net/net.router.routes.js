import {
  createRouter,
  listRouter,
  listAllRouters,
  deleteRouter,
  updateRouter,
  activateDeactivateRouter,
  createRouterSessions,
} from "../../controller/net/netRouterController.js";

// Import express and destructure the router
import express from "express";

const routerRouter = express.Router();

// create router Endpoint
// Method POST
routerRouter.route("/create").post(createRouter);

// List router by vendorId
// Method GET
routerRouter.route("/list/:id").get(listRouter);

// List All routers
// Method GET
routerRouter.route("/listAll").get(listAllRouters);

// Delete Router
// Method DELETE
routerRouter.route("/delete/:id").delete(deleteRouter);

// Update Router
// Method PUT
routerRouter.route("/update/:id").put(updateRouter);

// Update Router
// Method PATCH
routerRouter.route("/toggle/:id").patch(activateDeactivateRouter);

// update Router
// Method PATCH
routerRouter.route("/:id/sessions").patch(createRouterSessions);

// List Sessions from a particular router
routerRouter.route("/:id/sessions/list");

export default routerRouter;
