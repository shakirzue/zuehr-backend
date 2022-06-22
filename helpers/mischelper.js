function ValidateEmail(email) 
{
    let isEmail = email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );

    if (isEmail) {
        return true;
    } else {
        return false;
    }
}

function getPagingOffset(pageIndex, numberOfRecordFetch) 
{
    let offset = (pageIndex - 1) * numberOfRecordFetch;
    return offset;
}


module.exports = {
    ValidateEmail,
    getPagingOffset
};