const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_ATLAS_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((msg) => console.log("Database connected successfully."))
  .catch((err) => console.log(err));

// mongoose.connect(
//   process.env.MONGO_ATLAS_URI,
//   {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then((msg) => console.log("Database connected successfully."))
//   .catch((err) => console.log(err));
