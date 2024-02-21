export class SampleProcessInfoReq {
    operation: number
    sequence: number
    remarks: string
    constructor(
        operation: number,
        sequence: number,
        remarks: string
    ) {
        this.operation = operation
        this.sequence = sequence
        this.remarks = remarks
    }

}