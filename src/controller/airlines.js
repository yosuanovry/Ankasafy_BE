const { insertAirlines } = require("../models/airlines");
const { response } = require(`../middleware/errorhandling`);
const cloudinary = require("../config/photo");

const AirlinesController = {
  addAirlines: async (req, res, next) => {
    try {
      const imageUrl = await cloudinary.uploader.upload(req.file.path, { folder: "ankasafy" });

      if (!imageUrl) {
        return response(res, 200, false, null`failed to upload photo`);
      }

      let airlinesData = {};
      airlinesData.airlines_name = req.body.airlines_name;
      airlinesData.photo = imageUrl.secure_url;

      let result = await insertAirlines(airlinesData);

      if (!result) {
        return response(res, 400, false, null, `input airlines failed`);
      } else {
        return response(res, 200, true, airlinesData, `input airlines success`);
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, "insert airlines failed");
    }
  },
};

module.exports = AirlinesController;
