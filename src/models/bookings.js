const Pool = require("../config/db");

const addBooking = (data) => {
  const { id, tickets_id, users_id, insurance, total_price, fullname, nationality, is_paid } = data;
  const query = `INSERT INTO bookings(id, tickets_id, users_id, insurance, total_price, fullname, nationality, is_paid) 
      VALUES('${id}','${tickets_id}','${users_id}','${insurance}', '${total_price}', '${fullname}','${nationality}', '${is_paid}')`;
  return new Promise((resolve, reject) =>
    Pool.query(query, (err, result) => {
      if (!err) {
        resolve(result);
      } else {
        reject(err);
      }
    })
  );
};

const findBookingsByUser = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT bookings.id , airlines.airlines_name, airlines.photo, tickets.departure_nationality, tickets.arrival_nationality, tickets.departure_city, tickets.arrival_city, tickets.departure_time, tickets.arrival_time, tickets.code_type, bookings.is_paid, bookings.total_price
      FROM bookings
      JOIN tickets ON bookings.tickets_id = tickets.id
      JOIN airlines ON tickets.airlines_id = airlines.id WHERE bookings.users_id = '${id}'`,
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

const findBookingsById = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT bookings.id , airlines.airlines_name, airlines.photo, tickets.departure_nationality, tickets.arrival_nationality, tickets.departure_city, tickets.arrival_city, tickets.departure_time, tickets.arrival_time, tickets.code_type, tickets.terminal, tickets.gate, tickets.class_type, bookings.total_price, bookings.is_paid, bookings.fullname
        FROM bookings
        JOIN tickets ON bookings.tickets_id = tickets.id
        JOIN airlines ON tickets.airlines_id = airlines.id WHERE bookings.id = '${id}'`,
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

const updateIsPaid = (id,data) => {
  let {is_paid} = data;
  return new Promise((resolve,reject) =>
  Pool.query(
    `UPDATE bookings
    SET is_paid='${is_paid}'
    WHERE id = '${id}'`,
    (err, result) => {
      if (!err) {
        resolve(result);
      } else {
        reject(err);
      }
    }
  )
  )
}

module.exports = { addBooking, findBookingsByUser, findBookingsById, updateIsPaid };
