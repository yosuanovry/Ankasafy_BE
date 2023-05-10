const Pool = require('../config/db')

const selectUserById = (id) => {
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


const findUser = (email) => {
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

const createUser = (data) => {
  const {email,fullname,password,id,otp, role} = data
  return new Promise((resolve,reject)=>
  Pool.query(`INSERT INTO users(id,email,fullname,password,otp, role) VALUES('${id}','${email}','${fullname}','${password}','${otp}','${role}')`,(err,result)=>{
    if(!err){
      resolve(result)
    } else {
      reject(err)
    }
  }))
}

const verifyUser = (id) => {
  return Pool.query(
    `UPDATE users SET verification=true WHERE id='${id}'`
  );
}

const verifyUserByEmail = (id) => {
  return Pool.query(
    `UPDATE users SET verification=true WHERE email='${id}'`
  );
}

module.exports = {selectUserById,findUser,createUser,verifyUser, verifyUserByEmail}