const express = require("express");
const router = express.Router();
const { getData, getDetailId, postData, putData, getDataByEmail } = require("../controller/users");
// const {protect} = require('../middleware/authorization')
// const upload = require('../middleware/uploadPhoto')
// const validateFile = require('../middleware/validatePhoto')
// const errorHandler = require("../middleware/errorHandling");

router.get("/", getData);
// router.get("/my-profile", protect, getDetailId);
router.get("/:email", getDataByEmail);
// router.put("/update-profile", protect, upload.single('photo'), validateFile, putData);
// router.delete("/:id", deleteData);
// router.post("/", postData);


module.exports = router;
