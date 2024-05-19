const multer = require("multer");
const path = require("path");
const fs = require("fs");

const blog = require("../models/blog.model");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDirectory = path.join(__dirname, "../public/uploads/covers");
    if (!fs.existsSync(uploadDirectory)) {
      fs.mkdirSync(uploadDirectory, { recursive: true });
    }
    cb(null, uploadDirectory);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 },
});

const blogController = {
  getAll: (req, res) => {
    blog.getAll((err, result) => {
      if (err) {
        res.status(500).json({ message: "Internal server error" });
        return;
      }
      res.status(200).json(result);
    });
  },
  getById: (req, res) => {
    const id = req.params.id;
    blog.getById(id, (err, result) => {
      if (err) {
        res.status(500).json({ message: "Internal server error" });
        return;
      }
      if (result.length === 0) {
        res.status(404).json({ message: "Blog not found" });
        return;
      }
      res.status(200).json(result[0]);
    });
  },
  create: [
    upload.single("cover"),
    (req, res) => {
      const { title, content, author } = req.body;
      const published = new Date().toISOString().slice(0, 19).replace("T", " ");
      const cover = req.file ? req.file.filename : null;

      blog.create(
        { title, content, cover, author, published },
        (err, result) => {
          if (err) {
            res.status(500).json({ message: "Internal server error" });
            return;
          }
          res.status(201).json({ message: "Blog created successfully" });
        }
      );
    },
  ],
  update: [
    upload.single("cover"),
    (req, res) => {
      const id = req.params.id;
      const { title, content, author } = req.body;
      const cover = req.file ? req.file.filename : null;

      blog.getById(id, (err, result) => {
        if (err) {
          res.status(500).json({ message: "Internal server error" });
          return;
        }
        if (result.length === 0) {
          res.status(404).json({ message: "Blog not found" });
          return;
        }

        const oldCover = result[0].cover;
        blog.update(id, { title, content, cover, author }, (err, result) => {
          if (err) {
            res.status(500).json({ message: "Internal server error" });
            console.log(err);
            return;
          }
          if (cover && oldCover) {
            fs.unlinkSync(
              path.join(__dirname, `../public/uploads/covers/${oldCover}`)
            );
          }
          res.status(200).json({ message: "Blog updated successfully" });
        });
      });
    },
  ],
  delete: (req, res) => {
    const id = req.params.id;
    blog.getById(id, (err, result) => {
      if (err) {
        res.status(500).json({ message: "Internal server error" });
        return;
      }
      if (result.length === 0) {
        res.status(404).json({ message: "Blog not found" });
        return;
      }

      const cover = result[0].cover;
      blog.delete(id, (err, result) => {
        if (err) {
          res.status(500).json({ message: "Internal server error" });
          return;
        }
        if (cover) {
          fs.unlinkSync(
            path.join(__dirname, `../public/uploads/covers/${cover}`)
          );
        }
        res.status(200).json({ message: "Blog deleted successfully" });
      });
    });
  },
};

module.exports = blogController;
