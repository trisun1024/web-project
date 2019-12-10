const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
	{
    id: {type: String, unique: true},
		email: {type: String},
		username: {type: String},
		password: {type: String},
		profile: {type: String},
    class: {type: String}
	}
);

module.exports = mongoose.model("user", UserSchema);