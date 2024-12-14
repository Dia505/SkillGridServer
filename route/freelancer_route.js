const express = require("express")
const {findAll, save, findById, deleteById, update} = require("../controller/freelancer_controller");
const router = express.Router();
const multer = require("multer")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "freelancer_images"); // Common folder for images
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Save file with its original name
    }
});

const upload = multer({ storage });

// Specify fields for file uploads
const uploadFields = upload.fields([
    { name: "profile_picture", maxCount: 1 },
    { name: "background_picture", maxCount: 1 }
]);
router.get("/", findAll);
router.post("/", uploadFields, save);
router.get("/:id", findById);
router.delete("/:id", deleteById);
router.put("/:id", update)

module.exports = router;