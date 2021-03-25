const mongoose = require("mongoose");
require("dotenv").config();

mongoose
    .connect('mongodb://127.0.0.1:27017/femi', { useNewUrlParser: true, useUnifiedTopology: true  })
    .catch(e => {
        console.error('Connection error', e.message)
    })

// const connectionStr = `mongodb+srv://${process.env.DBUSER}:${process.env.DBPASS}@cluster0.yy17e.mongodb.net/femi`;
// mongoose
//   .connect(connectionStr, { useNewUrlParser: true, useUnifiedTopology: true })
//   .catch((e) => {
//     console.error("Connection error", e.message);
//   });

const db = mongoose.connection;

module.exports = db;
