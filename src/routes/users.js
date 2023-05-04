const express = require("express");
const router = express.Router();
const { getData, getDetailId, putUserData, getDataByEmail, putUserPhoto } = require("../controller/users");
const {protect} = require('../middleware/authorization')
const upload = require('../middleware/photo')
const validateFile = require('../middleware/validatePhoto')

router.get("/", getData);
router.get("/profile", protect, getDetailId);
router.get("/:email", getDataByEmail);
// router.put("/", protect, postUserData);
router.put("/update-profile-photo", protect, upload.single('photo'), validateFile, putUserPhoto);
router.put("/update-profile-information", protect, putUserData);


module.exports = router;
