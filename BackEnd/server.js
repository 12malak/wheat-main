const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT;
const mongoose = require("mongoose");
const userRouts = require('./routes/userRouter');
const aboutUsRouts = require('./routes/aboutUsRouter');
const notFoundHandler = require('./middleware/404');
const dbURI = "mongodb+srv://malak:1234@malak.gm03llj.mongodb.net/"
const errorHandler = require('./middleware/500')
const Protected = require('./middleware/Protected')
const app = express();
app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
  res.send("Welcome");
});

app.use(userRouts);
app.use(aboutUsRouts);
app.use('*',notFoundHandler);
app.use(errorHandler);
app.use(Protected)







module.exports = {
  server: app,
  start: () => {
    mongoose
      .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => {
        app.listen(PORT, () => {
          console.log(`Starting server on port ${PORT}`);
        });
      });
  },
};