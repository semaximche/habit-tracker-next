//Convert Date object to format dd-mm-yyyy
export function convertToFormat(date) {
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
}

//Increment date by certain amount of days
export function incrementDate(date, increment) {
    const dateFormatTotime = new Date(date);
    const increasedDate = new Date(dateFormatTotime.getTime() +(increment *86400000));
    return increasedDate;
}

//Convert to weekday, mmmm dd
export function convertToWords(date) {
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    return `${dayNames[date.getDay()]}, ${monthNames[date.getMonth()]} ${date.getDate()}`;
} 

//Convert date to weekday in words
export function convertToWeekdayWords(date) {
    const dayNames = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
    ];
    return dayNames[date.getDay()];
}

//Convert date to weekday number
export function convertToWeekdayNum(date) {
    return date.getDay();
}
