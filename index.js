var express = require('express');
var app = express();
var cors = require('cors');
require("dotenv").config();
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const sessions = require('express-session');
const config = require('./config/config');
const path = require('path');
const db = require('./models');
db.sequelize.sync();

const storageRoute = require('./Routes/storage');
const hr = require('./Routes/hr.routes');
const adminsRoutes = require('./Routes/Admin.routes');
const dailyactivityRoutes = require('./Routes/DailyActivity.routes');



app.use(bodyParser.urlencoded({limit: '500mb', extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
    resave: false
}));

app.use(cors({
    origin: process.env.CLIENT_PRODUCTION_URL,
    optionsSuccessStatus: 200,
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']
}));

app.use(fileUpload());

app.get('/', function (req, res) {
    res.send("Welcome to HRMS portal ");
});

app.use("/storage", storageRoute);
app.use("/hr", hr);
app.use("/admin", adminsRoutes);
app.use("/da", dailyactivityRoutes);
var port = process.env.PORT || 3001;

app.listen(process.env.PORT || 3001, () => {
    console.log('Welcome to Zue HRMS portal '+ port);
});
