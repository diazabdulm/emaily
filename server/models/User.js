const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  googleID: String,
  githubID: String,
});

mongoose.model("users", userSchema);
