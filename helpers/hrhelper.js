//const hr = require("../controllers/hr/hr.controller");
const db = require("../models");
const Timezone = db.timezone;

const getTimezone = async ( data) => {  
    let timezones = await Timezone.findAll();  
    return timezones.filter(timezone => "" + timezone.id === data.Timezone)
};
module.exports ={ getTimezone};