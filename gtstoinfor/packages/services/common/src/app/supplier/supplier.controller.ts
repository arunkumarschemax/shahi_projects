import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { SupplierService } from "./supplier.service";
import { ApplicationExceptionHandler } from "@project-management-system/backend-utils";
import { SupplierDto } from "./dto/supplier-dto";
import { SupplierAdapter } from "./adapters/adapters/supplier.adapter";
import { SupplierEntity } from "./supplier.entity";
import { CommonResponseModel, SupplierResponse, SupplierResponseObject } from "@project-management-system/shared-models";


@Controller("supplier")
export class SupplierController{
  applicationExceptionHandler: any;
    constructor(
   private supplierService:SupplierService,
   private readonly applicationExceptionhandler: ApplicationExceptionHandler
    ){ }

    @Post('/createSupplier')
    async createSupplier(@Body() supplierDto: any) :Promise<CommonResponseModel>{
      return await this.supplierService.createSupplier(supplierDto);
    }
  
 
  @Post('/getAllSuppliers')
  async getAllSuppliers(): Promise<SupplierResponseObject> {
      try { 
          return this.supplierService.getAllSuppliers();
      } catch (err) {
          return this.applicationExceptionHandler.returnException(err);

      }
  }

   
  @Post('activateOrDeactivateSuppliers')
  async activateOrDeactivateSuppliers(@Body() supplierDto: SupplierDto):Promise<SupplierResponse>{
    return await this.supplierService.activateOrDeactivateSuppliers(supplierDto);
  }

  @Post('/updateSuppliers')
  async updateSuppliers(@Body() supplierDto: SupplierDto ):Promise<CommonResponseModel>{
    return await this.supplierService.updateSuppliers(supplierDto);
  }
}