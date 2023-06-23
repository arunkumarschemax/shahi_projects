export const InrConversionForLakhs = (value) => {
    const number = parseFloat(value);
    if (isNaN(number)) {
        return value;
    }
    const roundedNumber = Math.round(number);
    if (roundedNumber < 100000) {

        const formatter = new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR'
        });
        const rupeeString = formatter.format(roundedNumber);
        const trimmedString = rupeeString.replace(/^₹/, '').replace(/^-₹/, '-').replace(/\.00$/, '');

        return `${trimmedString}`;
    }
    const croreValue = (roundedNumber / 100000).toFixed(2);

    // const formatter = new Intl.NumberFormat('en-IN', {
    //     style: 'currency',
    //     currency: 'INR'
    // });
    // const rupeeString = formatter.format(roundedNumber);
    // const trimmedString = rupeeString.replace(/^₹/, '').replace(/^-₹/, '-').replace(/\.00$/, '');

    // return trimmedString;
    return `${croreValue}`;
}