const hr = require("../controllers/hr/hr.controller");

const getTimezone = async (req, res, data) => {  
    let timezones = await hr.getAllTimezone(req,res);  
    console.log(data.Timezone)
    console.log(timezones.data.filter(timezone => "" + timezone.id === data.Timezone) )
    return timezones.data.filter(timezone => "" + timezone.id === data.Timezone)
};
module.exports ={ getTimezone};