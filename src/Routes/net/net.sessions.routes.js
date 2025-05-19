import {
  createSession,
  removeSession,
  updateSession,
  endSession,
  listAllSession,
} from "../../controller/net/netSessionsController.js";

import express from "express";
const sessionsRouter = express.Router();

// Endpoint to create session
// Method POST

sessionsRouter.route("/create").post(createSession);

// Endpoint to remove session
// Method DELETE
sessionsRouter.route("/delete/:id").delete(removeSession);

// Endpoint to update the sessions
// Method PUT
sessionsRouter.route("/:id/update").put(updateSession);

// Endpoint to end session
// Method POST
sessionsRouter.route("/:id/end").post(endSession);

// Endpoint to list all sessions
// Method GET
sessionsRouter.route("/listAll").get(listAllSession);

export default sessionsRouter;
