function getLocales(param) {
    switch(param) {
        case 'Pakistan Standard Time':
            return 'en-PK';
        case 'Eastern Daylight Time':
            return 'en-US';
        case 'British English':
            return 'en-GB';
      default:
        return '';
    }
};

function getTimeZone(param){
    switch(param) {
        case 'Pakistan Standard Time':
            return 'Asia/Karachi';
        case 'Eastern Daylight Time':
            return 'Canada/Eastern';        
      default:
        return '';
    }
}
module.exports = {
getLocales,
getTimeZone
}