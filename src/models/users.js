const Pool = require("../config/db");

const selectData = () => {
  return Pool.query(`SELECT * FROM users`);
};

const updateUserPhoto = (id, photo) => {
  console.log(photo);
  return Pool.query(`UPDATE users SET photo='${photo}' WHERE id='${id}'`);
};

const updateUserData = (id, data) => {
  let {fullname, phone, city, address, postcode, nationality} = data;
  console.log(data)
  return Pool.query
  (`UPDATE users 
  SET fullname='${fullname}', 
  phone='${phone}',
  city='${city}',
  nationality='${nationality}', 
  address='${address}', 
  postcode='${postcode}'
  WHERE id='${id}'`);
}

const selectDataById = (id) => {
  return new Promise((resolve,reject)=>
  Pool.query(`SELECT * FROM users WHERE id='${id}'`,
  (err,result)=>{
    if(!err){
      resolve(result)
    } else {
      reject(err)
    }
  }))
}

const selectDataByEmail = (email) => {
  return new Promise((resolve,reject)=>
  Pool.query(`SELECT * FROM users WHERE email='${email}'`,
  (err,result)=>{
    if(!err){
      resolve(result)
    } else {
      reject(err)
    }
  }))
}


module.exports = { selectData, updateUserPhoto, selectDataById, updateUserData, selectDataByEmail };
