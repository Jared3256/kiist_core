import asyncHandler from "express-async-handler";

// Import the User  Model
import { NetUser } from "../../models/net/user.net.js";

// Import the router Model
import { NetRouter } from "../../models/net/router.net.js";

// import the vendor model
import { NetVendor } from "../../models/net/vendor.net.js";

// import the sessions Model
import { NetSession } from "../../models/net/session.net.js";

// Import Mongoose package
import mongoose from "mongoose";

// Function to create new sessions
// Access Public
// Endpoint /net/api/sessions/create
const createSession = asyncHandler(async (req, res) => {
  let foundRouter;
  let foundUser;
  // Get the details from the request body
  const { userId, vendorId, routerId } = req.body;

  if (!userId || !vendorId || !routerId) {
    return res.status(400).json({
      message: "Critical information missing. Check User, Vendor or router",
    });
  }

  // Check the length of the the Ids passed
  if (String(userId).length !== 24) {
    return res.status(417).json({
      message: "User Id format mismatch",
    });
  }
  if (String(vendorId).length !== 24) {
    return res.status(417).json({
      message: "Vendor Id format mismatch",
    });
  }
  if (String(routerId).length !== 24) {
    return res.status(417).json({
      message: "Router Id format mismatch",
    });
  }

  // Check if there is user with the userId
  try {
    foundUser = await NetUser.findById(userId);
    if (!foundUser) {
      return res.status(417).json({ message: "No user linked to the Id" });
    }
  } catch (error) {
    return res.status(417).json({ message: "No user linked to the Id" });
  }

  // Check if there is router with the routerId
  try {
    foundRouter = await NetRouter.findById(routerId).select("-rootPassword");
    if (!foundRouter) {
      return res.status(417).json({ message: "No router linked to the Id" });
    }
  } catch (error) {
    return res.status(417).json({ message: "No router linked to the Id" });
  }

  // Check if there is vendor with the vendorId
  try {
    const foundVendor = await NetVendor.findById(vendorId);
    if (!foundVendor) {
      return res.status(417).json({ message: "No vendor linked to the Id" });
    }
  } catch (error) {
    return res.status(417).json({ message: "No vendor linked to the Id" });
  }

  // Create the new sessions
  const newSession = new NetSession({ userId, vendorId, routerId });
  await newSession.save();

  // Update the routers sessions
  foundRouter.sessions = [
    ...foundRouter.sessions,
    { sessionId: newSession._doc._id, startTime: newSession._doc.startTime },
  ];

  await foundRouter.save();

  // inject the session into the correct user
  foundUser.sessions = [
    ...foundUser.sessions,
    {
      sessionId: newSession._doc._id,
      startTime: newSession._doc.startTime,
      routerId: routerId,
      vendorId: vendorId,
    },
  ];

  await foundUser.save();
  return res.status(200).json({
    message: "Successfully created session",
    newSession,
    success: true,
  });
});

// Function to delete sessions
// Access Private
// Endpoint /net/api/sessions/delete
const removeSession = asyncHandler(async (req, res) => {
  return res
    .status(405)
    .json({ message: "cannot remove session once created", success: false });
});

// Function to update the session
// Access Public / Private
// Endpoint /net/api/sessions/sessionId/update
const updateSession = asyncHandler(async (req, res) => {
  // Get the session Id from the request
  const { id } = req.params;

  const { dataUsed, amountBilled } = req.body;

  // Check if the sessionId id is equal to 24
  if (String(id).length !== 24) {
    return res
      .status(417)
      .json({ message: "Session Id format mismatching", success: false });
  }

  // Find the Session from the database
  try {
    const foundSession = await NetSession.findById(id);
    if (!foundSession) {
      return res
        .status(417)
        .json({ message: "Id provided does not match any session" });
    }

    // Update the session
    foundSession.dataUsed = dataUsed;
    foundSession.amountBilled = amountBilled;

    await foundSession.save();

    // find the router with the session and update
    const Routers = await NetRouter.find({}).select("-rootPassword");
    const userId = foundSession.userId;
    const cUser = await NetUser.findById(userId).select("-password");

    const correctUserSessions = cUser.sessions;

    const currentUserSession = correctUserSessions.filter((session) => {
      if (new mongoose.Types.ObjectId(id).equals(session.sessionId)) {
        return session;
      }
    });

    currentUserSession[0].startTime = foundSession.startTime;
    currentUserSession[0].dataUsed = dataUsed;

    const temporaryUserSessions = correctUserSessions.filter((session) => {
      if (!new mongoose.Types.ObjectId(id).equals(session.sessionId)) {
        return session;
      }
    });

    cUser.sessions = [...temporaryUserSessions, ...currentUserSession];

    // Save back the user to the database
    await cUser.save();

    const cRouter = Routers.filter((Router) => {
      const sessions = Router.sessions;

      const correctSession = sessions.filter((session) => {
        if (new mongoose.Types.ObjectId(id).equals(session.sessionId)) {
          console.log("sssssss");
          return session;
        }
      });
      if (correctSession.length > 0) {
        return Router;
      }
    })[0];

    const foundCorrectRouter = await NetRouter.findById(cRouter._id);
    const correctRouterSessions = foundCorrectRouter.sessions;
    // console.log("🚀 ~ updateSession ~ correctRouterSessions:", correctRouterSessions)

    const currentSession = correctRouterSessions.filter((session) => {
      if (new mongoose.Types.ObjectId(id).equals(session.sessionId)) {
        return session;
      }
    });

    const temporarySessions = correctRouterSessions.filter((session) => {
      if (!new mongoose.Types.ObjectId(id).equals(session.sessionId)) {
        return session;
      }
    });
    currentSession[0].dataUsed = dataUsed;

    foundCorrectRouter.sessions = [...temporarySessions, ...currentSession];

    const totalData = () => {
      let data = 0;
      for (let index = 0; index < correctRouterSessions.length; index++) {
        data = data + correctRouterSessions[index].dataUsed;
      }

      return data;
    };

    foundCorrectRouter.totalDataUsed = totalData();
    // Save the Router to the database
    await foundCorrectRouter.save();
    // const correctRouter = Routers.filter((router) => {
    //   const sessions = router.sessions;

    //   const correctSession = sessions.filter((session) => {

    //     const sess = { ...session.__parentArray };
    //     console.log("🚀 ~ correctSession ~ path:",
    //      sess.sessionId
    //     );

    //     session.sessionId === id;
    //   });

    //   if (correctSession.length) {
    //     console.log("🚀 ~ correctRouter ~ correctSession:", correctSession);
    //     return router;
    //   }
    // });
    return res.status(200).json({ message: "Session update successfully" });
  } catch (error) {
    return res
      .status(417)
      .json({ message: "Id provided does not match any session" });
  }
});

