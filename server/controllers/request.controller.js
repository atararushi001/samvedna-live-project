const Request = require("../models/request.model");
const Matrimony = require("../models/matrimony.model");

const requestController = {
  create: (req, res) => {
    const sender_id = req.user.id;
    const receiver_id = req.params.id;

    Request.create(sender_id, receiver_id, (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({
          message: "Database connection error",
        });
      }

      return res.status(200).json({
        message: "Request sent",
      });
    });
  },
  acceptRequest: (req, res) => {
    const id = req.params.id;

    Request.acceptRequest(id, (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({
          message: "Database connection error",
        });
      }

      return res.status(200).json({
        message: "Request accepted",
      });
    });
  },
  rejectRequest: (req, res) => {
    const id = req.params.id;

    Request.rejectRequest(id, (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({
          message: "Database connection error",
        });
      }

      return res.status(200).json({
        message: "Request rejected",
      });
    });
  },
  getAllUserRequests: (req, res) => {
    const user_id = req.user.id;

    Request.getAllUserRequests(user_id, async (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({
          message: "Database connection error",
        });
      }

      try {
        const updatedResults = await Promise.all(
          results.map((result) => {
            return new Promise((resolve, reject) => {
              Matrimony.getById(result.sender_id, (err, user) => {
                if (err) {
                  console.error(err);
                  reject(err);
                } else {
                  user[0].profilePictures = user[0].profilePictures.split(",");
                  user[0].password = undefined;
                  result.receiver = user[0];
                  resolve(result);
                }
              });
            });
          })
        );

        return res.status(200).json(updatedResults);
      } catch (err) {
        console.error(err);
        return res.status(500).json({
          message: "Database connection error",
        });
      }
    });
  },
  getAllPending: (req, res) => {
    const user_id = req.user.id;

    Request.getAllPending(user_id, async (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({
          message: "Database connection error",
        });
      }

      try {
        const updatedResults = await Promise.all(
          results.map((result) => {
            return new Promise((resolve, reject) => {
              Matrimony.getById(result.receiver_id, (err, user) => {
                if (err) {
                  console.error(err);
                  reject(err);
                } else {
                  user[0].profilePictures = user[0].profilePictures.split(",");
                  user[0].password = undefined;
                  result.receiver = user[0];
                  resolve(result);
                }
              });
            });
          })
        );

        return res.status(200).json(updatedResults);
      } catch (err) {
        console.error(err);
        return res.status(500).json({
          message: "Database connection error",
        });
      }
    });
  },
  getAcceptedByMe: (req, res) => {
    const user_id = req.user.id;

    Request.getAcceptedByMe(user_id, async (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({
          message: "Database connection error",
        });
      }

      console.log(results);

      try {
        const updatedResults = await Promise.all(
          results.map((result) => {
            return new Promise((resolve, reject) => {
              Matrimony.getById(result.sender_id, (err, user) => {
                if (err) {
                  console.error(err);
                  reject(err);
                } else {
                  user[0].profilePictures = user[0].profilePictures.split(",");
                  user[0].password = undefined;
                  result.receiver = user[0];
                  resolve(result);
                }
              });
            });
          })
        );

        return res.status(200).json(updatedResults);
      } catch (err) {
        console.error(err);
        return res.status(500).json({
          message: "Database connection error",
        });
      }
    });
  },
  getAcceptedByOthers: (req, res) => {
    const user_id = req.user.id;

    Request.getAcceptedByOthers(user_id, async (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({
          message: "Database connection error",
        });
      }

      try {
        const updatedResults = await Promise.all(
          results.map((result) => {
            return new Promise((resolve, reject) => {
              Matrimony.getById(result.receiver_id, (err, user) => {
                if (err) {
                  console.error(err);
                  reject(err);
                } else {
                  user[0].profilePictures = user[0].profilePictures.split(",");
                  user[0].password = undefined;
                  result.receiver = user[0];
                  resolve(result);
                }
              });
            });
          })
        );

        return res.status(200).json(updatedResults);
      } catch (err) {
        console.error(err);
        return res.status(500).json({
          message: "Database connection error",
        });
      }
    });
  },
  getRejectedByMe: (req, res) => {
    const user_id = req.user.id;

    Request.getRejectedByMe(user_id, async (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({
          message: "Database connection error",
        });
      }

      try {
        const updatedResults = await Promise.all(
          results.map((result) => {
            return new Promise((resolve, reject) => {
              Matrimony.getById(result.sender_id, (err, user) => {
                if (err) {
                  console.error(err);
                  reject(err);
                } else {
                  user[0].profilePictures = user[0].profilePictures.split(",");
                  user[0].password = undefined;
                  result.receiver = user[0];
                  resolve(result);
                }
              });
            });
          })
        );

        return res.status(200).json(updatedResults);
      } catch (err) {
        console.error(err);
        return res.status(500).json({
          message: "Database connection error",
        });
      }
    });
  },
  getRejectedByOthers: (req, res) => {
    const user_id = req.user.id;

    Request.getRejectedByOthers(user_id, async (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({
          message: "Database connection error",
        });
      }

      try {
        const updatedResults = await Promise.all(
          results.map((result) => {
            return new Promise((resolve, reject) => {
              Matrimony.getById(result.receiver_id, (err, user) => {
                if (err) {
                  console.error(err);
                  reject(err);
                } else {
                  user[0].profilePictures = user[0].profilePictures.split(",");
                  user[0].password = undefined;
                  result.receiver = user[0];
                  resolve(result);
                }
              });
            });
          })
        );

        return res.status(200).json(updatedResults);
      } catch (err) {
        console.error(err);
        return res.status(500).json({
          message: "Database connection error",
        });
      }
    });
  },
  getAllAccpeted: (req, res) => {
    const user_id = req.user.id;

    Request.getAllAccpeted(user_id, async (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({
          message: "Database connection error",
        });
      }

      if (results.length === 0) {
        return res.status(200).json([]);
      } else {
        try {
          const updatedResults = await Promise.all(
            results.map((result) => {
              return new Promise((resolve, reject) => {
                Matrimony.getById(
                  result.sender_id === user_id
                    ? result.receiver_id
                    : result.sender_id,
                  (err, user) => {
                    if (err) {
                      console.error(err);
                      reject(err);
                    } else {
                      if (
                        user &&
                        user[0] &&
                        typeof user[0].profilePictures === "string"
                      ) {
                        user[0].profilePictures =
                          user[0].profilePictures.split(",");
                      } else if (user && user[0]) {
                        user[0].profilePictures = [];
                      }
                      if (user && user[0]) {
                        user[0].password = undefined;
                        result.receiver = user[0];
                      }
                      resolve(result);
                    }
                  }
                );
              });
            })
          );

          return res.status(200).json(updatedResults);
        } catch (err) {
          console.error(err);
          return res.status(500).json({
            message: "Database connection error",
          });
        }
      }
    });
  },
  delete: (req, res) => {
    const id = req.params.id;

    Request.delete(id, (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({
          message: "Database connection error",
        });
      }

      return res.status(200).json({
        message: "Match Removed!",
      });
    });
  },
};

module.exports = requestController;
