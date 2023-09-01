import { GlobalResponseObject } from "../common/global-response-object";
import { AllScanDto } from "./scan.dto";

export class ScanResponseModel extends GlobalResponseObject {
  data?: AllScanDto;
  /**
   *
   * @param status
   * @param errorCode
   * @param internalMessage
   * @param data //DepartmentDto
   */

  constructor(
    status: boolean,
    errorCode: number,
    internalMessage: string,
    data?: AllScanDto
  ) {
    super(status, errorCode, internalMessage);
    this.data = data;
  }
}
