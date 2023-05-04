const { insertTicket, findTickets, findTicketById } = require("../models/tickets");
const { v4: uuidv4 } = require("uuid");
const { response } = require(`../middleware/errorhandling`);

const TicketsController = {
  addTicket: async (req, res, next) => {
    try {
      let id = uuidv4();

      let ticketData = {
        id,
        departure_time: req.body.departure_time,
        departure_city: req.body.departure_city,
        departure_nationality: req.body.departure_nationality,
        arrival_time: req.body.arrival_time,
        arrival_city: req.body.arrival_city,
        arrival_nationality: req.body.arrival_nationality,
        transits: req.body.transits,
        facilities: req.body.facilities,
        price: req.body.price,
        gate: req.body.gate,
        terminal: req.body.terminal,
        class_type: req.body.class_type,
        code_type: req.body.code_type,
        airlines_id: req.body.airlines_id,
      };

      for (const [key, value] of Object.entries(ticketData)) {
        if (value === undefined || value === null || value === "") {
          return response(res, 400, false, null, `error ${key} not found, make sure to insert all required data`);
        }
      }

      let result = await insertTicket(ticketData);

      if (!result) {
        return response(res, 400, false, null, `insert ticket failed`);
      } else {
        return response(res, 200, true, ticketData, `insert ticket success`);
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, "insert ticket failed");
    }
  },

  getTickets: async (req, res, next) => {
    try {
      let { searchBy, search, sortBy, sort } = req.query;

      let data = {
        searchBy: searchBy || "airline.airlines_name",
        search: search || "",
        sortBy: sortBy || "created_at",
        sort: sort || "ASC",
      };

      data.page = parseInt(req.query.page) || 1;
      data.limit = parseInt(req.query.limit) || 10;
      data.offset = (data.page - 1) * data.limit;

      let result = await findTickets(data);

      if (!result) {
        response(res, 404, false, "get data tickets failed");
      } else {
        response(res, 200, true, result.rows, "get data tickets success");
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, "get data tickets failed");
    }
  },

  getTicketById: async (req, res, next) => {
    try {
      const id = req.params.id;
      const result = await findTicketById(id);

      if (!result) {
        return response(res, 404, false, "get ticket failed");
      }

      return response(res, 200, true, result.rows, "get ticket success");

    } catch (err) {
      console.log(err)  
      return response(res, 404, false, "get ticket failed (catch)");
    }
  },
};

module.exports = TicketsController;
