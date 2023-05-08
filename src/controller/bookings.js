const { addBooking, findBookingsByUser, findBookingsById, updateIsPaid } = require("../models/bookings");
const { v4: uuidv4 } = require("uuid");
const { response } = require(`../middleware/errorhandling`);

const TicketsController = {
  insertBooking: async (req, res, next) => {
    try {
      let id = uuidv4();

      const { tickets_id, users_id, insurance, total_price, fullname, nationality, is_paid } = req.body;
      
      const bookData = {
        id,
        tickets_id, 
        users_id, 
        insurance, 
        total_price,
        fullname,
        nationality,
        is_paid
      };

      for (const [key, value] of Object.entries(bookData)) {
        if (value === undefined || value === null || value === "") {
          return response(res, 400, false, null, `error ${key} not found, make sure to insert all required data`);
        }
      }

      let result = await addBooking(bookData);

      if (!result) {
        return response(res, 400, false, null, `insert bookings failed`);
      } else {
        return response(res, 200, true, bookData, `insert bookings success`);
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, "insert bookings failed");
    }
  },

  getBookingById: async (req, res, next) => {
    try {
      const id = req.params.id;
      const result = await findBookingsById(id);

      if (!result) {
        return response(res, 404, false, "get bookings info failed");
      }

      return response(res, 200, true, result.rows, "get bookings info by id success");

    } catch (err) {
      console.log(err)  
      return response(res, 404, false, "get bookings info failed (catch)");
    }
  },

  getBookingByUser: async (req, res, next) => {
    try {
      // const id = req.payload.id;

      let result = await findBookingsByUser(req.payload.id)

      if (!result) {
        return response(res, 404, false, "get bookings info by user failed");
      }

      return response(res, 200, true, result.rows, "get bookings info by user success");

    } catch (err) {
      console.log(err)  
      return response(res, 404, false, "get bookings info by user failed (catch)");
    }
  },

  putIsPaid: async (req, res, next) => {
    try {
      const id = req.params.id;
      
      let is_paid = req.body.is_paid || bookings.is_paid

      let data = {is_paid}
 
      let result = await updateIsPaid(id, data)

      if (!result) {
        return response(res, 404, false, "update is_paid failed");
      }

      return response(res, 200, true, "update is_paid success");

    } catch(err) {
      console.log(err)
      return response(res, 404, false, "update is_paid failed (catch)");
    }
  }
};

module.exports = TicketsController;
