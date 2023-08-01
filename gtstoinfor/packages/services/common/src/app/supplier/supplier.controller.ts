import { Body, Controller, Get, Param, Post, Req } from "@nestjs/common";
import { SupplierService } from "./supplier.service";
import { ApplicationExceptionHandler } from "@project-management-system/backend-utils";
import { SupplierDto } from "./dto/supplier-dto";
import { SupplierAdapter } from "./adapters/adapters/supplier.adapter";
import { SupplierEntity } from "./supplier.entity";
import { CommonResponseModel, SupplierActivateDeactivateDto, SupplierCreateDto } from "@project-management-system/shared-models";
import { SupplierCreatDto } from "./dto/supplier-creat-dto";



@Controller("supplier")
export class SupplierController{
  applicationExceptionHandler: any;
    constructor(
   private supplierService:SupplierService,
   private readonly applicationExceptionhandler: ApplicationExceptionHandler
    ){ }

    // @Post('/createSupplier')
    // async createSupplier(@Body() supplierDto: any) :Promise<CommonResponseModel>{
    //   return await this.supplierService.createSupplier(supplierDto);
    // }
 
  // @Post('/getAllSuppliers')
  // async getAllSuppliers(): Promise<any> {
  //     try { 
  //         return this.supplierService.getAllSuppliers();
  //     } catch (err) {
  //         return this.applicationExceptionHandler.returnException(err);

  //     }
  // }
  @Post('/createSupplier')
    async createSupplier(@Body() supplierDto:SupplierDto,isUpdate:boolean=false): Promise<CommonResponseModel> {
    try {
        return await this.supplierService.createSupplier(supplierDto, false);
      } catch (error) {
        return this.applicationExceptionHandler.returnException(CommonResponseModel, error);
      }
    }
    @Post('/updateSuppliers')
  async updateSuppliers(@Body() supplierDto: SupplierDto,@Req() request:any): Promise<CommonResponseModel> {
    try {
       
      return await this.supplierService.createSupplier(supplierDto, true);
    } catch (error) {
      return this.applicationExceptionHandler.returnException(CommonResponseModel, error);
    }
  }
  @Post('/getActiveSuppliers')
    async getActiveSuppliers() : Promise<CommonResponseModel>{
        try{
            return await this.supplierService.getActiveSuppliers()
        }catch(error){
            return this.applicationExceptionhandler.returnException(CommonResponseModel, error);
        }
    }
  @Post('/getAllSuppliers')
  async getAllSuppliers(): Promise<CommonResponseModel>{
      try{
          return await this.supplierService.getAllSuppliers()
      }catch(error){
          return this.applicationExceptionhandler.returnException(CommonResponseModel, error)
      }
  }


  @Post("/ActivateOrDeactivate")
  async ActivateOrDeactivate(@Body() activateDeactivateReq:any) : Promise<CommonResponseModel>{
    console.log(activateDeactivateReq, '[[[[[[[[[[[[[[[[[[[[[[[[[[[[[');
    try{
        await this.supplierService.ActivateOrDeactivate(activateDeactivateReq)
    }catch(error){
        return this.applicationExceptionhandler.returnException(CommonResponseModel,error)
    }
  }

  // @Post('/updateSuppliers')
  // async updateSuppliers(@Body() supplierDto: any ):Promise<CommonResponseModel>{
  //   try{
  //     return await this.supplierService.createSupplier(supplierDto);

  //   }catch(error){
  //     return this.applicationExceptionhandler.returnException(CommonResponseModel,error)
  // }

  // }
}