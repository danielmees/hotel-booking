export const addDays = (currentDate, days) => {
    if (!currentDate || !days) return;

    const newDate = new Date(currentDate.valueOf());
    return newDate.setDate(currentDate.getDate() + 1);
}

export const compareDates = (date, dateInString) => {
    if (!date || !dateInString) return;

    // This is to covert the AEST timezone date into a string as same format with dateInString
    const newDateString = date.toLocaleDateString("fr-CA");
    const newDate = new Date(newDateString).toISOString();
    const newDateFromString = new Date(dateInString).toISOString();

    let result = '';

    if (newDate === newDateFromString) {
        result = 'same';
    } else if (newDate > newDateFromString) {
        result = 'after';
    } else if (newDate < newDateFromString) {
        result = 'before';
    }

    return result;
}