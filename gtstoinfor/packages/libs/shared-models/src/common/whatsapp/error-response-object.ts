
export class ErrorResponse extends Error {
    intlCode: number;
    message: string;
    constructor(intlCode: number, message: string) {
        super();
        this.intlCode = intlCode;
        this.message = message;
    }
}
