const { selectData, updateUserPhoto, selectDataById, updateUserData, selectDataByEmail } = require("../models/users");
const cloudinary = require("../config/photo")
const { response } = require(`../middleware/errorhandling`);

const UsersController = {
  getDetailId: async (req, res, next) => {
    try {
    let {rows:[users]} = await selectDataById(req.payload.id)
    
    if(!req.payload.id) {
       return response(res, 400, false, null, `there is no token`);
    }  

    if(!users) {
      return response(res, 400, false, null, `data user not found`);
    }

    return response(res, 200, true, users, `data user found`);
    } catch(err) {
      console.log(err);
      response(res, 404, false, null, "data user not found (catch)");
    }
  },

  getDataByEmail: async (req, res, next) => {
    try{
    let email = req.params.email
    let {rows:[users]} = await selectDataByEmail(email)

    if (!users) {
      return response(res, 400, false, null, `email not found`);
    }
    
    return response(res, 200, true, users, `email found`);
  } catch(err) {
    return response(res, 400, false, null, `email not found (catch)`);
  }
  },

  getData: async (req, res, next) => {
    try{

    let showUser = await selectData();

    if (!showUser) {
      res.status(400).json({ status: 400, message: `data user not found` });
    }

    res.status(200).json({ status: 200, message: `data found`, data: showUser.rows });
  } catch(err) {
    next(res.status(404).json({status: 404, message: err.message }));
  }
  },


  putUserData: async (req, res, next) => {
    try {
      
      let id = req.payload.id
      
      let {rows:[users]} =await selectDataById(id)

      let fullname = req.body.fullname || users.fullname
      let phone = req.body.phone || users.phone
      let city = req.body.city || users.city
      let address = req.body.address || users.address
      let postcode = req.body.postcode || users.postcode
      let nationality = req.body.nationality || users.nationality

    let data = {fullname,phone,city,address,postcode, nationality}
    

    if (!users) {
      return response(res, 400, false, null, `invalid user`);
    }

    
    let update = await updateUserData(id, data);

    if (!update) {
      return response(res, 400, false, null, `update user data failed`);
    }

    return response(res, 200, true, null, `update user data success`);

  } catch(err) {
    console.log(err);
    response(res, 400, false, null, "update user data failed (catch)");
  }
  },

  putUserPhoto: async (req, res, next) => {
    try {
      const imageUrl = await cloudinary.uploader.upload(req.file.path,{folder:'ankasafy'})

      if(!imageUrl) {
        return response(res, 400, false, null, `upload photo failed`);
      } 

      photo = imageUrl.secure_url

      console.log(photo)

      let result = await updateUserPhoto(req.payload.id, photo)

      if(!result) {
        return response(res, 400, false, null, `update user photo failed`);
      }

      let {rows:[users]} =await selectDataById(req.payload.id)

      return response(res, 200, true, users, `update photo success`);

    } catch(err) {
      console.log(err)
      return response(res, 400, false, null, `update user photo failed (catch)`);
    }
  }

};



module.exports = UsersController;
