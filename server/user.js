const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: String,
    secret: String,
    date: {
        type: Date,
        default: new Date().toLocaleDateString('en', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric'
        })
    },
    authStrategy: {
        type: String,
        default: "local"
    }
});

module.exports = mongoose.model("User", userSchema);