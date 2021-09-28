require('dotenv').config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const findOrCreate = require("mongoose-findorcreate");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());


mongoose.connect(process.env.MONGO_DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: String,
    googleId: String,
    facebookId: String,
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
    }
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

const User = new mongoose.model("User", userSchema);

passport.use(User.createStrategy());

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});


app.get("/", (req, res) => {
    res.send("Server is runnung");
});

app.get("/logout", function (req, res) {
    req.logout();
});

app.post("/register", function (req, res) {

    User.register({ username: req.body.email }, req.body.password, function (err, user) {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            passport.authenticate("local", {
                failureFlash: "Invalid username or password."
            });
        }
    });

});

app.post("/login", function (req, res) {

    const user = new User({
        username: req.body.email,
        password: req.body.password
    });

    req.login(user, function (err) {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            passport.authenticate("local")
        }
    });
});







let port = process.env.PORT || 5000;
if (port === null || port === "") {
    port = 8000;
}

app.listen(port, () =>
    console.log("Server is running on port " + port))