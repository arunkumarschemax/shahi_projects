export class SampleProcessInfoReq {
    operation: number
    sequence: number
    constructor(
        operation: number,
        sequence: number,
    ) {
        this.operation = operation
        this.sequence = sequence
    }

}