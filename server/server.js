require('dotenv').config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const axios = require("axios");
const redis = require("redis");
const passport = require("passport");
const User = require("./user");

const app = express();


// --------------------Middleware---------------------


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
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(passport.initialize());
app.use(passport.session());
require("./passportConfig")(passport);


// ----------------------MongoGB Connection--------------


mongoose.connect(process.env.MONGO_DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => console.log("Mongoose is connected"));


// -----------------------Routes-------------------


app.post("/register", (req, res) => {
    User.findOne({ username: req.body.username }, async (err, doc) => {
        if (err) throw err;
        if (doc) res.send("User already exists");
        if (!doc) {
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(req.body.password, salt);
            const newUser = new User({
                username: req.body.username,
                password: hashedPassword
            })
            await newUser.save();
            res.send("User created");
        }
    });
});

app.post("/login", (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if (err) throw err;
        if (!user) res.send("No user exists or Wrong password");
        else {
            req.logIn(user, err => {
                if (err) throw err;
                res.send(req.isAuthenticated());
                console.log(`User's Authentication = ${req.isAuthenticated()}`);
            });
        }
    })(req, res, next);
});

app.get("/user", (req, res) => {
    res.send(req.user);
});

app.get("/logout", (req, res) => {
    req.logOut();
    res.send(req.isAuthenticated());
    console.log(`User's Authentication = ${req.isAuthenticated()}`);
});


// ----------------------OMDb-----------------------------


app.post("/api", async (req, res) => {
    if (req.isAuthenticated()) {
        const textInput = req.body.textInput;
        const typeInput = req.body.typeInput;
        const yearInput = req.body.yearInput;
        const omdbData = await axios({
            method: 'GET',
            url: `http://www.omdbapi.com/?s=${textInput}&page=1&r=json&apikey=${process.env.OMDB_API_KEY}`
        })
        console.log(omdbData.data);
        res.send(omdbData.data);
    } else {
        res.send(`User's Authentication = ${req.isAuthenticated()}`);
    }
});


// ---------------------Listen Ports----------------------


let port = process.env.PORT || 5000;
if (port === null || port === "") {
    port = 8000;
}

app.listen(port, () =>
    console.log("Server is running on port " + port))