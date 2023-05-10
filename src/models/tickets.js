const Pool = require("../config/db");

const insertTicket = (data) => {
  const { id, departure_time, departure_city, departure_nationality, arrival_time, arrival_city, arrival_nationality, transits, facilities, price, gate, terminal, class_type, code_type, airlines_id } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `INSERT INTO tickets(id, departure_time,  departure_city, departure_nationality, arrival_time , arrival_city , arrival_nationality , price , transits , facilities , gate , terminal , class_type , code_type, airlines_id) 
            VALUES('${id}','${departure_time}','${departure_city}','${departure_nationality}','${arrival_time}','${arrival_city}','${arrival_nationality}','${price}','${transits}', '${facilities}', '${gate}','${terminal}','${class_type}','${code_type}','${airlines_id}')`,
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

const findTicketById = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tickets.id, airline.airlines_name as airline, airline.photo as airline_photo, tickets.departure_city, tickets.departure_nationality, tickets.arrival_city, tickets.arrival_nationality, tickets.departure_time, tickets.arrival_time, tickets.transits, tickets.facilities, tickets.price 
    from tickets
    INNER JOIN airlines as airline ON tickets.airlines_id = airline.id
    WHERE tickets.id='${id}' AND tickets.updated_at IS NULL`,
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

const findTickets = (data) => {
  let { searchBy, search, sortBy, sort, limit, offset } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `
      SELECT tickets.id, airline.airlines_name as airline, airline.photo as airline_photo, tickets.departure_city, tickets.departure_nationality, tickets.arrival_city, tickets.arrival_nationality, tickets.departure_time, tickets.arrival_time, tickets.transits, tickets.facilities, tickets.price 
      from tickets
      INNER JOIN airlines as airline ON tickets.airlines_id = airline.id
      WHERE tickets.updated_at IS NULL AND ${searchBy} ILIKE '%${search}%' ORDER BY tickets.${sortBy} ${sort} LIMIT ${limit} OFFSET ${offset}
    `,
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

module.exports = { insertTicket, findTicketById, findTickets };
