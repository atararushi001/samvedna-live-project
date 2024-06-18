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
  getAcceptedByUser: (req, res) => {
    const user_id = req.user.id;

    Request.getAcceptedByUser(user_id, (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({
          message: "Database connection error",
        });
      }

      results.map((result) => {
        Matrimony.getById(result.receiver_id, (err, user) => {
          if (err) {
            console.error(err);
            return res.status(500).json({
              message: "Database connection error",
            });
          }

          result.receiver = user;
        });
      });

      return res.status(200).json(results);
    });
  },
  getAcceptedByOthers: (req, res) => {
    const user_id = req.user.id;

    Request.getAcceptedByOthers(user_id, (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({
          message: "Database connection error",
        });
      }

      return res.status(200).json(results);
    });
  },
  getRejectedByUser: (req, res) => {
    const user_id = req.user.id;

    Request.getRejectedByUser(user_id, (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({
          message: "Database connection error",
        });
      }

      return res.status(200).json(results);
    });
  },
  getRejectedByOthers: (req, res) => {
    const user_id = req.user.id;

    Request.getRejectedByOthers(user_id, (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({
          message: "Database connection error",
        });
      }

      return res.status(200).json(results);
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
};

module.exports = requestController;
