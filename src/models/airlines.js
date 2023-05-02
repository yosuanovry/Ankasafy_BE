const Pool = require('./../config/db')

const insertAirlines = (data) => {
    const {
      airlines_name,
      facilities,
      photo,
    } = data;

    return new Promise((resolve, reject) =>
      Pool.query(
        `INSERT INTO airlines(airlines_name, facilities, photo) 
            VALUES('${airlines_name}', '${facilities}','${photo}')`,
        (err, result) => {
          if (!err) {
            resolve(result);
          } else {
            reject(err);
          }
        }
      )
    );
};


module.exports = {insertAirlines}

