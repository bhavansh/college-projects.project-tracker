const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_URI_LOCAL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((msg) => console.log("Database connected successfully."))
  .catch((err) => console.log(err));

// mongoose.connect(
//   process.env.MONGO_URI_PROD,
//   {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then((msg) => console.log("Database connected successfully."))
//   .catch((err) => console.log(err));