// Function to end the session
// Access Public / Private
// Endpoint /net/api/sessions/sessionId/end
const endSession = asyncHandler(async (req, res) => {
  // Get the session Id from the request
  const { id,dataUsed } = req.params;

  // Check if the sessionId id is equal to 24
  if (String(id).length !== 24) {
    return res
      .status(417)
      .json({ message: "Session Id format mismatching", success: false });
  }

  // Find the Session from the database
  try {
    const foundSession = await NetSession.findById(id);
    if (!foundSession) {
      return res
        .status(417)
        .json({ message: "Ids provided does not match any session" });
    }

    const time = Date.now();
    foundSession.endTime = time;
    foundSession.status = "inactive";

    await foundSession.save();

    // find the router with the session and update
    const Routers = await NetRouter.find({}).select("-rootPassword");

    const cRouter = Routers.filter((Router) => {
      const sessions = Router.sessions;

      const correctSession = sessions.filter((session) => {
        if (new mongoose.Types.ObjectId(id).equals(session.sessionId)) {
          console.log("sssssss");
          return session;
        }
      });
      if (correctSession.length > 0) {
        return Router;
      }
    })[0];

    const foundCorrectRouter = await NetRouter.findById(cRouter._id);
    const correctRouterSessions = foundCorrectRouter.sessions;
    // console.log("🚀 ~ updateSession ~ correctRouterSessions:", correctRouterSessions)

    const currentSession = correctRouterSessions.filter((session) => {
      if (new mongoose.Types.ObjectId(id).equals(session.sessionId)) {
        return session;
      }
    });

    const temporarySessions = correctRouterSessions.filter((session) => {
      if (!new mongoose.Types.ObjectId(id).equals(session.sessionId)) {
        return session;
      }
    });
    currentSession[0].endTime = time;
    foundCorrectRouter.status = "inactive";

    foundCorrectRouter.sessions = [...temporarySessions, ...currentSession];

    // Save the Router to the database
    await foundCorrectRouter.save();

    // Find the user and also update the session end time
    const userId = foundSession.userId;
    const cUser = await NetUser.findById(userId).select("-password");

    const correctUserSessions = cUser.sessions;

    const currentUserSession = correctUserSessions.filter((session) => {
      if (new mongoose.Types.ObjectId(id).equals(session.sessionId)) {
        return session;
      }
    });

    currentUserSession[0].endTime = time;
    console.log(
      "🚀 ~ endSession ~ currentUserSession.endTime:",
      currentUserSession.endTime,
      time
    );

    const temporaryUserSessions = correctUserSessions.filter((session) => {
      if (!new mongoose.Types.ObjectId(id).equals(session.sessionId)) {
        return session;
      }
    });

    cUser.sessions = [...temporaryUserSessions, ...currentUserSession];
    console.log("🚀 ~ endSession ~ cUser:", cUser);

    await cUser.save();
    return res.status(200).json({ message: "Session ended successfully" });
  } catch (error) {
    return res
      .status(417)
      .json({ message: "Id provided does not match any session" });
  }
});

// Function to list all sessions
// Access Private
// Endpoint /net/api/sessions/listAll
const listAllSession = asyncHandler(async (req, res) => {
  const sessions = await NetSession.find({});

  if (sessions.length < 1) {
    return res
      .status(404)
      .json({ message: "No session is available", success: false });
  }

  return res.status(200).json({
    message: "Found all sessions",
    sessions: [...sessions],
    success: true,
  });
});

export {
  createSession,
  removeSession,
  updateSession,
  endSession,
  listAllSession,
};
