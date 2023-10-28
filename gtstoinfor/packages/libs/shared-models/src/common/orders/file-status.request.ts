export class FileStatusReq {
    fileId: number;
    status: string;
    userName: string;
    columns?: string;
    failedReason?: string;
}