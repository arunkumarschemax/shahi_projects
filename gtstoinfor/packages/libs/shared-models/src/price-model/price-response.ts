import { GlobalResponseObject } from "../common/global-response-object";
import { AllPriceDto } from "./prices.dto";


export class AllPriceResponseModel extends GlobalResponseObject {
  data?: AllPriceDto[];
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
    data?: AllPriceDto[]
  ) {
    super(status, errorCode, internalMessage);
    this.data = data;
  }
}