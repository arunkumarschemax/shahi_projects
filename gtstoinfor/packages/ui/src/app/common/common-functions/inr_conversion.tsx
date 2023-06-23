export const InrConversion = (value) => {
    const number = parseFloat(value);
    if (isNaN(number)) {
        return value;
    }
    const roundedNumber = Math.round(number);
    const formatter = new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR'
    });
    const rupeeString = formatter.format(roundedNumber);
    const trimmedString = rupeeString.replace(/^₹/, '').replace(/^-₹/, '-').replace(/\.00$/, '');

    return trimmedString;
}
