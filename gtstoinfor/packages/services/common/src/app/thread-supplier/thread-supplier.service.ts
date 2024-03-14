import { Injectable } from "@nestjs/common";
import { ThreadSupplierRepo } from "./thread-supplier.repo";
import { CommonResponseModel } from "@project-management-system/shared-models";


@Injectable()
export class ThreadSupplierService {
    constructor(

        private Repo: ThreadSupplierRepo,

    ) { }

    async getAllThreadSupplier(): Promise<CommonResponseModel> {
        const data = await this.Repo.find()
        if (data.length) {
            return new CommonResponseModel(true, 1111, "Date retreived sucessfully", data)
        } else {
            return new CommonResponseModel(false, 1110, "No data found")
        }
    }



}






