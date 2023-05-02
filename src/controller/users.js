const { selectData, insertPhoto, selectDataById, updateData, selectDataByEmail } = require("../models/users");
const cloudinary = require("../config/photo")

const UsersController = {
  getDetailId: async (req, res, next) => {
    try {
    let {rows:[users]} =await selectDataById(req.payload.id)
    
    if(!req.payload.id) {
      return res.status(404).json({status:404,message:`there is no token`})
    }  

    if(!users) {
      return res.status(404).json({ status: 404, message: `data user not found` });
    }

    return res.status(200).json({ status: 200, message: `data found`, data: users})  
    } catch(err) {
      next(res.status(404).json({status: 404, message: err.message }));
    }
  },

  getDataByEmail: async (req, res, next) => {
    try{
    let email = req.params.email
    let {rows:[users]} = await selectDataByEmail(email)

    if (users) {
      res.status(200).json({ status: 200, message: `email found`, data: users });
    }
    
    res.status(400).json({ status: 400, message: `email not found` });
  } catch(err) {
    next(res.status(404).json({status: 404, message: err.message }));
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


  postData: async (req, res, next) => {
    try {
    let body = req.query;
    let input = await insertData(body.name);

    if (!input) {
      res.status(401).json({ status: 400, message: `input data failed` });
    }

    let checkData = await selectDataById("name", body.name);

    if (!checkData) {
      res.status(404).json({ status: 404, message: `input data failed` });
    }

    res.status(200).json({ status: 200, message: `input data success`, data: checkData.rows });
  } catch(err) {
    next(res.status(404).json({status: 404, message: err.message }));
  }
  },


  putData: async (req, res, next) => {
    try {
    const imageUrl = await cloudinary.uploader.upload(req.file.path,{folder:'user'})  

    if(!imageUrl) {
      res.status(404).json({status:404,message:`failed to upload photo`})
    }
  
    let data = {};
    data.fullname = req.body.fullname;
    data.photo = imageUrl.secure_url;

    console.log(data)

    let {rows:[users]} =await selectDataById(req.payload.id)

    if(!users) {
      res.status(404).json({status:404,message:`this recipe is not owned by you`})
    }

    let result = await updateData(req.payload.id, data);

    if (!result) {
      res.status(404).json({ status: 404, message: `update data failed` });
    }

    res.status(200).json({ status: 200, message: `update data success`});
  } catch(err) {
    next(res.status(404).json({status: 404, message: err.message }));
  }
  },

};

module.exports = UsersController;
