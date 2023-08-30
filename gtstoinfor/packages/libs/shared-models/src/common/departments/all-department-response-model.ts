
import { GlobalResponseObject } from "../global-response-object";
import { DepartmentsDtos } from "./department-dto";
export class AllDepartmentsResponseModel extends GlobalResponseObject{
    data?: DepartmentsDtos[];
    constructor(status: boolean, intlCode: number, internalMessage: string, data?: DepartmentsDtos[]) {
        super(status, intlCode, internalMessage);
        this.data = data;
    }




}