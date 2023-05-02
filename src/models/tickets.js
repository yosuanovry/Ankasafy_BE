const Pool = require("./../config/db");

const insertTicket = (data) => {
  const { id, departure_time, departure_city, departure_nationality, arrival_time, arrival_city, arrival_nationality, transits, price, gate, terminal, class_type, code_type, airlines_id } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `INSERT INTO tickets(id, departure_time,  departure_city, departure_nationality, arrival_time , arrival_city , arrival_nationality , price , transits , gate , terminal , class_type , code_type, airlines_id) 
            VALUES('${id}','${departure_time}','${departure_city}','${departure_nationality}','${arrival_time}','${arrival_city}','${arrival_nationality}','${price}','${transits}', '${gate}','${terminal}','${class_type}','${code_type}','${airlines_id}')`,
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
    Pool.query(`SELECT * FROM tickets WHERE id='${id}'`, (err, result) => {
      if (!err) {
        resolve(result);
      } else {
        reject(err);
      }
    })
  );
};

const findTickets = () => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `
    SELECT tickets.id, tickets.airlines_id, airlines.airlines_name, airlines.facilities as airline_facilities, airlines.photo as airline_photo, tickets.departure_time, tickets.departure_city, tickets.departure_nationality, tickets.arrival_time, tickets.arrival_city, tickets.arrival_nationality, tickets.transits, tickets.price, tickets.gate, tickets.terminal, tickets.class_type, tickets.code_type, tickets.created_at as posttime
    FROM tickets JOIN airlines ON tickets.airlines_id=airlines.id
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
