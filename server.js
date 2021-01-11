const express = require("express");
const mongoose = require("mongoose");
const app = express();
const config = require("config");

// Bodyparser Middleware
app.use(express.json());

const connectToDatabase = async () => {
  try {
    await mongoose.connect(config.get("mongoURI"), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log("MongoDb is connected...");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
connectToDatabase();
//use routes
app.use("/api/posts", require("./routes/api/posts"));
app.use("/api/auth", require("./routes/api/auth"));

const PORT = process.env.PORT || 5000;

//serve static assets if in prod
if (process.env.NODE_ENV === "production") {
  //set static folder
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
