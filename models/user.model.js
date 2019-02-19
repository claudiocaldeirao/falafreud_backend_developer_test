const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
    name: {type: String, required: true},
    age: {type: Number, required: true},
    phone: {type: Number, required: true},
    is_admin: {type: Boolean, default: false}
});

module.exports = mongoose.model('User', userSchema);