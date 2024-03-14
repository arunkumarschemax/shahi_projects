import { Injectable } from "@nestjs/common";
import { ThreadQtyRepo } from "./thread-qty.repo";
import { CommonResponseModel } from "@project-management-system/shared-models";




@Injectable()
export class ThreadQtyService {
    constructor(

        private Repo: ThreadQtyRepo,

    ) { }

    async getAllThreadQty(): Promise<CommonResponseModel> {
      const data = await this.Repo.find({ relations: ['ThreadSupplier'] });
      if (data.length) {
          return new CommonResponseModel(true, 1111, "Date retreived sucessfully", data)
      } else {
          return new CommonResponseModel(false, 1110, "No data found")
      }
  }



}






