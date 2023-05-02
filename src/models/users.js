const Pool = require("../config/db");

const selectData = () => {
  return Pool.query(`SELECT * FROM users`);
};

const insertPhoto = (data) => {
  console.log(data);
  return Pool.query(`INSERT INTO users(photo) VALUES('${data}')`);
};

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

const updateData = (id, data) => {
  let {fullname, photo} = data;
  console.log(data)
  return Pool.query(`UPDATE users SET fullname='${fullname}', photo='${photo}' WHERE id='${id}'`);
}


module.exports = { selectData, insertPhoto, selectDataById, updateData, selectDataByEmail };
