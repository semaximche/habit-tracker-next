//Returns today's date string in format dd-mm-yyyy
export function getDateNow() {
    const date = new Date();
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
}

//Returns today's date in format weekday, mmmmm dd
export function getDateWords() {
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const monthNames = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];
    const date = new Date();
    return `${dayNames[date.getDay()]}, ${monthNames[date.getMonth()]} ${date.getDate()}`;
}

//Return today's weekday as number
export function getWeekday() {
    const date = new Date();
    return date.getDay();
}

//Return today's weedday as words
export function getWeekdayWords() {
    const dayNames = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
    ];
    const date = new Date();
    return dayNames[date.getDay()];
}
